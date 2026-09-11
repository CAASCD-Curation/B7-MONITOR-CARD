# 监控室 MONITOR ROOM — B7 监控卡片 · 第三版（像素风格）

无导航、无侧栏的单页像素复古展厅：主页面只展示大量倾斜悬浮的 CRT 显像管屏幕，
点击任意屏幕弹出详情窗口（不跳转页面）。

## 内容

50 件档案（49 件来自策展文案 + 1 件图片素材补充：数据中心 NOC），每屏配一张像素化图像。
原图缺失的「地震监测台网中心」以雪花噪点屏呈现。

## 视觉

- 像素风：阶梯状像素边框、`image-rendering: pixelated` 低清图像、点阵字体（Press Start 2P）
- 复古赛博工业：CRT 扫描线、屏幕暗角、REC 红点、白框辉光
- 电影氛围：全局颗粒噪点（动态）、透视地面网格、暗角
- 弹窗：像素窗口展示大图 + 完整档案文字，ESC / 点击遮罩 / ✕ 关闭

## 目录说明

- `src/` — React 源码
- `public/img/` — 档案图像（thumbs/ 为像素化缩略图）
- `docs/` — 构建产物（GitHub Pages 发布目录）

## 开发

```bash
npm install
npm run dev       # 开发服务器
npm run build     # 构建 → dist/
```

构建后执行 `rm -rf docs && cp -r dist docs` 更新 Pages 目录。

## 技术栈

React + TypeScript + Vite + Tailwind CSS
