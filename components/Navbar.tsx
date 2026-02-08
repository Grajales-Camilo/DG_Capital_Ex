import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onNavigate: (page: 'home' | 'training' | 'books' | 'community' | 'investment' | 'auth' | 'dashboard') => void;
  isDarkMode?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, isDarkMode = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleNavClick = (e: React.MouseEvent, item: string) => {
    e.preventDefault();
    if (item === 'Formación') {
      onNavigate('training');
    } else if (item === 'Libros') {
      onNavigate('books');
    } else if (item === 'Comunidad') {
      onNavigate('community');
    } else if (item === 'Inversión') {
      onNavigate('investment');
    } else {
      // For now, other links just go home or do nothing
      onNavigate('home');
    }
    setIsMobileMenuOpen(false);
  };

  const navBgClass = isScrolled || isMobileMenuOpen
    ? (isDarkMode ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-white/80 backdrop-blur-xl border-b border-gray-200')
    : 'bg-transparent border-transparent';

  const textColorClass = isDarkMode ? 'text-gray-text' : 'text-gray-600';
  const hoverColorClass = 'hover:text-primary';

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBgClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="flex items-center">
              <span className="text-2xl font-extrabold text-primary">DG</span>
              <span className={`text-2xl font-bold ml-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Capital <span className="text-primary italic">Ex</span></span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {['Formación', 'Libros', 'Comunidad', 'Inversión'].map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => handleNavClick(e, item)}
                className="text-sm font-medium text-gray-text hover:text-primary transition-colors uppercase tracking-wider"
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => onNavigate('auth')}
              className="bg-primary hover:bg-[#0cf294] text-black px-8 py-2.5 rounded-full font-black text-sm transition-all vibrant-glow-hover uppercase tracking-tighter transform hover:scale-105"
            >
              Entrar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-primary transition-colors p-2"
            >
              <span className="material-symbols-outlined text-3xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-4 py-6 space-y-4 flex flex-col items-center">
          {['Formación', 'Libros', 'Comunidad', 'Inversión'].map((item) => (
            <a
              key={item}
              href="#"
              onClick={(e) => handleNavClick(e, item)}
              className="text-lg font-medium text-gray-text hover:text-primary transition-colors uppercase tracking-wider"
            >
              {item}
            </a>
          ))}
          <button
            onClick={() => {
              onNavigate('auth');
              setIsMobileMenuOpen(false);
            }}
            className="w-full bg-primary hover:bg-[#0cf294] text-black px-8 py-3 rounded-xl font-black text-sm transition-all uppercase tracking-tighter mt-4"
          >
            Entrar
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;