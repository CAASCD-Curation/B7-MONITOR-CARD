# 监控室 MONITOR ROOM — B7 监控卡片

复古赛博工业风格的「监控室」主题策展展示网页。暗处凝视明处，被看者不可见监视者——一组关于「观看」与「被观看」的档案。

## 内容

四大展区，共 49 件档案：

| 频道 | 展区 | 数量 |
| --- | --- | --- |
| CH-01 | 经典艺术档案 | 12 |
| CH-02 | 文学意象 | 14 |
| CH-03 | 社会素材 | 14 |
| CH-04 | 形式灵感 | 9 |

## 视觉

- 高对比暗调展厅、低饱和度、白框发光 CRT 显像管屏幕
- 全局胶片颗粒噪点 + 扫描线 + 暗角
- 倾斜悬浮 CRT 屏幕雕塑、环形雷达导航（旋转扫描）
- 破损屏幕「SIGNAL LOST」故障效果、屏幕闪烁与漂浮动画
- 金属机械面板、铆钉、螺丝细节

## 技术栈

React + TypeScript + Vite + Tailwind CSS + shadcn/ui

## 开发

```bash
npm install
npm run dev      # 开发服务器
npm run build    # 生产构建 → dist/
npm run preview  # 本地预览构建产物
```

## 部署

`dist/` 为纯静态站点，可直接部署至 GitHub Pages / Vercel / Netlify。
