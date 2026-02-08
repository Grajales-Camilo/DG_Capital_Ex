import React, { useState, useEffect } from 'react';

const FloatingControls: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-8 right-8 z-[100] group">
        <div className="absolute bottom-full right-0 mb-6 w-64 bg-black/90 backdrop-blur-xl p-5 rounded-[2rem] shadow-2xl border border-primary/40 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 pointer-events-none">
          <p className="text-sm font-bold text-white mb-2">¿Asistencia Ex?</p>
          <p className="text-xs text-gray-400">Nuestro equipo está online para resolver tus dudas sobre membresías.</p>
        </div>
        <button className="bg-primary text-black w-20 h-20 rounded-[2rem] vibrant-glow flex items-center justify-center hover:scale-110 active:scale-95 transition-all relative">
          <span className="absolute -top-1 -right-1 bg-[#ff3e3e] text-white text-[11px] font-black px-2 py-0.5 rounded-full border-4 border-black animate-pulse">1</span>
          <span className="material-symbols-outlined text-4xl font-bold">chat_bubble</span>
        </button>
      </div>

      {/* Scroll To Top */}
      <button 
        onClick={scrollTop}
        className={`fixed bottom-8 left-8 z-[90] bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-2xl text-gray-text hover:text-white hover:bg-white/10 transition-all duration-300 transform ${
          showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <span className="material-symbols-outlined text-2xl">north</span>
      </button>
    </>
  );
};

export default FloatingControls;