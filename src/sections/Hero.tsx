import { CATEGORIES } from '@/data/archive';

/** 首屏四周悬浮的 CRT 小屏幕（装饰雕塑） */
const FLOATERS = [
  { label: 'CAM-01', code: 'MATRIX', tilt: -7, cls: 'float-a', pos: 'left-[4%] top-[16%]', size: 'w-40 md:w-52', delay: 0 },
  { label: 'CAM-02', code: 'TRUMAN', tilt: 5, cls: 'float-b', pos: 'right-[5%] top-[13%]', size: 'w-36 md:w-48', delay: 1.2, broken: true },
  { label: 'CAM-03', code: 'PANOPTICON', tilt: -4, cls: 'float-c', pos: 'left-[9%] bottom-[20%]', size: 'w-36 md:w-44', delay: 0.6 },
  { label: 'CAM-04', code: 'TELESCREEN', tilt: 8, cls: 'float-b', pos: 'right-[8%] bottom-[23%]', size: 'w-44 md:w-56', delay: 2 },
  { label: 'CAM-05', code: 'SIGNAL ?', tilt: -11, cls: 'float-a', pos: 'left-[26%] top-[7%]', size: 'w-28 md:w-36', delay: 1.8, broken: true },
  { label: 'CAM-06', code: 'GATE A-13', tilt: 6, cls: 'float-c', pos: 'right-[27%] bottom-[9%]', size: 'w-28 md:w-36', delay: 0.9 },
];

function MiniCrt({ f }: { f: (typeof FLOATERS)[number] }) {
  return (
    <div
      className={`absolute ${f.pos} ${f.cls} hidden lg:block opacity-90 hover:opacity-100 transition-opacity`}
      style={{ ['--tilt' as string]: `${f.tilt}deg`, transform: `rotate(${f.tilt}deg)`, animationDelay: `${f.delay}s` }}
    >
      <div className="crt p-1.5" style={{ transform: 'none', animation: 'none' }}>
        <div className={`crt-screen ${f.broken ? '' : 'crt-flicker'}`} style={{ height: 110 }}>
          {f.broken ? (
            <div className="signal-lost mono" style={{ position: 'absolute' }}>
              <span className="text-[9px] tracking-[0.4em]">NO SIGNAL</span>
            </div>
          ) : (
            <div className="relative z-[2] p-2.5">
              <div className="mono text-[8px] tracking-[0.3em] text-[#6f7a72] flex items-center gap-1.5">
                <span className="rec-dot" style={{ width: 5, height: 5 }} /> {f.label}
              </div>
              <div className="mono text-[13px] tracking-[0.24em] text-[#c9cfc6] mt-3">{f.code}</div>
              <div className="mt-3 space-y-1">
                <div className="h-px bg-[#232a25]" />
                <div className="h-px bg-[#1a201c] w-2/3" />
                <div className="h-px bg-[#141a16] w-1/2" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** 环形雷达导航 */
function RingNav() {
  const R = 128;
  return (
    <div className="relative w-[320px] h-[320px] mx-auto select-none">
      {/* 雷达圈 */}
      <div className="absolute inset-0 rounded-full border border-[#22272a]" />
      <div className="absolute inset-[36px] rounded-full border border-[#1b2023]" />
      <div className="absolute inset-[72px] rounded-full border border-[#161a1d]" />
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="radar-sweep absolute inset-0" />
      </div>

      {/* 旋转环 */}
      <div className="ring-wrap absolute inset-0">
        {CATEGORIES.map((c, i) => {
          const angle = (i * 90 - 90) * (Math.PI / 180);
          const x = 160 + R * Math.cos(angle);
          const y = 160 + R * Math.sin(angle);
          return (
            <a
              key={c.key}
              href={`#${c.key}`}
              className="ring-item absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: x, top: y }}
            >
              <span className="flex flex-col items-center gap-1 group">
                <span className="w-3 h-3 rounded-full bg-[#0c0e10] border border-[#4a5054] group-hover:bg-[#f4f4ec] group-hover:shadow-[0_0_14px_rgba(244,244,236,0.7)] transition-all" />
                <span className="mono text-[9px] tracking-[0.24em] text-[#8a8d88] group-hover:text-[#f4f4ec] transition-colors whitespace-nowrap">
                  {c.code}
                </span>
                <span className="text-[11px] text-[#a9aca4] group-hover:text-[#e6e6de] transition-colors whitespace-nowrap">
                  {c.label}
                </span>
              </span>
            </a>
          );
        })}
      </div>

      {/* 圆心 */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <div className="mono text-[9px] tracking-[0.4em] text-[#565a56]">SCAN</div>
        <div className="mono text-[11px] tracking-[0.3em] text-[#9db4a4] mt-1">04 CH</div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden flex flex-col">
      <div className="haze" />
      <div className="perspective-floor" />
      {FLOATERS.map((f) => (
        <MiniCrt key={f.label} f={f} />
      ))}

      {/* 中央标题 */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-24">
        <div className="mono text-[10px] md:text-[11px] tracking-[0.6em] text-[#8a8d88] mb-6 flex items-center gap-4">
          <span className="inline-block h-px w-10 bg-[#2c3134]" />
          SURVEILLANCE · GAZE · PANOPTICON
          <span className="inline-block h-px w-10 bg-[#2c3134]" />
        </div>

        <h1 className="title-glow font-black leading-none text-[#efefe7]" style={{ fontSize: 'clamp(64px, 14vw, 168px)', letterSpacing: '0.08em' }}>
          监控室
        </h1>

        <div className="mono text-[13px] md:text-base tracking-[0.55em] text-[#9db4a4] mt-4 ml-2">
          MONITOR&nbsp;ROOM
        </div>

        <p className="max-w-xl text-[13px] md:text-sm leading-[2] text-[#8a8d88] mt-8">
          暗处凝视明处，被看者不可见监视者。<br />
          一组关于「观看」与「被观看」的档案 —— 电影、绘画、文学与现实中的全景监视。
        </p>

        <div className="flex items-center gap-3 mt-8">
          <span className="chip mono">◉ REC</span>
          <span className="chip mono">CH 01–04</span>
          <span className="chip mono">档案 {49} 件</span>
        </div>
      </div>

      {/* 底部环形导航 */}
      <div className="relative z-10 pb-14 pt-6">
        <RingNav />
        <div className="text-center mono text-[9px] tracking-[0.4em] text-[#565a56] mt-2">
          ▼ SCROLL — 进入监控大厅
        </div>
      </div>
    </section>
  );
}
