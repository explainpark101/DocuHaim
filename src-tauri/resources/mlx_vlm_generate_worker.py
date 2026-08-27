#!/usr/bin/env python3
"""Long-running MLX-VLM worker using mlx_vlm.generate/stream_generate.

Reads JSON lines from stdin, writes JSON lines to stdout.
Keeps the model loaded in-process so weights stay in RAM between requests.
"""

from __future__ import annotations

import base64
import json
import os
import sys
import tempfile
import traceback
from typing import Any

model = None
processor = None
config = None
loaded_model_id: str | None = None


def emit(payload: dict[str, Any]) -> None:
    sys.stdout.write(json.dumps(payload, ensure_ascii=False) + "\n")
    sys.stdout.flush()


def emit_error(req_id: str | None, message: str) -> None:
    emit({"type": "error", "id": req_id, "message": message})


def handle_ping(req_id: str | None) -> None:
    emit(
        {
            "type": "ready",
            "id": req_id,
            "loaded": loaded_model_id is not None,
            "model": loaded_model_id,
        }
    )


def handle_load(req: dict[str, Any]) -> None:
    global model, processor, config, loaded_model_id

    req_id = req.get("id")
    model_path = str(req.get("model") or "").strip()
    if not model_path:
        emit_error(req_id, "model is required")
        return

    try:
        from mlx_vlm import load
        from mlx_vlm.utils import load_config

        model, processor = load(model_path)
        config = load_config(model_path)
        loaded_model_id = model_path
        emit({"type": "loaded", "id": req_id, "model": model_path})
    except Exception as exc:  # noqa: BLE001
        emit_error(req_id, f"load failed: {exc}")


def handle_unload(req: dict[str, Any]) -> None:
    global model, processor, config, loaded_model_id

    req_id = req.get("id")
    model = None
    processor = None
    config = None
    loaded_model_id = None
    emit({"type": "unloaded", "id": req_id})


def extension_for_mime(mime_type: str) -> str:
    mime = mime_type.lower()
    if "jpeg" in mime or "jpg" in mime:
        return ".jpg"
    if "webp" in mime:
        return ".webp"
    if "gif" in mime:
        return ".gif"
    if "bmp" in mime:
        return ".bmp"
    return ".png"


def decode_request_images(raw_images: Any) -> list[str]:
    if not isinstance(raw_images, list):
        return []

    paths: list[str] = []
    for item in raw_images:
        if not isinstance(item, dict):
            continue
        mime_type = str(item.get("mime_type") or item.get("mimeType") or "image/png").strip()
        data_base64 = str(item.get("data_base64") or item.get("dataBase64") or "").strip()
        if not data_base64:
            continue
        try:
            image_bytes = base64.b64decode(data_base64, validate=True)
        except (ValueError, TypeError) as exc:
            raise ValueError(f"invalid image base64 payload: {exc}") from exc
        if not image_bytes:
            raise ValueError("image payload decoded to empty bytes")

        fd, path = tempfile.mkstemp(
            suffix=extension_for_mime(mime_type),
            prefix="mlx-vlm-",
        )
        os.close(fd)
        with open(path, "wb") as handle:
            handle.write(image_bytes)
        paths.append(path)
    return paths


def cleanup_image_paths(paths: list[str]) -> None:
    for path in paths:
        try:
            os.remove(path)
        except OSError:
            pass


def build_formatted_prompt(
    system_prompt: str | None,
    user_prompt: str,
    num_images: int,
) -> str:
    assert processor is not None
    assert config is not None

    from mlx_vlm.prompt_utils import apply_chat_template

    if system_prompt:
        combined = f"{system_prompt.strip()}\n\n{user_prompt.strip()}"
    else:
        combined = user_prompt.strip()
    return apply_chat_template(processor, config, combined, num_images=num_images)


def handle_generate(req: dict[str, Any]) -> None:
    req_id = req.get("id")
    if model is None or processor is None or config is None or not loaded_model_id:
        emit_error(req_id, "model is not loaded")
        return

    user_prompt = str(req.get("prompt") or "").strip()
    if not user_prompt:
        emit_error(req_id, "prompt is required")
        return

    system_prompt = str(req.get("system_prompt") or "").strip() or None
    max_tokens = int(req.get("max_tokens") or 512)
    temperature = float(req.get("temperature") if req.get("temperature") is not None else 0.4)
    top_p = float(req.get("top_p") if req.get("top_p") is not None else 1.0)

    image_paths: list[str] = []
    try:
        from mlx_vlm.generate import stream_generate

        image_paths = decode_request_images(req.get("images"))
        formatted_prompt = build_formatted_prompt(
            system_prompt,
            user_prompt,
            len(image_paths),
        )
        generate_kwargs: dict[str, Any] = {
            "max_tokens": max_tokens,
            "temperature": temperature,
            "top_p": top_p,
            "verbose": False,
        }
        if image_paths:
            generate_kwargs["image"] = image_paths

        accumulated = ""
        for response in stream_generate(
            model,
            processor,
            formatted_prompt,
            **generate_kwargs,
        ):
            segment = str(getattr(response, "text", "") or "")
            if segment:
                accumulated += segment
                emit({"type": "chunk", "id": req_id, "text": accumulated})

        final_text = accumulated.strip()
        if not final_text:
            emit_error(req_id, "empty generation result")
            return
        emit({"type": "done", "id": req_id, "text": final_text})
    except Exception as exc:  # noqa: BLE001
        emit_error(req_id, f"generate failed: {exc}")
    finally:
        cleanup_image_paths(image_paths)


def handle_request(raw: str) -> None:
    req_id: str | None = None
    try:
        req = json.loads(raw)
        if not isinstance(req, dict):
            emit_error(None, "request must be a JSON object")
            return
        req_id = req.get("id")
        req_type = str(req.get("type") or "").strip()
        if req_type == "ping":
            handle_ping(req_id)
        elif req_type == "load":
            handle_load(req)
        elif req_type == "unload":
            handle_unload(req)
        elif req_type == "generate":
            handle_generate(req)
        else:
            emit_error(req_id, f"unknown request type: {req_type or '(empty)'}")
    except json.JSONDecodeError:
        emit_error(req_id, "invalid JSON")
    except Exception as exc:  # noqa: BLE001
        emit_error(req_id, str(exc))


def main() -> None:
    emit({"type": "boot"})
    for line in sys.stdin:
        stripped = line.strip()
        if not stripped:
            continue
        handle_request(stripped)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        pass
    except Exception:  # noqa: BLE001
        traceback.print_exc(file=sys.stderr)
        sys.exit(1)
