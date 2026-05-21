# 梦境客服中心

《梦境客服中心》是一款面向 TapTap 安卓测试上架的单机叙事解谜游戏。玩家扮演梦境售后部门的新员工，阅读梦境投诉、整理碎片、选择处理方案，并给出夜班结案反馈。

## 当前版本

- 版本名：`1.0`
- 版本号：`1`
- 包名：`com.nightdesk.dreamsupport`
- 分发模式：TapPlay / 安卓测试版
- 在线 AI 合成服务：无
- 账号、广告、内购：无

## 本地运行

```bash
npm install
npm run build
```

直接用浏览器打开 `index.html` 也可以体验 Web 版本。

## 安卓构建

```bash
npm run android:debug
npm run android:release:all
```

release 产物会复制到：

```text
artifacts/android/release/
```

其中 APK 适合 TapTap/TapPlay 和自分发测试，AAB 适合 Google Play。

## TapTap 检查

```bash
npm run taptap:check
PRIVACY_URL="https://your-name.github.io/dream-support-center-game/privacy.html" npm run taptap:check:privacy
```

## 商店素材

```bash
npm run store:assets
```

素材输出位置：

```text
artifacts/store-assets/
```
