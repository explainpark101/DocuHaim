# Android sideload (Tauri APK)

DocuHaim Android is a **Tauri v2** shell around the same SPA. It is **not** distributed on Google Play. Install the APK from the unified GitHub Release.

## Releases

| Channel | Workflow | Tag | Artifacts |
|---------|----------|-----|-----------|
| Unified (preferred) | `.github/workflows/release-tauri.yml` | `vX.Y.Z` | DMG / NSIS / **per-ABI + universal** APK / `latest.json` |
| Android-only (optional) | `.github/workflows/release-tauri-android.yml` | `vX.Y.Z` (same) | same debug-signed APK set (`make_latest: false`) |

Android APKs ship on the **same** `vX.Y.Z` release as desktop. Do **not** publish separate `android-v*` tags — GitHub `/releases/latest` would point at them and break desktop auto-update (`latest.json` 404).

CI builds **debug buildType** APKs signed with the **shared sideload keystore** (not each runner’s random `debug.keystore`):

1. `tauri android build --debug --apk --split-per-abi` → one APK per ABI  
2. `tauri android build --debug --apk` → universal APK (all ABIs)

Assets are renamed by [`scripts/collect-android-release-apks.mjs`](../../scripts/collect-android-release-apks.mjs) to `DocuHaim_<version>_<abi>-debug.apk`. Release notes come from [`github-release-body.md`](./github-release-body.md).

### Which APK to download

| Asset suffix | ABI | Typical devices |
|--------------|-----|-----------------|
| `arm64-v8a-debug.apk` | `arm64-v8a` | Most phones / tablets (**preferred**) |
| `armeabi-v7a-debug.apk` | `armeabi-v7a` | Older 32-bit ARM |
| `x86_64-debug.apk` | `x86_64` | Many Android emulators |
| `x86-debug.apk` | `x86` | Older x86 emulators |
| `universal-debug.apk` | all | Any device (largest) |

### How to check your architecture

**On device:** Settings → About phone / About device → CPU / Hardware, or an app such as CPU-Z (SoC → ABI / Instruction Sets). Most modern phones are **`arm64-v8a`**.

**With adb:**

```bash
adb shell getprop ro.product.cpu.abi
```

Match the printed ABI to the table above. If unsure, use **universal**.

### Publish (normal)

1. Actions → **Release Tauri** → Run workflow.
2. Download DMG / EXE / the matching APK from the new `v…` release (also linked from [releases/latest](https://github.com/explainpark101/DocuHaim/releases/latest)).

### Publish APK only (rebuild)

1. Actions → **Release Tauri Android** → Run workflow.
2. Optional `version` input (defaults to root `package.json` version). Uploads to `vX.Y.Z` without changing which release is “Latest”.

## Install (sideload)

1. On the phone, allow install from the browser/Files app (“unknown apps”).
2. Open the downloaded `.apk` for **your ABI** (or universal) and install.
3. First launch: unlock with master password and/or **생체 인식** (platform biometric via Stronghold — not browser WebAuthn/PRF).

## Features on Android

- **S3 / WebDAV** — same encrypted credential flow; secrets in Stronghold (app-private).
- **Local Haim** — default vault under app data (`LocalHaim`). You can also pick another folder via the system dialog when available.
- **`.md` / `.markdown` file association** — open markdown from Files / other apps with DocuHaim (vault note if under the Local root, otherwise session workspace).
- **Advanced Search** — filename / path / commands only; Lucivy inverted index is disabled.
- **App version + APK auto-update** — Settings → 앱 shows the native package version (`getVersion`). “최신 APK 확인” polls GitHub Releases for `DocuHaim_<ver>_<abi>-debug.apk` (falls back to universal), downloads into app cache, and installs via `PackageInstaller` (same `applicationId` + shared sideload signature).
  - Android 8+ does **not** show a normal runtime permission for this. The first update opens **Settings → Install unknown apps** for DocuHaim (`REQUEST_INSTALL_PACKAGES` / `canRequestPackageInstalls`). Allow it, then tap update again.
  - After that, the **system package-installer confirm** sheet should appear (`STATUS_PENDING_USER_ACTION`). Sideload updates cannot skip that user action.
- **System status bar** — Settings toggle (or Advanced Search) to show/hide the Android status bar over the fullscreen WebView.
- **share_target** — existing PWA share intake is assumed to keep working; this shell does not reimplement it.

### Launcher icons

Adaptive icons are regenerated with a safe-zone inset via [`scripts/generate-android-icons.mjs`](../../scripts/generate-android-icons.mjs) (also run automatically by `tauri:android:dev` / `tauri:android:build*`). Do not rely on raw `tauri icon` foregrounds alone — they fill too much of the adaptive canvas and look oversized.

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
Project files: `src-tauri/gen/android/`. Intent filters come from `src-tauri/tauri.conf.json` `bundle.fileAssociations`.

## Signing

GitHub Release Android APKs and local `tauri:android:build:debug` share a **committed sideload keystore** (`src-tauri/gen/android/keystore/`; see `README.md` in that folder):

- Alias `docuhaim` / PKCS12 `docuhaim-sideload.p12`
- Wired in `app/build.gradle.kts` `signingConfigs.sideload` for **debug and release** until a private Play key exists
- Optional override via gitignored `src-tauri/gen/android/keystore.properties`

This avoids `INSTALL_FAILED_UPDATE_INCOMPATIBLE` (Korean UI often says the package name conflicts) when the in-app updater downloads a newer APK. Ephemeral `~/.android/debug.keystore` on CI runners previously signed every release differently.

**Migration:** if an older install used a random debug key, uninstall DocuHaim once, then install a build signed with the sideload keystore. Vault data under app-private storage is wiped by uninstall — export notes first if needed.

Plain `tauri:android:build` without this signing config used to produce unsigned APKs Android rejects (“패키지가 잘못되어…”). The sideload signingConfig now covers release buildType as well.

For a private release key later: set `keystore.properties` (or CI secrets) and point `signingConfigs` at that file; see [Tauri Android signing](https://v2.tauri.app/distribute/sign/android/).

## Out of scope

- Google Play / AAB
- iOS
- Browser WebAuthn PRF in the Android WebView (platform biometric only)
