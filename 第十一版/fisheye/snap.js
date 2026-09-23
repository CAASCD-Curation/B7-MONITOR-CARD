/* ── SNAP 抓拍面板 ───────────────────────────
   html2canvas 全页快照：快门闪光 → 自动下载全图 PNG →
   缩略图存入本机相册（localStorage，最多 12 张，可逐张删除/下载）。 */
(function(){
  'use strict';

  const panel  = document.getElementById('snap');
  const grid   = document.getElementById('snapGrid');
  const btn    = document.getElementById('snapBtn');
  const status = document.getElementById('snapStatus');
  const flash  = document.getElementById('snapFlash');
  if(!panel || !grid || !btn) return;

  let on = false;
  const KEY = 'b10_snaps_v1';
  const MAX = 12;

  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch(e){ return []; } };
  const save = list => {
    try { localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX))); return true; }
    catch(e){ return false; }
  };

  /* ── 面板开关（左侧导航栏 SNAP 项调用；与 TIME 时间轴面板互斥） ── */
  window.__openSnap = () => { if(on) return; if(window.closeTl) window.closeTl(); on = true; panel.classList.add('show'); render(); };
  const closeSnap = () => { on = false; panel.classList.remove('show'); };
  window.__closeSnap = closeSnap;
  document.getElementById('snapclose').addEventListener('click', closeSnap);

  /* ── 相册渲染 ── */
  function render(){
    const list = load();
    grid.innerHTML = '';
    if(!list.length){
      const em = document.createElement('div');
      em.className = 'snap-empty';
      em.textContent = 'NO DATA — 暂无抓拍记录';
      grid.appendChild(em);
      return;
    }
    list.forEach((s, i) => {
      const d = document.createElement('div');
      d.className = 'snapitem';
      const img = document.createElement('img');
      img.src = s.thumb;
      img.alt = '快照 ' + s.time;
      img.addEventListener('click', () => download(s.thumb, s.time)); /* 相册中下载该张预览图 */
      const t = document.createElement('span');
      t.className = 'si-time';
      t.textContent = s.time;
      const del = document.createElement('span');
      del.className = 'si-del';
      del.title = '删除此快照';
      del.textContent = '✕';
      del.addEventListener('click', ev => {
        ev.stopPropagation();
        const l = load(); l.splice(i, 1); save(l); render();
        status.textContent = 'DELETED — 已删除 1 张快照（剩余 ' + l.length + ' 张）';
      });
      d.appendChild(img); d.appendChild(t); d.appendChild(del);
      grid.appendChild(d);
    });
  }

  const stamp = () => {
    const d = new Date(), p = n => String(n).padStart(2, '0');
    return d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '-' +
           p(d.getHours()) + p(d.getMinutes()) + p(d.getSeconds());
  };

  function download(dataURL, time){
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'B10-SNAP-' + time + '.png';
    document.body.appendChild(a); a.click(); a.remove();
  }

  /* ── 抓拍：视口快照（隐藏自定义光标/导航，避免入镜） ── */
  btn.addEventListener('click', () => {
    if(typeof window.html2canvas !== 'function'){
      status.textContent = 'ERROR — 抓拍组件未加载';
      return;
    }
    btn.disabled = true;
    status.textContent = 'CAPTURING — 正在抓拍…';
    /* 快门闪光（抓拍瞬间通过 body.snapping 隐藏自身，不入镜） */
    flash.classList.remove('go'); void flash.offsetWidth; flash.classList.add('go');
    document.body.classList.add('snapping');
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    window.html2canvas(document.body, {
      backgroundColor: '#07080a',
      scale: 1,
      logging: false,
      x: 0, y: y,
      width: window.innerWidth,
      height: window.innerHeight,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
      scrollX: 0, scrollY: 0
    }).then(canvas => {
      const full = canvas.toDataURL('image/png');
      /* 相册缩略图（360px JPEG，控制 localStorage 体积） */
      const tw = 360, th = Math.max(1, Math.round(canvas.height * tw / canvas.width));
      const tc = document.createElement('canvas');
      tc.width = tw; tc.height = th;
      tc.getContext('2d').drawImage(canvas, 0, 0, tw, th);
      const thumb = tc.toDataURL('image/jpeg', 0.72);
      const time = stamp();
      const list = load();
      list.unshift({ time, thumb });
      const ok = save(list);
      download(full, time);   /* 全图 PNG 直接下载到本地 */
      status.textContent = ok
        ? 'SAVED — ' + time + ' · 全图已下载，相册新增 1 张'
        : 'SAVED — ' + time + ' · 全图已下载（相册容量已满，未能保存预览）';
      render();
    }).catch(err => {
      status.textContent = 'ERROR — 抓拍失败：' + (err && err.message ? err.message : err);
    }).finally(() => {
      document.body.classList.remove('snapping');
      btn.disabled = false;
    });
  });

  render();
})();
