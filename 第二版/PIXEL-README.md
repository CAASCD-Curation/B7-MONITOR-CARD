# 像素风格展厅（pixel/）

- `pixel/` — 像素风格单页展厅构建产物：无导航、无侧栏，主页面为大量倾斜悬浮的 CRT 显像管屏幕，点击屏幕弹出详情窗口（不跳转页面）。直接用浏览器打开 `pixel/index.html` 即可。
- `pixel-src/` — React + Vite 源码（`npm install && npm run build` 构建）。

视觉：像素边框、点阵字体（Press Start 2P）、CRT 扫描线、颗粒噪点、暗角、白框辉光。
数据：50 件档案（49 件策展文案 + 1 件素材补充：数据中心 NOC），图像在 `pixel/img/`（`thumbs/` 为像素化缩略图）。原图缺失的「地震监测台网中心」以雪花噪点屏呈现。
