import React, { useState } from 'react';
import { supabase } from '../src/lib/supabase';

const PostCard: React.FC<{ theme: any; isDarkMode: boolean }> = ({ theme, isDarkMode }) => {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(245);

    const handleLike = () => {
        setLiked(!liked);
        setLikesCount(prev => liked ? prev - 1 : prev + 1);
    };

    return (
        <div className={`${theme.surface} border ${theme.inputBorder} rounded-2xl p-6 hover:border-primary/20 transition-all shadow-sm`}>
            {/* Post Header */}
            <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                    <span className="material-symbols-outlined text-xl">verified_user</span>
                </div>
                <div>
                    <h3 className={`font-bold text-sm ${theme.text}`}>DG Capital Ex Moderador</h3>
                    <div className={`flex items-center gap-2 text-xs ${theme.textSecondary}`}>
                        <span>hace 1 mes</span>
                        <span>•</span>
                        <span className={`${isDarkMode ? 'bg-white/5' : 'bg-gray-100'} px-2 py-0.5 rounded text-gray-500`}>Anuncio</span>
                    </div>
                </div>
            </div>

            {/* Post Content */}
            <div className="mb-6">
                <h2 className={`text-xl font-bold mb-3 ${theme.text}`}>Bienvenidos al campus de DG Capital Ex</h2>
                <p className={`${theme.textSecondary} leading-relaxed text-sm mb-4`}>
                    ¡Hola a todos! Estamos emocionados de darles la bienvenida a nuestra nueva plataforma educativa y de comunidad.
                    Aquí podrán conectar con otros estudiantes, compartir sus análisis de mercado, dudas sobre programación y
                    acceder a recursos exclusivos.
                </p>
                <p className={`${theme.textSecondary} leading-relaxed text-sm`}>
                    No olviden revisar las normas de la comunidad y presentarse en el canal general. ¡El futuro financiero comienza hoy!
                </p>
            </div>

            {/* Post Actions */}
            <div className={`flex items-center gap-4 pt-4 border-t ${theme.border}`}>
                <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 transition-colors text-sm px-2 py-1 rounded ${theme.hoverBg} ${liked ? 'text-primary font-bold' : theme.textSecondary + ' hover:text-primary'}`}
                >
                    <span className={`material-symbols-outlined text-lg ${liked ? 'fill-current' : ''}`}>thumb_up</span>
                    <span>{likesCount}</span>
                </button>
                <button className={`flex items-center gap-2 ${theme.textSecondary} hover:text-primary transition-colors text-sm px-2 py-1 rounded ${theme.hoverBg}`}>
                    <span className="material-symbols-outlined text-lg">chat_bubble</span>
                    <span>42 comentarios</span>
                </button>
                <button className={`flex items-center gap-2 ${theme.textSecondary} hover:text-primary transition-colors text-sm px-2 py-1 rounded ${theme.hoverBg} ml-auto`}>
                    <span className="material-symbols-outlined text-lg">share</span>
                    <span>Compartir</span>
                </button>
            </div>
        </div>
    );
};

const Dashboard: React.FC<{ isDarkMode: boolean; toggleTheme: () => void }> = ({ isDarkMode, toggleTheme }) => {
    const [activeTab, setActiveTab] = useState('general');
    const [currentView, setCurrentView] = useState('comunidad');

    const sidebarItems = [
        { icon: 'dashboard', label: 'Mi panel', id: 'panel' },
        { icon: 'groups', label: 'Comunidad', id: 'comunidad' },
        { icon: 'chat', label: 'Mensajes directos', id: 'mensajes' },
        { icon: 'home', label: 'Inicio', id: 'inicio' },
        { icon: 'event', label: 'Eventos', id: 'eventos' },
    ];

    const mySpaceItems = [
        'General',
        'Casos de éxito',
        'Aprender a programar',
        'AI Tools',
        'Inversiones Inteligentes',
        'Venture Capital & Scouting',
        'Análisis de Sentimiento'
    ];

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    // Theme classes helper
    const theme = {
        bg: isDarkMode ? 'bg-background-dark' : 'bg-stone-100',
        surface: isDarkMode ? 'bg-surface-dark' : 'bg-white',
        text: isDarkMode ? 'text-white' : 'text-gray-900',
        textSecondary: isDarkMode ? 'text-gray-400' : 'text-gray-500',
        border: isDarkMode ? 'border-white/5' : 'border-gray-200',
        inputBg: isDarkMode ? 'bg-surface-dark' : 'bg-gray-50',
        hoverBg: isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100',
        inputBorder: isDarkMode ? 'border-white/10' : 'border-gray-200',
        skeletonBg: isDarkMode ? 'bg-white/10' : 'bg-gray-200',
    };

    const renderContent = () => {
        switch (currentView) {
            case 'comunidad':
                return (
                    <>
                        {/* Filters/Tabs */}
                        <div className={`flex items-center gap-6 border-b mb-8 overflow-x-auto pb-1 ${theme.border}`}>
                            {['Recientes', 'Destacados', 'Siguiendo'].map((tab) => (
                                <button
                                    key={tab}
                                    className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap ${tab === 'Destacados'
                                        ? 'text-primary'
                                        : `${theme.textSecondary} hover:text-primary`
                                        }`}
                                >
                                    {tab}
                                    {tab === 'Destacados' && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Feed Content */}
                        <div className="space-y-6 max-w-4xl">
                            {/* Welcome Post Card */}
                            <PostCard theme={theme} isDarkMode={isDarkMode} />

                            {/* Skeleton for more posts (Visual Filler) */}
                            {[1, 2].map((i) => (
                                <div key={i} className={`${theme.surface} border ${theme.border} rounded-2xl p-6 opacity-50`}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-10 h-10 rounded-full ${theme.skeletonBg}`}></div>
                                        <div className="space-y-2">
                                            <div className={`h-3 w-32 ${theme.skeletonBg} rounded`}></div>
                                            <div className={`h-2 w-20 ${theme.skeletonBg} rounded`}></div>
                                        </div>
                                    </div>
                                    <div className="space-y-3 mb-6">
                                        <div className={`h-4 w-3/4 ${theme.skeletonBg} rounded`}></div>
                                        <div className={`h-3 w-full ${theme.skeletonBg} rounded`}></div>
                                        <div className={`h-3 w-5/6 ${theme.skeletonBg} rounded`}></div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className={`h-8 w-16 ${theme.skeletonBg} rounded`}></div>
                                        <div className={`h-8 w-16 ${theme.skeletonBg} rounded`}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                );
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center py-20">
                        <span className={`material-symbols-outlined text-6xl mb-4 ${theme.textSecondary}`}>construction</span>
                        <h2 className={`text-2xl font-bold mb-2 ${theme.text}`}>En Construcción</h2>
                        <p className={`${theme.textSecondary}`}>La sección de {currentView} estará disponible pronto.</p>
                    </div>
                );
        }
    };

    return (
        <div className={`min-h-screen flex pt-20 ${theme.bg} transition-colors duration-300`}>
            {/* Sidebar */}
            <aside className={`w-64 border-r fixed left-0 top-20 bottom-0 overflow-y-auto hidden md:block z-30 ${theme.surface} ${theme.border}`}>
                <div className="p-6 space-y-8">
                    {/* Main Nav */}
                    <nav className="space-y-2">
                        {sidebarItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setCurrentView(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentView === item.id
                                    ? 'bg-primary/10 text-primary font-bold'
                                    : `${theme.textSecondary} ${theme.hoverBg} hover:text-primary`
                                    }`}
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <span className="text-sm">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* My Space Section */}
                    <div>
                        <h3 className={`text-xs font-bold uppercase tracking-wider mb-4 px-4 ${theme.textSecondary}`}>
                            Mi Espacio
                        </h3>
                        <nav className="space-y-1">
                            {mySpaceItems.map((item, idx) => {
                                const itemId = item.toLowerCase().replace(/ /g, '_');
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentView(itemId)}
                                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${currentView === itemId
                                            ? `${isDarkMode ? 'text-white bg-white/5' : 'text-black bg-gray-100'} border-l-2 border-primary`
                                            : `${theme.textSecondary} ${theme.hoverBg} hover:text-primary`
                                            }`}
                                    >
                                        <span className="truncate">{item}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className={`p-4 border-t absolute bottom-0 w-full ${theme.surface} ${theme.border}`}>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all text-sm font-medium"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={`flex-1 md:ml-64 p-6 lg:p-10 ${isDarkMode ? 'bg-black/50' : 'bg-transparent'}`}>
                {/* Content Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <h1 className={`text-3xl font-bold ${theme.text}`}>
                                {currentView === 'comunidad' ? 'Comunidad' : sidebarItems.find(i => i.id === currentView)?.label || 'Mi Espacio'}
                            </h1>
                            {currentView === 'comunidad' && (
                                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/30">
                                    General
                                </span>
                            )}
                        </div>
                        <p className={`text-sm ${theme.textSecondary}`}>
                            {currentView === 'comunidad'
                                ? 'Espacio para discusiones generales y anuncios de la plataforma.'
                                : `Gestión y visualización de ${currentView.replace(/_/g, ' ')}`}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search Bar - Visual only for layout */}
                        <div className="relative hidden md:block group">
                            <span className={`material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors ${theme.textSecondary}`}>search</span>
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className={`${theme.inputBg} ${theme.inputBorder} border rounded-full pl-10 pr-4 py-2.5 text-sm ${theme.text} focus:outline-none focus:border-primary/50 w-64 transition-all`}
                            />
                        </div>

                        <button className={`p-2.5 rounded-full border ${theme.surface} ${theme.inputBorder} ${theme.textSecondary} hover:text-primary ${theme.hoverBg} transition-all relative`}>
                            <span className="material-symbols-outlined text-xl">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-black"></span>
                        </button>

                        <button
                            onClick={toggleTheme}
                            className={`p-2.5 rounded-full border ${theme.surface} ${theme.inputBorder} ${theme.textSecondary} hover:text-primary ${theme.hoverBg} transition-all`}
                        >
                            <span className="material-symbols-outlined text-xl">
                                {isDarkMode ? 'light_mode' : 'dark_mode'}
                            </span>
                        </button>

                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px] cursor-pointer">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                <span className="font-bold text-white text-sm">US</span>
                            </div>
                        </div>
                    </div>
                </header>

                {renderContent()}
            </main>
        </div>
    );
};

export default Dashboard;
