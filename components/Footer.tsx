import React from 'react';

interface FooterProps {
  onNavigate: (page: 'home' | 'training' | 'books' | 'community' | 'investment' | 'auth' | 'dashboard') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

          {/* Brand Column */}
          <div className="col-span-1">
            <div className="flex items-center mb-8">
              <span className="text-2xl font-extrabold text-primary">DG</span>
              <span className="text-2xl font-bold text-white ml-1">Capital <span className="text-primary italic">Ex</span></span>
            </div>
            <p className="text-gray-text text-sm mb-8 leading-relaxed">
              Líderes en educación financiera y tecnología para la nueva era digital. Re-imaginando el aprendizaje financiero.
            </p>
            <div className="flex gap-5">
              <a href="#" className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all border border-white/10 group">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
              </a>
              <a href="#" className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-black transition-all border border-white/10 group">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </a>
              <a href="#" className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#e1306c] hover:text-white transition-all border border-white/10 group">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-bold mb-8 text-white uppercase text-xs tracking-[0.3em] flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Plataforma
            </h4>
            <ul className="space-y-4 text-sm text-gray-text">
              <li>
                <button onClick={() => onNavigate('training')} className="hover:text-primary transition-colors flex items-center gap-2 text-left w-full group">
                  <span className="w-0 group-hover:w-2 transition-all h-[1px] bg-primary"></span>
                  Formación
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('books')} className="hover:text-primary transition-colors flex items-center gap-2 text-left w-full group">
                  <span className="w-0 group-hover:w-2 transition-all h-[1px] bg-primary"></span>
                  Contenido libre
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('community')} className="hover:text-primary transition-colors flex items-center gap-2 text-left w-full group">
                  <span className="w-0 group-hover:w-2 transition-all h-[1px] bg-primary"></span>
                  Comunidad Ex
                </button>
              </li>
              <li>
                <button className="hover:text-primary transition-colors flex items-center gap-2 text-left w-full group cursor-not-allowed opacity-70">
                  <span className="w-0 group-hover:w-2 transition-all h-[1px] bg-primary"></span>
                  Mentorías 1:1 (Pronto)
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-bold mb-8 text-white uppercase text-xs tracking-[0.3em] flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full"></span>
              Empresa
            </h4>
            <ul className="space-y-4 text-sm text-gray-text">
              <li><a href="https://www.dgcapital.co/quienes-somos" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 transition-all h-[1px] bg-primary"></span>Quiénes somos</a></li>
              <li><a href="https://www.dgcapital.co/que-hacemos/inversion" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 transition-all h-[1px] bg-primary"></span>Qué hacemos</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 transition-all h-[1px] bg-primary"></span>Contacto</a></li>
              <li><a href="https://www.dgcapital.co/responsabilidad-social" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 transition-all h-[1px] bg-primary"></span>Sostenibilidad</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-bold mb-8 text-white uppercase text-xs tracking-[0.3em] flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Conéctate
            </h4>
            <ul className="space-y-5 text-sm text-gray-text">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">location_on</span>
                <span>Cra. 43 A Nº 1-50 Torre Piso 6,<br />Medellín</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">call</span>
                <span>(+57) 323 4761648</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">alternate_email</span>
                <span>ex@dgcapital.co</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-text uppercase tracking-[0.2em]">
          <p className="text-center md:text-left">
            Copyright © 2026 DG CAPITAL. Todos los derechos reservados.
            <span className="hidden md:inline mx-2">|</span>
            <span className="block md:inline mt-2 md:mt-0">
              Con el poder de <a href="https://grajales-camilo.github.io/Jaguar_House/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-white transition-colors font-bold">Jaguar House</a>
            </span>
          </p>
          <div className="flex gap-10 mt-6 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
            <a href="#" className="hover:text-primary transition-colors">Términos</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;