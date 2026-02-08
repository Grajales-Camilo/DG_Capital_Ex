import React, { useState } from 'react';
import { supabase } from '../src/lib/supabase';

interface FormData {
    nombre_completo: string;
    whatsapp: string;
    email: string;
    pais: string;
    nivel_alcanzado: 'Técnico' | 'Tecnólogo' | 'Profesional' | 'Posgrado' | '';
    preferencias: string[];
}

const CommunitySection: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        nombre_completo: '',
        whatsapp: '',
        email: '',
        pais: '',
        nivel_alcanzado: '',
        preferencias: []
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const [submittedData, setSubmittedData] = useState<{ nombre: string, interes: string } | null>(null);

    const niveles = ['Técnico', 'Tecnólogo', 'Profesional', 'Posgrado'];

    const opcionesPreferencias = [
        'Inversiones',
        'Trading Algorítmico',
        'Venture Capital',
        'Análisis Macroeconómico',
        'Tecnología y Blockchain',
        'Inteligencia Artificial',
        'Políticas públicas',
        'Análisis de sentimientos en RRSS'
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (option: string) => {
        setFormData(prev => {
            const current = prev.preferencias;
            const updated = current.includes(option)
                ? current.filter(item => item !== option)
                : [...current, option];
            return { ...prev, preferencias: updated };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');
        setErrorMessage('');

        // Validación básica
        if (!formData.nivel_alcanzado) {
            setErrorMessage('Por favor selecciona tu nivel académico.');
            setLoading(false);
            setStatus('error');
            return;
        }

        if (formData.preferencias.length === 0) {
            setErrorMessage('Selecciona al menos una preferencia.');
            setLoading(false);
            setStatus('error');
            return;
        }

        try {
            const { error } = await supabase
                .from('comunidad_inscripciones')
                .insert([
                    {
                        nombre_completo: formData.nombre_completo,
                        whatsapp: formData.whatsapp,
                        email: formData.email,
                        pais: formData.pais,
                        nivel_alcanzado: formData.nivel_alcanzado,
                        preferencias: formData.preferencias,
                        created_at: new Date().toISOString()
                    }
                ]);

            if (error) {
                // Manejo de error de duplicados (código Postgres 23505 para unique violation)
                if (error.code === '23505') {
                    throw new Error('Este correo electrónico ya está registrado en nuestra comunidad.');
                }
                throw error;
            }

            // Guardar datos para el mensaje de éxito antes de limpiar
            setSubmittedData({
                nombre: formData.nombre_completo.split(' ')[0], // Primer nombre
                interes: formData.preferencias[0]
            });

            setStatus('success');
            setFormData({
                nombre_completo: '',
                whatsapp: '',
                email: '',
                pais: '',
                nivel_alcanzado: '',
                preferencias: []
            });

        } catch (error: any) {
            console.error('Error al inscribirse:', error);
            setStatus('error');
            setErrorMessage(error.message || 'Ocurrió un error al procesar tu solicitud. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-black text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-geometric relative overflow-hidden flex items-center justify-center">

            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-4xl w-full relative z-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
                        <span className="material-symbols-outlined text-sm">groups</span>
                        Únete al Círculo
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                        Comunidad <span className="text-gradient-main">DG Capital</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Accede a señales exclusivas, networking de alto nivel y recursos de calidad que te permitirán tomar mejores decisiones.
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-surface-dark border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">

                    {status === 'success' && submittedData ? (
                        <div className="text-center py-16 animate-fade-in flex flex-col items-center">
                            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 border border-primary/20 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                                <span className="material-symbols-outlined text-5xl text-primary">verified</span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                                ¡Bienvenido a la comunidad, <span className="text-gradient-main">{submittedData.nombre}</span>!
                            </h3>

                            <p className="text-gray-300 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                                Hemos registrado tu interés en <strong className="text-white">{submittedData.interes}</strong> y otros temas clave. Estás a un paso de acceder a contenido exclusivo.
                            </p>

                            <a
                                href="https://chat.whatsapp.com/LyY3Qo6XsEEIBWnofjzj4O"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-black px-8 py-4 rounded-xl font-black text-lg uppercase tracking-wider transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] mb-8"
                            >
                                <span className="material-symbols-outlined text-2xl">chat</span>
                                Unirme al Grupo de WhatsApp
                            </a>

                            <button
                                onClick={() => setStatus('idle')}
                                className="text-sm text-gray-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5"
                            >
                                Volver al formulario
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Nombre Completo */}
                                <div className="space-y-2">
                                    <label htmlFor="nombre_completo" className="text-sm font-medium text-gray-300 ml-1">Nombre Completo</label>
                                    <input
                                        type="text"
                                        id="nombre_completo"
                                        name="nombre_completo"
                                        required
                                        value={formData.nombre_completo}
                                        onChange={handleChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        placeholder="Tu nombre"
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        placeholder="nombre@ejemplo.com"
                                    />
                                </div>

                                {/* WhatsApp */}
                                <div className="space-y-2">
                                    <label htmlFor="whatsapp" className="text-sm font-medium text-gray-300 ml-1">WhatsApp</label>
                                    <input
                                        type="tel"
                                        id="whatsapp"
                                        name="whatsapp"
                                        required
                                        value={formData.whatsapp}
                                        onChange={handleChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        placeholder="+57 300 123 4567"
                                    />
                                </div>

                                {/* País */}
                                <div className="space-y-2">
                                    <label htmlFor="pais" className="text-sm font-medium text-gray-300 ml-1">País de Residencia</label>
                                    <input
                                        type="text"
                                        id="pais"
                                        name="pais"
                                        required
                                        value={formData.pais}
                                        onChange={handleChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        placeholder="Colombia, México, España..."
                                    />
                                </div>
                            </div>

                            {/* Nivel Alcanzado */}
                            <div className="space-y-2">
                                <label htmlFor="nivel_alcanzado" className="text-sm font-medium text-gray-300 ml-1">Nivel Académico Alcanzado</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {niveles.map((nivel) => (
                                        <label
                                            key={nivel}
                                            className={`cursor-pointer rounded-xl border px-4 py-3 text-center transition-all ${formData.nivel_alcanzado === nivel
                                                ? 'bg-primary/20 border-primary text-primary font-bold shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                                                : 'bg-black/30 border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/5'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="nivel_alcanzado"
                                                value={nivel}
                                                checked={formData.nivel_alcanzado === nivel}
                                                onChange={handleChange}
                                                className="hidden"
                                            />
                                            {nivel}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Preferencias */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-300 ml-1">Intereses Principales (Selecciona varios)</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {opcionesPreferencias.map((opcion) => (
                                        <label
                                            key={opcion}
                                            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group"
                                        >
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${formData.preferencias.includes(opcion)
                                                ? 'bg-primary border-primary'
                                                : 'border-gray-500 group-hover:border-primary'
                                                }`}>
                                                {formData.preferencias.includes(opcion) && (
                                                    <span className="material-symbols-outlined text-black text-sm font-bold">check</span>
                                                )}
                                            </div>
                                            <input
                                                type="checkbox"
                                                value={opcion}
                                                checked={formData.preferencias.includes(opcion)}
                                                onChange={() => handleCheckboxChange(opcion)}
                                                className="hidden"
                                            />
                                            <span className={`text-sm ${formData.preferencias.includes(opcion) ? 'text-white font-medium' : 'text-gray-400'
                                                }`}>
                                                {opcion}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Error Message */}
                            {status === 'error' && (
                                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200 text-sm flex items-center gap-2">
                                    <span className="material-symbols-outlined">error</span>
                                    {errorMessage}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 rounded-xl font-black uppercase tracking-wider transition-all transform ${loading
                                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-primary to-secondary text-black hover:scale-[1.02] shadow-lg hover:shadow-primary/25'
                                    }`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full"></span>
                                        Procesando...
                                    </span>
                                ) : (
                                    'Unirme a la Comunidad'
                                )}
                            </button>

                            <p className="text-center text-xs text-gray-500">
                                Al registrarte aceptas nuestra política de privacidad y el tratamiento de datos.
                            </p>

                        </form>
                    )}

                </div>
            </div>
        </section>
    );
};

export default CommunitySection;
