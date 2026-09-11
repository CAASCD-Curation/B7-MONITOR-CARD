import { useState } from 'react';
import './pixel.css';
import Scene from '@/sections/Scene';
import DetailModal from '@/components/DetailModal';
import type { ArchiveItem } from '@/data/archive';

export default function App() {
  const [active, setActive] = useState<ArchiveItem | null>(null);

  return (
    <div className="relative min-h-screen bg-[#07080a] overflow-hidden">
      {/* 氛围层 */}
      <div className="scene-floor" />
      <div className="vignette3" />
      <div className="grain3" />

      <Scene onOpen={setActive} />

      {/* 详情弹窗（不跳转页面） */}
      <DetailModal item={active} onClose={() => setActive(null)} />
    </div>
  );
}
