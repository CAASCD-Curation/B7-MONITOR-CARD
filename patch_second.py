import io, re

src = io.open('第三版-异格/index.html', encoding='utf-8').read()
s = src

# ── 1) 去掉卡片界面的标题 header ───────────────────────────
s = re.sub(r'<header>.*?</header>\s*', '', s, count=1, flags=re.S)

# ── 2) CSS：无尽循环行 + 暂停 + 退出按钮 ──────────────────
loop_css = '''
/* ── 无尽循环卡片流 ─────────────────────────── */
.loops{
  position:relative; z-index:10;
  max-width:100vw; margin:0 auto; padding:40px 0 10px;
  overflow:hidden;
  mask-image:linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent);
  -webkit-mask-image:linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent);
}
.loop-row{overflow:hidden; padding:14px 0}
.loop-track{
  display:flex; width:max-content; will-change:transform;
  animation:loop-scroll var(--dur,42s) linear infinite;
  animation-direction:var(--dir,normal);
}
.loop-row:hover .loop-track{animation-play-state:paused}
.loops.paused .loop-track{animation-play-state:paused}
@keyframes loop-scroll{
  from{transform:translateX(0)}
  to{transform:translateX(-50%)}
}
.loop-track .crt{
  flex:0 0 auto; width:236px;
  margin:0 18px;
}
@media(max-width:760px){.loop-track .crt{width:180px;margin:0 12px}}

/* ── 退出监控按钮 ─────────────────────────── */
.exit-btn{
  position:fixed; top:16px; right:18px; z-index:250;
  font-family:inherit; font-size:12px; letter-spacing:.24em;
  color:#a8b8a0; background:#0c0e10;
  border:1px solid #2a2d30; border-radius:4px;
  padding:8px 14px; cursor:pointer;
  box-shadow:0 4px 14px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.06);
}
.exit-btn:hover{color:#efefe7; border-color:#4a5054; background:#14171a}
.exit-btn .pwr{color:#b8543f; margin-right:8px}
</style>'''
s = s.replace('</style>', loop_css, 1)

# ── 3) HTML：stage 换成 loops，加退出按钮 ─────────────────
s = s.replace('<main class="stage" id="stage"></main>',
              '<main class="loops" id="loops"></main>')
s = s.replace('<footer>',
              '<button type="button" class="exit-btn" id="exitBtn"><span class="pwr">⏻</span>退出监控</button>\n\n<footer>', 1)

# ── 4) JS：渲染改成分行无缝循环 ───────────────────────────
old_render = re.search(r"items\.forEach\(\(it, i\) => \{.*?stage\.appendChild\(el\);\n\}\);", s, re.S)
assert old_render, 'render block not found'
new_render = '''function makeCrt(it){
  const cat = window.CATEGORIES.find(c => c.key === it.category);
  const el = document.createElement('button');
  el.type = 'button';
  el.className = 'crt' + (it.broken ? ' broken' : '');
  el.style.setProperty('--tilt', ((rnd() * 10 - 5)).toFixed(2) + 'deg');
  el.style.setProperty('--tx', ((rnd() * 18 - 9)).toFixed(1) + 'px');
  el.style.setProperty('--ty', ((rnd() * 14 - 7)).toFixed(1) + 'px');
  el.style.setProperty('--sc', (0.93 + rnd() * 0.11).toFixed(3));
  el.style.setProperty('--fdur', (5 + rnd() * 4).toFixed(2) + 's');
  el.style.setProperty('--fdel', (-rnd() * 6).toFixed(2) + 's');
  el.style.setProperty('--fdrop', (-(6 + rnd() * 8)).toFixed(1) + 'px');
  el.style.setProperty('--lit', (0.86 + rnd() * 0.16).toFixed(2));
  el.setAttribute('aria-label', `查看《${it.title}》详情`);
  el.innerHTML = `
    <div class="bezel">
      <div class="screen">
        ${it.broken ? '<div class="static-fill"></div>' : (it.noImage ? '<div class="static-fill"></div>' : `<img loading="lazy" src="img/img-${String(it.no).padStart(2,'0')}.jpg" alt="${it.title}">`)}
        <div class="rollband"></div>
      </div>
    </div>`;
  el.addEventListener('click', () => openCase(it, cat));
  return el;
}

/* 分行无缝循环：5 行 × 10 张，内容双份复制，左右往返滚动 */
const loops = document.getElementById('loops');
const ROWS = 5, PER = 10;
for(let r = 0; r < ROWS; r++){
  const row = document.createElement('div');
  row.className = 'loop-row';
  const track = document.createElement('div');
  track.className = 'loop-track';
  track.style.setProperty('--dur', (38 + r * 8) + 's');
  track.style.setProperty('--dir', r % 2 ? 'reverse' : 'normal');
  for(let copy = 0; copy < 2; copy++){
    for(let c = 0; c < PER; c++){
      track.appendChild(makeCrt(items[(r * PER + c) % items.length]));
    }
  }
  row.appendChild(track);
  loops.appendChild(row);
}'''
s = s[:old_render.start()] + new_render + s[old_render.end():]

# 旧 stage 引用清理
s = s.replace("const stage = document.getElementById('stage');\n", "const loops = document.getElementById('loops');\n", 1)
s = s.replace("/* 回到界面：打乱卡片顺序与布局 */\n    shuffleStage(); ", "/* 回到界面：继续循环滚动 */\n    loops.classList.remove('paused'); ")
# 打开弹窗时暂停滚动
s = s.replace("modal.classList.add('show');", "loops.classList.add('paused');\n    modal.classList.add('show');", 1)

# ── 5) 入场界面支持重复进入（反向流程用） ─────────────────
s = s.replace('''    setTimeout(() => {
      entry.style.display = 'none';
      document.body.classList.remove('locked');
    }, 860);''', '''    setTimeout(() => {
      entry.style.display = 'none';
      document.body.classList.remove('locked');
    }, 860);
  };
  /* 反向流程：从卡片界面回到入场界面 */
  window.__resetEntry = () => {
    entered = false;
    entry.classList.remove('exiting');
    entry.style.display = 'flex';
    document.body.classList.add('locked');''', 1)
# 删掉原来 enter 定义的多余尾部（原 enter 以 }; 结束，现在结构变了，检查）
# 原代码片段为：  const enter = () => { ... };  我们已经把结尾改入 reset 定义，需补一个 enter 的结束
# 上面替换把 "};" 留给了 __resetEntry 的开头来定义 enter 结束，实际结果：enter 的 }; 变成 __resetEntry 前的闭合，验证语法靠后面 node 检查。

# ── 6) 退出按钮：CRT 关机音效 + 雪花屏 → 回到入场界面 ─────
exit_js = '''/* ── 反向流程：退出监控 ─────────────────────────── */
document.getElementById('exitBtn').addEventListener('click', () => {
  playPowerOff();
  burst.style.display = 'block';
  setTimeout(() => {
    burst.style.display = 'none';
    window.__resetEntry();
  }, 620);
});

/* 深链：#case-N 直接打开对应档案 */'''
s = s.replace('/* 深链：#case-N 直接打开对应档案 */', exit_js, 1)

io.open('第三版-二异/index.html', 'w', encoding='utf-8').write(s)
print('二异 written, bytes:', len(s))
