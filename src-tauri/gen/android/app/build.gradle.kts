import java.io.FileInputStream
import java.util.Properties

plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("rust")
}

val tauriProperties = Properties().apply {
    val propFile = file("tauri.properties")
    if (propFile.exists()) {
        propFile.inputStream().use { load(it) }
    }
}

/**
 * Stable sideload signing so CI + local debug APKs share one certificate.
 * Without this, each runner’s ephemeral ~/.android/debug.keystore causes
 * INSTALL_FAILED_UPDATE_INCOMPATIBLE ("package conflicts") on in-app updates.
 *
 * Optional override: src-tauri/gen/android/keystore.properties (gitignored)
 * pointing at a private release keystore.
 */
android {
    compileSdk = 36
    namespace = "com.docuhaim.app"
    defaultConfig {
        manifestPlaceholders["usesCleartextTraffic"] = "false"
        applicationId = "com.docuhaim.app"
        minSdk = 24
        targetSdk = 36
        versionCode = tauriProperties.getProperty("tauri.android.versionCode", "1").toInt()
        versionName = tauriProperties.getProperty("tauri.android.versionName", "1.0")
    }

    signingConfigs {
        create("sideload") {
            val propsFile = rootProject.file("keystore.properties")
            if (propsFile.exists()) {
                val props = Properties().apply {
                    FileInputStream(propsFile).use { load(it) }
                }
                keyAlias = props.getProperty("keyAlias")
                keyPassword = props.getProperty("password")
                storePassword = props.getProperty("password")
                storeFile = file(props.getProperty("storeFile"))
            } else {
                // Committed PKCS12 used by GitHub Actions and local debug builds.
                keyAlias = "docuhaim"
                keyPassword = "docuhaim-sideload"
                storePassword = "docuhaim-sideload"
                storeFile = rootProject.file("keystore/docuhaim-sideload.p12")
            }
        }
    }

    buildTypes {
        getByName("debug") {
            manifestPlaceholders["usesCleartextTraffic"] = "true"
            isDebuggable = true
            isJniDebuggable = true
            isMinifyEnabled = false
            signingConfig = signingConfigs.getByName("sideload")
            packaging {
                jniLibs.keepDebugSymbols.add("*/arm64-v8a/*.so")
                jniLibs.keepDebugSymbols.add("*/armeabi-v7a/*.so")
                jniLibs.keepDebugSymbols.add("*/x86/*.so")
                jniLibs.keepDebugSymbols.add("*/x86_64/*.so")
            }
        }
        getByName("release") {
            isMinifyEnabled = true
            // Until a Play/release keystore is configured, also sign release with
            // the sideload key so produced APKs remain installable/updatable.
            signingConfig = signingConfigs.getByName("sideload")
            proguardFiles(
                *fileTree(".") { include("**/*.pro") }
                    .plus(getDefaultProguardFile("proguard-android-optimize.txt"))
                    .toList().toTypedArray()
            )
        }
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
    buildFeatures {
        buildConfig = true
    }
}

rust {
    rootDirRel = "../../../"
}

dependencies {
    implementation("androidx.webkit:webkit:1.14.0")
    implementation("androidx.appcompat:appcompat:1.7.1")
    implementation("androidx.activity:activity-ktx:1.10.1")
    implementation("com.google.android.material:material:1.12.0")
    implementation("androidx.lifecycle:lifecycle-process:2.10.0")
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.4")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.0")
}

apply(from = "tauri.build.gradle.kts")
