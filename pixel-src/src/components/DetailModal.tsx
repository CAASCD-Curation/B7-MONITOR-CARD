import { useEffect } from 'react';
import type { ArchiveItem } from '@/data/archive';
import { CATEGORIES } from '@/data/archive';

interface Props {
  item: ArchiveItem | null;
  onClose: () => void;
}

export default function DetailModal({ item, onClose }: Props) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;
  const cat = CATEGORIES.find((c) => c.key === item.category)!;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box pixel-border" onClick={(e) => e.stopPropagation()}>
        {/* 标题栏 */}
        <div className="modal-titlebar">
          <span className="rec3" />
          <span className="px-font text-[10px] text-[#a8b8a0] tracking-wider">
            {cat.code} / NO.{String(item.no).padStart(3, '0')}
          </span>
          <span className="flex-1" />
          <button type="button" className="modal-close px-font" onClick={onClose} aria-label="关闭">
            ✕
          </button>
        </div>

        <div className="p-5 md:p-7">
          {/* 图像区 */}
          <div className="crt3-screen mb-6" style={{ maxWidth: 560, margin: '0 auto 28px', height: 'auto' }}>
            {item.noImage ? (
              <div className="crt3-noise" style={{ position: 'relative', height: 220 }} />
            ) : (
              <img
                src={`img/img-${String(item.no).padStart(2, '0')}.jpg`}
                alt={item.title}
                style={{ width: '100%', height: 'auto', maxHeight: 380, objectFit: 'contain', background: '#000' }}
              />
            )}
          </div>

          {/* 文字区 */}
          <h2 className="title-glow3 text-xl md:text-2xl font-bold text-[#efefe7] tracking-[0.1em] mb-3">
            《{item.title}》
          </h2>

          <div className="px-font text-[10px] leading-[2] text-[#a8b8a0] mb-1">
            {item.author ? `AUTHOR — ${item.author}` : 'UNKNOWN AUTHOR'}
          </div>
          <div className="px-font text-[10px] leading-[2] text-[#7d8078] mb-5">
            {item.year || 'N/A'} · {cat.label} · {cat.en}
            {item.added && <span className="text-[#b8543f]"> · 素材补充条目</span>}
          </div>

          <div className="h-1 w-full mb-5" style={{ background: 'repeating-linear-gradient(90deg,#2a2d30 0 8px,transparent 8px 16px)' }} />

          <p className="text-[14px] leading-[2.1] text-[#b9bcb4]">
            {item.desc}
          </p>

          <div className="mt-7 flex items-center gap-3">
            <span className="rec3" />
            <span className="px-font text-[9px] text-[#4a4d48] tracking-[0.3em]">
              END OF FILE — 点击查看其他屏幕
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
