//! Phone confirmation against my.telegram.org, then read or create this number's API application.
//! Credentials are returned once to the WebView so GramJS can sign in. Never log them.

use serde::{Deserialize, Serialize};
use std::sync::Mutex;

const ORIGIN: &str = "https://my.telegram.org";

#[derive(Clone)]
struct PendingPortal {
    phone: String,
    random_hash: String,
    platform: String,
}

static PENDING: Mutex<Option<PendingPortal>> = Mutex::new(None);

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct TelegramPortalCreds {
    pub api_id: i32,
    pub api_hash: String,
    pub phone: String,
}

#[derive(Deserialize)]
struct SendPasswordBody {
    random_hash: Option<String>,
}

fn normalize_phone(raw: &str) -> Result<String, String> {
    let compact: String = raw.chars().filter(|ch| !ch.is_whitespace() && *ch != '-').collect();
    if !compact.starts_with('+') || compact.len() < 8 || !compact[1..].chars().all(|ch| ch.is_ascii_digit()) {
        return Err("전화번호는 국가 코드를 포함해 입력하세요. 예: +821012345678".into());
    }
    Ok(compact)
}

fn http_client() -> Result<reqwest::Client, String> {
    reqwest::Client::builder()
        .user_agent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        )
        .build()
        .map_err(|err| err.to_string())
}

fn cookie_header(response: &reqwest::Response) -> String {
    response
        .headers()
        .get_all(reqwest::header::SET_COOKIE)
        .iter()
        .filter_map(|value| value.to_str().ok())
        .filter_map(|raw| raw.split(';').next())
        .filter(|part| part.contains("stel_"))
        .map(str::trim)
        .collect::<Vec<_>>()
        .join("; ")
}

fn portal_error(body: &str) -> Option<String> {
    let text = body.trim();
    if text.contains("too many tries") {
        return Some("요청이 많습니다. 잠시 후 다시 시도하세요.".into());
    }
    if text.contains("Invalid confirmation code") {
        return Some("확인 코드가 올바르지 않습니다.".into());
    }
    None
}

fn between<'a>(html: &'a str, start: &str, end: &str) -> Option<&'a str> {
    let index = html.find(start)?;
    let rest = &html[index + start.len()..];
    let end_at = rest.find(end)?;
    Some(rest[..end_at].trim())
}

fn parse_credentials(html: &str) -> Option<(i32, String)> {
    let id_at = html.find("for=\"app_id\"")?;
    let api_id: i32 = between(&html[id_at..], "<strong>", "</strong>")?.parse().ok()?;
    let hash_at = html.find("for=\"app_hash\"")?;
    let hash_slice = &html[hash_at..];
    let span = between(hash_slice, "uneditable-input\"", "</span>")?;
    let hash = span.rsplit('>').next().unwrap_or(span).trim();
    if hash.len() < 16 || !hash.chars().all(|ch| ch.is_ascii_hexdigit()) {
        return None;
    }
    Some((api_id, hash.to_string()))
}

fn parse_form_hash(html: &str) -> Option<String> {
    if let Some(value) = between(html, "name=\"hash\" value=\"", "\"") {
        if !value.is_empty() {
            return Some(value.to_string());
        }
    }
    let marker = "name=\"hash\"";
    let index = html.find(marker)?;
    let window = &html[index.saturating_sub(80)..index];
    between(window, "value=\"", "\"").map(str::to_string)
}

fn platform_or_default(platform: &str) -> String {
    match platform {
        "android" | "ios" | "desktop" | "web" => platform.to_string(),
        _ => "desktop".into(),
    }
}

#[tauri::command]
pub async fn telegram_portal_send_code(phone: String, platform: String) -> Result<(), String> {
    let phone = normalize_phone(&phone)?;
    let client = http_client()?;
    let response = client
        .post(format!("{ORIGIN}/auth/send_password"))
        .header("X-Requested-With", "XMLHttpRequest")
        .header("Origin", ORIGIN)
        .header("Referer", format!("{ORIGIN}/auth"))
        .form(&[("phone", phone.as_str())])
        .send()
        .await
        .map_err(|_| "Telegram 서버에 연결하지 못했습니다.".to_string())?;
    let body = response
        .text()
        .await
        .map_err(|_| "Telegram 서버 응답을 읽지 못했습니다.".to_string())?;
    if let Some(message) = portal_error(&body) {
        return Err(message);
    }
    let parsed: SendPasswordBody = serde_json::from_str(&body)
        .map_err(|_| "Telegram 서버가 확인 코드를 보내지 않았습니다.".to_string())?;
    let random_hash = parsed
        .random_hash
        .filter(|value| !value.is_empty())
        .ok_or_else(|| "Telegram 서버가 확인 코드를 보내지 않았습니다.".to_string())?;
    let mut pending = PENDING.lock().map_err(|_| "로그인 상태를 저장하지 못했습니다.".to_string())?;
    *pending = Some(PendingPortal {
        phone,
        random_hash,
        platform: platform_or_default(&platform),
    });
    Ok(())
}

#[tauri::command]
pub async fn telegram_portal_confirm_code(code: String) -> Result<TelegramPortalCreds, String> {
    let code = code.trim().to_string();
    if code.is_empty() {
        return Err("확인 코드를 입력하세요.".into());
    }
    let pending = {
        let guard = PENDING.lock().map_err(|_| "로그인 상태를 읽지 못했습니다.".to_string())?;
        guard.clone().ok_or_else(|| "먼저 휴대폰 번호를 입력하세요.".to_string())?
    };
    let client = http_client()?;
    let response = client
        .post(format!("{ORIGIN}/auth/login"))
        .header("X-Requested-With", "XMLHttpRequest")
        .header("Origin", ORIGIN)
        .header("Referer", format!("{ORIGIN}/auth"))
        .form(&[
            ("phone", pending.phone.as_str()),
            ("random_hash", pending.random_hash.as_str()),
            ("password", code.as_str()),
            ("remember", "1"),
        ])
        .send()
        .await
        .map_err(|_| "Telegram 서버에 연결하지 못했습니다.".to_string())?;
    let cookie = cookie_header(&response);
    let body = response
        .text()
        .await
        .map_err(|_| "Telegram 서버 응답을 읽지 못했습니다.".to_string())?;
    if let Some(message) = portal_error(&body) {
        return Err(message);
    }
    if body.trim() != "true" || cookie.is_empty() {
        return Err("Telegram 서버가 번호를 확인하지 못했습니다.".into());
    }
    let (api_id, api_hash) = load_or_create_app(&client, &cookie, &pending.platform).await?;
    if let Ok(mut guard) = PENDING.lock() {
        *guard = None;
    }
    Ok(TelegramPortalCreds {
        api_id,
        api_hash,
        phone: pending.phone,
    })
}

async fn load_or_create_app(
    client: &reqwest::Client,
    cookie: &str,
    platform: &str,
) -> Result<(i32, String), String> {
    let html = fetch_apps(client, cookie).await?;
    if let Some(creds) = parse_credentials(&html) {
        return Ok(creds);
    }
    let form_hash = parse_form_hash(&html).ok_or_else(|| {
        "Telegram 서버에서 이 번호의 연결 정보를 찾지 못했습니다.".to_string()
    })?;
    let created = client
        .post(format!("{ORIGIN}/apps/create"))
        .header("Origin", ORIGIN)
        .header("Referer", format!("{ORIGIN}/apps"))
        .header(reqwest::header::COOKIE, cookie)
        .form(&[
            ("hash", form_hash.as_str()),
            ("app_title", "DocuHaim"),
            ("app_shortname", "docuhaim"),
            ("app_url", ""),
            ("app_platform", platform),
            ("app_desc", "DocuHaim"),
        ])
        .send()
        .await
        .map_err(|_| "Telegram 서버에 연결 정보를 저장하지 못했습니다.".to_string())?;
    let created_body = created
        .text()
        .await
        .map_err(|_| "Telegram 서버 응답을 읽지 못했습니다.".to_string())?;
    if created_body.trim() == "ERROR" {
        return Err("Telegram이 이 번호의 연결 정보 생성을 거절했습니다. 잠시 후 다시 시도하세요.".into());
    }
    let html = fetch_apps(client, cookie).await?;
    parse_credentials(&html).ok_or_else(|| {
        "번호는 확인됐지만 이 기기에 저장할 연결 정보를 받지 못했습니다.".to_string()
    })
}

async fn fetch_apps(client: &reqwest::Client, cookie: &str) -> Result<String, String> {
    let response = client
        .get(format!("{ORIGIN}/apps"))
        .header(reqwest::header::COOKIE, cookie)
        .header("Referer", format!("{ORIGIN}/auth"))
        .send()
        .await
        .map_err(|_| "Telegram 서버에 연결하지 못했습니다.".to_string())?;
    response
        .text()
        .await
        .map_err(|_| "Telegram 서버 응답을 읽지 못했습니다.".to_string())
}

#[cfg(test)]
mod tests {
    use super::{parse_credentials, parse_form_hash};

    #[test]
    fn parses_existing_application() {
        let html = r#"<label for="app_id"></label><span class="uneditable-input" onclick="this.select();"><strong>123456</strong></span><label for="app_hash"></label><span class="uneditable-input" onclick="this.select();">0123456789abcdef0123456789abcdef</span>"#;
        let (id, hash) = parse_credentials(html).expect("credentials");
        assert_eq!(id, 123456);
        assert_eq!(hash, "0123456789abcdef0123456789abcdef");
    }

    #[test]
    fn parses_create_form_hash() {
        let html = r#"<input type="hidden" name="hash" value="abc123def"/>"#;
        assert_eq!(parse_form_hash(html).as_deref(), Some("abc123def"));
    }
}
