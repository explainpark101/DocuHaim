package com.docuhaim.app

import android.app.PendingIntent
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

    private val mainHandler = Handler(Looper.getMainLooper())

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
    fun consumeLastIntentWasShare(): Boolean {
      val value = lastIntentWasShare
      lastIntentWasShare = false
      return value
    }
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    enableEdgeToEdge()
    captureShareIntent(intent)
    super.onCreate(savedInstanceState)
    instance = this
    // Preference is applied from the web UI after boot (see initAndroidSystemStatusBar).
    // Do not force a mode here so the saved fullscreen / status-bar choice sticks.
    handlePackageInstallerIntent(intent)
  }

  override fun onNewIntent(intent: Intent) {
    captureShareIntent(intent)
    super.onNewIntent(intent)
    setIntent(intent)
    handlePackageInstallerIntent(intent)
  }

  /**
   * Mark share-sheet launches before Tauri/tao processes the Intent so Rust can
   * route Opened URLs to chat share intake instead of markdown file-association.
   */
  private fun captureShareIntent(intent: Intent?) {
    if (intent == null) return
    val action = intent.action ?: return
    val isShare =
      action == Intent.ACTION_SEND || action == Intent.ACTION_SEND_MULTIPLE
    lastIntentWasShare = isShare
    if (!isShare) return
    pendingShareText = intent.getStringExtra(Intent.EXTRA_TEXT).orEmpty()
    pendingShareTitle =
      intent.getStringExtra(Intent.EXTRA_SUBJECT).orEmpty().ifEmpty {
        intent.getStringExtra(Intent.EXTRA_TITLE).orEmpty()
      }
  }

  override fun onDestroy() {
    if (instance === this) {
      instance = null
    }
    super.onDestroy()
  }

  /**
   * Soften Android WebView scroll stutter without forcing a hardware layer.
   * LAYER_TYPE_HARDWARE has crashed some GPUs during boot-splash compositing.
   */
  override fun onWebViewCreate(webView: WebView) {
    webView.overScrollMode = View.OVER_SCROLL_NEVER
    webView.settings.cacheMode = WebSettings.LOAD_DEFAULT
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      webView.settings.offscreenPreRaster = true
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

  fun setSystemStatusBarVisible(visible: Boolean) {
    runOnMainSync {
      // Status-bar mode: let the system reserve the inset so WebView content
      // starts below the clock/battery (empty band — no app UI overlap).
      // Fullscreen: edge-to-edge immersive under the status bar.
      WindowCompat.setDecorFitsSystemWindows(window, visible)
      val controller = WindowCompat.getInsetsController(window, window.decorView)
      controller.systemBarsBehavior =
        WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
      if (visible) {
        controller.show(WindowInsetsCompat.Type.statusBars())
      } else {
        controller.hide(WindowInsetsCompat.Type.statusBars())
      }
    }
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
