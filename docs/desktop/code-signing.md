# Desktop code signing

DocuHaim desktop releases are built by [`.github/workflows/release-tauri.yml`](../../.github/workflows/release-tauri.yml).

**If signing secrets are missing, the workflow still uploads unsigned DMG / NSIS artifacts.** Gatekeeper (macOS) and SmartScreen (Windows) will warn users until secrets are configured.

## Trigger

GitHub → Actions → **Release Tauri** → Run workflow → enter semver (`1.2.3`).

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

Empty secrets are ignored by the runner environment; Tauri simply skips signing.

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
