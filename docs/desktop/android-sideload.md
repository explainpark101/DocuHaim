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

Requires Android SDK + NDK, **JDK 17**, and Rust Android targets.  
`bun run tauri:android:*` uses [`scripts/tauri-android.ts`](../../scripts/tauri-android.ts) to set `JAVA_HOME` (Homebrew OpenJDK) so Gradle does not hit macOS’s “Unable to locate a Java Runtime” stub.

```bash
# Sideload-ready (debug-signed) — recommended for device install without a release keystore
bun run tauri:android:build:debug

# Release APK (needs signingConfig / keystore — otherwise unsigned and will not install)
bun run tauri:android:build
```

APK output: `src-tauri/gen/android/app/build/outputs/apk/`.  
Project files: `src-tauri/gen/android/`. Intent filters come from [`src-tauri/tauri.conf.json`](../../src-tauri/tauri.conf.json) `bundle.fileAssociations`.

## Signing

Without a release keystore, use **`tauri:android:build:debug`** for sideload. Plain `tauri:android:build` can produce an unsigned release APK that Android rejects (“패키지가 잘못되어…”). For private release signing, configure Gradle `signingConfig` / CI secrets (not covered by the desktop Apple/Windows signing doc).
## Out of scope

- Google Play / AAB
- iOS
- Browser WebAuthn PRF in the Android WebView (platform biometric only)
