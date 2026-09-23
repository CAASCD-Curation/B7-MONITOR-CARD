/* ── 时间线弹窗 TIMELINE PANEL ───────────────────────────
   按年份为全部档案素材排序，生成竖向时间轴；
   点击条目跳转到对应素材的详情弹窗（复用拓扑面板的 JUMP）。 */
(function(){
  'use strict';

  const tl = document.getElementById('tl');
  const tlbody = document.getElementById('tlbody');
  const modal = document.getElementById('modal');
  const topo = document.getElementById('topo');
  const items = window.ITEMS.slice().sort((a, b) => a.no - b.no);
  const catOf = it => window.CATEGORIES.find(c => c.key === it.category);

  let tlOn = false;
  const yearOf = it => {
    const y = parseInt(it.year, 10);
    return Number.isFinite(y) ? y : null;
  };

  /* ── 排序：有年份的按升序，无年份的归入末尾「年份不详」 ─────────────────────────── */
  const dated = items.filter(it => yearOf(it) !== null).sort((a, b) => yearOf(a) - yearOf(b));
  const undated = items.filter(it => yearOf(it) === null);

  /* ── 渲染时间轴 ─────────────────────────── */
  function build(){
    const frag = document.createDocumentFragment();
    const mkItem = it => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'tl-item';
      el.dataset.no = it.no;
      el.setAttribute('aria-label', `打开《${it.title}》详情`);
      const cat = catOf(it);
      el.innerHTML = `
        <span class="yr">${yearOf(it) ?? ''}</span>
        <span class="mk"></span>
        <span class="tx">《${it.title}》<span class="ct">${cat ? cat.code : ''}</span></span>`;
      el.addEventListener('click', ev => { ev.stopPropagation(); window.JUMP(it); });
      frag.appendChild(el);
    };
    dated.forEach(mkItem);
    if(undated.length){
      const na = document.createElement('div');
      na.className = 'tl-na';
      na.innerHTML = `<i></i><span>年份不详 · N/A (${undated.length})</span>`;
      frag.appendChild(na);
      undated.forEach(mkItem);
    }
    tlbody.appendChild(frag);
  }

  /* ── 当前档案高亮联动（与拓扑面板同步） ─────────────────────────── */
  function sync(no){
    tlbody.querySelectorAll('.tl-item').forEach(el => {
      const on = Number(el.dataset.no) === no;
      el.classList.toggle('on', on);
      if(on) el.scrollIntoView({ block: 'nearest' });
    });
  }
  (window.CASE_HOOKS = window.CASE_HOOKS || []).push(sync);

  /* ── 面板开关：独立可关闭，可与拓扑面板同开 ─────────────────────────── */
  function openTl(){
    if(tlOn) return;
    tlOn = true;
    tl.classList.add('show');
    modal.classList.add('tl-on');
    topo.classList.add('tl-on'); /* 拓扑面板左移让位 */
    document.querySelectorAll('.mtime').forEach(b => b.classList.add('on'));
  }
  function closeTl(){
    if(!tlOn) return;
    tlOn = false;
    tl.classList.remove('show');
    modal.classList.remove('tl-on');
    topo.classList.remove('tl-on');
    document.querySelectorAll('.mtime').forEach(b => b.classList.remove('on'));
  }

  /* 档案弹窗内 TIMELINE 按钮（事件委托：开机克隆会重建按钮） */
  modal.addEventListener('click', e => {
    if(e.target.closest('.mtime')){ tlOn ? closeTl() : openTl(); }
  });
  document.getElementById('tlclose').addEventListener('click', closeTl);

  /* 供左侧导航栏 TIME 项直接打开时间轴；与 SNAP 抓拍面板互斥 */
  window.openTl = () => { if(window.__closeSnap) window.__closeSnap(); openTl(); };
  window.closeTl = closeTl;

  build();
})();
