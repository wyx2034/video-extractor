# 🎬 视频提取器 (Video Extractor)

一个纯浏览器端的视频提取工具，无需上传文件到服务器，所有处理都在本地完成。

## ✨ 功能特性

- **🎵 音频提取** — 从视频中分离音频，支持 MP3/WAV/AAC 格式
- **🖼️ 视频帧截图** — 按时间间隔或帧数提取画面，支持 PNG/JPEG/WebP 格式
- **📝 语音识别字幕** — AI 自动识别语音生成字幕，支持 SRT/WebVTT/ASS/TXT 格式
- **🔄 双识别引擎** — Whisper AI（高精度）+ 浏览器原生（快速）可切换
- **📱 跨平台** — 手机和电脑均可使用，响应式设计
- **🔒 隐私安全** — 所有文件处理在浏览器本地完成，不上传任何数据

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 🛠️ 技术栈

| 模块 | 技术 |
|------|------|
| 构建工具 | Vite |
| 音频提取 | FFmpeg WASM |
| 视频帧提取 | HTML5 Canvas + Video API |
| 语音识别 | Transformers.js (Whisper) + Web Speech API |
| UI | 原生 HTML/CSS/JS |

## 📋 使用说明

1. **导入视频** — 拖拽或点击上传视频文件
2. **选择内容** — 勾选需要提取的内容（音频/截图/字幕）
3. **配置参数** — 选择输出格式、质量等参数
4. **开始提取** — 点击开始，等待处理完成
5. **下载结果** — 单独下载或一键全部下载

## ⚠️ 注意事项

- 推荐使用 Chrome 或 Edge 浏览器
- Whisper AI 首次使用需下载模型文件（75MB~500MB）
- 处理大文件时可能需要较多内存
- 浏览器原生语音识别仅支持 Chrome

## 📁 项目结构

```
video-extractor/
├── index.html              # 主页面
├── package.json            # 项目配置
├── vite.config.js          # Vite 配置
└── src/
    ├── app.js              # 主应用入口
    ├── styles/
    │   └── main.css        # 全局样式
    ├── modules/
    │   ├── audioExtractor.js    # 音频提取模块
    │   ├── frameExtractor.js    # 视频帧提取模块
    │   ├── speechRecognizer.js  # 语音识别模块
    │   └── subtitleGenerator.js # 字幕格式生成模块
    └── utils/
        ├── toast.js        # 通知系统
        └── helpers.js      # 工具函数
```
