import React from 'react';

interface InvestmentSectionProps {
    onNavigate: (page: 'home' | 'training' | 'books' | 'community' | 'investment' | 'auth' | 'dashboard') => void;
}

const InvestmentSection: React.FC<InvestmentSectionProps> = ({ onNavigate }) => {
    const plans = [
        {
            title: "Free",
            description: "Para quienes prefieren dedicarse a una cosa a la vez.",
            price: "USD 0",
            period: "",
            features: [
                "Acceso a la comunidad",
                "Recursos gratuitos de calidad",
                "Actualización semanal sobre sus temas de interés"
            ],
            buttonText: "Elegir Free",
            highlight: false
        },
        {
            title: "Pro",
            description: "Para quienes buscan aumentar significativamente sus habilidades fintech",
            price: "USD 15,00",
            period: "/mes",
            features: [
                "Todo lo de Free",
                "Acceso a todos los cursos",
                "Acceso ilimitado a recursos exclusivos: LabIA, Talleres, Webinars",
                "Material adicional para mejorar el aprendizaje",
                "Comunidad privada",
                "Soporte personalizado"
            ],
            buttonText: "Elegir Pro",
            highlight: true
        },
        {
            title: "Pro Unique",
            description: "Compra cada curso de manera individual",
            price: "USD 120,00",
            period: "/pago único",
            features: [
                "Accede de por vida a los cursos exclusivos y al material de apoyo",
                "Test de validación de conocimientos",
                "Un mes de acceso a la comunidad privada",
                "*Por cada curso que compres, USD 20 van a nuestros programas de alfabetización digital rural"
            ],
            buttonText: "Comprar cursos",
            highlight: false
        }
    ];

    return (
        <section className="min-h-screen bg-black text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-geometric relative overflow-hidden flex items-center justify-center">

            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl w-full relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
                        <span className="material-symbols-outlined text-sm">payments</span>
                        Planes de Inversión
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Invierte en más <span className="text-gradient-main">Conocimiento</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Elige el plan que mejor se adapte a tus objetivos y comienza a dominar las herramientas que están definiendo el mercado laboral del futuro.
                    </p>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`relative group rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full bg-surface-dark border border-white/10 hover:border-primary/30 shadow-lg`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 inset-x-0 flex justify-center">
                                    <span className="bg-primary text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-primary/25">
                                        Más Popular
                                    </span>
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className={`text-2xl font-bold mb-2 text-white`}>
                                    {plan.title}
                                </h3>
                                <p className="text-gray-400 text-sm min-h-[40px]">
                                    {plan.description}
                                </p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-end gap-1">
                                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                                    <span className="text-gray-500 font-medium mb-1">{plan.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8 flex-grow">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                                        {feature.startsWith('*') ? (
                                            <span className="text-lg shrink-0 w-[1.125rem] text-center">💚</span>
                                        ) : (
                                            <span className={`material-symbols-outlined text-lg shrink-0 ${feature.startsWith('No incluye') ? 'text-red-500' : 'text-primary'
                                                }`}>
                                                {feature.startsWith('No incluye') ? 'close' : 'check'}
                                            </span>
                                        )}
                                        <span className={feature.startsWith('No incluye') ? 'text-gray-500' : ''}>
                                            {feature.startsWith('*') ? (
                                                <a href="https://grajales-camilo.github.io/Fundacion_AG/" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline transition-colors">
                                                    {feature.substring(1)}
                                                </a>
                                            ) : feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => onNavigate('auth')}
                                className={`w-full py-4 rounded-xl font-black uppercase tracking-wider transition-all transform hover:scale-[1.02] bg-primary hover:bg-[#0cf294] text-black shadow-lg shadow-primary/10 hover:shadow-primary/25`}
                            >
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-400 mb-6 text-sm">También puedes pagar de forma segura con</p>
                    <a
                        href="https://www.paypal.com/ncp/payment/UBFGNX72CJUHE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block hover:opacity-80 transition-opacity"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                            alt="Pagar con PayPal"
                            className="h-10 md:h-12 mx-auto bg-white/10 rounded-full px-6 py-2 border border-white/10 backdrop-blur-sm"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default InvestmentSection;
