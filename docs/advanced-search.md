# Advanced Search

노트앱·채팅앱에 묶이지 않는 **고급 검색(Advanced Search)** 패턴에 대한 기능 명세와 이식 가이드입니다.  
이 저장소의 Chat with Myself 검색 UI는 이 패턴의 한 구현체입니다.

---

## 1. 한 줄 정의

**질의어(fuzzy / 부분 일치) + 구조화 필터 + 다중 필드(haystack) 매칭 + 증분 스캔 + 하이라이트 결과 카드**를 한 흐름으로 제공하는 검색입니다.

단순 파일명/`includes` 검색과 달리, “조건으로 좁히고 · 여러 속성을 동시에 찾고 · 결과에서 바로 액션”까지를 목표로 합니다.

---

## 2. 기능 목록

### 2.1 질의어 검색

| 기능 | 동작 |
|------|------|
| 부분 일치 | 연속 부분 문자열이 있으면 즉시 매칭 |
| Fuzzy (서브시퀀스) | 연속이 아니어도 글자가 **순서대로** 나타나면 매칭 (VS Code 스타일) |
| 다중 토큰 | 공백으로 나눈 토큰은 **AND** (모든 토큰이 맞아야 함) |
| 다중 필드 | 본문·메타·첨부·반응·링크 메타 등 여러 haystack에 대해 토큰당 **OR** (한 필드라도 맞으면 그 토큰 충족) |
| 대소문자 무시 | 매칭 전 소문자 정규화 |

예시: 쿼리 `react note` → `react`와 `note`가 각각 (서로 다른 필드여도) 매칭되어야 함.

### 2.2 구조화 필터

질의어 없이도 필터만으로 검색할 수 있습니다.

| 필터 | 역할 | 이식 시 대응 개념 |
|------|------|-------------------|
| 카테고리/그룹 | 소속·채널·태그·프로젝트 | enum / FK / 라벨 |
| 단일 날짜 | 레코드가 속한 날짜 파티션 | `YYYY-MM-DD` 또는 캘린더 키 |
| 기간 (from / to) | 타임스탬프 하한·상한 | `datetime` range |
| 데이터 존재 일자만 선택 가능 | 빈 날짜 비활성화 | `isDateUnavailable(dayKey)` |

필터와 질의어는 **AND**로 결합됩니다. (그룹 맞음 ∧ 기간 맞음 ∧ 쿼리 맞음)

### 2.3 확장 haystack (본문 밖 검색)

| 소스 | 검색에 쓰는 텍스트 | 비고 |
|------|-------------------|------|
| 본문 | raw / markdown body | 기본 |
| 그룹·라벨 | 표시명·id | |
| 첨부 | 파일명, 경로 | |
| 반응/이모지 | native + 키워드(id, name, keywords) / 아이콘 이름 변형 | 피커로 토큰 토글 가능 |
| 링크 미리보기(OG) | title, description, siteName, url | **캐시만** 사용 (검색 중 네트워크 금지 권장) |

반응 피커: 선택 시 쿼리에 토큰을 **추가**, 같은 토큰 재선택 시 **제거**(토글). 피커는 연달아 고를 수 있게 열림 유지.

### 2.4 결과 UX

| 기능 | 동작 |
|------|------|
| 디바운스 | 입력/필터 변경 후 ~250ms에 검색 실행 |
| 수동 새로고침 | 동일 조건으로 스캔 재실행 (디바운스 없음) |
| 증분 로드 | 스크롤 하단 근처에서 다음 파티션 배치 스캔 |
| 날짜 구분선 | 결과 목록을 날짜(또는 파티션)별로 그룹 |
| 미리보기 | 본문 앞부분 + 첫 매치 주변 컨텍스트, 말줄임 |
| 하이라이트 | 렌더된 HTML의 **텍스트 노드만** `<mark>` (태그 깨짐 방지) |
| OG 전용 히트 | 본문은 짧게, 링크 메타 미리보기를 별도 표시 |
| 반응 표시 | 카드에 반응 전부 표시, 쿼리와 맞은 반응은 강조 |
| 빈 상태 | “조건 없음” / “결과 없음” 문구 구분 |

### 2.5 결과 액션 (도메인별)

검색 결과는 “목록으로 끝”이 아니라 **원본으로 점프 + 보조 액션**을 제공합니다.

공통 권장:

- 원본 위치로 이동 (메시지 id / 문서 id / 행 id)
- 내용 복사
- 고정/즐겨찾기 토글

도메인 예시:

- 채팅: 수정 기록, 연결 노트 열기
- 노트앱: 해당 파일·헤딩으로 스크롤
- CRM/티켓: 상세 패널 오픈, 담당자 필터 유지
- 메일: 스레드 열기

---

## 3. 개념 모델

도메인에 독립적인 4계층으로 나누면 이식이 쉽습니다.

```text
┌─────────────────────────────────────────┐
│  UI: Query + Filters + Result list      │
├─────────────────────────────────────────┤
│  Orchestrator: debounce, cancel gen,    │
│                cursor, load-more        │
├─────────────────────────────────────────┤
│  Match engine (순수 함수)                │
│  filters ∧ fuzzy(tokens, haystacks)     │
├─────────────────────────────────────────┤
│  Record source: partitions / pages      │
│  (day keys, shards, DB cursors, …)      │
└─────────────────────────────────────────┘
```

### 3.1 Record

검색 대상 한 건의 최소 스키마:

```ts
type SearchRecord = {
  id: string;
  at: string;           // ISO timestamp
  partitionKey: string; // e.g. '2026-08-07' or shard id
  // domain fields → haystacks로 펼침
  body?: string;
  category?: string;
  attachments?: { name?: string; path?: string }[];
  reactions?: unknown[];
  meta?: Record<string, unknown>;
};
```

### 3.2 SearchFilters

```ts
type SearchFilters = {
  query: string;
  categoryFilter?: string | '__all__';
  dateFilter?: string;   // partition equality
  fromDt?: string;       // inclusive lower bound
  toDt?: string;         // inclusive upper bound
};
```

활성 조건: `query`가 비어 있지 않거나, 카테고리/날짜/기간 중 하나라도 설정된 경우.

### 3.3 Match 결과

```ts
type MatchResult = {
  ok: boolean;
  /** 미리보기용 부가 텍스트 (예: OG). 매칭에만 쓰이고 저장하지 않아도 됨 */
  extraPreviewText?: string;
};
```

---

## 4. 매칭 엔진 (이식 핵심)

프레임워크·DB와 무관한 **순수 함수**로 두는 것을 권장합니다.

### 4.1 Fuzzy 서브시퀀스

1. `haystack` / `needle` 소문자화  
2. `haystack.includes(needle)` → true  
3. 아니면 `needle`의 각 문자가 `haystack`에서 **증가하는 인덱스**로 등장하는지 검사  

공백 구분 토큰이 있으면 각 토큰에 대해 위 규칙을 적용한 뒤 **전부 true**여야 합니다 (단일 필드 기준).

### 4.2 다중 필드 AND / OR

```text
tokens = split(query by whitespace)
haystacks = [body, category, attachment names/paths, reaction text, …]

every token t:
  some haystack h: fuzzyMatch(h, t)
```

즉 **토큰 간 AND, 필드 간 OR**.

비용이 큰 필드(링크 메타 로드 등)는:

1. 로컬 haystack만으로 먼저 시도  
2. 실패 시에만 부가 텍스트를 로드한 뒤 재시도  

검색 중 네트워크 호출은 피합니다. 캐시(IndexedDB, 로컬 파일, Redis 등)만 읽습니다.

### 4.3 구조화 필터

쿼리와 독립적으로 먼저 걸러도 됩니다.

1. category ≠ all → 불일치면 reject  
2. dateFilter → `partitionKey` 동등 비교  
3. fromDt / toDt → `Date(record.at)` 비교  
4. query → haystack fuzzy  

필터만 있고 쿼리가 없으면 haystack 검사는 생략하고 통과시킵니다.

### 4.4 미리보기·하이라이트

- **미리보기**: 본문이 길면 `머리글 + … + 첫 매치 주변` 형태로 자름. OG만 히트면 본문 짧게 + 메타 미리보기.  
- **하이라이트**: HTML을 태그/텍스트로 분리한 뒤 **텍스트 조각에만** 토큰 regex replace → `<mark>…</mark>`.  
  대안: [mark.js](https://markjs.io/)로 DOM 텍스트 노드에 `element: "mark"` 적용.

Markdown 본문을 카드에 쓸 경우: 잘라낸 plain/markdown → HTML 변환 → 하이라이트 순서를 권장합니다.

---

## 5. 스캔·페이지네이션

전체 코퍼스를 한 번에 읽지 않습니다.

권장 알고리즘:

1. 파티션 키 목록을 최신순(또는 도메인 정렬)으로 확보  
2. `cursor`부터 `batchSize`(예: 날짜 3개)씩 로드  
3. 각 레코드에 `matchesFilters`  
4. 이번 패스에서 모은 히트가 목표 수(예: 40)에 도달할 때까지 반복  
5. `{ results, nextIndex, hasMore }` 반환  
6. 필터만(쿼리 없음)인 경우 early stop 상한(예: 60건)을 둘 수 있음  

동시성:

- 검색마다 `generation` 카운터를 올리고, 완료 시 최신 gen만 state에 반영 (오래된 응답 discard).  
- 새로고침/조건 변경 시 파티션 목록 캐시를 비우고 cursor=0부터 재스캔.

UI:

- 스크롤 `scrollTop + clientHeight >= scrollHeight - threshold` 이면 load-more.  
- 로딩 중·조건 없으면 load-more 금지.

---

## 6. UI 구성 (권장)

```text
┌─ sticky chrome ──────────────────────────┐
│ 제목 · 새로고침 · 닫기                     │
│ [🔍 질의어…………] [반응/태그] [필터 ▾]      │
│ ┌ filters (접이식) ─────────────────────┐ │
│ │ 카테고리 · 날짜 · from · to             │ │
│ └───────────────────────────────────────┘ │
├─ results surface ────────────────────────┤
│ ── 2026-08-07 ──                          │
│ [ result card ]                           │
│ [ result card ]                           │
│ … infinite scroll …                       │
└──────────────────────────────────────────┘
```

구현 팁:

- 필터 패널은 접이식; 활성 필터가 있으면 토글 버튼을 “활성” 스타일로 표시.  
- 날짜/일시 입력은 네이티브 `type="date"` 대신 접근성 있는 피커를 쓰는 편이 낫습니다 (이 프로젝트는 React Aria).  
- 카드 메뉴: 데스크톱 컨텍스트 메뉴 + 터치 롱프레스.

---

## 7. 다른 환경에 이식하는 방법

### 7.1 체크리스트

1. **Record 어댑터** — 기존 엔티티 → `id / at / partitionKey / haystacks`  
2. **파티션 전략** — 일별 파일, DB shard, 월별 인덱스, Elasticsearch index alias 등  
3. **순수 match 모듈** — fuzzy + token + filters (UI/스토리지 import 금지)  
4. **스캐너** — batch read + generation cancel + cursor  
5. **부가 인덱스** — 이모지 키워드, OG 캐시, 태그 동의어 (선택)  
6. **UI 셸** — debounce, filters, cards, load-more, refresh  
7. **액션 브리지** — `onSelect(record)` → 라우터/스크롤/패널  

서버 검색으로 바꿀 때도 동일한 Filter/Match 계약을 API 쿼리 파라미터로 옮기면 UI는 재사용 가능합니다. Fuzzy를 DB가 못 하면:

- trigram / `ILIKE` + 클라이언트 재랭크, 또는  
- 전문검색(FTS)으로 후보를 줄인 뒤 동일 fuzzy로 재필터.

### 7.2 도메인별 haystack·필터 매핑

| 도메인 | Haystacks | 구조화 필터 | Select 액션 |
|--------|-----------|-------------|-------------|
| 채팅/DM | body, group, attachments, reactions, OG | group, day, datetime | 메시지 jump |
| 마크다운 노트 | title, path, headings, body, tags | folder, modified range | 파일 오픈 + heading |
| 이메일 | subject, from, to, body snippet | mailbox, date, unread | 스레드 오픈 |
| 이슈/티켓 | title, description, comments, labels | status, assignee, sprint | 상세 패널 |
| 파일 브라우저 | name, path, mime, EXIF/OCR text | folder, size, modified | 미리보기/다운로드 |
| CRM 연락처 | name, company, notes, custom fields | owner, stage, last contact | 레코드 폼 |

노트앱이 아니어도 **같은 match·scan 계약**을 유지하고 haystack 추출 함수만 바꾸면 됩니다.

### 7.3 최소 구현 스케치 (의사코드)

```js
function fuzzyMatchText(haystack, needle) { /* subsequence + includes */ }

function fuzzyMatchTokensInHaystacks(haystacks, query) {
  const tokens = splitSearchTokens(query);
  return tokens.every((t) =>
    haystacks.some((h) => fuzzyMatchText(h, t)),
  );
}

async function matchesFilters(record, filters, loadExtra) {
  if (!passStructuredFilters(record, filters)) return { ok: false };
  if (!filters.query) return { ok: true };
  const local = extractHaystacks(record);
  if (fuzzyMatchTokensInHaystacks(local, filters.query)) return { ok: true };
  const extra = await loadExtra?.(record); // cache only
  if (extra && fuzzyMatchTokensInHaystacks([...local, extra], filters.query)) {
    return { ok: true, extraPreviewText: extra };
  }
  return { ok: false };
}

async function runSearchScan(filters, fromIndex, accumulate) {
  const keys = await listPartitionKeys();
  let i = fromIndex;
  const found = [...accumulate];
  while (i < keys.length && found.length - accumulate.length < 40) {
    const batch = keys.slice(i, i + 3);
    i += batch.length;
    for (const key of batch) {
      for (const record of await readPartition(key)) {
        const hit = await matchesFilters(record, filters, loadCachedLinkText);
        if (hit.ok) found.push({ ...record, partitionKey: key, ...hit });
      }
    }
  }
  return { results: found, nextIndex: i, hasMore: i < keys.length };
}
```

### 7.4 규모가 커질 때

| 규모 | 전략 |
|------|------|
| 수천 파티션 이하, 클라이언트 | 현재와 같은 증분 풀스캔으로 충분 |
| 수만+ 레코드 | 서버 FTS / inverted index, UI 계약 유지 |
| 반응·태그 검색 빈번 | 토큰 → record id 역인덱스 사전 구축 |
| 모바일 | 배치 크기·목표 히트 수 축소, coarse pointer용 피커 |

---

## 8. 이 저장소에서의 구현 위치

Chat with Myself Advanced Search 매핑:

| 계층 | 파일 |
|------|------|
| UI | `src/components/chatWithMyself/ChatSearchPanel.jsx` |
| Orchestrator | `src/components/chatWithMyself/ChatWithMyselfPane.jsx` (`handleSearch`, `runSearchScan`, `matchesFilters`) |
| Match / preview / highlight | `src/utils/chatWithMyself/search.js` |
| 반응 → 검색 텍스트 | `src/utils/chatWithMyself/reactionSearch.ts` |
| OG 캐시 로드 | `search.js` → `loadMessageOgSearchText` / `chatDb` / archive |

동작 요약:

- 패널 디바운스 250ms로 `onSearch(filters)` 호출  
- 일별 메시지 파일을 최신순으로 배치 스캔  
- 히트에 `ogSearchText`를 실어 카드 미리보기에 사용  
- 결과 클릭 시 `jumpToDate(dateStr, id)`  
- 컨텍스트 메뉴: 이동, 고정, 노트 열기, 수정 기록, 복사  

---

## 8.1 Vault 본문 역색인 (Lucivy)

노트/채팅 **본문** Spotlight 검색은 커스텀 Map postings가 아니라 **Lucivy**(Tantivy 계열)를 사용합니다. 런타임은 환경에 따라 갈립니다.

### Web / PWA — lucivy-wasm

| 항목 | 내용 |
|------|------|
| 런타임 | OPFS + Web Worker (`public/lucivy/`) + Dedicated Worker for scrub/tokenize (`indexPrep.worker.ts`) |
| Isolation | `SharedArrayBuffer` 필요 → Vite: COOP + COEP `credentialless`; GitHub Pages: [coi-serviceworker](https://github.com/gzuidhof/coi-serviceworker)가 최초 등록·reload, 이후 VitePWA `sw.ts`가 동일 COOP/COEP를 유지 |
| 폴백 | Lucivy 불가(격리 실패·색인 미생성) 시 **live vault scan**: 노트·채팅 day 파일을 읽어 토큰 AND substring 매칭 (`liveContentSearch.ts`). 파일명·커맨드 fuzzy는 그대로. 상한(파일·채팅 day·히트)은 설정 → **역색인** 섹션 **라이브 스캔 제한** (`liveScanLimits`, localStorage); **`-1` = 제한 없음** |
| UI | 색인 중 `getStatus().buildLogs`는 비움. 로그는 `subscribeBuildLogs` + `getBuildLogsAsync`로 비동기 수집 (`AdvancedSearchBuildLog`). 설정 UI는 Advanced Search(애니메이션)와 역색인(색인·제외 폴더·Live Scan·커버리지)으로 분리. 재색인은 **claim queue 워커 풀**(경로당 1회 claim · 파일별 start/end 로그). `indexPathLock`으로 증분 notify와 경로 배타, Lucivy/docs 쓰기는 write lock. **제외 폴더**(`excludedFolders`)는 선택 폴더+하위를 색인·Live Scan에서 제외. Tauri Rust는 upsert 시 rayon 문서 조립 + `spawn_blocking` |
| 커버리지 | 폴더 트리 행: 폴더명 좌측 · progress bar 우측. 색인 중 증분마다 ~500ms 자동 갱신 |

### Tauri (desktop + Android) — native lucivy-core

| 항목 | 내용 |
|------|------|
| 런타임 | Rust `lucivy-core` 2.x via Tauri `invoke` (`src-tauri/src/as_index/`) |
| Isolation | **불필요** — SharedArrayBuffer / COOP+COEP 없이 생성·검색 |
| 세션 | `app_cache_dir()/as-index-work/{session_id}/` (StdFsDirectory); close 시 정리 |
| 브리지 | [`tauriIndexBackend.ts`](../src/utils/advancedSearch/tauriIndexBackend.ts) → [`lucivyBackend.ts`](../src/utils/advancedSearch/lucivyBackend.ts) 팩ade |

Commands: `as_index_open` / `upsert_batch` / `remove` / `commit` / `export_snapshot` / `search` / `cancel` / `close`.

문서 준비(scrub + garu-ko)는 JS [`prepareDocument.ts`](../src/utils/advancedSearch/prepareDocument.ts)를 유지하고, 준비된 필드만 Rust로 넘깁니다.

### 공통

| 항목 | 내용 |
|------|------|
| 볼트 동기화 | `.advanced-search/manifest.json`, `docs.json.gz`, `index.luce.gz` (schema v2, LUCE v2) |
| 증분 | 문서·채팅 저장 시 Lucivy upsert + 디바운스 스냅샷 저장 |
| 한국어 | scrub + garu-ko 명사 보강 후 Lucivy `contains` / boolean AND |
| 웹↔Tauri | 동일 LUCE 스냅샷 포맷 — 볼트를 공유하면 교차 import 가능 |

구현 경로: `engine.ts`, `lucivyBackend.ts`, `tauriIndexBackend.ts`, `store.ts`, `src-tauri/src/as_index/`.

채팅 패널 풀스캔(`ChatSearchPanel`)과 사이드바 파일명 substring은 이 역색인과 별개입니다.

---

## 9. 비기능 요구사항 (권장)

- **오프라인 우선**: 검색 경로에서 원격 fetch 금지; 캐시 미스면 그 필드는 미매칭 처리  
- **취소 가능**: 빠른 타이핑에도 최종 쿼리만 반영  
- **접근성**: 검색 입력·필터·새로고침·결과에 명확한 `aria-label`  
- **터치**: 롱프레스 메뉴, 반응 피커 dialog 모드  
- **테마**: 하이라이트 색은 light/dark 모두 대비 확보 (`mark` / amber 계열 등)

---

## 10. 요약

Advanced Search는 “더 똑똑한 `includes`”가 아니라:

1. **토큰 AND × 필드 OR × fuzzy** 매칭  
2. **구조화 필터**와의 AND 결합  
3. **캐시된 확장 필드**(반응 키워드, 링크 메타 등)  
4. **증분 스캔 + 취소 + 로드 모어**  
5. **하이라이트 카드 + 원본 점프 액션**  

을 묶은 패턴입니다. 새 환경에서는 match 엔진과 스캐너 계약을 그대로 두고, haystack 추출·파티션 로더·결과 액션만 어댑터로 갈아끼우면 됩니다.
