import React from 'react';
import psicologiaDinero from '@/src/assets/images/libros/psicologia-dinero.jpg';
import leccionesInversion from '@/src/assets/images/libros/lecciones-inversion.jpg';
import soloUna from '@/src/assets/images/libros/solo_una.jpg';
import crossing from '@/src/assets/images/libros/crossing.jpg';
import ceroUno from '@/src/assets/images/libros/cero-uno.jpg';
import elemento from '@/src/assets/images/libros/elemento.jpg';
import arteGuerra from '@/src/assets/images/libros/arte-guerra.jpg';

interface Book {
    title: string;
    author: string;
    image: string;
    embedSrc: string;
    isLarge?: boolean; // For video embeds like "Solo una cosa"
}

const BooksSection: React.FC = () => {
    const books: Book[] = [
        {
            title: "La Psicología del Dinero",
            author: "Morgan Housel",
            image: psicologiaDinero,
            embedSrc: "https://open.spotify.com/embed/episode/7nmZyBUYhG5MhbKfBWp3EZ?utm_source=generator",
        },
        {
            title: "Warren y Charlie",
            author: "Javier Caballero",
            image: leccionesInversion,
            embedSrc: "https://open.spotify.com/embed/episode/32pHKcwNIwKEdF5SXBdMQw?utm_source=generator",
        },
        {
            title: "Solo una cosa",
            author: "Gary Keller",
            image: soloUna,
            embedSrc: "https://open.spotify.com/embed/episode/6T200nkxRixTtTPkBYcZn0/video?utm_source=generator",
            isLarge: true // Video format
        },
        {
            title: "Crossing the Chasm",
            author: "Geoffrey Moore",
            image: crossing,
            embedSrc: "https://open.spotify.com/embed/episode/5bWIt17tbEaNWHbdGz6Scj?utm_source=generator",
        },
        {
            title: "De Cero a Uno",
            author: "Peter Thiel",
            image: ceroUno,
            embedSrc: "https://open.spotify.com/embed/episode/5XU6hWtia5CsF8Xd4V1ABl?utm_source=generator",
        },
        {
            title: "El Elemento",
            author: "Ken Robinson",
            image: elemento,
            embedSrc: "https://open.spotify.com/embed/episode/1VrTA15QguPtSuxJurKQJX?utm_source=generator",
        },
        {
            title: "El Arte de la Guerra",
            author: "Sun Tzu",
            image: arteGuerra,
            embedSrc: "https://open.spotify.com/embed/episode/3p25S15GrAFVamQTZ5Pqm1?utm_source=generator",
        }
    ];

    return (
        <section className="min-h-screen bg-black text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-geometric relative overflow-hidden">

            {/* Header */}
            <div className="max-w-7xl mx-auto text-center mb-20 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
                    <span className="material-symbols-outlined text-sm">library_books</span>
                    Biblioteca Esencial
                </div>
                <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                    Análisis de <span className="text-gradient-main">Lecturas Maestras</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    No solo ofrecemos cursos; compartimos ideas de pensadores influyentes.
                    Encuentra análisis sobre estrategia, inversión, negocios y mentalidad.
                    <br />
                    <a
                        href="https://open.spotify.com/show/1P45qYGiz87jkoOcSEDkoR?si=kSVHSXqoSaOhhY5LqGRCxw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-white transition-colors font-bold inline-flex items-center gap-2 mt-4"
                    >
                        <span className="material-symbols-outlined">podcasts</span>
                        Síguenos en Spotify
                    </a>
                </p>
            </div>

            {/* Books Grid */}
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {books.map((book, idx) => (
                        <div
                            key={idx}
                            className={`group bg-surface-dark border border-white/10 rounded-3xl p-6 md:p-8 hover:border-primary/50 transition-all hover:bg-white/5 flex flex-col md:flex-row gap-8 items-center md:items-start ${book.isLarge ? 'lg:col-span-2 lg:flex-row-reverse' : ''}`}
                        >
                            {/* Cover Image */}
                            <div className="relative shrink-0 w-40 md:w-48 aspect-[2/3] rounded-lg overflow-hidden shadow-2xl shadow-black/50 group-hover:shadow-primary/20 transition-all transform group-hover:-translate-y-2 group-hover:rotate-2">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 w-full flex flex-col justify-center h-full">
                                <div className="mb-6 text-center md:text-left">
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-400 font-medium tracking-wide border-b border-white/10 pb-4 inline-block md:block md:w-full">
                                        {book.author}
                                    </p>
                                </div>

                                <div className="w-full rounded-xl shadow-lg bg-black/50 relative">
                                    {/* Spotify Embed */}
                                    <iframe
                                        style={{ borderRadius: '10px', overflow: 'hidden' }}
                                        src={book.embedSrc}
                                        width="107%"
                                        height={book.isLarge ? "352" : "152"}
                                        frameBorder="0"
                                        allowFullScreen
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                        loading="lazy"
                                        className="transition-opacity opacity-90 hover:opacity-100 block"
                                        title={`Spotify embed for ${book.title}`}
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BooksSection;
