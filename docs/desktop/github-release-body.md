Unified release (macOS DMG / Windows NSIS / Android APK) with auto-update manifest.

- macOS: universal DMG
- Windows: NSIS installer (`.exe`)
- Android: debug-signed sideload APKs — **prefer the matching ABI**; `universal` includes all ABIs (larger)
- `latest.json` + signatures for the Tauri updater (when `TAURI_SIGNING_PRIVATE_KEY` is configured)

Install / update endpoint: https://github.com/explainpark101/DocuHaim/releases/latest

Unsigned desktop builds if signing secrets are not configured — see docs/desktop/code-signing.md.

## Android APK — which file to download

| Asset name pattern | ABI | Typical devices |
|--------------------|-----|-----------------|
| `DocuHaim_*_arm64-v8a-debug.apk` | `arm64-v8a` | Most phones / tablets (recommended) |
| `DocuHaim_*_armeabi-v7a-debug.apk` | `armeabi-v7a` | Older 32-bit ARM devices |
| `DocuHaim_*_x86_64-debug.apk` | `x86_64` | Many Android emulators |
| `DocuHaim_*_x86-debug.apk` | `x86` | Older x86 emulators |
| `DocuHaim_*_universal-debug.apk` | all of the above | Any device (largest download) |

### How to check your device architecture

**On the phone (no PC)**

1. Open **Settings → About phone** (or **About device**).
2. Look for **CPU** / **Hardware** / **Processor**, or install a free app such as **CPU-Z** and check **SoC → ABI** / **Instruction Sets**.
3. If you see `arm64-v8a` (or `aarch64`), download the **arm64-v8a** APK.

**With a USB cable + `adb` (developer options enabled)**

```bash
adb shell getprop ro.product.cpu.abi
```

Example outputs:

- `arm64-v8a` → download `*_arm64-v8a-debug.apk`
- `armeabi-v7a` → download `*_armeabi-v7a-debug.apk`
- `x86_64` → download `*_x86_64-debug.apk`

If unsure, use the **universal** APK.

Sideload: allow “Install unknown apps”, then open the `.apk`.  
Docs: [android-sideload.md](https://github.com/explainpark101/DocuHaim/blob/main/docs/desktop/android-sideload.md) · [code-signing.md](https://github.com/explainpark101/DocuHaim/blob/main/docs/desktop/code-signing.md)
