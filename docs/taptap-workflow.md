# TapTap 固定发布流程

## 1. 新建游戏项目

```bash
cp -R "/Users/wangsen/Documents/我的Projects/tap-game-template" "/Users/wangsen/Documents/我的Projects/new-game-name"
cd "/Users/wangsen/Documents/我的Projects/new-game-name"
```

更新：

- `tap-game.config.json`
- `package.json`
- `README.md`
- `store-listing.md`
- `privacy.html`

## 2. 做可试玩版本

先保证核心玩法能在 10-30 秒内被看懂。TapTap 实机视频要求前 5 秒内展示核心玩法，所以不要做长开场，不要先堆世界观。

推荐第一屏结构：

- 直接显示可操作局面
- 有一个明确主按钮或拖拽目标
- 操作后立刻出现反馈
- 30 秒内能看到一次结果

## 3. 打 Android 包

推荐输出：

```text
artifacts/android/release/game-v1.0-1-release.apk
artifacts/android/release/game-v1.0-1-release.aab
```

TapTap 优先上传 APK；Google Play 优先上传 AAB。

## 4. 生成商店素材

固定路径：

```text
artifacts/store-assets/icon-1024.png
artifacts/store-assets/promo-16x9.png
artifacts/store-assets/screenshots/01-opening.png
artifacts/store-assets/screenshots/02-core-gameplay.png
artifacts/store-assets/screenshots/03-result.png
```

宣传图尽量只保留游戏名，避免审核认为有多余宣传性文字。

## 5. 录实机视频

固定路径：

```text
artifacts/store-assets/video/gameplay.mp4
artifacts/store-assets/video/gameplay-cover.png
```

视频要求：

- 15 秒以上
- 前 5 秒内出现核心玩法
- 核心玩法至少持续 10 秒
- 不加人声配音
- 不加字幕
- 不露设备 UI、浏览器地址栏、画中画
- H.264 或 HEVC/H.265
- 短边不低于 540 px

## 6. 隐私政策链接

把 `privacy.html` 推到 GitHub Pages 或其他 HTTPS 静态托管服务。

TapTap 后台填写：

```text
https://your-name.github.io/your-repo/privacy.html
```

## 7. 自动检查

```bash
npm run taptap:check
```

如果隐私政策链接已经上线：

```bash
PRIVACY_URL="https://your-name.github.io/your-repo/privacy.html" npm run taptap:check:privacy
```

## 8. TapTap 后台填写

需要准备：

- 游戏名
- 包名
- 游戏简介
- 玩法说明
- 版本说明
- 图标
- 截图
- 宣传图
- 实机视频
- 隐私政策链接
- AI 内容说明
- 年龄分级说明
- 隐私说明
- 分发方式：未接入防沉迷 SDK 时优先 TapPlay
