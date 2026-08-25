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

## Tauri

이 앱은 [Tauri](https://tauri.app/)로 macOS / Windows 데스크톱 빌드를 제공합니다. Google AI Studio 사용 등 브라우저 CORS 제약을 피할 수 있습니다. 공식 릴리스 서명·공증은 [docs/desktop/code-signing.md](docs/desktop/code-signing.md)와 GitHub Actions **Release Tauri** 워크플로를 참고하세요.

사전 준비: `bun install`, Rust toolchain, macOS에서는 Xcode Command Line Tools.

### MacOS

#### How to build your own (Apple Developer 계정 없이)

로컬에서 **개인용** 앱을 빌드·설치할 때는 아래 한 줄이면 됩니다.

```bash
bun run tauri:macos
```

이 명령은 `bun run tauri:build`로 DMG를 만든 뒤, `scripts/macos-adhoc-sign.mjs`로 **ad-hoc 서명**(`codesign --sign -`)을 적용하고 `/Applications/DocuHaim.app`에 복사합니다.

- Apple Developer ID / 공증이 **없어도** 동작합니다. Gatekeeper 경고는 남을 수 있습니다.
- `tauri build`가 DMG 생성 후 번들 `.app`을 정리하는 경우가 있어, 스크립트가 DMG에서 `.app`을 꺼내 서명합니다.
- Touch ID·생체 잠금 등 Keychain 접근 시 macOS 보안 대화상자가 뜨면 **「항상 허용」**을 선택하세요. ad-hoc 빌드에서는 Keychain 항목이 Developer ID 서명 빌드와 동일하게 유지되지 않을 수 있습니다.

서명만 하고 설치하지 않으려면:

```bash
bun run tauri:build && bun run macos:adhoc
```

빌드와 설치를 스크립트에 맡기려면:

```bash
bun run macos:adhoc -- --build --install
```

산출물: `src-tauri/target/release/bundle/dmg/*.dmg` (설치용 DMG), 설치 후 `/Applications/DocuHaim.app`.

#### Keychain / Developer ID로 서명 빌드 (`bun run tauri:build`)

Keychain에 **Developer ID Application** 인증서가 있거나 `.p12`를 import할 수 있을 때는 일반 Tauri 빌드를 사용합니다.

```bash
bun run tauri:build
```

기본값은 **미서명** DMG입니다. 서명·공증을 켜려면 빌드 전에 환경 변수를 설정합니다 (CI와 동일한 이름).

| 변수 | 용도 |
|------|------|
| `APPLE_SIGNING_IDENTITY` | Keychain 인증서 이름 (예: `Developer ID Application: Your Name (TEAMID)`) |
| `APPLE_CERTIFICATE` | (선택) Base64 `.p12` — CI·임시 keychain import용 |
| `APPLE_CERTIFICATE_PASSWORD` | `.p12` 비밀번호 |
| `APPLE_ID` | 공증용 Apple ID |
| `APPLE_PASSWORD` | 앱 전용 비밀번호 |
| `APPLE_TEAM_ID` | Team ID (10자) |

인증서가 이미 로그인 Keychain에 있으면 `APPLE_SIGNING_IDENTITY`만으로도 서명이 가능한 경우가 많습니다. `.p12` import가 필요하면 `APPLE_CERTIFICATE` / `APPLE_CERTIFICATE_PASSWORD`를 함께 지정하세요.

```bash
export APPLE_SIGNING_IDENTITY="Developer ID Application: Your Name (TEAMID)"
export APPLE_ID="you@example.com"
export APPLE_PASSWORD="xxxx-xxxx-xxxx-xxxx"
export APPLE_TEAM_ID="XXXXXXXXXX"

bun run tauri:build
```

산출물: `src-tauri/target/release/bundle/dmg/`, `src-tauri/target/release/bundle/macos/`.

서명된 빌드에서는 Touch ID·Windows Hello 잠금(Keychain)이 ad-hoc 빌드보다 안정적으로 동작합니다. 인증서 준비·GitHub Secrets 설정은 [docs/desktop/code-signing.md](docs/desktop/code-signing.md)를 참고하세요.

### Windows
> 아직 Windows 의 tauri app은 테스트되지 않아 불안정할 수 있습니다.