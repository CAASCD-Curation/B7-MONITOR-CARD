import { useMemo } from 'react';
import CrtScreen from '@/components/CrtScreen';
import type { ArchiveItem, Category } from '@/data/archive';
import { ITEMS } from '@/data/archive';

/** 由编号生成稳定的小数倾斜角 */
function tiltOf(no: number, idx: number): number {
  const v = Math.abs(Math.sin(no * 12.9898 + idx * 78.233)) * 10000;
  return (v % 5) - 2.5; // -2.5° ~ +2.5°
}

interface Props {
  category: Category;
  index: number;
}

export default function ArchiveSection({ category, index }: Props) {
  const items = useMemo<ArchiveItem[]>(
    () => ITEMS.filter((i) => i.category === category.key),
    [category.key]
  );

  return (
    <section id={category.key} className="relative max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-10 scroll-mt-14">
      {/* 区段标题：金属面板 */}
      <div className="metal-panel px-5 md:px-8 py-5 mb-14 flex flex-wrap items-center gap-x-6 gap-y-3">
        <span className="rivet" />
        <span className="mono text-[11px] tracking-[0.3em] text-[#9db4a4]">{category.code}</span>
        <h2 className="text-xl md:text-2xl font-bold tracking-[0.14em] text-[#e6e6de]">
          {category.label}
        </h2>
        <span className="mono text-[10px] tracking-[0.3em] text-[#565a56]">{category.en}</span>
        <span className="flex-1" />
        <span className="chip mono">{String(items.length).padStart(2, '0')} ITEMS</span>
        <span className="chip mono hidden md:inline-flex">SECTOR {String(index + 1).padStart(2, '0')}</span>
        <span className="rivet" />
      </div>

      {/* CRT 屏幕墙 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-14">
        {items.map((item, i) => (
          <div key={item.no} className={i % 3 === 1 ? 'md:translate-y-8' : ''}>
            <CrtScreen item={item} tilt={tiltOf(item.no, i)} delay={(i % 5) * 0.7} />
          </div>
        ))}
      </div>

      <div className="section-rule mt-20" />
    </section>
  );
}
