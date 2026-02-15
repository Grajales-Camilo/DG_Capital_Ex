import React from 'react';
import landingExImg from '@/src/assets/images/LandingEx.png';

interface HeroProps {
  onNavigate: (page: 'home' | 'training' | 'books' | 'community' | 'investment' | 'auth' | 'dashboard') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-geometric">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]"></div>
        <div className="circuit-line top-1/3 left-0 w-1/4"></div>
        <div className="circuit-line top-2/3 right-0 w-1/3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/30 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-8 hover:bg-primary/10 transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Next-Gen Educational Experience
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-8 tracking-tight">
              Transforma tu futuro con <span className="text-gradient-main">educación financiera y tecnológica</span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Domina las herramientas tecnológicas y estrategia en finanzas corporativas que están definiendo la nueva economía digital con una visión de futuro.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-6 justify-center lg:justify-start">
              <button
                onClick={() => onNavigate('investment')}
                className="bg-primary text-black px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all vibrant-glow shadow-primary/20"
              >
                Comenzar Ahora
              </button>
              <button
                onClick={() => onNavigate('training')}
                className="border border-white/10 bg-white/5 backdrop-blur-sm px-10 py-5 rounded-2xl font-bold text-lg text-white hover:bg-white/10 active:scale-95 transition-all border-b-2"
              >
                Ver Formación
              </button>
            </div>
          </div>

          {/* Visuals */}
          <div className="relative flex justify-center items-center mt-12 lg:mt-0">
            <div className="relative w-80 h-80 lg:w-[550px] lg:h-[550px]">
              {/* Animated Rings */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-8 border-2 border-secondary/10 rounded-full animate-spin-slow-reverse"></div>
              <div className="absolute inset-16 border-t-[3px] border-primary/40 rounded-full animate-spin-medium"></div>

              {/* Central Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={landingExImg}
                  alt="DG Capital Platform"
                  style={{ maskImage: 'radial-gradient(circle, black 60%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 100%)' }}
                  className="w-56 h-56 lg:w-80 lg:h-80 object-contain relative z-10 drop-shadow-2xl rounded-[3rem]"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section >
  );
};

export default Hero;