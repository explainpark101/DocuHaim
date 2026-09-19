//! Native desktop menu (File / Window) with vault open actions, print,
//! LLM assist toggle, and window reload.

use tauri::{
    menu::{Menu, MenuEvent, MenuItem, MenuItemKind, PredefinedMenuItem, Submenu},
    App, Emitter, Manager, Runtime, State,
};

pub const OPEN_S3_HAIM_ID: &str = "open-s3-haim";
pub const OPEN_WEBDAV_HAIM_ID: &str = "open-webdav-haim";
pub const OPEN_LOCAL_HAIM_ID: &str = "open-local-haim";
pub const OPEN_LOCAL_HAIM_FOLDER_ID: &str = "open-local-haim-folder";
pub const OPEN_PRINT_ID: &str = "open-print";
pub const TOGGLE_LLM_ASSIST_ID: &str = "toggle-llm-assist";
pub const REFRESH_WINDOW_ID: &str = "refresh-window";

pub const DESKTOP_MENU_ACTION_EVENT: &str = "desktop-menu-action";

pub struct DesktopMenuState {
    pub print_item: MenuItem<tauri::Wry>,
    pub llm_assist_item: MenuItem<tauri::Wry>,
}

fn find_submenu_by_text<R: Runtime>(menu: &Menu<R>, title: &str) -> Option<Submenu<R>> {
    let items = menu.items().unwrap_or_default();
    for item in items {
        if let MenuItemKind::Submenu(sub) = item {
            if sub.text().ok().as_deref() == Some(title) {
                return Some(sub);
            }
        }
    }
    None
}

fn reload_focused_or_main(app: &tauri::AppHandle) {
    let target = app
        .webview_windows()
        .into_values()
        .find(|w| w.is_focused().unwrap_or(false))
        .or_else(|| app.get_webview_window("main"));
    if let Some(window) = target {
        let _ = window.reload();
    }
}

pub fn install_desktop_menu(app: &App) -> Result<(), Box<dyn std::error::Error>> {
    let handle = app.handle();

    let open_s3 = MenuItem::with_id(handle, OPEN_S3_HAIM_ID, "S3 Haim 열기", true, None::<&str>)?;
    let open_webdav = MenuItem::with_id(
        handle,
        OPEN_WEBDAV_HAIM_ID,
        "WebDAV Haim 열기",
        true,
        None::<&str>,
    )?;
    let open_local = MenuItem::with_id(
        handle,
        OPEN_LOCAL_HAIM_ID,
        "Local Haim 열기",
        true,
        None::<&str>,
    )?;
    let open_local_folder = MenuItem::with_id(
        handle,
        OPEN_LOCAL_HAIM_FOLDER_ID,
        "폴더에서 Local Haim 열기",
        true,
        None::<&str>,
    )?;
    let open_print = MenuItem::with_id(handle, OPEN_PRINT_ID, "인쇄", false, None::<&str>)?;
    let toggle_llm = MenuItem::with_id(
        handle,
        TOGGLE_LLM_ASSIST_ID,
        "AI 도우미 열기",
        true,
        None::<&str>,
    )?;
    let refresh_window = MenuItem::with_id(
        handle,
        REFRESH_WINDOW_ID,
        "창 새로고침",
        true,
        Some("CmdOrCtrl+R"),
    )?;
    let sep_doc = PredefinedMenuItem::separator(handle)?;
    let sep_std = PredefinedMenuItem::separator(handle)?;
    let sep_window = PredefinedMenuItem::separator(handle)?;

    let menu = Menu::default(handle)?;
    if let Some(file) = find_submenu_by_text(&menu, "File") {
        file.insert_items(
            &[
                &open_s3,
                &open_webdav,
                &open_local,
                &open_local_folder,
                &sep_doc,
                &open_print,
                &toggle_llm,
                &sep_std,
            ],
            0,
        )?;
    }
    if let Some(window_menu) = find_submenu_by_text(&menu, "Window") {
        window_menu.insert_items(&[&refresh_window, &sep_window], 0)?;
    }

    app.manage(DesktopMenuState {
        print_item: open_print,
        llm_assist_item: toggle_llm,
    });

    #[cfg(target_os = "macos")]
    {
        app.set_menu(menu)?;
    }
    #[cfg(not(target_os = "macos"))]
    if let Some(window) = app.get_webview_window("main") {
        window.set_menu(menu)?;
    }

    Ok(())
}

pub fn on_desktop_menu_event(app: &tauri::AppHandle, event: MenuEvent) {
    let id = event.id().as_ref();
    if id == REFRESH_WINDOW_ID {
        reload_focused_or_main(app);
        return;
    }
    if matches!(
        id,
        OPEN_S3_HAIM_ID
            | OPEN_WEBDAV_HAIM_ID
            | OPEN_LOCAL_HAIM_ID
            | OPEN_LOCAL_HAIM_FOLDER_ID
            | OPEN_PRINT_ID
            | TOGGLE_LLM_ASSIST_ID
    ) {
        let _ = app.emit(DESKTOP_MENU_ACTION_EVENT, id);
    }
}

#[tauri::command]
pub fn sync_desktop_menu_ui(
    state: State<'_, DesktopMenuState>,
    print_enabled: bool,
    llm_assist_open: bool,
) -> Result<(), String> {
    state
        .print_item
        .set_enabled(print_enabled)
        .map_err(|e| e.to_string())?;
    let label = if llm_assist_open {
        "AI 도우미 닫기"
    } else {
        "AI 도우미 열기"
    };
    state
        .llm_assist_item
        .set_text(label)
        .map_err(|e| e.to_string())?;
    Ok(())
}
