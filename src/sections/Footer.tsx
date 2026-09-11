import { CATEGORIES, ITEMS } from '@/data/archive';

export default function Footer() {
  return (
    <footer className="relative mt-10">
      <div className="metal-panel mx-4 md:mx-8 mb-8 px-6 md:px-10 py-8">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <div className="mono text-[10px] tracking-[0.4em] text-[#565a56]">PANOPTICON EXHIBITION</div>
            <div className="text-2xl font-black tracking-[0.2em] text-[#e6e6de] mt-2 title-glow">监控室</div>
            <div className="mono text-[10px] tracking-[0.3em] text-[#8a8d88] mt-2">
              MONITOR ROOM — B7 · 内容策展与展示
            </div>
          </div>

          <div className="flex gap-10">
            {CATEGORIES.map((c) => (
              <div key={c.key}>
                <a href={`#${c.key}`} className="mono text-[10px] tracking-[0.24em] text-[#8a8d88] hover:text-[#f4f4ec] transition-colors">
                  {c.code} {c.label}
                </a>
                <div className="mono text-[9px] tracking-[0.2em] text-[#565a56] mt-1.5">
                  {ITEMS.filter((i) => i.category === c.key).length} 件档案
                </div>
              </div>
            ))}
          </div>

          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <span className="rec-dot" />
              <span className="mono text-[10px] tracking-[0.3em] text-[#8a8d88]">REC · STANDBY</span>
            </div>
            <div className="mono text-[9px] tracking-[0.2em] text-[#565a56] mt-2 leading-relaxed">
              权力不需要真正行使<br />就已经生效 —— 福柯
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mono text-[9px] tracking-[0.35em] text-[#3c403d] pb-8">
        © 2026 CAASCD-CURATION · YOU ARE BEING WATCHED — AND YOU ARE WATCHING
      </div>
    </footer>
  );
}
