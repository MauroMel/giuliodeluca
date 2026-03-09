import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Music, 
  Calendar, 
  User, 
  Image as ImageIcon, 
  Mail, 
  Instagram, 
  Twitter, 
  Youtube, 
  ChevronRight, 
  Menu, 
  X,
  Play,
  ExternalLink,
  Globe
} from 'lucide-react';

// --- Types & Constants ---

type Language = 'EN' | 'IT';

interface Concert {
  date: string;
  location: string;
  venue: string;
  program: string;
  link?: string;
}

interface Album {
  title: string;
  year: string;
  label: string;
  cover: string;
  description: string;
}

const CONCERTS: Concert[] = [
  {
    date: "May 17, 2025",
    location: "Grottaferrata (RM), Italy",
    venue: "Villa Abbamer",
    program: "Piano Recital",
    link: "#"
  },
  {
    date: "May 15, 2025",
    location: "Latina, Italy",
    venue: "Auditorium R. Caetani",
    program: "Piano Recital",
    link: "#"
  },
  {
    date: "Jun 09, 2024",
    location: "Castello di Postignano (PG), Italy",
    venue: "Castello di Postignano",
    program: "Piano Recital",
    link: "#"
  },
  {
    date: "Feb 15, 2024",
    location: "Latina, Italy",
    venue: "Auditorium R. Caetani",
    program: "Piano Recital",
    link: "#"
  },
  {
    date: "Sep 24, 2023",
    location: "Rome, Italy",
    venue: "Sala dei Lecci – Camera musicale Romana",
    program: "Piano Recital",
    link: "#"
  }
];

const DISCOGRAPHY: Album[] = [
  {
    title: "Franz Liszt: Trascrizioni e parafrasi sulle opere di Verdi",
    year: "2013",
    label: "Tactus Records",
    cover: "https://picsum.photos/seed/liszt-verdi/600/600",
    description: "Complete edition of Liszt's transcriptions and paraphrases on Verdi's operas, performed on a historical Steinway."
  },
  {
    title: "Liszt: Italia, sogno d'amore",
    year: "2011",
    label: "Tactus Records",
    cover: "https://picsum.photos/seed/liszt-italia/600/600",
    description: "A collection of Liszt's vocal works dedicated to Italy, with mezzosoprano Chiarastella Onorati."
  },
  {
    title: "Formaldeide",
    year: "2007",
    label: "Vincenzo Ramaglia",
    cover: "https://picsum.photos/seed/formaldeide/600/600",
    description: "Contemporary chamber music by Roman composer Vincenzo Ramaglia, first world recording."
  }
];

const GALLERY = [
  "https://picsum.photos/seed/giulio1/800/1000",
  "https://picsum.photos/seed/giulio2/1000/800",
  "https://picsum.photos/seed/giulio3/800/800",
  "https://picsum.photos/seed/giulio4/1200/800",
  "https://picsum.photos/seed/giulio5/800/1200",
  "https://picsum.photos/seed/giulio6/1000/1000",
];

// --- Components ---

const Navbar = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: lang === 'EN' ? 'Home' : 'Home', href: '#home' },
    { name: lang === 'EN' ? 'Biography' : 'Biografia', href: '#biography' },
    { name: lang === 'EN' ? 'Concerts' : 'Concerti', href: '#concerts' },
    { name: lang === 'EN' ? 'Discography' : 'Discografia', href: '#discography' },
    { name: lang === 'EN' ? 'Media' : 'Media', href: '#media' },
    { name: lang === 'EN' ? 'Contact' : 'Contatti', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-serif tracking-widest uppercase text-gold"
        >
          Giulio De Luca
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] hover:text-gold transition-colors duration-300 font-sans font-light"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => setLang(lang === 'EN' ? 'IT' : 'EN')}
            className="flex items-center space-x-2 text-xs uppercase tracking-widest border border-gold/30 px-3 py-1 rounded-full hover:bg-gold/10 transition-all"
          >
            <Globe size={12} />
            <span>{lang}</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gold" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-piano-black border-b border-gold/10 md:hidden"
          >
            <div className="flex flex-col p-8 space-y-6 items-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest hover:text-gold"
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={() => { setLang(lang === 'EN' ? 'IT' : 'EN'); setIsMobileMenuOpen(false); }}
                className="flex items-center space-x-2 text-xs uppercase tracking-widest border border-gold/30 px-4 py-2 rounded-full"
              >
                <Globe size={14} />
                <span>{lang === 'EN' ? 'Italiano' : 'English'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="text-center mb-16">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 0.6, y: 0 }}
      viewport={{ once: true }}
      className={`text-xs uppercase tracking-[0.4em] mb-4 block ${light ? 'text-ivory' : 'text-gold'}`}
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-4xl md:text-6xl font-serif ${light ? 'text-ivory' : 'text-ivory'}`}
    >
      {title}
    </motion.h2>
    <div className="section-divider" />
  </div>
);

export default function App() {
  const [lang, setLang] = useState<Language>('EN');

  return (
    <div className="min-h-screen selection:bg-gold selection:text-piano-black">
      <Navbar lang={lang} setLang={setLang} />

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/pianist-giulio/1920/1080" 
            alt="Giulio De Luca" 
            className="w-full h-full object-cover opacity-40 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-piano-black/20 via-transparent to-piano-black"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-9xl font-serif mb-6 tracking-tighter">
              Giulio <span className="italic font-light text-gold-gradient">De Luca</span>
            </h1>
            <p className="text-sm md:text-lg uppercase tracking-[0.5em] font-sans font-light max-w-2xl mx-auto opacity-80">
              {lang === 'EN' 
                ? 'Concert Pianist • Recording Artist • Professor' 
                : 'Pianista Concertista • Artista • Docente'}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* --- BIOGRAPHY --- */}
      <section id="biography" className="py-24 md:py-40 bg-ivory text-piano-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/giulio-portrait/800/1200" 
                  alt="Portrait" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 border-2 border-gold/20 -z-10"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-serif">
                {lang === 'EN' ? 'Biography' : 'Biografia'}
              </h2>
              <div className="w-16 h-1 bg-gold"></div>
              
              <div className="prose prose-lg text-piano-black/80 font-body leading-relaxed space-y-6">
                {lang === 'EN' ? (
                  <>
                    <p>
                      Giulio De Luca is an Italian pianist. Born in Naples, he lived and studied there until he moved to Rome, his adopted city. He began studying the piano at the age of seven, showing immediately such an ease for learning it that his teacher remained greatly impressed.
                    </p>
                    <p>
                      He graduated with the highest honors and the "Paolella Scholarship" as the best graduate of the year. He has collaborated with the Teatro San Carlo in Naples as a co-repetiteur and orchestra pianist, performing as a soloist with the San Carlo Orchestra on several occasions.
                    </p>
                    <p>
                      De Luca is considered a specialist in the works of Franz Liszt, particularly his operatic paraphrases. In 2013, he recorded the complete Liszt paraphrases on Verdi's operas for Tactus Records. He is currently a Professor of Piano at the Conservatory in Latina.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Giulio De Luca è un pianista italiano. Nasce a Napoli, e lì vive e studia fino a quando si trasferisce a vivere a Roma, sua città di adozione. Inizia lo studio del pianoforte a 7 anni, mostrando subito una tale facilità di apprendimento che il suo insegnante ne rimase profondamente colpito.
                    </p>
                    <p>
                      Si è diplomato col massimo dei voti e la lode, aggiudicandosi la Borsa di studio “Premio Paolella” come miglior diplomato dell’anno. Ha collaborato con il Teatro San Carlo di Napoli come maestro sostituto e pianista in orchestra, esibendosi più volte come solista con l’Orchestra del San Carlo.
                    </p>
                    <p>
                      De Luca è considerato uno specialista dell'opera di Franz Liszt, in particolare delle sue parafrasi operistiche. Nel 2013 ha inciso per Tactus Records l’Integrale delle parafrasi di Liszt su opere di Verdi. Attualmente è docente di Pianoforte presso il Conservatorio di Latina.
                    </p>
                  </>
                )}
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center space-x-3 text-gold font-sans uppercase tracking-widest text-sm font-medium"
              >
                <span>{lang === 'EN' ? 'Download Full Curriculum' : 'Scarica Curriculum Completo'}</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CONCERTS --- */}
      <section id="concerts" className="py-24 md:py-40 bg-piano-black">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading 
            title={lang === 'EN' ? 'News & Activities' : 'Notizie e Attività'} 
            subtitle={lang === 'EN' ? 'On Stage' : 'Sul Palco'} 
          />

          <div className="space-y-4">
            {CONCERTS.map((concert, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative grid md:grid-cols-[150px_1fr_auto] items-center gap-8 p-8 border-b border-white/5 hover:bg-white/5 transition-all duration-500 rounded-sm"
              >
                <div className="text-gold font-serif text-xl italic">
                  {concert.date}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-serif text-ivory group-hover:text-gold transition-colors">
                    {concert.venue}
                  </h3>
                  <p className="text-sm text-ivory/40 uppercase tracking-widest">
                    {concert.location}
                  </p>
                  <p className="text-sm text-ivory/60 italic mt-2">
                    {concert.program}
                  </p>
                </div>
                <div className="flex items-center">
                  <a 
                    href={concert.link} 
                    className="px-6 py-2 border border-gold/30 rounded-full text-xs uppercase tracking-widest hover:bg-gold hover:text-piano-black transition-all duration-300"
                  >
                    {lang === 'EN' ? 'Details' : 'Dettagli'}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DISCOGRAPHY --- */}
      <section id="discography" className="py-24 md:py-40 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title={lang === 'EN' ? 'Discography' : 'Discografia'} 
            subtitle={lang === 'EN' ? 'Recordings' : 'Incisioni'} 
          />

          <div className="grid md:grid-cols-3 gap-12">
            {DISCOGRAPHY.map((album, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <div className="relative aspect-square mb-8 overflow-hidden shadow-2xl">
                  <img 
                    src={album.cover} 
                    alt={album.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-piano-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="w-16 h-16 rounded-full bg-gold/90 text-piano-black flex items-center justify-center hover:scale-110 transition-transform">
                      <Play fill="currentColor" size={24} />
                    </button>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold/60">
                    {album.label} • {album.year}
                  </span>
                  <h3 className="text-2xl font-serif text-ivory">
                    {album.title}
                  </h3>
                  <p className="text-sm text-ivory/50 max-w-xs mx-auto font-light leading-relaxed">
                    {album.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MEDIA GALLERY --- */}
      <section id="media" className="py-24 md:py-40 bg-piano-black">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title={lang === 'EN' ? 'Gallery' : 'Galleria'} 
            subtitle={lang === 'EN' ? 'Visuals' : 'Immagini'} 
          />

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {GALLERY.map((img, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-sm group cursor-zoom-in"
              >
                <img 
                  src={img} 
                  alt={`Gallery ${index}`} 
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-24 md:py-40 bg-ivory text-piano-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-24">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.4em] text-gold">
                  {lang === 'EN' ? 'Get in Touch' : 'Contatti'}
                </span>
                <h2 className="text-5xl md:text-6xl font-serif">
                  {lang === 'EN' ? 'Contact Information' : 'Informazioni di Contatto'}
                </h2>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-gold mb-1">General Inquiries</h4>
                    <p className="text-xl font-serif">info@giuliodeluca.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-gold mb-1">Teaching</h4>
                    <p className="text-xl font-serif">Conservatorio di Musica "O. Respighi"</p>
                    <p className="text-sm text-piano-black/60">Latina, Italy</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-6 pt-8">
                {[Instagram, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-full bg-piano-black text-ivory flex items-center justify-center hover:bg-gold transition-colors">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <motion.form 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 md:p-16 shadow-2xl rounded-sm space-y-8"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gold">Name</label>
                  <input type="text" className="w-full border-b border-piano-black/10 py-2 focus:border-gold outline-none transition-colors bg-transparent" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gold">Email</label>
                  <input type="email" className="w-full border-b border-piano-black/10 py-2 focus:border-gold outline-none transition-colors bg-transparent" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gold">Subject</label>
                <input type="text" className="w-full border-b border-piano-black/10 py-2 focus:border-gold outline-none transition-colors bg-transparent" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gold">Message</label>
                <textarea rows={4} className="w-full border-b border-piano-black/10 py-2 focus:border-gold outline-none transition-colors bg-transparent resize-none" />
              </div>
              <button className="w-full bg-piano-black text-ivory py-4 uppercase tracking-[0.3em] text-xs font-bold hover:bg-gold transition-colors duration-500">
                {lang === 'EN' ? 'Send Message' : 'Invia Messaggio'}
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 bg-piano-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-serif text-gold tracking-widest uppercase mb-2">Giulio De Luca</h3>
            <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/40">
              © {new Date().getFullYear()} All Rights Reserved.
            </p>
          </div>
          
          <div className="flex space-x-8">
            <a href="#" className="text-[10px] uppercase tracking-widest text-ivory/60 hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] uppercase tracking-widest text-ivory/60 hover:text-gold transition-colors">Terms of Service</a>
          </div>

          <div className="text-[10px] uppercase tracking-[0.3em] text-ivory/40">
            Designed with <span className="text-gold">♥</span> for Giulio De Luca
          </div>
        </div>
      </footer>
    </div>
  );
}
