import { useEffect, useState } from 'react';
import { CATEGORIES } from '@/data/archive';

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

export default function ControlBar() {
  const now = useClock();
  const pad = (n: number) => String(n).padStart(2, '0');
  const stamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 metal-panel">
      <div className="flex items-center justify-between px-4 md:px-8 h-12">
        <a href="#top" className="flex items-center gap-3">
          <span className="rec-dot" />
          <span className="mono text-[11px] tracking-[0.3em] text-[#d7d7d0]">MONITOR ROOM</span>
          <span className="mono text-[11px] tracking-[0.3em] text-[#565a56] hidden sm:inline">监控室 · 内容策展</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {CATEGORIES.map((c) => (
            <a
              key={c.key}
              href={`#${c.key}`}
              className="mono text-[10px] tracking-[0.2em] text-[#8a8d88] hover:text-[#f4f4ec] px-3 py-1.5 border border-transparent hover:border-[#2c3134] transition-colors"
            >
              {c.code}
            </a>
          ))}
        </nav>

        <div className="mono text-[10px] tracking-[0.18em] text-[#8a8d88] tabular-nums">
          {stamp}
        </div>
      </div>
      <div className="section-rule" />
    </header>
  );
}
