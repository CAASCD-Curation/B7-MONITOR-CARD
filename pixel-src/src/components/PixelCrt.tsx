import type { ArchiveItem } from '@/data/archive';
import { CATEGORIES } from '@/data/archive';

interface Props {
  item: ArchiveItem;
  width: number;   // 屏幕宽度 px
  tilt: number;    // 倾斜角
  offset: number;  // 垂直错位 px
  delay: number;   // 漂浮动画延迟
  onOpen: (item: ArchiveItem) => void;
}

export default function PixelCrt({ item, width, tilt, offset, delay, onOpen }: Props) {
  const cat = CATEGORIES.find((c) => c.key === item.category)!;
  const floatCls = ['f3-a', 'f3-b', 'f3-c'][item.no % 3];
  const height = Math.round(width * 0.78);
  const noSignal = item.noImage || item.broken;

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={`查看《${item.title}》详情`}
      className={`crt3 ${floatCls} bg-transparent border-0 p-0 text-left`}
      style={{
        ['--tilt' as string]: `${tilt}deg`,
        transform: `rotate(${tilt}deg) translateY(${offset}px)`,
        animationDelay: `${delay}s`,
        width,
        margin: '26px 20px',
      }}
    >
      <div className="pixel-border pixel-border--glow p-2">
        <div className="crt3-screen" style={{ height }}>
          {!item.noImage && (
            <img
              src={`img/thumbs/img-${String(item.no).padStart(2, '0')}.jpg`}
              alt={item.title}
              loading="lazy"
              draggable={false}
            />
          )}
          {noSignal && <div className={`crt3-noise ${item.noImage ? 'crt3-off' : ''}`} />}

          {/* 屏幕角标 */}
          <div className="absolute top-1.5 left-1.5 z-[6] flex items-center gap-1.5 pointer-events-none">
            <span className="rec3" style={{ width: 6, height: 6 }} />
            <span className="px-font text-[8px] text-[#7d8078]">
              {String(item.no).padStart(3, '0')}
            </span>
          </div>
          <div className="absolute top-1.5 right-1.5 z-[6] px-font text-[8px] text-[#4a4d48] pointer-events-none">
            {cat.code}
          </div>

          <div className="crt3-label">
            <span className="truncate">《{item.title}》</span>
            {noSignal && <span className="px-font text-[7px] text-[#8a8d88] shrink-0">NO SIGNAL</span>}
          </div>
        </div>
      </div>
    </button>
  );
}
