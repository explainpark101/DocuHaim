# md-editor-rt 위키 이미지 구현 레퍼런스

이 문서는 s3haim 프로젝트에 적용된 `![[path]]` 위키 이미지 문법의 **실제 구현 위치와 흐름**을 정리한 레퍼런스다.  
개념·패턴은 SKILL.md를 참고하고, 여기서는 파일 경로·함수·props·설정만 기술한다.

---

## 1. 파일 구조

| 역할 | 파일 경로 |
|------|------------|
| S3 이미지 업로드 (path 반환) | `src/utils/editorImageUpload.js` |
| markdown-it 플러그인 (![[path]] → img) | `src/utils/wikiImageMarkdownIt.js` |
| Preview URL 캐시 (IndexedDB) | `src/utils/wikiImageCacheDb.js` |
| 에디터 + Preview Hydration | `src/components/MarkdownEditor.jsx` |
| 상위 레이아웃 / props 전달 | `src/components/EditorPane.jsx` |
| S3 클라이언트·업로드·Presigned URL | `src/App.jsx` |
| S3 put/get/signed URL | `src/utils/s3Client.js` |

---

## 2. 업로드 (Upload)

### 2.1 S3 업로드 유틸

- **파일**: `src/utils/editorImageUpload.js`
- **함수**: `uploadEditorImage(client, bucket, file, options?)`
  - **반환**: `Promise<string>` — S3 Object Key (path)
  - **Key 형식**: `.images/<md파일경로>/<md파일이름>/<uuid>.<ext>`
  - 예: md 파일이 `고려대학교/고려대학교.md` 이면  
    이미지 path는 `.images/고려대학교/고려대학교/<uuid>.png`
  - **옵션**: `maxSizeBytes` (기본 10MB), 초과 시 에러
  - 내부에서 `@/utils/s3Client`의 `putObject` 사용

### 2.2 App에서 업로드 핸들러

- **파일**: `src/App.jsx`
- **함수**: `handleUploadEditorImage(files)`
  - `getS3Client()`, `s3Creds.bucket` 사용
  - 이미지 파일만 필터 (`file.type.startsWith('image/')`)
  - 현재 열린 md 파일(`currentFile.id`) 기준으로 `imagePathPrefix` 계산 (예: `.images/고려대학교/고려대학교`)
  - 각 파일에 대해 `uploadEditorImage(client, bucket, file, { imagePathPrefix })` 호출 후 path 배열 반환
  - 실패 시 `setOperationStatus`로 메시지 표시
  - **전달**: `onUploadImage={handleUploadEditorImage}` 로 EditorPane에 전달

### 2.3 에디터에서 업로드·붙여넣기

- **파일**: `src/components/MarkdownEditor.jsx`
- **Props**: `onUploadImage` — `(files: File[]) => Promise<string[]>`
- **툴바 이미지 버튼**  
  - `onUploadImg`: `onUploadImage(files)` 호출 후 `callback(paths.map(p => \`![[${p}]]\`))` 로 삽입
- **클립보드 붙여넣기**  
  - `api.domEventHandlers({ paste })` 에서 `clipboardData.files` / `clipboardData.items` 로 이미지 수집  
  - 이미지가 있고 `onUploadImage`가 있으면 `e.preventDefault()`, 업로드 후 `![[path]]` 문자열을 커서에 삽입 (`view.dispatch(view.state.replaceSelection(markdown))`)  
  - 이미지가 없으면 기존처럼 `text/plain` 만 처리

---

## 3. 파싱 (Parsing)

### 3.1 markdown-it 플러그인

- **파일**: `src/utils/wikiImageMarkdownIt.js`
- **함수**: `wikiImagePlugin(md)` — 인자로 markdown-it 인스턴스 받음
- **정규식**: `WIKI_IMAGE_RE = /!\[\[([^[\]]+)\]\]/g`
- **동작**  
  - `md.core.ruler.push('wiki-image', ...)` 로 inline 텍스트 토큰을 순회  
  - `![[path]]` 매칭 시 `state.Token('wiki_image', 'img', 0)` 생성, `data-wiki-path`, `src=""`, `alt=""` 설정  
  - `md.renderer.rules.wiki_image`: `<img ` + `self.renderAttrs(token)` + `>`

### 3.2 config 등록

- **파일**: `src/components/MarkdownEditor.jsx` (상단)
- **호출**: `config({ markdownItPlugins(plugins, opts) { return [...plugins, { type: 'wiki_image', plugin: wikiImagePlugin, options: {} }]; } })`  
  - md-editor-rt 전역 config이므로 에디터·미리보기 공통 적용

---

## 4. 캐시 (IndexedDB)

- **파일**: `src/utils/wikiImageCacheDb.js`
- **DB**: Dexie, DB 이름 `s3haim-wiki-image-cache`
- **스키마**: `urls` 스토어 — `path` (PK), `expiresAt` 인덱스  
  - 레코드: `{ path, url, expiresAt }` (expiresAt = timestamp ms)
- **함수**  
  - `getCachedWikiImageUrl(path)` → `Promise<string|null>`  
    - 만료 60초 전까지 유효한 경우만 반환 (`EXPIRE_BUFFER_MS`)  
  - `setCachedWikiImageUrl({ path, url, expiresAt })`

---

## 5. Preview Hydration

### 5.1 Presigned URL 제공

- **파일**: `src/App.jsx`
- **함수**: `getPresignedUrlForPath(path)`
  - `getS3Client()`, `s3Creds.bucket`, `getSignedGetUrl(client, bucket, path, 3600)` 사용
  - **전달**: `onResolveWikiImageUrl={getPresignedUrlForPath}` 로 EditorPane → MarkdownEditor

### 5.2 Hydration 로직 (MarkdownEditor)

- **파일**: `src/components/MarkdownEditor.jsx`
- **상수**: `PRESIGNED_EXPIRES_IN_S = 3600`
- **공용 함수**: `resolveWikiImageUrl(path, getPresignedUrl, opts?)`  
  - 동일 path에 대한 중복 요청 방지: `inFlight` Map으로 Promise 재사용  
  - 순서: 기본(`skipCache: false`)은 `getCachedWikiImageUrl(path)` 조회 후 캐시 미스일 때만 `getPresignedUrl(path)` 호출 및 캐시 저장  
  - onerror 재시도 시에는 `skipCache: true` 옵션으로 호출해 캐시를 무시하고 항상 새 presigned URL을 받아옴
- **useEffect** (의존: `[value, onResolveWikiImageUrl]`)  
  - 100, 350, 700, 1200ms 지연 후 최대 4회까지 Hydration 재시도  
  - 각 시도에서 `containerRef.current` 또는 document 전체에서 `img[data-wiki-path]` 를 찾고, `resolveWikiImageUrl` 로 URL을 얻어 `img.src` 설정  
  - `img.onerror`: 최대 1회 재시도 (`MAX_RETRIES = 1`) 시 `skipCache: true` 로 호출해 캐시를 건너뛰고 새 URL을 받아온 뒤 `img.src`를 갱신

---

## 6. Props 흐름 요약

```
App.jsx
  handleUploadEditorImage(files)     → onUploadImage
  getPresignedUrlForPath(path)       → onResolveWikiImageUrl
    ↓
EditorPane.jsx
  onUploadImage, onResolveWikiImageUrl 그대로 전달
    ↓
MarkdownEditor.jsx
  onUploadImage  → onUploadImg, paste 핸들러
  onResolveWikiImageUrl → Hydration useEffect
```

---

## 7. 체크리스트 (구현 여부)

- [x] `onUploadImg` 에서 S3 업로드 후 `![[path]]` 문자열 생성해 callback에 넘김
- [x] S3 업로드 API는 URL이 아니라 Object Key(path)만 반환
- [x] markdown-it 커스텀 룰로 `![[path]]` 를 `data-wiki-path` 를 가진 img로 변환
- [x] Hydration에서 DOM 스캔 → IndexedDB 캐시 우선 확인 후 Presigned URL 요청·저장·img 갱신
- [x] img `onerror` 시 새 signed URL 요청 후 `src` 갱신, 재시도 1회로 제한
- [x] 동일 path에 대한 중복 API 방지 (in-flight Map)
- [x] IndexedDB에 path별 url·expiresAt 저장 (덮어쓰기)
