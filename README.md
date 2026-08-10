# Docu Haim

**S3 / Local / WebDAV에 저장하는 마크다운 메모 앱**입니다.

## 이 앱은 무엇인가요?

Docu Haim은 **마크다운**으로 메모를 작성하고, 저장소를 선택할 수 있는 웹 앱입니다.

- **S3 Haim**: Amazon S3에 저장 — 기기 간 동기화(idle pull, 모바일 폴링, pending 재업로드) 지원
- **Local Haim**: 브라우저 File System Access API로 로컬 폴더에 저장 — 동일 UX, 기기 간 동기화 없음
- **WebDAV Haim**: Nextcloud 등 WebDAV 서버에 저장 — S3와 같이 원격 동기화 지원

메모를 트리(폴더 구조)처럼 정리할 수 있고, 설정에서 저장 모드와 연결 정보를 입력합니다.

- **PWA**: 앱처럼 설치 가능하며, 오프라인에서도 캐시된 화면을 볼 수 있습니다.
- **잠금 해제**: S3 연결 정보를 마스터 비밀번호로 저장합니다. WebDAV 설정도 비밀번호로 암호화할 수 있습니다.
- 노트 녹음 기능 (필기 동기화)
- 이미지 업로드 (`![[path]]` wiki 문법)
- keyboard shortcut snippet

## WebDAV CORS (필수)

브라우저에서 WebDAV를 직접 호출하므로 **서버가 CORS를 허용**해야 합니다.

필요한 예시 헤더(서버/리버스 프록시 설정):

```
Access-Control-Allow-Origin: https://your-app-origin
Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS, PROPFIND, MKCOL, MOVE, COPY, HEAD
Access-Control-Allow-Headers: Authorization, Content-Type, Depth, Destination, Overwrite, If-Match, If-None-Match
Access-Control-Expose-Headers: ETag, Last-Modified
Access-Control-Allow-Credentials: true
```

Nextcloud 등은 기본 CORS가 꺼져 있는 경우가 많습니다. CORS 오류 시 설정 페이지의 **연결 테스트**에서
`network or CORS` 메시지가 표시됩니다. Electron/로컬 프록시를 통한 CORS 우회는 후속 과제입니다.

## 추후 업데이트 사항

- IndexedDB활용 (dexie.js 활용)
  - 오프라인 캐싱 기능 (오프라인에서 S3의 내용을 일부 수정하고 추후 동기화하도록 하는 기능)
- Web Ink API
- Electron/로컬 프록시로 WebDAV CORS 우회
- WebDAV OAuth / App Password UX
- `use-fs`를 이용하여 S3의 모든 내용물을 로컬에 저장할 수 있도록 하기
  - `설정` > `데이터 백업 / 복원` 탭에 `S3 데이터 다운로드` 버튼을 만들기
  - 유저가 입력한 정보를 토대로, `rclone` 명령어를 만들어 연결을 할 수 있도록 하는 안내탭을 설정 페이지 가장 하단에 추가하기.
