---
title: S3 Haim Docs
---

# S3 Haim Docs

앱에서 쓰는 **커스텀 마크다운** 문법과, 다른 파서에서 포팅할 때 쓰는 **interop Spec** 문서입니다.

## 문서

- [Custom Markdown](./custom-markdown/) — `![[…]]`, `<pgbr/>`, 채팅 토큰, note-cover 등

## URL

배포 후 문서는 앱 base 아래 **`/docs/`** 에 있습니다.

| 환경 | 예시 |
|------|------|
| 로컬 (`VITE_BASE_PATH=/`) | `/docs/` |
| GitHub Pages (`/s3haim/`) | `/s3haim/docs/` |

로컬에서 문서만 보려면:

```bash
bun run docs:dev
```

앱과 함께 빌드된 정적 파일을 보려면:

```bash
bun run build
bunx vite preview
```

그다음 `{base}docs/` 로 이동하면 됩니다.
