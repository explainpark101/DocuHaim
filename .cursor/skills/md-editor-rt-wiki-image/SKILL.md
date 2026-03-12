---
name: md-editor-rt-wiki-image
description: Implements wiki-style image syntax ![[path]] for md-editor-rt, including S3 upload handler, markdown-it parsing, IndexedDB-based pre-signed URL caching, and client-side hydration. Use when wiring image uploads or rendering custom image syntax in MemoEditor/MemoViewer or new md-editor-rt instances.
---

# md-editor-rt 위키 이미지 문법 & 캐싱 스킬

## 목적

- `md-editor-rt`에서 표준 `![]()` 대신 **위키 스타일 이미지 문법 `![[path]]`** 를 사용하기 위한 패턴을 정의한다.
- 업로드 시 이미지를 **S3에 저장**하고, 에디터에는 `![[path]]` 형태만 남겨 **경로 추상화**를 유지한다.
- 프리뷰/뷰어에서는 `![[path]]` 를 실제 **Pre-signed URL** 로 치환하기 위해 **IndexedDB 캐시 + Hydration** 패턴을 사용한다.

---

## 개념 정리

- **path**: 모두 “연결 정보에 설정된 S3 bucket 하위의 Object Key”만을 의미한다. (예: `images/20250310/uuid_filename.png`)
- **표준 마크다운 대신 `![[path]]`** 를 사용하면:
  - DB 이관, 도메인 변경, CDN 도입 등에서 **문서 내 링크를 수정하지 않고도** 대응 가능하다.
  - 서버에서 path → Pre-signed URL 생성 로직만 교체하면 된다.

이 스킬은 다음 네 가지 단계를 다룬다.

1. **Upload**: `onUploadImg` 핸들러에서 S3로 업로드 후 `![[path]]` 문자열 생성
2. **Insert**: 에디터에 `![[path]]` 를 현재 커서 위치에 삽입
3. **Parsing**: `markdown-it` 커스텀 룰로 `![[path]]` 를 토큰/`img` 태그로 변환
4. **Hydrate**: IndexedDB 캐시를 사용해 Pre-signed URL을 비동기로 채워 넣기

---

## 1. 업로드 단계: onUploadImg 패턴

### 1.1 기본 형태

- `md-editor-rt`의 `onUploadImg` 콜백을 사용해 **파일을 가로채고 직접 S3 업로드 후, `![[path]]` 형식의 문자열을 되돌려준다.**
- 콜백(`callback`)은 보통 표준 `![]()` 마크다운을 기대하지만, 이 프로젝트에서는 `![[path]]` 문자열을 그대로 삽입하는 패턴을 사용한다.

```ts
const onUploadImg = async (files: File[], callback: (values: string[]) => void) => {
  const results = await Promise.all(
    files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        uploadToS3(file)
          .then((path) => {
            // path: S3 bucket 하위 Object Key (예: images/20250310/uuid_xxx.png)
            resolve(`![[${path}]]`);
          })
          .catch(reject);
      });
    }),
  );

  // md-editor-rt에 직접 삽입되도록 문자열 배열을 넘긴다.
  callback(results);
};
```

### 1.2 S3 업로드 전략

- **Key naming 예시**: `images/YYYYMMDD/uuid_filename.ext`
  - 날짜 단위 디렉터리 + UUID 기반 파일명으로 **충돌을 피하고 정렬성을 보장**한다.
- **반환값은 전체 URL이 아니라 Object Key(path)만** 사용한다.
  - 보안상 bucket/도메인 노출을 줄인다.
  - 이후 Pre-signed URL 생성 로직과 쉽게 결합 가능하다.

### 1.3 업로드 전/후 유의 사항

- **파일 크기 제한**: 업로드 전에 파일 크기를 체크해 과도한 용량으로 인한 브라우저 중단을 방지한다.
- **에러 핸들링**:
  - 업로드 실패 시 사용자에게 에러 토스트/모달을 보여준다.
  - 실패한 파일에 대해서는 `![[...]]` 문법을 삽입하지 않도록 한다.

---

## 2. 파싱 단계: markdown-it 커스텀 룰

### 2.1 목표

- 마크다운 문자열 안의 **`![[path]]` 패턴을 찾아서**:
  - `src` 가 비어 있거나 임시 로더 이미지를 가진 `img` 태그
  - 또는 나중에 Hydration 단계에서 사용하는 **커스텀 토큰**으로 변환한다.
- 이 때 `src` 에는 실제 Pre-signed URL을 바로 넣지 않고, **path를 data 속성** 등으로 보관한다.

### 2.2 간단한 토큰 변환 아이디어

아래는 개략적인 형태(실제 프로젝트 코드에서는 타입/모듈 구조에 맞게 조정한다).

```ts
// markdown-it 플러그인 예시 (개념용)
function wikiImagePlugin(md: MarkdownIt) {
  const WIKI_IMAGE_RE = /!\[\[([^[\]]+)\]\]/g;

  md.core.ruler.push('wiki-image', (state) => {
    state.tokens.forEach((blockToken) => {
      if (blockToken.type !== 'inline' || !blockToken.children) return;

      const children: any[] = [];

      blockToken.children.forEach((token) => {
        if (token.type !== 'text') {
          children.push(token);
          return;
        }

        const text = token.content;
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = WIKI_IMAGE_RE.exec(text)) !== null) {
          const path = match[1].trim();

          // 앞쪽 일반 텍스트 유지
          if (match.index > lastIndex) {
            const t = new state.Token('text', '', 0);
            t.content = text.slice(lastIndex, match.index);
            children.push(t);
          }

          // ![[path]] -> img 토큰(또는 커스텀 토큰)으로 변환
          const imgToken = new state.Token('wiki_image', 'img', 0);
          imgToken.attrSet('data-wiki-path', path);
          imgToken.attrSet('src', ''); // Hydration 단계에서 채움
          children.push(imgToken);

          lastIndex = match.index + match[0].length;
        }

        // 남은 텍스트
        if (lastIndex < text.length) {
          const t = new state.Token('text', '', 0);
          t.content = text.slice(lastIndex);
          children.push(t);
        }
      });

      blockToken.children = children;
    });
  });
}
```

### 2.3 렌더링 시 data 속성 활용

- 렌더러에서 `wiki_image` 토큰을 `<img>` 태그로 출력하고, `data-wiki-path` 속성을 남겨둔다.
- Hydration 단계에서 DOM을 순회하면서 `data-wiki-path` 를 읽어 **URL 캐시/요청 결과를 `src` 에 주입**한다.

---

## 3. 캐싱 단계: IndexedDB 구조

### 3.1 스키마

IndexedDB에 다음과 같은 구조의 레코드를 저장한다.

| 필드명 | 타입 | 설명 |
| --- | --- | --- |
| `path` | String (PK) | S3 Object Key (이미지 경로) |
| `url` | String | Pre-signed URL 또는 public URL |
| `expires` | Number | 초 단위 만료 시간 (`-1`이면 영구) |
| `createdAt` | Number | 캐시 생성 시각 (ms, `Date.now()`) |

### 3.2 유효성 검사 함수

```ts
type ImageCacheItem = {
  path: string;
  url: string;
  expires: number; // seconds, -1 = never
  createdAt: number; // ms
};

const isCacheValid = (item: ImageCacheItem) => {
  if (item.expires === -1) return true;
  const now = Date.now();
  const expireTimeMs = item.createdAt + item.expires * 1000;
  return now < expireTimeMs;
};
```

### 3.3 기본 흐름

1. Hydration 시, DOM에서 `data-wiki-path` 를 가진 모든 이미지 후보를 수집한다.
2. 각 path 에 대해 IndexedDB에서 캐시 항목을 조회한다.
3. **유효한 캐시**가 있으면 해당 `url` 을 `img.src` 에 설정한다.
4. 없거나 만료된 경우:
   - 서버에 **path 목록**을 전달해 **일괄 Pre-signed URL 생성 API**를 호출하는 것을 권장한다.
   - 응답으로 받은 `{ path, url, expires }` 들을 IndexedDB에 저장하고, 각 DOM `img` 의 `src` 를 업데이트한다.

---

## 4. Hydration 단계: DOM/React 결합 패턴

### 4.1 왜 Hydration 이 필요한가?

- `md-editor-rt`/`markdown-it` 엔진은 **동기적으로 마크다운을 HTML로 변환**한다.
- Pre-signed URL 생성은 **비동기 API 호출**이므로, 파싱 단계에서는 URL을 알 수 없다.
- 따라서:
  - 파싱 시점엔 `src=""` 또는 로딩용 이미지로 두고,
  - 렌더링 이후 `useEffect` 나 DOM 스캔을 통해 **나중에 URL을 주입**해야 한다.

### 4.2 React 예시 아이디어

- `MdPreview` 렌더 후, `useEffect`에서 `document.querySelectorAll('[data-wiki-path]')` 로 이미지들을 찾아 Hydration 로직을 실행한다.
- 프로젝트 특성상 `editorId` 등을 이용해 특정 컨테이너 아래만 스캔하는 패턴을 선호할 수 있다.

> 실제 구현에서는 이 스킬의 개념을 따라,  
> - DOM 스캔 범위 (`#${editorId}` 이하 등)  
> - API 호출 함수 (`fetchPresignedUrls(paths: string[])`)  
> 를 프로젝트 코드에 맞게 구체화한다.

---

## 5. Race Condition 및 성능 고려

### 5.1 중복 요청 방지 (Promise 큐잉)

- 짧은 시간 안에 동일한 path에 대한 이미지가 여러 번 렌더링될 수 있다.
- 같은 path에 대해 **동시에 여러 번 Pre-signed URL 요청을 보내지 않도록**:
  - `inFlight[path] = Promise` 형태의 맵을 두고, 이미 요청 중인 경우 기존 Promise를 재사용하는 패턴이 권장된다.

### 5.2 IndexedDB 용량 관리

- IndexedDB는 꽤 넉넉하지만, 수만 개의 URL을 계속 쌓으면 성능에 영향을 줄 수 있다.
- 다음과 같은 전략을 고려한다.
  - 오래된 항목(예: `createdAt` 기준 N일 이상 경과)을 주기적으로 삭제
  - 동일 path에 대해 최신 항목만 남기고 덮어쓰기

---

## 6. 체크리스트

새로운 md-editor-rt 에디터/뷰어에서 `![[path]]` 이미지 문법을 사용할 때:

- [ ] `onUploadImg` 에서 S3 업로드 후 `![[path]]` 문자열을 생성해 callback에 넘긴다.
- [ ] S3 업로드 API는 **URL이 아니라 Object Key(path)** 만 반환하도록 설계한다.
- [ ] `markdown-it` 커스텀 룰로 `![[path]]` 를 인식해 `data-wiki-path` 를 가진 `img` 또는 전용 토큰으로 변환한다.
- [ ] Hydration 단계에서 DOM을 스캔해 `data-wiki-path` 목록을 수집하고, IndexedDB 캐시를 먼저 확인한다.
- [ ] 캐시가 없거나 만료된 path는 서버에 일괄 요청해 Pre-signed URL을 받아 캐시에 저장하고, 이미지를 업데이트한다.
- [ ] 동일 path에 대한 중복 API 호출을 막기 위해 Promise 큐잉 또는 in-flight 요청 맵을 사용한다.
- [ ] IndexedDB 용량 관리를 위해 오래된 항목을 정리하거나, 덮어쓰기 정책을 적용한다.

