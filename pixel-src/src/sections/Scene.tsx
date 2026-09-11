import { useMemo } from 'react';
import PixelCrt from '@/components/PixelCrt';
import type { ArchiveItem } from '@/data/archive';
import { ITEMS } from '@/data/archive';

interface Props {
  onOpen: (item: ArchiveItem) => void;
}

/** 由编号生成稳定的伪随机参数 */
function prand(no: number, salt: number): number {
  const x = Math.sin(no * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export default function Scene({ onOpen }: Props) {
  const layout = useMemo(
    () =>
      ITEMS.map((item, i) => ({
        item,
        width: 190 + Math.round(prand(item.no, 1) * 130),   // 190–320px
        tilt: Math.round((prand(item.no, 2) * 10 - 5) * 2) / 2, // -5° ~ +5°
        offset: Math.round(prand(item.no, 3) * 44 - 22),    // 上下错位
        delay: Math.round(prand(item.no, 4) * 40) / 10,     // 漂浮延迟
        key: i,
      })),
    []
  );

  return (
    <main className="relative z-10 max-w-[1500px] mx-auto px-2 pt-6 pb-32">
      {/* 极简标题（无导航、无侧栏） */}
      <header className="text-center mb-4 select-none">
        <h1 className="title-glow3 px-font text-[#efefe7] leading-none" style={{ fontSize: 'clamp(30px, 6vw, 64px)' }}>
          监控室
        </h1>
        <div className="px-font text-[10px] md:text-xs text-[#a8b8a0] tracking-[0.4em] mt-4">
          MONITOR ROOM · B7
        </div>
        <div className="px-font text-[8px] md:text-[10px] text-[#4a4d48] tracking-[0.25em] mt-3">
          ▼ CLICK A SCREEN — 点击任意屏幕查看档案 ▼
        </div>
      </header>

      {/* 悬浮 CRT 屏幕群 */}
      <div className="flex flex-wrap justify-center items-start">
        {layout.map(({ item, width, tilt, offset, delay }) => (
          <PixelCrt
            key={item.no}
            item={item}
            width={width}
            tilt={tilt}
            offset={offset}
            delay={delay}
            onOpen={onOpen}
          />
        ))}
      </div>

      <footer className="text-center mt-16 select-none">
        <div className="px-font text-[8px] tracking-[0.35em] text-[#3c403d] leading-[2.4]">
          YOU ARE BEING WATCHED<br />— AND YOU ARE WATCHING —
        </div>
      </footer>
    </main>
  );
}
