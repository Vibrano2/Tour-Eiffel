import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Maximize2, 
  Layers, 
  Sparkles, 
  ChevronUp, 
  Flame 
} from 'lucide-react';

interface GalleryItem {
  id: string;
  category: 'suites' | 'gastronomy' | 'oasis' | 'events';
  imageUrl: string;
  titleFR: string;
  titleEN: string;
  descFR: string;
  descEN: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    category: "suites",
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1200",
    titleFR: "Chambre de la Suite Présidentielle",
    titleEN: "Presidential Suite Master Chamber",
    descFR: "Un sanctuaire couronné d'or avec vue panoramique sur la lagune de Porto-Novo et drapé d'un lit King Absolu.",
    descEN: "A gold-accented private sanctuary showcasing panoramic views of Porto-Novo lagoon and an Absolute King bed."
  },
  {
    id: "g2",
    category: "suites",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200",
    titleFR: "Salon d'Apparat de la Suite Prestige",
    titleEN: "Prestige Suite Reception Salon",
    descFR: "Espace d'apparat feutré abritant des toiles prestigieuses d'éminents artistes béninois contemporains.",
    descEN: "Sophisticated lounge domain curated with unique contemporary masterworks by leading Beninese painters."
  },
  {
    id: "g3",
    category: "gastronomy",
    imageUrl: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=1200",
    titleFR: "Le Céleste — Pavillon Gastronomique",
    titleEN: "Le Céleste — Fine-Dining Pavilion",
    descFR: "La majestueuse salle à manger du restaurant de haute cuisine, célébration du chic parisien et des marbres chauds.",
    descEN: "The glorious dining salon of our gastronomic restaurant, marrying warm golden marbles with French elegant linens."
  },
  {
    id: "g4",
    category: "gastronomy",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1200",
    titleFR: "Créations Plaquées Or du Chef Kofi",
    titleEN: "Chef Kofi's Fine-Art Tasting Plates",
    descFR: "Prestige assiette d'art signée du Chef Kofi D'Almeida, combinant secrets biologiques du Bénin et d'or comestible.",
    descEN: "Bespoke fine art plating designed by Executive Chef Kofi D'Almeida, combining organic ingredients and fine gold leaf."
  },
  {
    id: "g5",
    category: "oasis",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1200",
    titleFR: "Piscine Suspendue Céleste à l'Horizon",
    titleEN: "Celestial Suspended Infinity Pool Deck",
    descFR: "Notre légendaire infinity pool suspendue surplombant la lagune de Porto-Novo lors d'un coucher de soleil flamboyant.",
    descEN: "Our legendary rooftop suspended swimming deck looking across the sweeping lagoon of Porto-Novo under dynamic sunsets."
  },
  {
    id: "g6",
    category: "gastronomy",
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200",
    titleFR: "Rooftop Elite Bar & Sunbeds",
    titleEN: "Rooftop Elite Bar & Sunbeds",
    descFR: "Un bar à nectars privilégié au crépuscule pour savourer nos élixirs de spiritueux Sodabi locaux vieillis.",
    descEN: "An intimate twilight spot to experience aged French reserve cognacs and custom-designed Sodabi Gold master cocktails."
  },
  {
    id: "g7",
    category: "events",
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200",
    titleFR: "Lustres Monumentaux du Salon Concorde",
    titleEN: "Imperial Lighting inside Concorde Ballroom",
    descFR: "Les somptueux lustres en cristal français surplombant la majestueuse salle de réception officielle de 1200 places.",
    descEN: "Sweeping authentic French crystal chandeliers looking down upon the monumental 1200-seat reception salon."
  },
  {
    id: "g8",
    category: "events",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200",
    titleFR: "Galerie Royale Toffa Ier",
    titleEN: "King Toffa I Royal Exhibition Wing",
    descFR: "Alliance de tapisseries théâtrales et de colonnades de marbre, écrin grandiose pour des cocktails mondains d'élite.",
    descEN: "A glorious alignment of rich velvet drapery and grand marble columns, framing secure diplomatic receptions."
  }
];

export default function PhotoGallery() {
  const { language } = useLanguage();
  
  const [activeFilter, setActiveFilter] = useState<'all' | 'suites' | 'gastronomy' | 'oasis' | 'events'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [autoplay, setAutoplay] = useState(false);
  const [showMetaState, setShowMetaState] = useState(true);

  const playlistTimerRef = useRef<NodeJS.Timeout | null>(null);
  const AUTOPLAY_DURATION = 5000; // 5 seconds in fullscreen show

  // Get active items based on selected category filter
  const filteredItems = activeFilter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  // Manage Autoplay loop inside Lightbox
  useEffect(() => {
    if (autoplay && lightboxIndex !== null) {
      playlistTimerRef.current = setInterval(() => {
        handleNextImage();
      }, AUTOPLAY_DURATION);
    } else {
      if (playlistTimerRef.current) clearInterval(playlistTimerRef.current);
    }

    return () => {
      if (playlistTimerRef.current) clearInterval(playlistTimerRef.current);
    };
  }, [autoplay, lightboxIndex]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'Escape') handleCloseLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handleOpenLightbox = (itemId: string) => {
    // Find absolute index of item globally to ensure continuous swiping through all items
    const idx = GALLERY_ITEMS.findIndex(item => item.id === itemId);
    if (idx !== -1) {
      setLightboxIndex(idx);
      setAutoplay(false); // Default to idle initially
    }
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
    setAutoplay(false);
  };

  const handleNextImage = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % GALLERY_ITEMS.length;
    });
  };

  const handlePrevImage = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    });
  };

  // Helper strings
  const filterList = [
    { id: 'all', fr: 'Tout Explorer', en: 'All Spaces' },
    { id: 'suites', fr: 'Chambres & Suites', en: 'Suites & Rooms' },
    { id: 'gastronomy', fr: 'Haute Cuisine & Bar', en: 'Gastronomy & Bar' },
    { id: 'oasis', fr: 'Lagune & Loisirs', en: 'Lagoon & Leisures' },
    { id: 'events', fr: 'Salons de Prestige', en: 'Prestigious Salons' }
  ];

  const triggerGalleryTitle = language === 'fr' ? "Galerie de Haute Garde" : "The High-Art Archive";
  const triggerGallerySubtitle = language === 'fr' ? "Le Domaine Virtuel" : "The Estate in Focus";
  const triggerGalleryDesc = language === 'fr'
    ? "Une chronique visuelle d'envergure immortalisant l'union de l'esthétique royale béninoise et de la grâce française."
    : "An expansive visual exhibition cataloging the flawless harmony of royal West African heritage and classical French architecture.";

  const curLightboxItem = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <section className="py-24 bg-[#040611] border-t border-gold-500/10 relative" id="photo-gallery-main">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-gold-500/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.35em] text-gold-400 uppercase block mb-3">
            {triggerGallerySubtitle}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white uppercase">
            {triggerGalleryTitle}
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
          <p className="max-w-xl mx-auto text-gray-300 text-xs sm:text-sm font-light mt-4">
            {triggerGalleryDesc}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12" id="gallery-filters-bar">
          {filterList.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-4 py-2 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded cursor-pointer border ${
                activeFilter === f.id
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white border-gold-400 font-bold shadow-lg shadow-gold-500/10'
                  : 'bg-regal-red-950/60 text-gray-300 border-gold-500/10 hover:border-gold-500/30 hover:text-white'
              }`}
              id={`filter-tab-${f.id}`}
            >
              {language === 'fr' ? f.fr : f.en}
            </button>
          ))}
        </div>

        {/* Dynamic Image Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" 
          id="gallery-images-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const itemTitle = language === 'fr' ? item.titleFR : item.titleEN;
              const itemCategoryLabel = filterList.find(f => f.id === item.category)?.fr || item.category;
              
              return (
                <motion.div
                  key={item.id}
                  layoutId={`item-card-${item.id}`}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleOpenLightbox(item.id)}
                  className="group relative h-72 rounded overflow-hidden bg-regal-red-950 border border-gold-500/10 hover:border-gold-400/35 transition-all duration-500 cursor-pointer shadow-md shadow-black/40 flex flex-col justify-end p-5"
                  id={`gallery-item-card-${item.id}`}
                >
                  
                  {/* Aspect Ratio Sized Image Container */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={itemTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.45] group-hover:brightness-[0.35]"
                    />
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                  </div>

                  {/* Icon Maximize Indicator on Hover */}
                  <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-regal-red-900/80 border border-gold-400/20 flex items-center justify-center text-gold-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Caption */}
                  <div className="relative z-10 text-left">
                    <span className="text-[9px] font-bold tracking-[0.2em] text-gold-400 uppercase block mb-1">
                      {language === 'fr' ? itemCategoryLabel : item.category.toUpperCase()}
                    </span>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-white group-hover:text-gold-200 transition-colors duration-300">
                      {itemTitle}
                    </h3>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* FULL-SCREEN EXPANDED LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && curLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] w-screen h-screen bg-black/98 flex flex-col justify-between overflow-hidden"
            id="fullscreen-lightbox-modal"
          >
            {/* Top Toolbar Navigation Header */}
            <div className="relative z-30 p-4 sm:p-6 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between text-white border-b border-white/5">
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold-400 animate-spin-slow" />
                  <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-gold-400">
                    {language === 'fr' ? "RÉSIDENCE D'ART ET DE PRESTIGE" : "SOVEREIGN HIGH-RESOLUTION VAULT"}
                  </span>
                </div>
                <h4 className="font-serif text-sm sm:text-lg font-bold">
                  {language === 'fr' ? "Tour Eiffel Hôtel Bénin" : "Tour Eiffel Benin Palace"}
                </h4>
              </div>

              {/* Slider Quick Controls */}
              <div className="flex items-center gap-3">
                
                {/* Autoplay toggler btn */}
                <button
                  onClick={() => setAutoplay(!autoplay)}
                  className={`px-3 py-1.5 rounded text-[9px] font-bold tracking-widest uppercase flex items-center gap-1.5 transition border cursor-pointer ${
                    autoplay 
                      ? 'bg-gold-500/20 text-gold-300 border-gold-400/40' 
                      : 'bg-regal-red-950/5 text-gray-200 border-transparent hover:bg-regal-red-950/10'
                  }`}
                  id="lightbox-autoplay-toggle"
                  title={autoplay ? "Pause Slideshow" : "Play Autoplay Slideshow"}
                >
                  {autoplay ? <Pause className="w-3 h-3 text-gold-400" /> : <Play className="w-3 h-3" />}
                  <span>{autoplay ? "DIAPORAMA ACTIF" : "DIAPORAMA"}</span>
                </button>

                {/* Hide / Reveal detail bar */}
                <button
                  onClick={() => setShowMetaState(!showMetaState)}
                  className="p-2 rounded bg-regal-red-950/5 hover:bg-regal-red-950/10 text-gray-200 hover:text-white transition cursor-pointer"
                  id="lightbox-meta-toggle"
                  title="Toggle Description Bar"
                >
                  <Layers className="w-4 h-4" />
                </button>

                {/* Close Button */}
                <button
                  onClick={handleCloseLightbox}
                  className="p-2 rounded-full bg-gold-400 text-white hover:bg-gold-300 transition duration-300 cursor-pointer shadow-lg active:scale-90"
                  id="close-lightbox-btn"
                  aria-label="Fermer la vue"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Middle Stage Main Stage Screen */}
            <div className="flex-1 relative flex items-center justify-center p-4" id="lightbox-center-viewer">
              
              {/* Previous Image Touch Shield */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 z-20 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black/40 hover:bg-gold-400 border border-white/10 hover:border-gold-400 text-white hover:text-white flex items-center justify-center transition duration-300 cursor-pointer group active:scale-95"
                id="lightbox-arrow-prev"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:-translate-x-0.5" />
              </button>

              {/* Fullscreen Master Image Box */}
              <div className="max-w-5xl max-h-[72vh] sm:max-h-[64vh] w-full h-full relative" id="lightbox-image-viewport">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={curLightboxItem.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    src={curLightboxItem.imageUrl}
                    alt={language === 'fr' ? curLightboxItem.titleFR : curLightboxItem.titleEN}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain rounded select-none shadow-2xl mx-auto"
                  />
                </AnimatePresence>
                
                {/* Absolute Autoplay progress loader bar */}
                {autoplay && (
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-black/40 overflow-hidden rounded-b">
                    <motion.div
                      key={lightboxIndex}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: AUTOPLAY_DURATION / 1000, ease: "linear" }}
                      className="h-full bg-gold-400"
                    />
                  </div>
                )}
              </div>

              {/* Next Image Touch Shield */}
              <button
                onClick={handleNextImage}
                className="absolute right-4 z-20 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black/40 hover:bg-gold-400 border border-white/10 hover:border-gold-400 text-white hover:text-white flex items-center justify-center transition duration-300 cursor-pointer group active:scale-95"
                id="lightbox-arrow-next"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:translate-x-0.5" />
              </button>

            </div>

            {/* Lower Information and Thumbnail Footer Deck */}
            <div className="relative z-30 bg-black/95 border-t border-white/5 flex flex-col gap-4 text-white p-4 sm:p-6" id="lightbox-footer-deck">
              
              {/* Metadata Panel Toggle Container */}
              <AnimatePresence>
                {showMetaState && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mb-2 text-left bg-[#050814] border border-gold-500/10 p-4 sm:p-5 rounded max-w-4xl mx-auto w-full"
                    id="lightbox-meta-desc-box"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold-400 flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5" />
                        {curLightboxItem.category.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {String(lightboxIndex + 1).padStart(2, '0')} / {String(GALLERY_ITEMS.length).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-2xl font-semibold text-white">
                      {language === 'fr' ? curLightboxItem.titleFR : curLightboxItem.titleEN}
                    </h3>
                    
                    <p className="text-gray-200 text-xs sm:text-sm font-light mt-2 leading-relaxed">
                      {language === 'fr' ? curLightboxItem.descFR : curLightboxItem.descEN}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Carousel Thumbnails Track */}
              <div className="flex items-center justify-center gap-3 overflow-x-auto py-2 scroller-hidden max-w-3xl mx-auto w-full" id="lightbox-thumbs-deck">
                {GALLERY_ITEMS.map((item, index) => {
                  const isActive = index === lightboxIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setLightboxIndex(index);
                        setAutoplay(false);
                      }}
                      className={`relative w-14 h-10 sm:w-16 sm:h-12 rounded overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        isActive 
                          ? 'border-gold-400 scale-105 shadow-md shadow-gold-500/20' 
                          : 'border-transparent opacity-40 hover:opacity-80'
                      }`}
                      id={`thumb-slide-${item.id}`}
                    >
                      <img
                        src={item.imageUrl}
                        alt="thumbnail"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover select-none"
                      />
                    </button>
                  );
                })}
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
