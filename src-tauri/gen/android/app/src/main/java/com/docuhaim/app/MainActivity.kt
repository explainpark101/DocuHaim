package com.docuhaim.app

import android.app.PendingIntent
import android.content.Intent
import android.content.pm.PackageInstaller
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
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

    private val mainHandler = Handler(Looper.getMainLooper())
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    enableEdgeToEdge()
    super.onCreate(savedInstanceState)
    instance = this
    // Preference is applied from the web UI after boot (see initAndroidSystemStatusBar).
    // Do not force a mode here so the saved fullscreen / status-bar choice sticks.
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
      WindowCompat.setDecorFitsSystemWindows(window, false)
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
   * Install / update our own APK via PackageInstaller (preferred) with FileProvider fallback.
   * setAppPackageName(packageName) marks the session as an update of this app so the
   * system does not treat it as a conflicting foreign package when signatures match.
   */
  fun installApk(absolutePath: String): Boolean {
    return runOnMainSyncResult {
      val apk = File(absolutePath)
      if (!apk.isFile || apk.length() < 1024L) return@runOnMainSyncResult false
      try {
        installApkWithPackageInstaller(apk)
        true
      } catch (error: Throwable) {
        android.util.Log.w("DocuHaim", "PackageInstaller failed, falling back to VIEW intent", error)
        installApkWithViewIntent(apk)
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
        action = Intent.ACTION_MAIN
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

  private fun installApkWithViewIntent(apk: File): Boolean {
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
    startActivity(intent)
    return true
  }
}
