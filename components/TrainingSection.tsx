import React, { useState, useEffect } from 'react';

const AnimatedNumber = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Ease out function: 1 - (1 - percentage)^3
            // const easeOut = 1 - Math.pow(1 - percentage, 3);

            // Linear as requested ("corran desde cero")
            const currentCount = Math.floor(end * percentage);

            setCount(currentCount);

            if (progress < duration) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    // Custom formatter for the specific space requirement of 13 534
    const format = (n: number) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    return <span>{format(count)}{suffix}</span>;
}

const TrainingSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'market' | 'program'>('market');

    const stats = [
        { label: "Crecimiento de GitHub Copilot", end: 13534, suffix: "%", desc: "(Trece mil porciento 🤯)...La habilidad de más rápido crecimiento en el sector tecnológico." },
        { label: "Eficiencia como Objetivo", end: 72, suffix: "%", desc: "7 de cada 10 ejecutivos priorizan la productividad sobre la reducción de costos." },
        { label: "Brecha de Liderazgo", end: 48, suffix: "%", desc: "Solo la mitad de los líderes están preparados para liderar la transición a la IA." },
        { label: "Inscripciones Globales", end: 11, suffix: "M+", desc: "Personas formándose en IA Generativa hoy." }
    ];

    const tracks = [
        {
            title: "Finanzas Corporativas",
            icon: "account_balance",
            desc: "Domina la automatización de reportes financieros y optimización de flujos de caja con agentes de IA.",
            skills: ["Automatización", "Forecasting", "Eficiencia"]
        },
        {
            title: "Inversiones Inteligentes",
            icon: "trending_up",
            desc: "Implementa modelos predictivos para identificar oportunidades de mercado antes que la competencia.",
            skills: ["Predictive AI", "Market Analysis", "Data Mining"]
        },
        {
            title: "Venture Capital & Scouting",
            icon: "rocket_launch",
            desc: "Utiliza IA para el due diligence masivo y la identificación temprana de unicornios tecnológicos.",
            skills: ["Scouting", "Due Diligence", "Pattern Matching"]
        },
        {
            title: "Análisis de Sentimiento",
            icon: "psychology",
            desc: "Decodifica la percepción de marca y tendencias de consumo en tiempo real usando NLP avanzado.",
            skills: ["NLP", "Brand Equity", "Real-time Data"]
        },
        {
            title: "Políticas Públicas de Inversión",
            icon: "policy",
            desc: "Simula el impacto macroeconómico de políticas de inversión mediante gemelos digitales.",
            skills: ["Simulación", "Macroeconomía", "Gobernanza"]
        }
    ];

    return (
        <section className="min-h-screen bg-black text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-geometric relative overflow-hidden">

            {/* Header */}
            <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-6">
                    <span className="material-symbols-outlined text-sm">school</span>
                    Academia DG Capital
                </div>
                <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                    Lidera la <span className="text-gradient-main">Revolución Financiera</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    La IA Generativa no es el futuro, es el presente. Domina las herramientas que están redefiniendo el capital global.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-16 relative z-10">
                <div className="bg-white/5 p-1 rounded-2xl flex backdrop-blur-md border border-white/10">
                    <button
                        onClick={() => setActiveTab('market')}
                        className={`px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'market'
                            ? 'bg-primary text-black shadow-lg shadow-primary/25'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        Datos del Mercado
                    </button>
                    <button
                        onClick={() => setActiveTab('program')}
                        className={`px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'program'
                            ? 'bg-secondary text-black shadow-lg shadow-secondary/25'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        Programas Especializados
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto relative z-10 min-h-[500px]">

                {/* MARKET DATA VIEW */}
                <div className={`transition-all duration-500 transform ${activeTab === 'market' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 hidden'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-surface-dark border border-white/10 p-8 rounded-3xl hover:border-primary/50 transition-all hover:-translate-y-2 group">
                                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-4 group-hover:from-primary group-hover:to-secondary transition-all">
                                    <AnimatedNumber end={stat.end} suffix={stat.suffix} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{stat.label}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{stat.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">trending_up</span>
                            Habilidades en Crecimiento Explosivo
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {["ChatGPT", "IA Generativa", "Microsoft Copilot", "Agentes de IA", "Prompt Engineering", "Ética de IA", "Google Gemini"].map((skill, i) => (
                                <span key={i} className="px-5 py-2.5 rounded-xl bg-black border border-white/10 text-gray-300 hover:border-primary hover:text-primary transition-colors cursor-default text-sm font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <p className="mt-6 text-xs text-gray-500 uppercase tracking-widest text-right">
                            Fuente: Datos Globales de Aprendizaje 2026
                        </p>
                    </div>
                </div>

                {/* PROGRAM VIEW */}
                <div className={`transition-all duration-500 transform ${activeTab === 'program' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 hidden'}`}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tracks.map((track, idx) => (
                            <div key={idx} className="group relative bg-surface-dark border border-white/10 rounded-3xl p-1 overflow-hidden hover:border-secondary/50 transition-all">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative bg-black/50 rounded-[22px] p-8 h-full flex flex-col">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                                        <span className="material-symbols-outlined text-3xl text-gray-300 group-hover:text-secondary transition-colors">{track.icon}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-secondary transition-colors">{track.title}</h3>
                                    <p className="text-gray-400 mb-6 flex-grow leading-relaxed">
                                        {track.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {track.skills.map((s, i) => (
                                            <span key={i} className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-white/5 text-gray-500 border border-white/5 group-hover:border-secondary/30 group-hover:text-secondary/80 transition-all">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
                                        <span className="text-sm font-bold text-white">Ver Módulos</span>
                                        <span className="material-symbols-outlined text-sm transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TrainingSection;
