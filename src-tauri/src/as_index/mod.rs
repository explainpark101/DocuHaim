//! Native Advanced Search Lucivy index (Tauri).
//! Replaces lucivy-wasm when SharedArrayBuffer / COOP+COEP is unavailable.

pub mod commands;
mod search;
mod session;

pub use commands::AsIndexState;
