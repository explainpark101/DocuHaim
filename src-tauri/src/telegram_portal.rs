//! Phone confirmation against my.telegram.org, then read or create this number's API application.
//! Credentials are returned once to the WebView so GramJS can sign in. Never log them.

use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use std::time::{SystemTime, UNIX_EPOCH};

const ORIGIN: &str = "https://my.telegram.org";
const CREATE_REJECTED: &str =
    "Telegram이 이 번호의 연결 정보 생성을 거절했습니다. 잠시 후 다시 시도하세요.";

#[derive(Clone)]
struct PendingPortal {
    phone: String,
    random_hash: String,
    platform: String,
    cookie: String,
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
        .redirect(reqwest::redirect::Policy::none())
        .user_agent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        )
        .build()
        .map_err(|err| err.to_string())
}

fn stel_cookie_header(response: &reqwest::Response) -> String {
    merge_stel_cookies("", response)
}

fn merge_stel_cookies(existing: &str, response: &reqwest::Response) -> String {
    let mut pairs: Vec<(String, String)> = split_cookie_pairs(existing);
    for value in response.headers().get_all(reqwest::header::SET_COOKIE) {
        let Ok(raw) = value.to_str() else {
            continue;
        };
        let Some(pair) = raw.split(';').next() else {
            continue;
        };
        let Some((name, cookie_value)) = pair.trim().split_once('=') else {
            continue;
        };
        if !name.starts_with("stel_") {
            continue;
        }
        if let Some(slot) = pairs.iter_mut().find(|(key, _)| key == name) {
            slot.1 = cookie_value.to_string();
        } else {
            pairs.push((name.to_string(), cookie_value.to_string()));
        }
    }
    if !pairs.iter().any(|(name, _)| name == "stel_ln") {
        pairs.push(("stel_ln".into(), "en".into()));
    }
    pairs
        .into_iter()
        .map(|(name, value)| format!("{name}={value}"))
        .collect::<Vec<_>>()
        .join("; ")
}

fn split_cookie_pairs(cookie: &str) -> Vec<(String, String)> {
    cookie
        .split(';')
        .filter_map(|part| {
            let (name, value) = part.trim().split_once('=')?;
            if name.starts_with("stel_") {
                Some((name.to_string(), value.to_string()))
            } else {
                None
            }
        })
        .collect()
}

fn portal_error(body: &str) -> Option<String> {
    let text = body.trim().trim_start_matches('\u{feff}');
    // The apps page script mentions alert('ERROR') even after a successful create.
    // Only the short AJAX body is a rejection.
    if text.len() > 400 {
        return None;
    }
    if text.contains("too many tries") {
        return Some("요청이 많습니다. 잠시 후 다시 시도하세요.".into());
    }
    if text.contains("Invalid confirmation code") {
        return Some("확인 코드가 올바르지 않습니다.".into());
    }
    if text == "ERROR"
        || text.contains("alert('ERROR")
        || text.contains("alert(\"ERROR")
        || text.contains(">ERROR<")
    {
        return Some(CREATE_REJECTED.into());
    }
    None
}

fn between<'a>(html: &'a str, start: &str, end: &str) -> Option<&'a str> {
    let index = html.find(start)?;
    let rest = &html[index + start.len()..];
    let end_at = rest.find(end)?;
    Some(rest[..end_at].trim())
}

fn strip_tags(raw: &str) -> String {
    let mut out = String::new();
    let mut inside = false;
    for ch in raw.chars() {
        if ch == '<' {
            inside = true;
            continue;
        }
        if ch == '>' {
            inside = false;
            continue;
        }
        if !inside {
            out.push(ch);
        }
    }
    out
}

fn parse_credentials(html: &str) -> Option<(i32, String)> {
    parse_credentials_from_spans(html).or_else(|| parse_credentials_from_labels(html))
}

fn parse_credentials_from_spans(html: &str) -> Option<(i32, String)> {
    let mut api_id = None;
    let mut api_hash = None;
    let mut rest = html;
    while let Some(index) = rest.find("uneditable-input") {
        let after = &rest[index..];
        let Some(span_end) = after.find("</span>") else {
            break;
        };
        let text = strip_tags(&after[..span_end]);
        let text = text.split_whitespace().collect::<String>();
        if api_id.is_none() && !text.is_empty() && text.chars().all(|ch| ch.is_ascii_digit()) {
            api_id = text.parse().ok();
        }
        if api_hash.is_none() && is_api_hash(&text) {
            api_hash = Some(text);
        }
        rest = &after[span_end + "</span>".len()..];
    }
    Some((api_id?, api_hash?))
}

fn parse_credentials_from_labels(html: &str) -> Option<(i32, String)> {
    let id_window = label_window(html, &["for=\"app_id\"", "for='app_id'", "App api_id"])?;
    let api_id = first_number(id_window)?;
    let hash_window = label_window(html, &["for=\"app_hash\"", "for='app_hash'", "App api_hash"])?;
    let api_hash = first_api_hash(hash_window)?;
    Some((api_id, api_hash))
}

fn label_window<'a>(html: &'a str, markers: &[&str]) -> Option<&'a str> {
    let index = markers.iter().find_map(|marker| html.find(marker))?;
    Some(prefix_at_char_boundary(&html[index..], 500))
}

fn prefix_at_char_boundary(text: &str, max_bytes: usize) -> &str {
    if text.len() <= max_bytes {
        return text;
    }
    let mut end = max_bytes;
    while end > 0 && !text.is_char_boundary(end) {
        end -= 1;
    }
    &text[..end]
}

fn first_number(window: &str) -> Option<i32> {
    if let Some(strong) = between(window, "<strong>", "</strong>") {
        let digits: String = strong.chars().filter(|ch| ch.is_ascii_digit()).collect();
        if digits.len() >= 3 {
            return digits.parse().ok();
        }
    }
    let text_start = window.find('>').map(|index| index + 1).unwrap_or(0);
    let mut digits = String::new();
    let mut seen = false;
    for ch in strip_tags(&window[text_start..]).chars() {
        if ch.is_ascii_digit() {
            digits.push(ch);
            seen = true;
        } else if seen {
            break;
        }
    }
    if digits.len() < 3 {
        return None;
    }
    digits.parse().ok()
}

fn first_api_hash(window: &str) -> Option<String> {
    let flat = strip_tags(window);
    let bytes = flat.as_bytes();
    if bytes.len() < 32 {
        return None;
    }
    let mut index = 0;
    while index + 32 <= bytes.len() {
        let next = index + 32;
        let bounded = (index == 0 || !bytes[index - 1].is_ascii_hexdigit())
            && (next == bytes.len() || !bytes[next].is_ascii_hexdigit());
        if bounded && flat.is_char_boundary(index) && flat.is_char_boundary(next) {
            let slice = &flat[index..next];
            if is_api_hash(slice) {
                return Some(slice.to_string());
            }
        }
        index += 1;
    }
    None
}

fn is_api_hash(value: &str) -> bool {
    value.len() == 32 && value.chars().all(|ch| ch.is_ascii_hexdigit())
}

fn parse_form_hash(html: &str) -> Option<String> {
    let mut search = html;
    while let Some(index) = search.find("name=\"hash\"").or_else(|| search.find("name='hash'")) {
        let tag_start = search[..index].rfind('<').unwrap_or(0);
        let after = &search[index..];
        let tag_end = after.find('>').map(|end| index + end).unwrap_or(search.len());
        let tag = &search[tag_start..tag_end];
        if let Some(value) = between(tag, "value=\"", "\"").or_else(|| between(tag, "value='", "'")) {
            if !value.is_empty() {
                return Some(value.to_string());
            }
        }
        let next = index + "name=\"hash\"".len();
        if next >= search.len() {
            break;
        }
        search = &search[next..];
    }
    None
}

fn platform_or_default(platform: &str) -> String {
    match platform {
        "android" | "ios" | "desktop" | "web" | "other" => platform.to_string(),
        _ => "desktop".into(),
    }
}

fn app_shortname(phone: &str) -> String {
    let digits: String = phone.chars().filter(|ch| ch.is_ascii_digit()).collect();
    let tail = if digits.len() > 12 {
        &digits[digits.len() - 12..]
    } else {
        digits.as_str()
    };
    let millis = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|duration| duration.subsec_millis())
        .unwrap_or(0);
    let mut name: String = format!("dh{tail}{millis:03}")
        .chars()
        .filter(|ch| ch.is_ascii_alphanumeric())
        .take(32)
        .collect();
    if name.len() < 5 {
        name = format!("dh{millis:03}");
    }
    name
}

fn same_origin_url(location: &str) -> Option<String> {
    if location.starts_with('/') && !location.starts_with("//") {
        return Some(format!("{ORIGIN}{location}"));
    }
    if location.starts_with(ORIGIN) {
        return Some(location.to_string());
    }
    None
}

#[tauri::command]
pub async fn telegram_portal_send_code(phone: String, platform: String) -> Result<(), String> {
    let phone = normalize_phone(&phone)?;
    let client = http_client()?;
    let response = client
        .post(format!("{ORIGIN}/auth/send_password"))
        .header("Accept", "application/json, text/javascript, */*; q=0.01")
        .header("X-Requested-With", "XMLHttpRequest")
        .header("Origin", ORIGIN)
        .header("Referer", format!("{ORIGIN}/auth?to=apps"))
        .form(&[("phone", phone.as_str())])
        .send()
        .await
        .map_err(|_| "Telegram 서버에 연결하지 못했습니다.".to_string())?;
    let cookie = stel_cookie_header(&response);
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
        cookie,
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
        .header("Accept", "application/json, text/javascript, */*; q=0.01")
        .header("X-Requested-With", "XMLHttpRequest")
        .header("Origin", ORIGIN)
        .header("Referer", format!("{ORIGIN}/auth?to=apps"))
        .header(reqwest::header::COOKIE, pending.cookie.as_str())
        .form(&[
            ("phone", pending.phone.as_str()),
            ("random_hash", pending.random_hash.as_str()),
            ("password", code.as_str()),
            ("remember", "1"),
        ])
        .send()
        .await
        .map_err(|_| "Telegram 서버에 연결하지 못했습니다.".to_string())?;
    let status = response.status();
    let cookie = merge_stel_cookies(&pending.cookie, &response);
    let body = response
        .text()
        .await
        .map_err(|_| "Telegram 서버 응답을 읽지 못했습니다.".to_string())?;
    if let Some(message) = portal_error(&body) {
        return Err(message);
    }
    let confirmed = body.trim().trim_start_matches('\u{feff}') == "true" || status.is_redirection();
    if !confirmed || !cookie.contains("stel_token=") {
        return Err("Telegram 서버가 번호를 확인하지 못했습니다.".into());
    }
    let (api_id, api_hash) = match load_or_create_app(&client, &cookie, &pending.platform, &pending.phone).await {
        Ok(creds) => creds,
        Err(message) => {
            // The confirmation code is already spent. Drop it so the next attempt asks for a new one.
            if let Ok(mut guard) = PENDING.lock() {
                *guard = None;
            }
            return Err(message);
        }
    };
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
    phone: &str,
) -> Result<(i32, String), String> {
    let html = fetch_apps(client, cookie).await?;
    if let Some(creds) = parse_credentials(&html) {
        return Ok(creds);
    }
    let form_hash = parse_form_hash(&html).ok_or_else(|| {
        "Telegram 서버에서 이 번호의 연결 정보를 찾지 못했습니다.".to_string()
    })?;
    let (created, cookie) = create_app(client, cookie, platform, phone, &form_hash).await?;
    if let Some(creds) = parse_credentials(&created) {
        return Ok(creds);
    }
    let html = fetch_apps(client, &cookie).await?;
    if let Some(creds) = parse_credentials(&html) {
        return Ok(creds);
    }
    if parse_form_hash(&html).is_some() {
        return Err(CREATE_REJECTED.into());
    }
    Err("번호는 확인됐지만 이 기기에 저장할 연결 정보를 받지 못했습니다.".into())
}

async fn create_app(
    client: &reqwest::Client,
    cookie: &str,
    platform: &str,
    phone: &str,
    form_hash: &str,
) -> Result<(String, String), String> {
    let shortname = app_shortname(phone);
    let response = client
        .post(format!("{ORIGIN}/apps/create"))
        .header("Accept", "*/*")
        .header("X-Requested-With", "XMLHttpRequest")
        .header("Origin", ORIGIN)
        .header("Referer", format!("{ORIGIN}/apps"))
        .header(reqwest::header::COOKIE, cookie)
        .form(&[
            ("hash", form_hash),
            ("app_title", "DocuHaim"),
            ("app_shortname", shortname.as_str()),
            ("app_url", "https://telegram.org"),
            ("app_platform", platform),
            ("app_desc", "DocuHaim"),
        ])
        .send()
        .await
        .map_err(|_| "Telegram 서버에 연결 정보를 저장하지 못했습니다.".to_string())?;
    let status = response.status();
    let location = response
        .headers()
        .get(reqwest::header::LOCATION)
        .and_then(|value| value.to_str().ok())
        .map(str::to_string);
    let cookie = merge_stel_cookies(cookie, &response);
    let body = response
        .text()
        .await
        .map_err(|_| "Telegram 서버 응답을 읽지 못했습니다.".to_string())?;
    if let Some(message) = portal_error(&body) {
        return Err(message);
    }
    if status.is_redirection() {
        if let Some(url) = location.as_deref().and_then(same_origin_url) {
            let page = fetch_text(client, &url, &cookie).await?;
            return Ok((page, cookie));
        }
    }
    Ok((body, cookie))
}

async fn fetch_apps(client: &reqwest::Client, cookie: &str) -> Result<String, String> {
    fetch_text(client, &format!("{ORIGIN}/apps"), cookie).await
}

async fn fetch_text(client: &reqwest::Client, url: &str, cookie: &str) -> Result<String, String> {
    let mut current = url.to_string();
    let mut cookie = cookie.to_string();
    for _ in 0..3 {
        let response = client
            .get(&current)
            .header(reqwest::header::COOKIE, cookie.as_str())
            .header("Referer", format!("{ORIGIN}/auth?to=apps"))
            .send()
            .await
            .map_err(|_| "Telegram 서버에 연결하지 못했습니다.".to_string())?;
        if response.status().is_redirection() {
            cookie = merge_stel_cookies(&cookie, &response);
            let location = response
                .headers()
                .get(reqwest::header::LOCATION)
                .and_then(|value| value.to_str().ok())
                .and_then(same_origin_url);
            current = location.ok_or_else(|| "Telegram 서버에서 이 번호의 연결 정보를 찾지 못했습니다.".to_string())?;
            continue;
        }
        return response
            .text()
            .await
            .map_err(|_| "Telegram 서버 응답을 읽지 못했습니다.".to_string());
    }
    Err("Telegram 서버에서 이 번호의 연결 정보를 찾지 못했습니다.".into())
}

#[cfg(test)]
mod tests {
    use super::{app_shortname, parse_credentials, parse_form_hash, portal_error};

    #[test]
    fn parses_existing_application() {
        let html = r#"<label for="app_id"></label><span class="uneditable-input" onclick="this.select();"><strong>123456</strong></span><label for="app_hash"></label><span class="uneditable-input" onclick="this.select();">0123456789abcdef0123456789abcdef</span>"#;
        let (id, hash) = parse_credentials(html).expect("credentials");
        assert_eq!(id, 123456);
        assert_eq!(hash, "0123456789abcdef0123456789abcdef");
    }

    #[test]
    fn parses_configuration_spans_without_quote_after_class() {
        let html = r#"<span class="uneditable-input form-control" onclick="this.select();"><strong>12345678</strong></span><span class="uneditable-input form-control">abcdef0123456789abcdef0123456789</span>"#;
        let (id, hash) = parse_credentials(html).expect("credentials");
        assert_eq!(id, 12345678);
        assert_eq!(hash, "abcdef0123456789abcdef0123456789");
    }

    #[test]
    fn parses_korean_labels() {
        let html = "<label for=\"app_id\">앱 api_id:</label><strong>445566</strong><label for=\"app_hash\">앱 api_hash:</label><span>fedcba9876543210fedcba9876543210</span>";
        let (id, hash) = parse_credentials(html).expect("credentials");
        assert_eq!(id, 445566);
        assert_eq!(hash, "fedcba9876543210fedcba9876543210");
    }

    #[test]
    fn utf8_window_cut_does_not_panic() {
        let mut html = String::from("<label for=\"app_id\"><strong>445566</strong></label><label for=\"app_hash\">");
        while html.len() < 520 {
            html.push('한');
        }
        html.push_str("fedcba9876543210fedcba9876543210</label>");
        let _ = parse_credentials(&html);
    }

    #[test]
    fn parses_label_text_when_spans_use_another_class() {
        let html = r#"<label for="app_id" class="col-md-4">App api_id:</label><div class="col-md-8"><span><strong>445566</strong></span></div><label for="app_hash" class="col-md-4">App api_hash:</label><div><span>fedcba9876543210fedcba9876543210</span></div>"#;
        let (id, hash) = parse_credentials(html).expect("credentials");
        assert_eq!(id, 445566);
        assert_eq!(hash, "fedcba9876543210fedcba9876543210");
    }

    #[test]
    fn parses_create_form_hash() {
        let html = r#"<input type="hidden" name="hash" value="abc123def"/>"#;
        assert_eq!(parse_form_hash(html).as_deref(), Some("abc123def"));
    }

    #[test]
    fn parses_hash_when_value_comes_before_name() {
        let html = r#"<input type="hidden" value="from-value" name="hash">"#;
        assert_eq!(parse_form_hash(html).as_deref(), Some("from-value"));
    }

    #[test]
    fn treats_html_error_alert_as_rejection() {
        assert!(portal_error("ERROR").is_some());
        assert!(portal_error("<script>alert('ERROR');</script>").is_some());
        assert!(portal_error("<div class=\"alert\">ERROR</div>").is_some());
        assert!(portal_error("true").is_none());
        let mut page = String::from("<script>if (result == 'ERROR') alert('ERROR');</script><label for=\"app_id\"><strong>123456</strong></label><span class=\"uneditable-input\">0123456789abcdef0123456789abcdef</span>");
        while page.len() < 500 {
            page.push(' ');
        }
        assert!(portal_error(&page).is_none());
        let (id, hash) = parse_credentials(&page).expect("credentials");
        assert_eq!(id, 123456);
        assert_eq!(hash, "0123456789abcdef0123456789abcdef");
    }

    #[test]
    fn does_not_take_api_hash_from_a_longer_key() {
        let html = "<label for=\"app_id\"><strong>123456</strong></label><label for=\"app_hash\">abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789 0123456789abcdef0123456789abcdef</label>";
        let (id, hash) = parse_credentials(html).expect("credentials");
        assert_eq!(id, 123456);
        assert_eq!(hash, "0123456789abcdef0123456789abcdef");
    }

    #[test]
    fn shortname_is_alphanumeric_and_bounded() {
        let name = app_shortname("+821012345678");
        assert!(name.len() >= 5 && name.len() <= 32);
        assert!(name.chars().all(|ch| ch.is_ascii_alphanumeric()));
        assert!(name.starts_with("dh"));
    }
}
