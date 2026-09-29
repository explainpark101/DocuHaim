# Android sideload (Tauri APK)

DocuHaim Android is a **Tauri v2** shell around the same SPA. It is **not** distributed on Google Play. Install the APK from the unified GitHub Release.

## Releases

| Channel | Workflow | Tag | Artifacts |
|---------|----------|-----|-----------|
| Unified (preferred) | `.github/workflows/release-tauri.yml` | `vX.Y.Z` | DMG / NSIS / APK / `latest.json` |
| Android-only (optional) | `.github/workflows/release-tauri-android.yml` | `vX.Y.Z` (same) | debug-signed APK only (`make_latest: false`) |

Android APKs ship on the **same** `vX.Y.Z` release as desktop. Do **not** publish separate `android-v*` tags — GitHub `/releases/latest` would point at them and break desktop auto-update (`latest.json` 404).

CI builds **`tauri android build --debug --apk`** so the published APK is sideload-installable without a release keystore.

### Publish (normal)

1. Actions → **Release Tauri** → Run workflow.
2. Download DMG / EXE / APK from the new `v…` release (also linked from [releases/latest](https://github.com/explainpark101/DocuHaim/releases/latest)).

### Publish APK only (rebuild)

1. Actions → **Release Tauri Android** → Run workflow.
2. Optional `version` input (defaults to root `package.json` version). Uploads to `vX.Y.Z` without changing which release is “Latest”.

## Install (sideload)

1. On the phone, allow install from the browser/Files app (“unknown apps”).
2. Open the downloaded `.apk` and install.
3. First launch: unlock with master password and/or **생체 인식** (platform biometric via Stronghold — not browser WebAuthn/PRF).

## Features on Android

- **S3 / WebDAV** — same encrypted credential flow; secrets in Stronghold (app-private).
- **Local Haim** — default vault under app data (`LocalHaim`). You can also pick another folder via the system dialog when available.
- **`.md` / `.markdown` file association** — open markdown from Files / other apps with DocuHaim (vault note if under the Local root, otherwise session workspace).
- **Advanced Search** — filename / path / commands only; Lucivy inverted index is disabled.
- **share_target** — existing PWA share intake is assumed to keep working; this shell does not reimplement it.

## Local development

Requires Android SDK + NDK, **JDK 17**, and Rust Android targets.  
`bun run tauri:android:*` uses [`scripts/tauri-android.mjs`](../../scripts/tauri-android.mjs) to set `JAVA_HOME` (Homebrew OpenJDK) so Gradle does not hit macOS’s “Unable to locate a Java Runtime” stub.

```bash
# Sideload-ready (debug-signed) — recommended for device install without a release keystore
bun run tauri:android:build:debug

# Release APK (needs signingConfig / keystore — otherwise unsigned and will not install)
bun run tauri:android:build
```

APK output: `src-tauri/gen/android/app/build/outputs/apk/`.  
Project files: `src-tauri/gen/android/`. Intent filters come from [`src-tauri/tauri.conf.json`](../../src-tauri/tauri.conf.json) `bundle.fileAssociations`.

## Signing

GitHub Release Android APKs are **debug-signed** (same idea as local `tauri:android:build:debug`). Plain `tauri:android:build` (release, no keystore) can produce an unsigned APK that Android rejects (“패키지가 잘못되어…”). For private release signing later, configure Gradle `signingConfig` / CI secrets and switch the workflow off `--debug`.

## Out of scope

- Google Play / AAB
- iOS
- Browser WebAuthn PRF in the Android WebView (platform biometric only)
