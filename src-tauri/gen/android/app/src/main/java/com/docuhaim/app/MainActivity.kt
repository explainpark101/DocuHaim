package com.docuhaim.app

import android.app.PendingIntent
import android.content.ComponentName
import android.content.Intent
import android.content.pm.PackageInstaller
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.provider.Settings
import android.view.View
import android.webkit.WebSettings
import android.webkit.WebView
import androidx.activity.enableEdgeToEdge
import androidx.core.content.FileProvider
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import java.io.File
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit
import java.util.concurrent.atomic.AtomicReference

class MainActivity : TauriActivity() {
  companion object {
    @JvmStatic
    @Volatile
    var instance: MainActivity? = null
      private set

    /** Set when the activity was launched / resumed via ACTION_SEND(_MULTIPLE). */
    @JvmStatic
    @Volatile
    var lastIntentWasShare: Boolean = false

    @JvmStatic
    @Volatile
    private var pendingShareText: String = ""

    @JvmStatic
    @Volatile
    private var pendingShareTitle: String = ""

    /**
     * Share-sheet target mode from activity-alias component:
     * - sendSelf — ShareToSelfAlias
     * - chooseGroup — ShareToGroupAlias
     * - choose — legacy / unknown (in-app chooser)
     */
    @JvmStatic
    @Volatile
    private var pendingShareMode: String = ""

    /** EXTRA_STREAM URI list joined by newline (URIs do not contain newlines). */
    @JvmStatic
    @Volatile
    private var pendingShareUris: String = ""

    private val mainHandler = Handler(Looper.getMainLooper())

    /** JS listens for this to re-poll take_pending_android_share (warm share). */
    private const val SHARE_PENDING_DOM_EVENT = "tauri-android-share-pending"

    const val ACTION_APK_INSTALL_STATUS = "com.docuhaim.app.APK_INSTALL_STATUS"

    @JvmStatic
    fun takePendingShareText(): String {
      val value = pendingShareText
      pendingShareText = ""
      return value
    }

    @JvmStatic
    fun takePendingShareTitle(): String {
      val value = pendingShareTitle
      pendingShareTitle = ""
      return value
    }

    @JvmStatic
    fun takePendingShareMode(): String {
      val value = pendingShareMode
      pendingShareMode = ""
      return value
    }

    @JvmStatic
    fun takePendingShareUris(): String {
      val value = pendingShareUris
      pendingShareUris = ""
      return value
    }

    @JvmStatic
    fun consumeLastIntentWasShare(): Boolean {
      val value = lastIntentWasShare
      lastIntentWasShare = false
      return value
    }
  }

  /** Populated in onWebViewCreate so warm shares can poke the JS bridge. */
  private var appWebView: WebView? = null

  /**
   * Share-sheet targets are activity-aliases. The real class is still MainActivity,
   * but Activity.mComponent stays the alias, so getLocalClassName() would return
   * ShareToGroupAlias / ShareToSelfAlias. tao stores that name and later
   * Class.forName's it. The alias is not a class, and the process aborts.
   */
  override fun getLocalClassName(): String = "MainActivity"

  override fun onCreate(savedInstanceState: Bundle?) {
    enableEdgeToEdge()
    val incoming = intent
    captureShareIntent(incoming)
    if (shouldDetachShareIntent(incoming)) {
      // Payload is already in the pending* fields. WryActivity.onCreate reads
      // intent.extras (unparcels every extra; SecurityException / BadParcelable
      // on API 34+). tao handle_intent then unwraps ClipData / EXTRA_STREAM and
      // aborts because release panic = abort. Hand Tauri a launcher intent.
      setIntent(sanitizedLauncherIntent(incoming))
    }
    super.onCreate(savedInstanceState)
    instance = this
    // Preference is applied from the web UI after boot (see initAndroidSystemStatusBar).
    // Do not force a mode here so the saved fullscreen / status-bar choice sticks.
    handlePackageInstallerIntent(intent)
  }

  override fun onNewIntent(intent: Intent) {
    val detachShare = shouldDetachShareIntent(intent)
    if (detachShare) captureShareIntent(intent)
    val next = if (detachShare) sanitizedLauncherIntent(intent) else intent
    super.onNewIntent(next)
    setIntent(next)
    if (!detachShare) handlePackageInstallerIntent(intent)
    // Tao will not emit RunEvent::Opened for the sanitized intent.
    if (detachShare) notifyWebSharePending()
  }

  /**
   * Mark share-sheet launches before Tauri/tao processes the Intent so Rust can
   * route Opened URLs to chat share intake instead of markdown file-association.
   * Extras from other apps can throw while unparcelling; never let that kill the activity.
   */
  private fun captureShareIntent(intent: Intent?) {
    if (intent == null) return
    val action = intentActionOrNull(intent) ?: return
    val isShare =
      action == Intent.ACTION_SEND || action == Intent.ACTION_SEND_MULTIPLE
    lastIntentWasShare = isShare
    if (!isShare) return
    try {
      pendingShareText = readShareText(intent)
      pendingShareTitle = readShareTitle(intent)
      pendingShareMode = shareModeFromIntent(intent)
      pendingShareUris = collectShareStreamUris(intent).joinToString("\n")
    } catch (t: Throwable) {
      android.util.Log.e("DocuHaim", "share intent extras unreadable", t)
      if (pendingShareMode.isEmpty()) pendingShareMode = "choose"
    }
  }

  /** True when this launch must not be forwarded into Wry/tao as ACTION_SEND. */
  private fun shouldDetachShareIntent(intent: Intent?): Boolean {
    if (isShareIntent(intent)) return true
    return isShareAliasComponent(intent)
  }

  private fun isShareIntent(intent: Intent?): Boolean {
    val action = intentActionOrNull(intent) ?: return false
    return action == Intent.ACTION_SEND || action == Intent.ACTION_SEND_MULTIPLE
  }

  private fun intentActionOrNull(intent: Intent?): String? {
    if (intent == null) return null
    return try {
      intent.action
    } catch (t: Throwable) {
      android.util.Log.e("DocuHaim", "share intent action unreadable", t)
      null
    }
  }

  private fun isShareAliasComponent(intent: Intent?): Boolean {
    val name = try {
      intent?.component?.className.orEmpty()
    } catch (_: Throwable) {
      ""
    }
    return name.endsWith("ShareToSelfAlias") || name.endsWith("ShareToGroupAlias")
  }

  /**
   * Launcher-shaped intent so tao ignores it (only SEND / SEND_MULTIPLE / VIEW).
   * Clip data and grant flags stay so content:// read permission is not dropped.
   * Extras are omitted: unparcelling them is what crashes startup.
   */
  private fun sanitizedLauncherIntent(source: Intent?): Intent {
    val safe = Intent(Intent.ACTION_MAIN).apply {
      component = ComponentName(this@MainActivity, MainActivity::class.java)
      addCategory(Intent.CATEGORY_LAUNCHER)
    }
    if (source == null) return safe
    try {
      val grant = source.flags and (
        Intent.FLAG_GRANT_READ_URI_PERMISSION or Intent.FLAG_GRANT_WRITE_URI_PERMISSION
      )
      if (grant != 0) safe.addFlags(grant)
    } catch (_: Throwable) {
      // flags can throw if the parcel is corrupt
    }
    try {
      val clip = source.clipData
      if (clip != null) safe.clipData = clip
    } catch (t: Throwable) {
      android.util.Log.w("DocuHaim", "share clipData not copied", t)
    }
    return safe
  }

  private fun readShareText(intent: Intent): String {
    val extra = try {
      intent.getStringExtra(Intent.EXTRA_TEXT).orEmpty()
    } catch (_: Throwable) {
      ""
    }
    if (extra.isNotEmpty()) return extra
    return try {
      val clip = intent.clipData ?: return ""
      val parts = ArrayList<String>()
      for (i in 0 until clip.itemCount) {
        val text = clip.getItemAt(i)?.text?.toString()?.trim().orEmpty()
        if (text.isNotEmpty()) parts.add(text)
      }
      parts.joinToString("\n")
    } catch (_: Throwable) {
      ""
    }
  }

  private fun readShareTitle(intent: Intent): String {
    return try {
      intent.getStringExtra(Intent.EXTRA_SUBJECT).orEmpty().ifEmpty {
        intent.getStringExtra(Intent.EXTRA_TITLE).orEmpty()
      }
    } catch (_: Throwable) {
      ""
    }
  }

  /**
   * Prefer the activity-alias ComponentName; fall back to Intent.selector when
   * an OEM rewrites component to the target MainActivity.
   */
  private fun shareModeFromIntent(intent: Intent): String {
    val fromComponent = shareModeFromComponent(intent.component?.className)
    if (fromComponent != "choose") return fromComponent
    val selector = intent.selector
    if (selector != null) {
      val fromSelector = shareModeFromComponent(selector.component?.className)
      if (fromSelector != "choose") return fromSelector
    }
    // Alias meta-data survives when the ComponentName is still the alias.
    return shareModeFromAliasMeta(intent.component) ?: "choose"
  }

  private fun shareModeFromAliasMeta(component: android.content.ComponentName?): String? {
    if (component == null) return null
    return try {
      val info =
        packageManager.getActivityInfo(component, PackageManager.GET_META_DATA)
      val mode = info.metaData?.getString("docuhaim.share_mode").orEmpty().trim()
      when (mode) {
        "sendSelf", "chooseGroup", "choose" -> mode
        else -> null
      }
    } catch (_: Throwable) {
      null
    }
  }

  /** Map activity-alias class name → frontend share mode. */
  private fun shareModeFromComponent(className: String?): String {
    val name = className.orEmpty()
    return when {
      name.endsWith(".ShareToSelfAlias") || name.endsWith("ShareToSelfAlias") ->
        "sendSelf"
      name.endsWith(".ShareToGroupAlias") || name.endsWith("ShareToGroupAlias") ->
        "chooseGroup"
      else -> "choose"
    }
  }

  /** Ask the WebView bridge to invoke take_pending_android_share. */
  private fun notifyWebSharePending() {
    val webView = appWebView ?: return
    mainHandler.post {
      try {
        webView.evaluateJavascript(
          "window.dispatchEvent(new CustomEvent('$SHARE_PENDING_DOM_EVENT'));",
          null,
        )
      } catch (_: Throwable) {
        // WebView may not be ready yet; JS visibility poll / Opened path remain.
      }
    }
  }

  private fun collectShareStreamUris(intent: Intent): List<String> {
    val out = ArrayList<String>()
    fun add(uri: Uri?) {
      val value = uri?.toString()?.trim().orEmpty()
      if (value.isNotEmpty() && !out.contains(value)) out.add(value)
    }
    try {
      when (intent.action) {
        Intent.ACTION_SEND -> add(streamUriExtra(intent))
        Intent.ACTION_SEND_MULTIPLE -> {
          val list = streamUriListExtra(intent)
          if (list != null) {
            for (uri in list) add(uri)
          }
        }
      }
    } catch (t: Throwable) {
      android.util.Log.w("DocuHaim", "EXTRA_STREAM unreadable", t)
    }
    // Many share sheets put the file only on ClipData, not EXTRA_STREAM.
    try {
      val clip = intent.clipData
      if (clip != null) {
        for (i in 0 until clip.itemCount) {
          add(clip.getItemAt(i)?.uri)
        }
      }
    } catch (t: Throwable) {
      android.util.Log.w("DocuHaim", "share ClipData unreadable", t)
    }
    return out
  }

  private fun streamUriExtra(intent: Intent): Uri? {
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
      intent.getParcelableExtra(Intent.EXTRA_STREAM, Uri::class.java)
    } else {
      @Suppress("DEPRECATION")
      intent.getParcelableExtra(Intent.EXTRA_STREAM)
    }
  }

  private fun streamUriListExtra(intent: Intent): ArrayList<Uri>? {
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
      intent.getParcelableArrayListExtra(Intent.EXTRA_STREAM, Uri::class.java)
    } else {
      @Suppress("DEPRECATION")
      intent.getParcelableArrayListExtra(Intent.EXTRA_STREAM)
    }
  }

  override fun onDestroy() {
    if (instance === this) {
      instance = null
    }
    appWebView = null
    super.onDestroy()
  }

  /**
   * Soften Android WebView scroll stutter without forcing a hardware layer.
   * LAYER_TYPE_HARDWARE has crashed some GPUs during boot-splash compositing.
   */
  override fun onWebViewCreate(webView: WebView) {
    appWebView = webView
    webView.overScrollMode = View.OVER_SCROLL_NEVER
    webView.settings.cacheMode = WebSettings.LOAD_DEFAULT
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      webView.settings.offscreenPreRaster = true
    }
    // Cold-start share: WebView may appear after Intent capture; poke JS once ready.
    if (lastIntentWasShare) {
      notifyWebSharePending()
    }
  }

  /**
   * Window / insets APIs must run on the Android main thread.
   * Rust `#[tauri::command]` handlers attach a JNI worker thread, not the UI thread.
   */
  private fun runOnMainSync(timeoutMs: Long = 2000L, block: () -> Unit) {
    if (Looper.myLooper() == Looper.getMainLooper()) {
      block()
      return
    }
    val latch = CountDownLatch(1)
    val error = AtomicReference<Throwable?>(null)
    mainHandler.post {
      try {
        block()
      } catch (t: Throwable) {
        error.set(t)
      } finally {
        latch.countDown()
      }
    }
    if (!latch.await(timeoutMs, TimeUnit.MILLISECONDS)) {
      throw IllegalStateException("timed out waiting for main-thread UI work")
    }
    error.get()?.let { throw it }
  }

  private fun <T> runOnMainSyncResult(
    timeoutMs: Long = 2000L,
    block: () -> T,
  ): T {
    if (Looper.myLooper() == Looper.getMainLooper()) {
      return block()
    }
    val latch = CountDownLatch(1)
    val error = AtomicReference<Throwable?>(null)
    val result = AtomicReference<T?>(null)
    mainHandler.post {
      try {
        result.set(block())
      } catch (t: Throwable) {
        error.set(t)
      } finally {
        latch.countDown()
      }
    }
    if (!latch.await(timeoutMs, TimeUnit.MILLISECONDS)) {
      throw IllegalStateException("timed out waiting for main-thread UI work")
    }
    error.get()?.let { throw it }
    @Suppress("UNCHECKED_CAST")
    return result.get() as T
  }

  /**
   * Show/hide the system status bar while staying edge-to-edge.
   * Returns the status-bar inset top in px so the WebView can pad via CSS
   * (--android-safe-top); setDecorFitsSystemWindows(true) is unreliable here.
   */
  fun setSystemStatusBarVisible(visible: Boolean): Int {
    return runOnMainSyncResult {
      WindowCompat.setDecorFitsSystemWindows(window, false)
      val controller = WindowCompat.getInsetsController(window, window.decorView)
      controller.systemBarsBehavior =
        WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
      if (visible) {
        controller.show(WindowInsetsCompat.Type.statusBars())
      } else {
        controller.hide(WindowInsetsCompat.Type.statusBars())
      }
      if (visible) statusBarInsetTopPx() else 0
    }
  }

  private fun statusBarInsetTopPx(): Int {
    val insets = ViewCompat.getRootWindowInsets(window.decorView)
    // Ignoring visibility: height is stable right after show()/hide() races.
    val top =
      insets?.getInsetsIgnoringVisibility(WindowInsetsCompat.Type.statusBars())?.top
        ?: 0
    if (top > 0) return top
    val resId = resources.getIdentifier("status_bar_height", "dimen", "android")
    if (resId > 0) {
      val fromRes = resources.getDimensionPixelSize(resId)
      if (fromRes > 0) return fromRes
    }
    // ~24dp fallback when insets / resource are unavailable
    return (24f * resources.displayMetrics.density).toInt().coerceAtLeast(24)
  }

  fun isSystemStatusBarVisible(): Boolean {
    return runOnMainSyncResult {
      val rootInsets = window.decorView.rootWindowInsets ?: return@runOnMainSyncResult true
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        rootInsets.isVisible(android.view.WindowInsets.Type.statusBars())
      } else {
        @Suppress("DEPRECATION")
        rootInsets.systemWindowInsetTop > 0
      }
    }
  }

  fun primaryAbi(): String {
    val abis = Build.SUPPORTED_ABIS
    return if (abis != null && abis.isNotEmpty()) abis[0] else "arm64-v8a"
  }

  /**
   * Open http(s)/mailto/tel in the system browser (or default handler).
   * Prefer Activity.startActivity over applicationContext — more reliable on Android 11+.
   */
  fun openExternalUrl(url: String): String {
    return try {
      runOnMainSync {
        val uri = Uri.parse(url)
        val intent = Intent(Intent.ACTION_VIEW, uri).apply {
          addCategory(Intent.CATEGORY_BROWSABLE)
          addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }
        startActivity(intent)
      }
      "ok"
    } catch (t: Throwable) {
      "error:${t.message ?: t.javaClass.simpleName}"
    }
  }

  fun ensureInstallPermission(): String {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O &&
      !packageManager.canRequestPackageInstalls()
    ) {
      openUnknownSourcesSettings()
      return "need_unknown_sources"
    }
    return "ok"
  }

  private fun openUnknownSourcesSettings() {
    runOnMainSync {
      val settings = Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES).apply {
        data = Uri.parse("package:$packageName")
        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      }
      startActivity(settings)
    }
  }

  /**
   * PackageInstaller commit callback lands here (singleTask → onNewIntent).
   * STATUS_PENDING_USER_ACTION carries EXTRA_INTENT — that is the system
   * install-confirm UI. Ignoring it makes sideload updates look like a no-op.
   */
  private fun handlePackageInstallerIntent(intent: Intent?) {
    if (intent == null) return
    if (intent.action != ACTION_APK_INSTALL_STATUS) return
    val status = intent.getIntExtra(PackageInstaller.EXTRA_STATUS, Int.MIN_VALUE)
    if (status == Int.MIN_VALUE) return
    when (status) {
      PackageInstaller.STATUS_PENDING_USER_ACTION -> {
        val confirm = extrasIntent(intent) ?: return
        confirm.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        startActivity(confirm)
      }
      PackageInstaller.STATUS_SUCCESS -> {
        android.util.Log.i("DocuHaim", "PackageInstaller session succeeded")
      }
      else -> {
        val message = intent.getStringExtra(PackageInstaller.EXTRA_STATUS_MESSAGE)
        android.util.Log.w("DocuHaim", "PackageInstaller status=$status message=$message")
      }
    }
  }

  private fun extrasIntent(source: Intent): Intent? {
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
      source.getParcelableExtra(Intent.EXTRA_INTENT, Intent::class.java)
    } else {
      @Suppress("DEPRECATION")
      source.getParcelableExtra(Intent.EXTRA_INTENT)
    }
  }

  /**
   * Install / update our own APK via PackageInstaller (preferred) with FileProvider fallback.
   *
   * Returns a status token for JNI: ok | need_unknown_sources | missing_apk | failed.
   *
   * REQUEST_INSTALL_PACKAGES is not a runtime dialog — Android 8+ requires the
   * per-app "Install unknown apps" setting (ACTION_MANAGE_UNKNOWN_APP_SOURCES).
   *
   * Session write/copy stays on the JNI worker thread (APKs are large; a 2s
   * main-thread wait would time out).
   */
  fun installApk(absolutePath: String): String {
    val apk = File(absolutePath)
    if (!apk.isFile || apk.length() < 1024L) return "missing_apk"

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O &&
      !packageManager.canRequestPackageInstalls()
    ) {
      openUnknownSourcesSettings()
      return "need_unknown_sources"
    }

    return try {
      installApkWithPackageInstaller(apk)
      "ok"
    } catch (error: Throwable) {
      android.util.Log.w("DocuHaim", "PackageInstaller failed, falling back to VIEW intent", error)
      try {
        runOnMainSync { installApkWithViewIntent(apk) }
        "ok"
      } catch (fallback: Throwable) {
        android.util.Log.e("DocuHaim", "APK VIEW install fallback failed", fallback)
        "failed"
      }
    }
  }

  private fun installApkWithPackageInstaller(apk: File) {
    val installer = packageManager.packageInstaller
    val params = PackageInstaller.SessionParams(PackageInstaller.SessionParams.MODE_FULL_INSTALL)
    // Same applicationId → update path (requires matching signing certificate).
    params.setAppPackageName(packageName)
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      params.setRequireUserAction(PackageInstaller.SessionParams.USER_ACTION_REQUIRED)
    }
    val sessionId = installer.createSession(params)
    val session = installer.openSession(sessionId)
    try {
      apk.inputStream().use { input ->
        session.openWrite("docuhaim-update.apk", 0, apk.length()).use { output ->
          input.copyTo(output)
          session.fsync(output)
        }
      }
      val callback = Intent(this, MainActivity::class.java).apply {
        action = ACTION_APK_INSTALL_STATUS
        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      }
      val pendingFlags =
        PendingIntent.FLAG_UPDATE_CURRENT or
          if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            PendingIntent.FLAG_MUTABLE
          } else {
            0
          }
      val pending = PendingIntent.getActivity(this, sessionId, callback, pendingFlags)
      session.commit(pending.intentSender)
    } catch (error: Throwable) {
      session.abandon()
      throw error
    } finally {
      session.close()
    }
  }

  private fun installApkWithViewIntent(apk: File) {
    val uri = FileProvider.getUriForFile(
      this,
      "${packageName}.fileprovider",
      apk,
    )
    val intent = Intent(Intent.ACTION_VIEW).apply {
      setDataAndType(uri, "application/vnd.android.package-archive")
      addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
      addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
        putExtra(Intent.EXTRA_NOT_UNKNOWN_SOURCE, true)
      }
      putExtra(Intent.EXTRA_RETURN_RESULT, true)
    }
    val matches = packageManager.queryIntentActivities(intent, PackageManager.MATCH_DEFAULT_ONLY)
    for (resolve in matches) {
      grantUriPermission(
        resolve.activityInfo.packageName,
        uri,
        Intent.FLAG_GRANT_READ_URI_PERMISSION,
      )
    }
    startActivity(intent)
  }
}
