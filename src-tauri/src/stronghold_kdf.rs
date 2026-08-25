use std::path::Path;

/// Stronghold requires a 32-byte key derived from the vault password.
const HASH_LEN: usize = 32;
const SALT_LEN: usize = 32;

/// Argon2 password hash compatible with `tauri_plugin_stronghold::kdf::KeyDerivation::argon2`,
/// but never panics — failures return a zero hash so Stronghold IPC can surface an error to JS.
pub fn hash_password(password: &str, salt_path: &Path) -> Vec<u8> {
    if let Some(parent) = salt_path.parent() {
        if let Err(err) = std::fs::create_dir_all(parent) {
            eprintln!("[stronghold] failed to create salt parent dir: {err}");
            return zero_hash();
        }
    }

    let salt = match load_or_create_salt(salt_path) {
        Ok(salt) => salt,
        Err(err) => {
            eprintln!("[stronghold] failed to load or create salt: {err}");
            return zero_hash();
        }
    };

    match argon2::hash_raw(password.as_bytes(), &salt, &argon2::Config::default()) {
        Ok(hash) => hash,
        Err(err) => {
            eprintln!("[stronghold] argon2 hash failed: {err}");
            zero_hash()
        }
    }
}

fn zero_hash() -> Vec<u8> {
    vec![0u8; HASH_LEN]
}

fn load_or_create_salt(salt_path: &Path) -> std::io::Result<Vec<u8>> {
    if salt_path.is_file() {
        let data = std::fs::read(salt_path)?;
        if data.len() == SALT_LEN {
            return Ok(data);
        }

        eprintln!(
            "[stronghold] salt file length {} != {}, using padded/truncated salt",
            data.len(),
            SALT_LEN
        );
        let mut salt = vec![0u8; SALT_LEN];
        let copy_len = data.len().min(SALT_LEN);
        salt[..copy_len].copy_from_slice(&data[..copy_len]);
        return Ok(salt);
    }

    let mut salt = vec![0u8; SALT_LEN];
    getrandom::fill(&mut salt).map_err(std::io::Error::other)?;
    std::fs::write(salt_path, &salt)?;
    Ok(salt)
}
