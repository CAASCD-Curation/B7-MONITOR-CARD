/* ── 拓扑弹窗 TOPOLOGY PANEL ───────────────────────────
   横轴 X · 空间形态：0 = 现实实体空间 → 1 = 虚拟叙事空间
   纵轴 Y · 素材属性：0 = 艺术思辨意象 → 1 = 客观纪实素材
   每个档案素材在坐标系中占据一个空心方框节点。 */
(function(){
  'use strict';

  /* 各档案的拓扑坐标 [x, y]（0~1），依据素材内容在
     「空间形态 × 素材属性」四象限中的属性定位 */
  const TOPO = {
    /* 经典艺术档案 art */
    1:[0.55,0.55],
    2:[0.95,0.45],
    3:[0.60,0.58],
    4:[0.30,0.50],
    5:[0.55,0.39],
    6:[0.40,0.20],
    7:[0.80,0.35],
    8:[0.35,0.55],
    9:[0.90,0.40],
    10:[0.30,0.60],
    11:[0.25,0.70],
    12:[0.75,0.50],
    17:[0.48,0.49],
    42:[0.60,0.57],
    43:[0.64,0.53],
    44:[0.49,0.57],
    45:[0.66,0.53],
    48:[0.65,0.36],
    49:[0.51,0.39],
    51:[0.50,0.57],
    57:[0.64,0.44],
    59:[0.64,0.41],
    60:[0.68,0.46],
    62:[0.65,0.48],
    64:[0.67,0.44],
    71:[0.64,0.55],
    77:[0.62,0.41],
    84:[0.53,0.38],
    85:[0.55,0.38],
    93:[0.56,0.50],
    94:[0.68,0.58],
    95:[0.56,0.39],
    96:[0.57,0.55],
    /* 文学意象 lit */
    13:[0.80,0.60],
    14:[0.52,0.53],
    15:[0.75,0.55],
    16:[0.60,0.45],
    18:[0.15,0.60],
    19:[0.30,0.30],
    20:[0.10,0.85],
    21:[0.12,0.80],
    22:[0.55,0.55],
    23:[0.60,0.70],
    24:[0.95,0.15],
    41:[0.25,0.75],
    47:[0.51,0.52],
    50:[0.48,0.64],
    52:[0.44,0.64],
    53:[0.44,0.44],
    54:[0.47,0.52],
    55:[0.45,0.59],
    56:[0.50,0.64],
    61:[0.61,0.44],
    63:[0.54,0.47],
    65:[0.59,0.45],
    67:[0.58,0.62],
    73:[0.54,0.61],
    74:[0.42,0.47],
    81:[0.47,0.56],
    /* 社会素材 society */
    25:[0.09,0.89],
    26:[0.13,0.85],
    27:[0.07,0.92],
    28:[0.08,0.90],
    29:[0.06,0.91],
    30:[0.09,0.90],
    31:[0.11,0.91],
    32:[0.08,0.89],
    33:[0.20,0.80],
    34:[0.05,0.81],
    35:[0.14,0.84],
    66:[0.06,0.91],
    68:[0.05,0.95],
    72:[0.19,0.93],
    75:[0.06,0.82],
    76:[0.11,0.89],
    78:[0.22,0.90],
    79:[0.05,0.78],
    80:[0.19,0.92],
    86:[0.14,0.89],
    87:[0.16,0.88],
    88:[0.06,0.83],
    89:[0.16,0.76],
    90:[0.22,0.94],
    91:[0.07,0.84],
    92:[0.10,0.94],
    97:[0.14,0.84],
    /* 形式灵感 form */
    36:[0.35,0.25],
    37:[0.30,0.35],
    38:[0.55,0.20],
    39:[0.40,0.50],
    40:[0.50,0.55],
    46:[0.51,0.31],
    58:[0.51,0.37],
    69:[0.34,0.37],
    70:[0.41,0.25],
    82:[0.43,0.30],
    83:[0.36,0.42]
  };

  /* 跨分类的显式关联线（素材 ↔ 素材 / 素材 ↔ 分类方案意象） */
  const LINKS = [
    [3,18],
    [2,23],
    [16,28],
    [16,20],
    [24,38],
    [22,13],
    [39,27]
  ];

  const topo = document.getElementById('topo');
  const tplot = document.getElementById('tplot');
  const tsvg = document.getElementById('tsvg');
  const tnodes = document.getElementById('tnodes');
  const modal = document.getElementById('modal');
  const mbox = document.getElementById('mbox');
  const items = window.ITEMS.slice().sort((a,b) => a.no - b.no);
  const catOf = it => window.CATEGORIES.find(c => c.key === it.category);

  let currentNo = null;   /* 当前档案（左侧弹窗内容） */
  let topoOn = false;

  const X = p => p * 100 + '%';
  const Y = p => (1 - p) * 100 + '%';

  /* ── 构建坐标轴 ─────────────────────────── */
  function buildAxes(){
    const NS = 'http://www.w3.org/2000/svg';
    const mk = (tag, attrs) => {
      const el = document.createElementNS(NS, tag);
      for(const k in attrs) el.setAttribute(k, attrs[k]);
      return el;
    };
    const dash = 'stroke:#2a2d30;stroke-width:1;stroke-dasharray:5 5';
    const solid = 'stroke:#3a3e42;stroke-width:1.5';
    const arrow = 'stroke:#5a5f59;stroke-width:1.5;fill:none';
    /* 十字坐标轴（带箭头端） */
    tsvg.appendChild(mk('line', {x1:'4%', y1:'50%', x2:'96%', y2:'50%', style:solid}));
    tsvg.appendChild(mk('line', {x1:'50%', y1:'4%', x2:'50%', y2:'96%', style:solid}));
    tsvg.appendChild(mk('path', {d:'M 96.6 50 l -8 -4.5 v 9 z', fill:'#5a5f59'}));  /* X 轴箭头 */
    tsvg.appendChild(mk('path', {d:'M 50 3.4 l -4.5 8 h 9 z', fill:'#5a5f59'}));   /* Y 轴箭头 */
    /* 象限虚线参考线 */
    tsvg.appendChild(mk('line', {x1:'25%', y1:'6%', x2:'25%', y2:'94%', style:dash}));
    tsvg.appendChild(mk('line', {x1:'75%', y1:'6%', x2:'75%', y2:'94%', style:dash}));
    tsvg.appendChild(mk('line', {x1:'6%', y1:'25%', x2:'94%', y2:'25%', style:dash}));
    tsvg.appendChild(mk('line', {x1:'6%', y1:'75%', x2:'94%', y2:'75%', style:dash}));
  }

  /* ── 构建连线：同分类近邻星座 + 显式跨分类关联 ─────────────────────────── */
  const adjLines = new Map(); /* no -> [相连 line 元素] */
  function regLine(a, b, el){
    (adjLines.get(a) || adjLines.set(a, []).get(a)).push(el);
    (adjLines.get(b) || adjLines.set(b, []).get(b)).push(el);
  }
  function buildLinks(){
    const NS = 'http://www.w3.org/2000/svg';
    const byCat = {};
    items.forEach(it => {
      const p = TOPO[it.no];
      if(!p) return;
      (byCat[it.category] = byCat[it.category] || []).push({no: it.no, x: p[0], y: p[1]});
    });
    const drawn = new Set();
    const line = (a, b, style) => {
      const key = a < b ? a + '-' + b : b + '-' + a;
      if(drawn.has(key)) return null;
      drawn.add(key);
      const pa = TOPO[a], pb = TOPO[b];
      if(!pa || !pb) return null;
      const el = document.createElementNS(NS, 'line');
      el.setAttribute('x1', pa[0] * 100 + '%'); el.setAttribute('y1', (1 - pa[1]) * 100 + '%');
      el.setAttribute('x2', pb[0] * 100 + '%'); el.setAttribute('y2', (1 - pb[1]) * 100 + '%');
      el.setAttribute('style', style);
      tsvg.appendChild(el);
      regLine(a, b, el);
      return el;
    };
    /* 同分类：每个节点连接距离最近的 2 个邻居 → 分类星座线 */
    for(const k in byCat){
      const grp = byCat[k];
      grp.forEach(n => {
        grp.filter(m => m.no !== n.no)
           .map(m => ({m, d: (m.x - n.x) ** 2 + (m.y - n.y) ** 2}))
           .sort((a, b) => a.d - b.d)
           .slice(0, 2)
           .forEach(({m}) => line(n.no, m.no, 'stroke:rgba(200,214,192,.10);stroke-width:1'));
      });
    }
    /* 显式跨分类关联线（更醒目） */
    LINKS.forEach(([a, b]) => line(a, b, 'stroke:rgba(184,84,63,.30);stroke-width:1;stroke-dasharray:3 4'));
  }

  /* ── 构建节点：空心方框 ─────────────────────────── */
  function buildNodes(){
    items.forEach(it => {
      const p = TOPO[it.no];
      if(!p) return;
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'tnode';
      el.dataset.no = it.no;
      el.style.left = X(p[0]);
      el.style.top = Y(p[1]);
      el.setAttribute('aria-label', `打开《${it.title}》档案`);
      el.innerHTML = `<span class="tname">《${it.title}》</span>`;
      el.addEventListener('click', ev => { ev.stopPropagation(); onNodeClick(it); });
      tnodes.appendChild(el);
    });
  }

  /* ── 高亮当前档案对应节点并显示档案名称（同时点亮其关联线） ─────────────────────────── */
  function syncHighlight(){
    tsvg.querySelectorAll('line.hl-path').forEach(l => l.classList.remove('hl-path'));
    (adjLines.get(currentNo) || []).forEach(l => l.classList.add('hl-path'));
    tnodes.querySelectorAll('.tnode').forEach(n => {
      const on = Number(n.dataset.no) === currentNo;
      n.classList.toggle('on', on);
      if(on){
        /* 名称标签贴边时翻转，避免溢出面板 */
        const name = n.querySelector('.tname');
        name.style.transform = '';
        requestAnimationFrame(() => {
          const r = name.getBoundingClientRect();
          const pr = tplot.getBoundingClientRect();
          if(r.left < pr.left + 6) name.style.transform = 'translateX(calc(-50% + ' + (pr.left + 6 - r.left) + 'px))';
          else if(r.right > pr.right - 6) name.style.transform = 'translateX(calc(-50% - ' + (r.right - pr.right + 6) + 'px))';
        });
      }
    });
  }

  /* ── 点击节点 → 跳转到对应素材的详情弹窗 ─────────────────────────── */
  /* 供时间线面板复用；CASE_HOOKS 用于通知其他面板当前档案变化 */
  window.CASE_HOOKS = [];
  function onNodeClick(it){
    const cat = catOf(it);
    if(modal.classList.contains('show') && !mbox.classList.contains('crt-off')){
      /* 详情弹窗已打开：原地切换内容（CRT 重开机动画 + 乱码解码） */
      switchCaseContent(it, cat);
      return;
    }
    /* 详情弹窗已关闭 / 正在关机：等关机动画结束后再重新打开，
       避免点击被 openCase 的 opening/closing 保护期吞掉 */
    const retry = setInterval(() => {
      if(!closing && !opening){
        clearInterval(retry);
        openCase(it, cat);
      }
    }, 100);
    setTimeout(() => clearInterval(retry), 2000); /* 保险 */
  }

  /* 在已打开的档案弹窗内切换素材（复刻 openCase 的填装逻辑，无全屏雪花） */
  const POOL = '的一是了在监控信号像素雪花屏幕档案故障中断未知错误乱码解码数据权力眼睛图像记录窥视01<>/|+=*#@%&';
  function scrambleText(el, real){
    let step = 0;
    const tick = () => {
      el.textContent = Array.from(real).map(ch =>
        (ch === ' ' || ch === '\n' || ch === '—' || ch === '·') ? ch : POOL[Math.floor(Math.random() * POOL.length)]
      ).join('');
      if(++step < 3) setTimeout(tick, 160);
    };
    tick();
  }
  const pad2 = n => String(n).padStart(2, '0');
  const pad3 = n => String(n).padStart(3, '0');

  function switchCaseContent(it, cat){
    try{ clickSnd(ac(), ac().currentTime, 1600, 0.5, 0.045); }catch(e){}
    document.getElementById('mscreen').innerHTML = (it.broken || it.noImage)
      ? '<div class="mstat static-fill"></div><div class="no-signal">NO SIGNAL</div>'
      : `<img src="img/img-${pad2(it.no)}.jpg" alt="${it.title}">`;

    /* 重挂开机动画：克隆节点重置动画状态 */
    mbox.querySelectorAll('.boot-static, .boot-line, .boot-content').forEach(n => {
      const c = n.cloneNode(true);
      n.parentNode.replaceChild(c, n);
    });

    const codeEl = document.getElementById('mcode');
    const titleEl = document.getElementById('mtitle');
    const metaEl = document.getElementById('mmeta');
    const descEl = document.getElementById('mdesc');
    const realCode = `${cat ? cat.code : ''} / NO.${pad3(it.no)} · ${cat ? cat.en : ''}`;
    const realTitle = `《${it.title}》`;
    const realMeta = `${it.author ? `<div>AUTHOR — ${it.author}</div>` : '<div>UNKNOWN AUTHOR</div>'}` +
      `<div class="sub2">${it.year || 'N/A'} · ${cat ? cat.label : ''} · ${cat ? cat.en : ''}${it.added ? ' · <span style="color:#b8543f">素材补充条目</span>' : ''}</div>`;
    scrambleText(codeEl, realCode);
    scrambleText(titleEl, realTitle);
    scrambleText(metaEl, realMeta.replace(/<[^>]+>/g, ''));
    scrambleText(descEl, it.desc);
    setTimeout(() => {
      codeEl.textContent = realCode;
      titleEl.textContent = realTitle;
      metaEl.innerHTML = realMeta;
      descEl.textContent = it.desc;
    }, 500);
    currentNo = it.no;
    syncHighlight();
    window.CASE_HOOKS.forEach(fn => { try{ fn(it.no); }catch(e){} });
  }

  window.JUMP = onNodeClick; /* 时间线面板点击复用同一跳转逻辑 */

  /* ── 面板开关 ─────────────────────────── */
  function openTopo(){
    if(topoOn) return;
    topoOn = true;
    topo.classList.add('show');
    modal.classList.add('topo-on');
    document.querySelectorAll('.mtopo').forEach(b => b.classList.add('on'));
    syncHighlight();
  }
  function closeTopo(){
    if(!topoOn) return;
    topoOn = false;
    topo.classList.remove('show');
    modal.classList.remove('topo-on');
    document.querySelectorAll('.mtopo').forEach(b => b.classList.remove('on'));
  }

  /* 档案弹窗内 TOPO 按钮（事件委托：开机克隆会重建按钮） */
  modal.addEventListener('click', e => {
    if(e.target.closest('.mtopo')){ topoOn ? closeTopo() : openTopo(); }
  });
  document.getElementById('tclose').addEventListener('click', closeTopo);

  /* ── 联动 1：左侧打开档案 → 右侧对应节点高亮并显示档案名称 ───────────────────────────
     topology.js 在页面内联脚本之前加载，需等 DOMContentLoaded
     （内联脚本已执行、openCase 已定义）后再包装 */
  window.addEventListener('DOMContentLoaded', () => {
    const _openCase = window.openCase;
    window.openCase = function(it, cat){
      currentNo = it.no;
      _openCase(it, cat);
      syncHighlight();
      window.CASE_HOOKS.forEach(fn => { try{ fn(it.no); }catch(e){} });
    };
  });

  buildAxes();
  buildLinks();
  buildNodes();
})();
