import React, { useState } from 'react';
import { supabase } from '../src/lib/supabase';

const AuthSection: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                // Redirect is handled by onAuthStateChange in App.tsx
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                setMessage({
                    type: 'success',
                    text: '¡Revisa tu correo! Te hemos enviado un enlace de confirmación.'
                });
                setEmail('');
                setPassword('');
            }
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: error.message || `Error al ${isLogin ? 'iniciar sesión' : 'registrarse'}.`
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) throw error;
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: error.message || 'Error al iniciar sesión con Google.'
            });
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

            <div className="max-w-md w-full relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
                        <span className="material-symbols-outlined text-sm">lock</span>
                        Acceso Seguro
                    </div>
                    <h2 className="text-3xl font-extrabold mb-2 tracking-tight">
                        {isLogin ? 'Bienvenido de nuevo' : 'Únete a '} <span className="text-gradient-main">DG Capital</span>
                    </h2>
                    <p className="text-gray-400">
                        {isLogin ? 'Ingresa tus credenciales para continuar.' : 'Crea una cuenta para acceder a la comunidad.'}
                    </p>
                </div>

                <div className="bg-surface-dark border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">

                    {message && (
                        <div className={`p-4 rounded-xl mb-6 text-sm flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/50 text-green-200' : 'bg-red-500/10 border border-red-500/50 text-red-200'}`}>
                            <span className="material-symbols-outlined">{message.type === 'success' ? 'check_circle' : 'error'}</span>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleEmailAuth} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 ml-1 mb-2">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                placeholder="tu@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 ml-1 mb-2">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-wide transition-all transform ${loading
                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-primary to-secondary text-black hover:scale-[1.02] shadow-lg hover:shadow-primary/25'}`}
                        >
                            {loading ? <span className="animate-spin inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full mr-2"></span> : null}
                            {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse con Email')}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setMessage(null);
                            }}
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
                            <span className="text-primary font-bold hover:underline">
                                {isLogin ? 'Regístrate aquí' : 'Inicia Sesión'}
                            </span>
                        </button>
                    </div>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-surface-dark text-gray-400">O continúa con</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl font-bold transition-all bg-white text-black hover:bg-gray-100 flex items-center justify-center gap-3 transform hover:scale-[1.02]"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        Google
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AuthSection;
