package com.docuhaim.app

import android.content.Intent
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

  fun installApk(absolutePath: String): Boolean {
    return runOnMainSyncResult {
      val file = File(absolutePath)
      if (!file.isFile) return@runOnMainSyncResult false
      val uri = FileProvider.getUriForFile(
        this,
        "${packageName}.fileprovider",
        file,
      )
      val intent = Intent(Intent.ACTION_VIEW).apply {
        setDataAndType(uri, "application/vnd.android.package-archive")
        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      }
      startActivity(intent)
      true
    }
  }
}
