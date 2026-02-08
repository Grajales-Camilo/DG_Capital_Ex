import React from 'react';

interface FeaturesProps {
  onNavigate: (page: 'home' | 'training' | 'books' | 'community' | 'investment' | 'auth' | 'dashboard') => void;
}

const Features: React.FC<FeaturesProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: 'school',
      title: 'Formación Especializada',
      description: 'Un ecosistema de aprendizaje donde la banca de inversión converge con la Inteligencia Artificial. Accede a prácticas, laboratorios de IA y módulos estratégicos diseñados para dominar el futuro de las finanzas.',
      linkText: 'Explorar formación',
      targetPage: 'training' as const,
      color: 'primary',
      borderColor: 'hover:border-primary/40',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      glow: 'bg-primary/5',
      textHover: 'text-primary'
    },
    {
      icon: 'hub',
      title: 'Comunidad',
      description: 'Conecta con otros profesionales y estudiantes apasionados por el futuro de las finanzas en nuestro ecosistema digital.',
      linkText: 'Unirse ahora',
      targetPage: 'community' as const,
      color: 'secondary',
      borderColor: 'hover:border-secondary/40',
      iconBg: 'bg-secondary/10',
      iconColor: 'text-secondary',
      glow: 'bg-secondary/5',
      textHover: 'text-secondary'
    },
    {
      icon: 'auto_stories',
      title: 'Recursos Premium', // Corrected title to match file content if it was different, but it seems same.
      description: 'Accede a reportes de mercado, libros, audios, análisis y contenido exclusivo para mantenerte en la vanguardia del sector mediante IA.',
      linkText: '+ Conocimiento',
      targetPage: 'investment' as const,
      color: 'primary',
      borderColor: 'hover:border-primary/40',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      glow: 'bg-primary/5',
      textHover: 'text-primary'
    }
  ];

  return (
    <section className="py-32 bg-surface-dark relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight text-white uppercase">
            Nuestro Enfoque
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-10 rounded-[2.5rem] bg-black border border-white/5 transition-all duration-500 group relative overflow-hidden ${feature.borderColor} hover:-translate-y-2`}
            >
              {/* Background Glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${feature.glow} rounded-full -mr-16 -mt-16 blur-3xl transition-all group-hover:scale-150`}></div>

              {/* Icon */}
              <div className={`w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-white/5`}>
                <span className={`material-symbols-outlined ${feature.iconColor} text-4xl`}>{feature.icon}</span>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-white transition-colors">{feature.title}</h3>
              <p className="text-gray-400 mb-8 leading-relaxed text-sm lg:text-base">
                {feature.description}
              </p>

              <button
                onClick={() => onNavigate(feature.targetPage)}
                className={`${feature.textHover} font-bold flex items-center gap-2 hover:gap-4 transition-all uppercase text-xs tracking-widest bg-transparent border-0 cursor-pointer`}
              >
                {feature.linkText}
                <span className="material-symbols-outlined text-xl">arrow_right_alt</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;