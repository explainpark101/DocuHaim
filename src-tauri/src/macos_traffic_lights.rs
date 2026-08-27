//! macOS traffic-light (window button) repositioning for packaged builds.
//!
//! `trafficLightPosition` in `tauri.conf.json` is applied at window creation only.
//! AppKit can reset button layout after webview/content layout passes, which leaves
//! the visible chrome and click targets misaligned in release `.app` bundles.

#![cfg(target_os = "macos")]
#![allow(deprecated)]
#![allow(unexpected_cfgs)]

use cocoa::appkit::{NSWindow, NSWindowButton};
use cocoa::base::{id, nil};
use cocoa::foundation::NSRect;
use objc::{msg_send, sel, sel_impl};
use std::time::Duration;
use tauri::{Runtime, WebviewWindow, WindowEvent};

/// Matches `trafficLightPosition` in `tauri.conf.json`.
pub const TRAFFIC_LIGHT_X: f64 = 12.0;
pub const TRAFFIC_LIGHT_Y: f64 = 18.0;

pub fn position<R: Runtime>(window: &WebviewWindow<R>) {
    let ns_window_ptr = match window.ns_window() {
        Ok(ptr) => ptr as id,
        Err(_) => return,
    };
    if ns_window_ptr == nil {
        return;
    }

    unsafe {
        let close: id = ns_window_ptr.standardWindowButton_(NSWindowButton::NSWindowCloseButton);
        let mini: id =
            ns_window_ptr.standardWindowButton_(NSWindowButton::NSWindowMiniaturizeButton);
        let zoom: id = ns_window_ptr.standardWindowButton_(NSWindowButton::NSWindowZoomButton);
        if close == nil || mini == nil || zoom == nil {
            return;
        }

        let title_bar: id = msg_send![close, superview];
        if title_bar == nil {
            return;
        }
        let title_bar_container: id = msg_send![title_bar, superview];
        if title_bar_container == nil {
            return;
        }

        let close_frame: NSRect = msg_send![close, frame];
        let button_height = close_frame.size.height;
        if button_height <= 0.0 {
            return;
        }

        let window_frame: NSRect = msg_send![ns_window_ptr, frame];
        let new_title_bar_height = button_height + TRAFFIC_LIGHT_Y;
        let mut container_frame: NSRect = msg_send![title_bar_container, frame];
        container_frame.size.height = new_title_bar_height;
        container_frame.origin.y = window_frame.size.height - new_title_bar_height;
        let _: () = msg_send![title_bar_container, setFrame: container_frame];

        let mini_frame: NSRect = msg_send![mini, frame];
        let space_between = mini_frame.origin.x - close_frame.origin.x;

        for (i, btn) in [close, mini, zoom].iter().enumerate() {
            let mut rect: NSRect = msg_send![*btn, frame];
            rect.origin.x = TRAFFIC_LIGHT_X + (i as f64) * space_between;
            let _: () = msg_send![*btn, setFrameOrigin: rect.origin];
        }
    }
}

fn position_on_main_thread<R: Runtime + 'static>(window: &WebviewWindow<R>) {
    let w = window.clone();
    let _ = window.run_on_main_thread(move || position(&w));
}

pub fn reposition<R: Runtime + 'static>(window: &WebviewWindow<R>) {
    position_on_main_thread(window);
}

pub fn install<R: Runtime + 'static>(window: &WebviewWindow<R>) {
    position_on_main_thread(window);

    let startup_window = window.clone();
    std::thread::spawn(move || {
        for delay_ms in [150, 400, 900] {
            std::thread::sleep(Duration::from_millis(delay_ms));
            position_on_main_thread(&startup_window);
        }
    });

    let w = window.clone();
    window.on_window_event(move |event| match event {
        WindowEvent::Resized(_)
        | WindowEvent::Focused(_)
        | WindowEvent::ThemeChanged(_)
        | WindowEvent::ScaleFactorChanged { .. } => {
            position_on_main_thread(&w);
        }
        _ => {}
    });
}
