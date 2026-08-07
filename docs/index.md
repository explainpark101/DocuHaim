---
title: S3 Haim Docs
---

# S3 Haim Docs

앱 기능·문법 명세와, 다른 구현에서 포팅할 때 쓰는 **interop Spec** 문서입니다.

## 문서

- [Advanced Search](./advanced-search) — fuzzy/필터/하이라이트 검색 패턴과 이식 가이드
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
