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
    1:[.55,.55], 2:[.95,.45], 3:[.60,.58], 4:[.30,.50], 5:[.85,.30], 6:[.40,.20],
    10:[.80,.35], 13:[.35,.55], 14:[.90,.40], 15:[.30,.60], 16:[.25,.70], 17:[.75,.50],
    /* 文学意象 lit */
    7:[.80,.60], 9:[.85,.25], 11:[.75,.55], 12:[.60,.45], 34:[.90,.20], 38:[.15,.60],
    40:[.30,.30], 41:[.10,.85], 42:[.12,.80], 46:[.55,.55], 47:[.20,.80], 48:[.60,.70],
    49:[.25,.75], 50:[.95,.15],
    /* 社会素材 society */
    24:[.10,.90], 25:[.13,.85], 26:[.07,.92], 27:[.12,.86], 28:[.10,.88], 29:[.08,.90],
    30:[.06,.91], 31:[.09,.90], 33:[.08,.89], 35:[.20,.80], 37:[.15,.82], 39:[.10,.85],
    43:[.14,.84], 44:[.22,.78],
    /* 形式灵感 form */
    8:[.35,.25], 18:[.30,.35], 19:[.55,.20], 20:[.40,.50], 21:[.45,.30], 22:[.50,.55],
    23:[.45,.40], 36:[.30,.30], 45:[.50,.15]
  };

  /* 跨分类的显式关联线（素材 ↔ 素材 / 素材 ↔ 分类方案意象） */
  const LINKS = [
    [3,38],   /* 楚门的世界 ↔ 单向玻璃 */
    [5,34],   /* 白雪公主魔镜 ↔ 厄里斯魔镜 */
    [2,48],   /* 黑客帝国 ↔ 大数据监听 */
    [12,29],  /* 全景地狱 ↔ 恶魔岛瞭望塔 */
    [12,41],  /* 全景地狱 ↔ 核电站主控室 */
    [16,47],  /* 窃听风暴 ↔ 天眼系统 */
    [50,19],  /* 阿莱夫 ↔ 无限镜屋 */
    [46,7],   /* 文字狱 ↔ 1984 */
    [20,26],  /* 雷达扫描 ↔ 机场塔台 */
    [21,4]    /* 鱼眼镜头 ↔ 夜鹰 */
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
  }

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
    };
  });

  buildAxes();
  buildLinks();
  buildNodes();
})();
