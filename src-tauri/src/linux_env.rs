//! Linux WebView / GTK scaling and renderer workarounds.
//!
//! WebKitGTK on HiDPI (especially AppImage forced onto XWayland) often applies
//! compositor scale and GDK/WebKit scale together, so the UI looks far too large.
//! See: tauri-apps/tauri#8602, spacedriveapp/spacedrive#1512.

/// Apply env defaults before GTK / WebKit initialize. Call once at process start.
/// Existing user/env overrides are left untouched.
pub fn apply_linux_webview_env() {
    // DMA-BUF path has reported incorrect / blown-up page zoom on HiDPI.
    set_default("WEBKIT_DISABLE_DMABUF_RENDERER", "1");

    // AppImage AppRun forces GDK_BACKEND=x11 (Tauri crash workaround). On a Wayland
    // session that means XWayland, where the compositor already scales the window —
    // keep GDK at 1x unless the user set scale explicitly.
    let on_wayland = std::env::var_os("WAYLAND_DISPLAY").is_some();
    let forced_x11 = std::env::var("GDK_BACKEND")
        .unwrap_or_default()
        .split(',')
        .any(|b| b.trim() == "x11");
    if on_wayland && forced_x11 {
        set_default("GDK_SCALE", "1");
        set_default("GDK_DPI_SCALE", "1");
    }
}

fn set_default(key: &str, value: &str) {
    if std::env::var_os(key).is_none() {
        // SAFETY: called before GTK/WebKit init; single-threaded startup.
        unsafe { std::env::set_var(key, value) };
    }
}
