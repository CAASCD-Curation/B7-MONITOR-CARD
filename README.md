# B7-MONITOR-CARD · 监控室

围绕「监控 / 凝视 / 全景敞视」主题的策展展示网页合集。所有版本均可在线访问，通过不同分支与目录区分版本。

## 🌐 在线访问（GitHub Pages）



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
| V7 · 第七版 | https://caascd-curation.github.io/B7-MONITOR-CARD/第七版/ | 基于第三版-三异：CCTV 入场 + CRT 卡片流；点开卡片 CRT 开机雪花屏弹窗（音效+乱码解码），弹窗内「⌖ TOPO」按钮呼出**右侧独立可关的 THE COORDINATE 拓扑窗**——发光十字坐标轴+点阵节点图呈现该档案所属分类全部节点，被点开档案节点放大发光并标注名称与坐标，左右双窗可同时显示互不遮挡 |
| V8 · 第八版 | https://caascd-curation.github.io/B7-MONITOR-CARD/第八版/ | 鱼眼镜头入场界面：镜头内为模糊监控画面，左上角实时年月日时间、右上角实时/累计浏览人数（像素点阵字体），点击后黑屏显示 "You are being monitored." → 闪烁雪花屏进入 CRT 卡片阵列（建议戴耳机） |
| V8异 · 第八版异格 | https://caascd-curation.github.io/B7-MONITOR-CARD/第八版异格/ | 在第八版基础上新增右侧独立可关闭「素材拓扑」弹窗：十字坐标轴（横轴=空间形态 现实实体/虚拟叙事，纵轴=素材属性 客观纪实/艺术思辨），49 个素材空心方框节点 + 分类星座连线与跨分类关联虚线；双向联动——打开档案对应节点高亮显示名称，点击节点左侧弹窗切换素材详情。另增右侧独立可关闭「时间线」浮窗：50 个素材按年份升序竖向时间轴，含「年份不详」分组，点击条目跳转档案详情，与详情弹窗双向联动（建议戴耳机） |

| V9 · 第九版-拓扑 | https://caascd-curation.github.io/B7-MONITOR-CARD/第九版-拓扑/ | 在第三版-三异基础上新增右侧独立可关闭「关联拓扑」弹窗：十字坐标轴 + 四象限分类（CH-01~04）+ 50 个素材空心方框节点 + 装饰方框；双向联动——打开档案对应节点高亮显示名称，点击节点左侧档案弹窗切换素材详情，底部 RELATION LOG 自动生成两者关系文案（建议戴耳机） |

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
第九版-拓扑/   # 第九版（档案弹窗 + 右侧关联拓扑弹窗，可直接访问）
```

## 备注

- 若链接短暂 404，多为 Pages 正在重新部署，稍等 1–2 分钟再刷新。
- 若看到旧页面，请强制刷新（`Ctrl + Shift + R`）清除浏览器缓存。
