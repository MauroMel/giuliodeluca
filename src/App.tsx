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
import curriculumDocx from '../documents/GiulioDeLuca_Curriculum_breve.docx';

// --- Types & Constants ---

type Language = 'EN' | 'IT';
type View = 'home' | 'full-biography' | 'album-detail';

interface Concert {
  date: string;
  location: string;
  venue: string;
  program: string;
  link?: string;
}

interface Album {
  slug: string;
  title: string;
  year: string;
  label: string;
  cover: string;
  description: string;
  subtitle: Record<Language, string>;
  longDescription: Record<Language, string[]>;
  previews: {
    title: string;
    duration: string;
    src: string;
  }[];
}

interface ViewState {
  view: View;
  albumSlug?: string;
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
    slug: "liszt-verdi",
    title: "Franz Liszt: Trascrizioni e parafrasi sulle opere di Verdi",
    year: "2013",
    label: "Tactus Records",
    cover: "./img/CD01.jpg",
    description: "Complete edition of Liszt's transcriptions and paraphrases on Verdi's operas, performed on a historical Steinway.",
    subtitle: {
      IT: "Tactus Records • Edizione integrale dedicata a Verdi",
      EN: "Tactus Records • Complete edition dedicated to Verdi"
    },
    longDescription: {
      IT: [
        "Può un pianista italiano “celebrare” degnamente il più grande compositore italiano dell’Ottocento, che però non ha scritto nulla di veramente significativo per pianoforte, essendo la sua universalmente riconosciuta grandezza concentrata nell’ambito del teatro musicale? Può, a patto che la sua celebrazione avvenga per via indiretta, ricorrendo cioè a colui che, da musicista cosmopolita, omaggiava i suoi grandi contemporanei di tutta Europa.",
        "Il modo in cui Liszt osserva l’arte di Giuseppe Verdi, figura di musicista da lui assai lontano nei modi e nelle attitudini, è assai significativo, soprattutto se consideriamo cosa egli sceglie, tra le innumerevoli sfaccettature del mondo musicale e drammaturgico del Nostro, per ricavarne le sue meravigliose fantasie e trascrizioni per pianoforte che costituiscono il contenuto del presente disco.",
        "Non troviamo infatti in esse alcuna traccia del Verdi morale, o tantomeno del Verdi patriottico, bensì una inesausta declinazione del tema viscerale del Romanticismo europeo: l’amore, declinato in tutte le sue forme, da quello erotico e libertino del Duca di Mantova nel Rigoletto, a quello pronto a perdersi nel sacrificio della vita di Leonora nel Trovatore, dalla passione rarefatta che si spegne in una morte accomunata nel finale dell’Aida, all’afflato mistico della preghiera di Hélène in Jérusalem e all’amore paterno nella benedizione finale del Simon Boccanegra morente.",
        "Questo disco nasce anche da un incontro fortunato: quello con lo strumento magnifico che qui viene suonato, un prezioso Steinway del 1878, riportato magicamente in vita di recente, come il lampadario del Fantasma dell’opera, per restituirci, in tutta la gamma variegata dei suoi registri, il suono, ma ancor più il sapore ed il gusto di un’epoca in cui l’espressione dei sentimenti era realizzata in una maniera sempre diretta, persino ingenua direi, e palpitante di vita.",
        "(Dalla mia nota inclusa nel libretto del disco)."
      ],
      EN: [
        "Can an Italian pianist worthily celebrate the greatest Italian composer of the nineteenth century, who however wrote nothing truly significant for the piano, since his universally acknowledged greatness is concentrated in the realm of musical theatre? He can, provided that the celebration takes place indirectly, turning instead to the musician who, as a cosmopolitan artist, paid tribute to his great contemporaries throughout Europe.",
        "The way Liszt looks at the art of Giuseppe Verdi, a composer quite distant from him in manner and temperament, is extremely significant, especially if we consider what he chooses, from the countless facets of Verdi's musical and dramatic world, in order to fashion the marvellous fantasies and piano transcriptions that make up the content of this recording.",
        "In them we find no trace of a moral Verdi, nor of a patriotic Verdi, but rather an inexhaustible variation on the visceral theme of European Romanticism: love, explored in all its forms, from the erotic and libertine love of the Duke of Mantua in Rigoletto, to the love ready to lose itself in Leonora's sacrifice of life in Il Trovatore, from the rarefied passion that fades into a shared death at the end of Aida, to the mystical uplift of Hélène's prayer in Jérusalem and the paternal love in the final blessing of the dying Simon Boccanegra.",
        "This recording also arose from a fortunate encounter: that with the magnificent instrument heard here, a precious 1878 Steinway, recently and almost magically brought back to life, like the chandelier in The Phantom of the Opera, to restore to us, across the rich range of its registers, not only the sound but even more the flavour and character of an age in which the expression of feeling was always direct, one might even say ingenuous, and vibrant with life.",
        "(From my note included in the album booklet)."
      ]
    },
    previews: [
      { title: "Paraphrase I", duration: "2:34", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
      { title: "Paraphrase II", duration: "3:12", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
      { title: "Paraphrase III", duration: "2:58", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
    ]
  },
  {
    slug: "liszt-italia",
    title: "Liszt: Italia, sogno d'amore",
    year: "2011",
    label: "Tactus Records",
    cover: "./img/CD02.jpg",
    description: "A collection of Liszt's vocal works dedicated to Italy, with mezzosoprano Chiarastella Onorati.",
    subtitle: {
      IT: "Tactus Records • Liriche e pagine vocali dedicate all'Italia",
      EN: "Tactus Records • Songs and vocal pages dedicated to Italy"
    },
    longDescription: {
      IT: [
        "Franz Liszt mantenne per tutta la vita un fortissimo legame con l’Italia. Nell’opera del grande compositore ungherese il fascino del Belpaese che in precedenza aveva stregato il vate della letteratura romantica tedesca Goethe, che nel suo romanzo semiautobiografico Wilhelm Meister lo definì poeticamente il paese dove fioriscono i limoni, non trova rispondenza solo nel secondo libro degli Années de pèlerinage, ma anche in una serie di opere vocali dai toni molto evocativi, nei quali la bellezza e la solarità del paesaggio vanno di pari passo con le opere dei maggiori artisti del nostro paese.",
        "Il programma di questo disco presenta le due versioni dei Tre Sonetti del Petrarca, scritte a quasi tre decenni di distanza, e una serie di brani che ci offrono la possibilità di apprezzare l’arte raffinata di un Liszt molto diverso dallo straordinario virtuoso della Sonata in si minore e degli Studi trascendentali.",
        "Questi lavori ci vengono presentati dal mezzosoprano Chiarastella Onorati, cantante dotata di una profonda sensibilità che le consente di esprimere anche le più piccole nuances della scrittura lisztiana, accompagnata con eleganza e grande brillantezza da un eccellente Giulio De Luca."
      ],
      EN: [
        "Franz Liszt maintained an exceptionally strong bond with Italy throughout his life. In the work of the great Hungarian composer, the fascination of the Bel Paese, which had earlier enchanted Goethe, the poet of German Romantic literature, who in his semi-autobiographical novel Wilhelm Meister poetically called it the land where the lemon trees bloom, is reflected not only in the second book of the Annees de pelerinage, but also in a series of vocal works of highly evocative tone, where the beauty and radiance of the landscape go hand in hand with the achievements of the greatest artists of our country.",
        "The programme of this recording presents the two versions of the Three Sonnets of Petrarch, written almost three decades apart, together with a sequence of pieces that allows us to appreciate the refined art of a Liszt very different from the extraordinary virtuoso of the Sonata in B minor and the Transcendental Etudes.",
        "These works are presented here by mezzo-soprano Chiarastella Onorati, a singer endowed with deep sensitivity that enables her to express even the smallest nuances of Liszt's writing, accompanied with elegance and great brilliance by the excellent Giulio De Luca."
      ]
    },
    previews: [
      { title: "Italia I", duration: "2:41", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
      { title: "Italia II", duration: "3:05", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
      { title: "Italia III", duration: "2:27", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" }
    ]
  },
  {
    slug: "formaldeide",
    title: "Formaldeide",
    year: "2007",
    label: "Vincenzo Ramaglia",
    cover: "./img/CD03.jpg",
    description: "Contemporary chamber music by Roman composer Vincenzo Ramaglia, first world recording.",
    subtitle: {
      IT: "Vincenzo Ramaglia • Musica da camera contemporanea",
      EN: "Vincenzo Ramaglia • Contemporary chamber music"
    },
    longDescription: {
      IT: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacinia ligula nec mi feugiat, ac dignissim augue feugiat. Integer et eros vel lectus tristique tristique.",
        "Vestibulum feugiat purus eu nisi efficitur, vitae rhoncus libero hendrerit. Sed at risus vel nibh posuere aliquet. Nam tristique mauris id purus mollis, non tristique ligula feugiat.",
        "Donec eleifend convallis turpis, vitae cursus velit volutpat vel. Duis tincidunt, justo sit amet posuere sollicitudin, odio purus dictum dolor, sit amet luctus dui sem non risus.",
        "Curabitur eu fermentum turpis. Duis pretium lacus non sem volutpat, ut faucibus mauris feugiat. Ut consequat semper tellus, in tempus neque dignissim et. Cras luctus enim nec mi suscipit ullamcorper."
      ],
      EN: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacinia ligula nec mi feugiat, ac dignissim augue feugiat. Integer et eros vel lectus tristique tristique.",
        "Vestibulum feugiat purus eu nisi efficitur, vitae rhoncus libero hendrerit. Sed at risus vel nibh posuere aliquet. Nam tristique mauris id purus mollis, non tristique ligula feugiat.",
        "Donec eleifend convallis turpis, vitae cursus velit volutpat vel. Duis tincidunt, justo sit amet posuere sollicitudin, odio purus dictum dolor, sit amet luctus dui sem non risus.",
        "Curabitur eu fermentum turpis. Duis pretium lacus non sem volutpat, ut faucibus mauris feugiat. Ut consequat semper tellus, in tempus neque dignissim et. Cras luctus enim nec mi suscipit ullamcorper."
      ]
    },
    previews: [
      { title: "Formaldeide I", duration: "2:49", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
      { title: "Formaldeide II", duration: "3:18", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
      { title: "Formaldeide III", duration: "2:36", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" }
    ]
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

const FULL_BIOGRAPHY_TEXT = {
  IT: [
    "GIULIO DE LUCA è un pianista italiano. Nasce a Napoli, e lì vive e studia fino a quando si trasferisce a vivere a Roma, sua città di adozione. Inizia lo studio del pianoforte a 7 anni. Dopo aver debuttato in pubblico all'età di 9 anni, a partire dai 14 inizia a prendere lezioni, dapprima privatamente, poi in Conservatorio, con Massimo Bertucci, allievo diretto della prestigiosa scuola di Vincenzo Vitale.",
    "Contemporaneamente e per completare la sua formazione musicale segue anche il Corso di Composizione sotto la guida di Bruno Mazzotta, già Direttore del Conservatorio San Pietro a Majella e straordinaria figura di musicista che segnerà fortemente la sua formazione sul piano artistico ed etico. Durante gli anni del Conservatorio colleziona importanti esperienze: viene mandato a sostenere Concorsi pianistici nazionali, classificandosi sempre ai primi posti, e viene scelto per rappresentare il Conservatorio in manifestazioni concertistiche in Italia.",
    "Si diploma in Pianoforte col massimo dei voti e la lode, aggiudicandosi la Borsa di studio Premio Paolella come miglior diplomato dell'anno. Grazie a questo riconoscimento viene selezionato per prendere parte alla Maratona pianistica tenutasi in diretta su Radiotre dall'Auditorium del Politecnico di Torino.",
    "Giovanissimo e ancora studente, vince un'audizione presso il Teatro San Carlo di Napoli e inizia a collaborare come maestro sostituto di sala e di palcoscenico, e poi come pianista in Orchestra. In quegli anni si esibisce anche tre volte come solista con l'Orchestra del San Carlo, eseguendo la Rapsodia su temi di Paganini di Rachmaninov, il Concerto per pianoforte e orchestra di Poulenc e la Sinfonia (1968) di Luciano Berio.",
    "Gli anni di lavoro in teatro sono segnati dall'incontro e dalla collaborazione con grandi figure di direttori, registi, cantanti e danzatori. Particolare è il sodalizio col sopranista ed attore Michael Aspinall, che lo porta per anni a partecipare ai suoi concerti di teatro musicale sulla parodia delle grandi primedonne del passato in numerosi teatri italiani ed esteri.",
    "Nel frattempo, dopo il Diploma, inizia a seguire regolarmente i corsi del pianista russo Konstantin Bogino, erede della grande scuola di Heinrich Neuhaus. I corsi, tenuti presso l'Accademia Santa Cecilia di Portogruaro, prevedono anche un grande festival estivo di musica da camera con centinaia di studenti provenienti da tutto il mondo.",
    "La sua carriera concertistica si divide in pari misura tra recital solistici e concerti da camera, tenuti insieme a strumentisti e cantanti. Come solista il suo repertorio è assai eclettico, con una particolare predilezione per i grandi compositori del Romanticismo europeo, Schumann, Brahms e soprattutto Franz Liszt, di cui può essere considerato un vero e proprio specialista.",
    "La sua esplorazione del mondo delle parafrasi operistiche lisztiane tratte da Verdi, Rossini, Gounod e Wagner è stata sempre apprezzata dal pubblico di teatri e sale italiane ed europee. Tra i numerosi recital si ricordano quelli al Teatro nazionale di Spalato e al Palazzo Ducale di Dubrovnik, al Teatro Stabile di Potenza, a Villa Pignatelli per l'Associazione Scarlatti e in sedi prestigiose a Roma, Salerno, Ravello e Napoli.",
    "Nel novembre 2014 ha eseguito presso la Chiesa di Santa Caterina da Siena a Napoli, in occasione del Festival Fashionairies Art Lyrical, i Concerti di Bach per due pianoforti ed archi in duo col pianista Vincenzo Marrone D'Alberti. Nel maggio 2019 ha tenuto un recital con musiche di Schubert e Liszt nella prestigiosa Sala di Edsberg Manor a Stoccolma.",
    "Nel 2013 ha pubblicato per Tactus Records l'Integrale delle parafrasi e trascrizioni di Liszt su opere di Verdi, in occasione delle celebrazioni per il bicentenario della nascita del compositore italiano. Il disco è stato presentato a Roma presso l'Auditorium Parco della Musica e a Napoli nel Foyer del Teatro San Carlo, e i brani sono stati poi eseguiti in recital tenuti in sedi prestigiose in Italia e all'estero, tra cui Buenos Aires e Santa Fe in Argentina.",
    "I concerti di musica da camera nascono dall'incontro e dall'affinità musicale con musicisti suoi coetanei, con cui condivide la passione per il fare musica insieme, l'esplorazione dei classici e del repertorio più inusuale. Tra le collaborazioni si ricordano l'Aurora Ensemble di Trieste, diversi violinisti, violisti, violoncellisti e formazioni cameristiche con esibizioni in Italia e all'estero.",
    "Tra i cantanti, significative sono le collaborazioni col baritono Maurizio Leoni e soprattutto col mezzosoprano Chiarastella Onorati, con la quale esiste un sodalizio artistico ultra decennale. Insieme hanno studiato ed eseguito un vastissimo repertorio da camera, italiano e straniero, e hanno realizzato per Tactus il disco Liszt: Italia, sogno d'amore, dedicato integralmente alle liriche del compositore ungherese in italiano o dedicate all'Italia.",
    "Ha suonato inoltre in concerti di arie d'opera accompagnando artisti di primo piano, si è esibito a Panama City in occasione di concerti istituzionali organizzati dall'Ambasciata italiana e ha preso parte più volte in diretta radiofonica alla trasmissione di Radiotre La Barcaccia, eseguendo anche da solista la Parafrasi sul Rigoletto di Liszt.",
    "Da segnalare inoltre il disco Formaldeide, registrato nel 2007 con musiche per ensemble da camera del compositore romano Vincenzo Ramaglia in prima esecuzione assoluta. Giulio De Luca è anche uno stimato docente: ha insegnato dapprima Musica da Camera e poi Pianoforte nei conservatori di Cosenza, Trapani, Potenza, Salerno, Latina e in numerose masterclass internazionali in Italia, Argentina, Cina, Gran Bretagna, Panama, Germania, Svezia e Messico.",
    "Molti suoi allievi seguono la carriera musicale e sono risultati vincitori di concorsi pianistici nazionali. Due di loro sono attualmente docenti di Conservatorio."
  ],
  EN: [
    "Giulio De Luca is an Italian pianist. Born in Naples, he lived and studied there until he moved to Rome, his adopted city. He began studying the piano at the age of seven, and after making his public debut at nine, he started formal training first privately and then at the Conservatory with Massimo Bertucci, a direct heir to the prestigious school of Vincenzo Vitale.",
    "Alongside his piano studies, he also attended the Composition course under Bruno Mazzotta, former Director of the Conservatorio San Pietro a Majella, an extraordinary musician whose artistic and ethical example had a deep impact on his development. During his Conservatory years he accumulated important experience, taking part in national piano competitions and consistently placing among the top performers, while also being chosen to represent the Conservatory in concerts across Italy.",
    "He graduated in Piano with highest honours and distinction, winning the Paolella Scholarship as the best graduate of the year. That award led to his selection for the Piano Marathon broadcast live on Radiotre from the Auditorium of the Turin Polytechnic.",
    "Still very young and while still a student, he won an audition at the Teatro San Carlo in Naples and began working there as a rehearsal pianist and stage coach, later also serving as orchestra pianist. During those years he appeared three times as soloist with the San Carlo Orchestra, performing Rachmaninov's Rhapsody on a Theme of Paganini, Poulenc's Concerto for Piano and Orchestra and Luciano Berio's Symphony (1968).",
    "His years in the theatre were marked by encounters and collaborations with major conductors, directors, singers and dancers. Particularly notable was his work with the sopranist and actor Michael Aspinall, with whom he spent years taking part in musical theatre performances parodying the great divas of the past in many Italian and international venues.",
    "After completing his diploma, he regularly attended advanced courses with the Russian pianist Konstantin Bogino, heir to the great Heinrich Neuhaus tradition. These courses, held at the Accademia Santa Cecilia in Portogruaro, also included an important summer chamber music festival with hundreds of students from all over the world.",
    "His concert career is divided equally between solo recitals and chamber music performances with instrumentalists and singers. As a soloist, his repertoire is highly eclectic, with a special affinity for the great composers of European Romanticism, especially Schumann, Brahms and above all Franz Liszt, of whose music he is widely regarded as a specialist.",
    "His exploration of Liszt's operatic paraphrases drawn from Verdi, Rossini, Gounod and Wagner has long been appreciated by audiences in Italian and European concert halls. Among his many recitals are performances at the National Theatre of Split, the Doge's Palace in Dubrovnik, the Teatro Stabile in Potenza, Villa Pignatelli for the Associazione Scarlatti, and important venues in Rome, Salerno, Ravello and Naples.",
    "In November 2014 he performed Bach's concertos for two keyboards and strings at the Church of Santa Caterina da Siena in Naples during the Fashionairies Art Lyrical Festival, in duo with pianist Vincenzo Marrone D'Alberti. In May 2019 he gave a recital of music by Schubert and Liszt in the prestigious Edsberg Manor Hall in Stockholm.",
    "In 2013 he released for Tactus Records the complete paraphrases and transcriptions by Liszt on Verdi's operas, marking the bicentenary celebrations of the Italian composer. The album was presented in Rome at the Auditorium Parco della Musica and in Naples at the foyer of the Teatro San Carlo, and its programme was later performed in recital in prestigious venues in Italy and abroad, including Buenos Aires and Santa Fe in Argentina.",
    "His chamber music activity grew from musical affinity and shared artistic curiosity with musicians of his own generation, with whom he explored both the standard repertoire and rarer works. His collaborations include the Aurora Ensemble of Trieste, as well as numerous violinists, violists, cellists and chamber formations performing in Italy and internationally.",
    "Among singers, especially significant are his collaborations with baritone Maurizio Leoni and, above all, mezzo-soprano Chiarastella Onorati, with whom he has maintained an artistic partnership for more than a decade. Together they have studied and performed a vast chamber repertoire in Italian and foreign languages, and for Tactus they recorded Liszt: Italia, sogno d'amore, devoted to the composer's songs in Italian or dedicated to Italy.",
    "He has also performed in opera gala concerts alongside major artists, appeared in Panama City for institutional concerts organised by the Italian Embassy, and taken part several times in live broadcasts of the Radiotre programme La Barcaccia, including a solo performance of Liszt's Rigoletto Paraphrase.",
    "Also worth noting is the album Formaldeide, recorded in 2007 and featuring chamber ensemble music by Roman composer Vincenzo Ramaglia in its first world recording. Giulio De Luca is also a highly regarded teacher: after initially teaching Chamber Music, he went on to teach Piano in the conservatories of Cosenza, Trapani, Potenza, Salerno and Latina, and has given international masterclasses in Italy, Argentina, China, Great Britain, Panama, Germany, Sweden and Mexico.",
    "Many of his students have pursued professional musical careers and have won national piano competitions. Two of them are currently professors at Italian conservatories."
  ]
};

const getViewFromHash = (): ViewState => {
  const hash = window.location.hash;

  if (hash === '#biografia-completa') {
    return { view: 'full-biography' };
  }

  if (hash.startsWith('#album/')) {
    return { view: 'album-detail', albumSlug: hash.replace('#album/', '') };
  }

  return { view: 'home' };
};

const getAlbumBySlug = (slug?: string) => DISCOGRAPHY.find((album) => album.slug === slug);

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

const FullBiographyPage = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => (
  <div className="min-h-screen bg-piano-black text-ivory">
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#c5a05922,transparent_45%)]" />
      <div className="relative max-w-5xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="flex items-start justify-between gap-6 mb-12">
          <motion.a
            href="#biography"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center space-x-3 text-gold font-sans uppercase tracking-widest text-sm font-medium"
          >
            <ChevronRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>{lang === 'EN' ? 'Back to Home' : 'Torna alla Home'}</span>
          </motion.a>

          <button
            onClick={() => setLang(lang === 'EN' ? 'IT' : 'EN')}
            className="flex items-center space-x-2 text-xs uppercase tracking-widest border border-gold/30 px-3 py-1 rounded-full hover:bg-gold/10 transition-all shrink-0"
          >
            <Globe size={12} />
            <span>{lang}</span>
          </button>
        </div>

        <div className="max-w-3xl space-y-8">
          <span className="text-xs uppercase tracking-[0.4em] text-gold/70">
            {lang === 'EN' ? 'Giulio De Luca' : 'Giulio De Luca'}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif">
            {lang === 'EN' ? 'Full Biography' : 'Biografia Completa'}
          </h1>
          <div className="w-24 h-px bg-gold/40"></div>
          <div className="prose prose-lg prose-invert max-w-none text-ivory/80 font-body leading-relaxed space-y-6">
            {FULL_BIOGRAPHY_TEXT[lang].map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

const AlbumDetailPage = ({
  lang,
  setLang,
  album,
}: {
  lang: Language,
  setLang: (l: Language) => void,
  album: Album,
}) => (
  <div className="min-h-screen bg-piano-black text-ivory">
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#c5a05922,transparent_45%)]" />
      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="flex items-start justify-between gap-6 mb-12">
          <motion.a
            href="#discography"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center space-x-3 text-gold font-sans uppercase tracking-widest text-sm font-medium"
          >
            <ChevronRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>{lang === 'EN' ? 'Back to Discography' : 'Torna alla Discografia'}</span>
          </motion.a>

          <button
            onClick={() => setLang(lang === 'EN' ? 'IT' : 'EN')}
            className="flex items-center space-x-2 text-xs uppercase tracking-widest border border-gold/30 px-3 py-1 rounded-full hover:bg-gold/10 transition-all shrink-0"
          >
            <Globe size={12} />
            <span>{lang}</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-12 items-start">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-sm shadow-2xl border border-gold/10">
              <img
                src={album.cover}
                alt={album.title}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="rounded-sm border border-white/10 bg-white/5 p-6 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold/70">
                {lang === 'EN' ? 'Audio Preview' : 'Anteprima Audio'}
              </span>
              <div className="space-y-4">
                {album.previews.map((track, index) => (
                  <div key={track.title} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-gold/60">{index + 1 < 10 ? `0${index + 1}` : index + 1}</p>
                        <h3 className="font-serif text-lg">{track.title}</h3>
                      </div>
                      <span className="text-sm text-ivory/50">{track.duration}</span>
                    </div>
                    <audio controls preload="none" className="w-full">
                      <source src={track.src} type="audio/mpeg" />
                    </audio>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-gold/70">
                {album.label} • {album.year}
              </span>
              <h1 className="text-4xl md:text-6xl font-serif mt-4">{album.title}</h1>
              <p className="text-lg md:text-xl text-ivory/70 italic mt-4">{album.subtitle[lang]}</p>
            </div>

            <div className="w-24 h-px bg-gold/40"></div>

            <div className="prose prose-lg prose-invert max-w-none text-ivory/80 font-body leading-relaxed space-y-6">
              {album.longDescription[lang].map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default function App() {
  const [lang, setLang] = useState<Language>('IT');
  const [{ view, albumSlug }, setViewState] = useState<ViewState>(() => getViewFromHash());

  useEffect(() => {
    document.documentElement.lang = lang === 'EN' ? 'en' : 'it';
  }, [lang]);

  useEffect(() => {
    const syncViewWithHash = () => setViewState(getViewFromHash());
    window.addEventListener('hashchange', syncViewWithHash);
    syncViewWithHash();
    return () => window.removeEventListener('hashchange', syncViewWithHash);
  }, []);

  if (view === 'full-biography') {
    return <FullBiographyPage lang={lang} setLang={setLang} />;
  }

  if (view === 'album-detail') {
    const album = getAlbumBySlug(albumSlug);

    if (album) {
      return <AlbumDetailPage lang={lang} setLang={setLang} album={album} />;
    }
  }

  return (
    <div className="min-h-screen selection:bg-gold selection:text-piano-black">
      <Navbar lang={lang} setLang={setLang} />

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="./img/Giulio01.png" 
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
                ? 'Concert Pianist • Professor' 
                : 'Pianista Concertista • Docente'}
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
                  src="./img/giulio02.jpg" 
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

              <div className="flex flex-col items-start gap-4">
                <motion.a
                  href="#biografia-completa"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center space-x-3 text-gold font-sans uppercase tracking-widest text-sm font-medium"
                >
                  <span>{lang === 'EN' ? 'Full Biography' : 'Biografia Completa'}</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <motion.a
                  href={curriculumDocx}
                  download="GiulioDeLuca_Curriculum_breve.docx"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center space-x-3 text-gold font-sans uppercase tracking-widest text-sm font-medium"
                >
                  <span>{lang === 'EN' ? 'Download Full Curriculum' : 'Scarica Curriculum Completo'}</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
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
                  <motion.a
                    href={`#album/${album.slug}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group inline-flex items-center space-x-3 text-gold font-sans uppercase tracking-widest text-sm font-medium pt-4"
                  >
                    <span>{lang === 'EN' ? 'Details' : 'Dettagli'}</span>
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </motion.a>
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
                    <p className="text-xl font-serif">giulio.deluca@tiscali.it</p>
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
            Designed by <span className="text-gold">-</span> Mauro Melella
          </div>
        </div>
      </footer>
    </div>
  );
}
