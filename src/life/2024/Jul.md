# 七月 July

## RN 打包生成 apk

生成签名密钥。

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

设置 gradle 变量。

::: code-group

```text [gradle.properties]
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

:::

把签名配置添加到 gradle 配置中。

::: code-group

```text [build.gradle]
android {
  ...
  defaultConfig { ... }
  signingConfigs {
    release {
      if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
        storeFile file(MYAPP_UPLOAD_STORE_FILE)
        storePassword MYAPP_UPLOAD_STORE_PASSWORD
        keyAlias MYAPP_UPLOAD_KEY_ALIAS
        keyPassword MYAPP_UPLOAD_KEY_PASSWORD
      }
    }
  }
  buildTypes {
    release {
      ...
      signingConfig signingConfigs.release
    }
  }
}
```

:::

生成 apk 包。

```bash
cd android
./gradlew assembleRelease
```

> [!warning]
>
> 下载过程中很可能出现网络延迟，所以需要提前下载 `gradle-8.6-all`，添加到 `gradle/wrapper` 中。

## Web API

详见 [Web API | Docs.HTML5](http://docs.yuwenjian.com/base/html5.html#web-api)。

常用的 Web API 有：

- Fetch：现代网络请求方式。

- History：允许操作浏览器历史记录。

- FileReader：允许网页访问用户的文件系统，读取、预览文件内容。

- WebSocket：提供双向通信通道，用于实时数据传输。常用于聊天室、游戏等应用。

- Web Worker：开启分线程处理大量数据和执行复杂计算，不会阻塞主线程。

- Service Worker：适用于构建离线 Web 应用和提高性能。

- RequestAnimationFrame：以更好的性能执行动画。适合用于实现高效和平滑的动画效果。

- Clipboard：读写剪贴板的内容。适用于实现复制、粘贴功能。
