# Android sideload (Tauri APK)

DocuHaim Android is a **Tauri v2** shell around the same SPA. It is **not** distributed on Google Play. Install the APK from a dedicated GitHub Release.

## Releases

| Channel | Workflow | Tag | Artifacts |
|---------|----------|-----|-----------|
| Desktop | `.github/workflows/release-tauri.yml` | `vX.Y.Z` | DMG / NSIS |
| Android | `.github/workflows/release-tauri-android.yml` | `android-vX.Y.Z` | APK |

Android and desktop releases are **separate**. Desktop workflow does not upload APKs.

### Publish an Android build

1. Actions → **Release Tauri Android** → Run workflow.
2. Optional `version` input (defaults to root `package.json` version).
3. Download the APK from the new `android-v…` release.

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

Requires Android SDK + NDK (`NDK_HOME` / `ANDROID_NDK_HOME`), JDK 17, and Rust Android targets.

```bash
export ANDROID_HOME=~/Library/Android/sdk   # example
export NDK_HOME=$ANDROID_HOME/ndk/<version>
bun run tauri:android:init   # once, if gen/android is missing
bun run tauri:android:dev
bun run tauri:android:build
```

Project files live under [`src-tauri/gen/android/`](../../src-tauri/gen/android/). Intent filters for markdown are generated from [`src-tauri/tauri.conf.json`](../../src-tauri/tauri.conf.json) `bundle.fileAssociations` on build.

## Signing

Sideload APKs may be debug-signed when release keystore secrets are not configured. For a private release keystore, configure Android signing in the generated Gradle project / CI secrets (not covered by the desktop Apple/Windows signing doc).

## Out of scope

- Google Play / AAB
- iOS
- Browser WebAuthn PRF in the Android WebView (platform biometric only)
