import type { ArchiveItem } from '@/data/archive';
import { CATEGORIES } from '@/data/archive';

interface Props {
  item: ArchiveItem;
  tilt: number;
  delay?: number;
}

export default function CrtScreen({ item, tilt, delay = 0 }: Props) {
  const cat = CATEGORIES.find((c) => c.key === item.category)!;
  const floatClass = ['float-a', 'float-b', 'float-c'][item.no % 3];

  return (
    <article
      className={`crt ${item.broken ? 'broken' : ''} ${floatClass}`}
      style={{
        ['--tilt' as string]: `${tilt}deg`,
        transform: `rotate(${tilt}deg)`,
        animationDelay: `${delay}s`,
      }}
    >
      <div className="crt-screen crt-flicker">
        <div className="screen-content relative z-[2] p-5 md:p-6">
          {/* 屏幕顶栏 */}
          <div className="flex items-center justify-between gap-3 border-b border-[#1e2421] pb-3 mb-4">
            <div className="flex items-center gap-2 mono text-[10px] tracking-[0.2em] text-[#6f7a72]">
              <span className="rec-dot" style={{ width: 6, height: 6 }} />
              <span>NO.{String(item.no).padStart(3, '0')}</span>
            </div>
            <div className="mono text-[10px] tracking-[0.2em] text-[#565f58]">
              {cat.code} / CAM-{String(item.no).padStart(2, '0')}
            </div>
          </div>

          {/* 标题 */}
          <h3 className="text-lg md:text-xl font-bold text-[#e6e6de] leading-snug tracking-wide title-glow">
            《{item.title}》
          </h3>

          {/* 元信息 */}
          <div className="mono text-[11px] tracking-[0.12em] text-[#9db4a4] mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {item.author && <span>AUTHOR — {item.author}</span>}
            {item.year && <span>{item.year}</span>}
          </div>

          {/* 介绍 */}
          <p className="text-[13px] leading-[1.9] text-[#a9aca4] mt-4">
            {item.desc}
          </p>
        </div>

        {item.broken && (
          <div className="signal-lost mono">
            <div className="text-[11px] tracking-[0.5em] text-[#8a8d88]">SIGNAL LOST</div>
            <div className="text-[9px] tracking-[0.3em] text-[#565a56]">信号丢失 — 画面受损</div>
          </div>
        )}
      </div>
    </article>
  );
}
