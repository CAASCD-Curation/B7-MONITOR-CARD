# B7-MONITOR-CARD · 监控室

围绕「监控 / 凝视 / 全景敞视」主题的策展展示网页合集。所有版本均可在线访问，通过不同分支与目录区分版本。

## 🌐 在线访问（GitHub Pages）

**版本索引首页：https://caascd-curation.github.io/B7-MONITOR-CARD/**

| 版本 | 入口链接 | 说明 |
| --- | --- | --- |
| V1 · 第一版 | https://caascd-curation.github.io/B7-MONITOR-CARD/第一版/dist/ | 复古 CRT 策展首页（可直接访问，分支内为源码工程） |
| V2 · 第二版 | https://caascd-curation.github.io/B7-MONITOR-CARD/第二版/ | CCTV 开始界面 + 案例档案库 |
| V3 · 第三版 | https://caascd-curation.github.io/B7-MONITOR-CARD/第三版/展厅/ | 倾斜悬浮 CRT 屏幕阵列（像素风），点击雪花故障+CRT开机音效后弹窗看档案，支持 `#case-N` 深链（建议戴耳机） |
| V1b · 第一版b | https://caascd-curation.github.io/B7-MONITOR-CARD/第一版b/ | 复古 CRT 环形展厅（可直接访问） |
| V5 · 第五版 | https://caascd-curation.github.io/B7-MONITOR-CARD/第五版/ | 3D 螺旋画廊「螺旋档案」（可直接访问） |
| V6 · 第六版 | https://caascd-curation.github.io/B7-MONITOR-CARD/第六版/pixel/ | 3D 环形展厅 + CRT 开机雪花屏弹窗 + 开机/关机音效（建议戴耳机） |
| V3异 · 第三版-异格 | https://caascd-curation.github.io/B7-MONITOR-CARD/第三版-异格/ | 像素点阵字体版：卡片无文字，弹窗文字乱码→0.5s 解码，开关机动画+音效，关闭后洗牌（建议戴耳机） |
| V3三异 · 第三版-三异 | https://caascd-curation.github.io/B7-MONITOR-CARD/第三版-三异/ | CCTV 入场界面 + 无限下滑 CRT 卡片流 + 纯红像素线条眼形光标（点击眨眼、520ms 颗粒噪点拖尾，触屏自动禁用） |
| V3二异 · 第三版-二异 | https://caascd-curation.github.io/B7-MONITOR-CARD/第三版-二异/ | 无标题无尽循环 CRT 卡片流（5 行双份往返滚动）+ ⏻ 退出监控反向流程（CRT 关机音效 + 雪花屏回入场界面，可反复开关） |
| V7 · 第七版 | https://caascd-curation.github.io/B7-MONITOR-CARD/第七版/ | 螺旋上升 CRT 塔（仰视视角，塔底向上看）：50 块屏幕无限螺旋上升+自转，**滚轮调速**（下滚加速/上滚减速倒转，左下角有速度指示），巨型像素水印标题置于塔后，弹窗乱码解码 + 开关机音效（建议戴耳机） |

## 🌿 分支结构

| 分支 | 内容 |
| --- | --- |
| `main` | 版本索引首页 + 各版本构建产物子目录（Pages 部署源） |
| `第一版` | 第一版 React 源码工程 |
| `第二版` | 第二版源码 |
| `第三版` | 第三版源码（含 pixel/ 构建产物与 pixel-src/ 源码） |

## 目录结构（main 分支）

```
index.html      # 版本索引首页
第一版/          # 第一版源码工程（dist/ 为构建产物，可直接访问）
第一版b/         # 第一版构建产物（可直接访问的 CRT 环形展厅）
第二版/          # 第二版网页
第三版/          # 第三版网页（展厅/ 为悬浮CRT展厅，可直接访问；pixel/ 为 3D 环形展厅）
第四版/          # 第四版网页
第五版/          # 第五版网页（3D 螺旋画廊，可直接访问）
第六版/          # 第六版网页（pixel/ 为 3D 环形展厅 + CRT 开机音效版）
```

## 备注

- 若链接短暂 404，多为 Pages 正在重新部署，稍等 1–2 分钟再刷新。
- 若看到旧页面，请强制刷新（`Ctrl + Shift + R`）清除浏览器缓存。
