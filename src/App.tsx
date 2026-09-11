import './crt.css';
import { useEffect } from 'react';
import ControlBar from '@/components/ControlBar';
import Hero from '@/sections/Hero';
import ArchiveSection from '@/sections/ArchiveSection';
import Footer from '@/sections/Footer';
import { CATEGORIES } from '@/data/archive';

export default function App() {
  // 处理带锚点的直达链接：React 渲染完成后滚动到目标区段
  useEffect(() => {
    const id = window.location.hash.replace('#', '');
    if (!id) return;
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
    }, 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#060708]">
      {/* 氛围层 */}
      <div className="vignette-overlay" />
      <div className="grain-overlay" />
      <div className="scanline-overlay" />

      <ControlBar />

      <main>
        <Hero />
        {CATEGORIES.map((c, i) => (
          <ArchiveSection key={c.key} category={c} index={i} />
        ))}
      </main>

      <Footer />
    </div>
  );
}
