package com.docuhaim.app

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.view.View
import android.webkit.WebSettings
import android.webkit.WebView
import androidx.activity.enableEdgeToEdge
import androidx.core.content.FileProvider
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import java.io.File

class MainActivity : TauriActivity() {
  companion object {
    @JvmStatic
    @Volatile
    var instance: MainActivity? = null
      private set
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
   * Reduce Android WebView scroll stutter: hardware layer + no overscroll glow.
   */
  override fun onWebViewCreate(webView: WebView) {
    webView.setLayerType(View.LAYER_TYPE_HARDWARE, null)
    webView.overScrollMode = View.OVER_SCROLL_NEVER
    webView.settings.cacheMode = WebSettings.LOAD_DEFAULT
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      webView.settings.offscreenPreRaster = true
    }
    // Prefer GPU compositing for CSS transforms / sticky headers.
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
      webView.setLayerType(View.LAYER_TYPE_HARDWARE, null)
    }
  }

  fun setSystemStatusBarVisible(visible: Boolean) {
    val controller = WindowCompat.getInsetsController(window, window.decorView)
    controller.systemBarsBehavior =
      WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
    if (visible) {
      controller.show(WindowInsetsCompat.Type.statusBars())
    } else {
      controller.hide(WindowInsetsCompat.Type.statusBars())
    }
  }

  fun isSystemStatusBarVisible(): Boolean {
    // WindowInsetsController has no direct "isVisible"; inspect root window insets.
    val rootInsets = window.decorView.rootWindowInsets ?: return true
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
      rootInsets.isVisible(android.view.WindowInsets.Type.statusBars())
    } else {
      @Suppress("DEPRECATION")
      (rootInsets.systemWindowInsetTop > 0)
    }
  }

  fun primaryAbi(): String {
    val abis = Build.SUPPORTED_ABIS
    return if (abis != null && abis.isNotEmpty()) abis[0] else "arm64-v8a"
  }

  fun installApk(absolutePath: String): Boolean {
    val file = File(absolutePath)
    if (!file.isFile) return false
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
    return true
  }
}
