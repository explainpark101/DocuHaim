# DocuHaim Android sideload keystore

`docuhaim-sideload.p12` is a **stable debug/sideload signing key** used by:

- GitHub Actions Android APK builds
- Local `bun run tauri:android:build:debug`

## Why it is committed

Android rejects in-app APK updates when the new APK is signed with a **different certificate** than the installed app (`INSTALL_FAILED_UPDATE_INCOMPATIBLE`, often shown as a package-name conflict).

Default Gradle debug signing uses each machine’s ephemeral `~/.android/debug.keystore`. CI runners create a **new** key every job, so GitHub Release APKs could not update each other (or local installs).

This PKCS12 is shared on purpose so sideload updates keep working. It is **not** a Play Store upload key.

| Field | Value |
|-------|--------|
| Alias | `docuhaim` |
| Store / key password | `docuhaim-sideload` |
| Type | PKCS12 |

## Override (optional release key)

Create `src-tauri/gen/android/keystore.properties` (gitignored):

```properties
password=...
keyAlias=...
storeFile=/absolute/path/to/your.jks
```

## One-time migration

Devices that already installed an APK signed with an old random debug key must **uninstall DocuHaim once**, then install a build signed with this keystore. After that, in-app updates should succeed.
