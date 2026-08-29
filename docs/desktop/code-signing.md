# Desktop code signing

DocuHaim desktop releases are built by [`.github/workflows/release-tauri.yml`](../../.github/workflows/release-tauri.yml).

**If signing secrets are missing, the workflow still uploads unsigned DMG / NSIS artifacts.** Gatekeeper (macOS) and SmartScreen (Windows) will warn users until secrets are configured.

## Version source of truth

Desktop app version is owned by root [`package.json`](../../package.json) `version`.

| Consumer | How it inherits |
|----------|-----------------|
| `src-tauri/tauri.conf.json` | `"version": "../package.json"` |
| `src-tauri/Cargo.toml` | `bun run sync:tauri-version` (before `tauri:dev` / `tauri:build`) |
| GitHub Release tag / name | `release-tauri.yml` reads `package.json` into `VERSION` |

Bump `package.json` version in the repo before running the release workflow. The workflow does **not** take a version input.

## Trigger

GitHub → Actions → **Release Tauri** → Run workflow (optional: mark prerelease).

## Optional secrets (1:1 with the workflow)

| Secret | Platform | Purpose |
|--------|----------|---------|
| `APPLE_CERTIFICATE` | macOS | Base64-encoded `.p12` Developer ID Application certificate |
| `APPLE_CERTIFICATE_PASSWORD` | macOS | Password for the `.p12` |
| `APPLE_SIGNING_IDENTITY` | macOS | e.g. `Developer ID Application: Your Name (TEAMID)` |
| `APPLE_ID` | macOS | Apple ID email for notarization |
| `APPLE_PASSWORD` | macOS | App-specific password (not your Apple ID password) |
| `APPLE_TEAM_ID` | macOS | 10-character Team ID |
| `WINDOWS_CERTIFICATE` | Windows | Base64-encoded Authenticode PFX / P12 |
| `WINDOWS_CERTIFICATE_PASSWORD` | Windows | PFX password |
| `TAURI_SIGNING_PRIVATE_KEY` | macOS / Windows | Updater signing private key (contents of `.key` file, or base64) |
| `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` | macOS / Windows | Optional password when the updater private key is encrypted |

Empty secrets are ignored; **do not** set `APPLE_CERTIFICATE` (or other signing secrets) with placeholder or broken values — Tauri will attempt import/codesign and the workflow fails with `security import` / `SecKeychainItemImport` errors. Remove invalid secrets or fix the `.p12` encoding and password.

## Auto-update (Tauri updater)

Desktop auto-update uses GitHub Releases as the update endpoint (`latest.json` on each release). The public key is committed in `src-tauri/tauri.conf.json` (see also `src-tauri/updater.key.pub`).

### Generate or rotate updater keys

```bash
bunx tauri signer generate -w ~/.tauri/docuhaim.key
```

- Copy the **public** key output into `plugins.updater.pubkey` in `src-tauri/tauri.conf.json` and `src-tauri/updater.key.pub`.
- Store the **private** key in GitHub Secrets as `TAURI_SIGNING_PRIVATE_KEY` (paste the key file contents, or base64-encode the file).
- If the key has a password, set `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`.

The release workflow passes these secrets to `tauri-action`, which uploads signed updater artifacts and `latest.json` alongside DMG / NSIS installers.

Without `TAURI_SIGNING_PRIVATE_KEY`, releases still build but auto-update signatures will not match the embedded public key — configure the secret before shipping updater-enabled builds to users.

## macOS setup

1. Create a **Developer ID Application** certificate in your Apple Developer account.
2. Export as `.p12` from Keychain Access.
3. Encode for GitHub Secrets:

```bash
base64 -i DeveloperID.p12 | pbcopy
```

4. Create an [app-specific password](https://appleid.apple.com/) for notarization → `APPLE_PASSWORD`.
5. Set `APPLE_SIGNING_IDENTITY` to the exact Common Name of the certificate.
6. Set `APPLE_TEAM_ID` from [Membership details](https://developer.apple.com/account).

After the first signed release, verify:

```bash
spctl --assess --type execute /path/to/DocuHaim.app
```

## Windows setup

1. Obtain an Authenticode code-signing certificate (PFX).
2. Encode:

```bash
# Git Bash / WSL
base64 -w0 certificate.pfx > certificate.b64
```

3. Store as `WINDOWS_CERTIFICATE` and `WINDOWS_CERTIFICATE_PASSWORD`.

Tauri NSIS signing uses these when present. Confirm the built installer is signed with `signtool verify /pa DocuHaim_*_x64-setup.exe` when available.

## Local unsigned build

```bash
bun install
bun run tauri:build
```

Artifacts appear under `src-tauri/target/release/bundle/` (`dmg/`, `nsis/`).

## Notes

- Web (GitHub Pages) deploy is unchanged (`deploy.yml`).
- Desktop builds use `VITE_ELECTRON=true` / `build:tauri` (HashRouter, no PWA) so the same SPA ships in the shell.
- `.md` / `.markdown` file associations are registered in `src-tauri/tauri.conf.json`. Composite `.enc.md` opens as markdown via the same association on most OSes.
- **Touch ID / Windows Hello unlock** uses `tauri-plugin-biometry` (not WebView WebAuthn). On macOS, keychain-backed storage needs a properly signed app (Developer ID); unsigned local builds may fail to persist biometric secrets.
