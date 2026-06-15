import { Calendar, Users, Hotel, ChevronRight, Award, Compass, Sparkles } from 'lucide-react';
import React, { useState, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, useScroll, useTransform } from 'motion/react';

interface HeroProps {
  onExploreRooms: () => void;
  onExploreRestaurant: () => void;
  onSelectRoom: (roomId: string) => void;
}

export default function Hero({ onExploreRooms, onExploreRestaurant, onSelectRoom }: HeroProps) {
  const { language, t, rooms } = useLanguage();
  const [checkIn, setCheckIn] = useState('');
  const [guests, setGuests] = useState('2');
  const [preferredSuite, setPreferredSuite] = useState(rooms[0]?.id || 'standard-ivoire');
  const [showStatus, setShowStatus] = useState<string | null>(null);

  const containerRef = useRef<HTMLElement | null>(null);
  
  // Use scroll hook linked specifically to our hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Calculate parallax offsets to add premium depth
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0px", "120px"]);
  const opacityContent = useTransform(scrollYProgress, [0, 1], [1, 0]);

  React.useEffect(() => {
    if (rooms.length > 0) {
      setPreferredSuite(rooms[0].id);
    }
  }, [rooms]);

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn) {
      const errMsg = language === 'fr'
        ? "Veuillez choisir une date d'arrivée pour apprécier nos disponibilités."
        : "Please choose an arrival date to check our availability.";
      setShowStatus(errMsg);
      return;
    }
    const selectedRoomDetails = rooms.find(r => r.id === preferredSuite);
    const feedbackMsg = language === 'fr'
      ? `Splendide choix ! La suite "${selectedRoomDetails?.name || 'Sélectionnée'}" est disponible pour le séjour de votre choix à partir du ${checkIn}. Nous préparons votre accueil exclusif.`
      : `Splendid choice! The "${selectedRoomDetails?.name || 'Selected'}" suite is available for your stay starting ${checkIn}. We are preparing your exclusive welcome.`;
    setShowStatus(feedbackMsg);
    onSelectRoom(preferredSuite);
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" 
      id="hero-section"
    >
      
      {/* Background Media with Parallax Motion */}
      <motion.div 
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 z-0 origin-center"
      >
        <img 
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920" 
          alt="Tour Eiffel Hôtel Bénin" 
          className="w-full h-full object-cover filter brightness-[0.22] contrast-[1.05]"
          id="hero-bg-img"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAFA]/60 via-transparent to-[#FAFAFA]/30" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        
        {/* Parallax Content Container */}
        <motion.div style={{ y: yContent, opacity: opacityContent }} className="will-change-transform">
          {/* Superior Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs tracking-[0.25em] uppercase font-semibold mb-8 animate-fadeIn" id="hero-star-badge">
            <Award className="w-4 h-4 text-gold-400" />
            {language === 'fr' ? 'Cinq Étoiles de Prestige Historique • Porto-Novo' : 'Five-Star Historical Prestige Palace • Porto-Novo'}
          </div>

          {/* Master Headline */}
          <h1 className="max-w-4xl mx-auto font-serif text-4xl sm:text-6xl lg:text-7xl font-sans tracking-tight leading-[1.1] mb-6 animate-slideUp text-gray-900" id="hero-title">
            <span className="block font-light italic text-gold-200">
              {language === 'fr' ? 'Un Sanctuaire Souverain' : 'A Sovereign Sanctuary'}
            </span>
            <span className="block uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gold-600 to-gray-900">
              {t('hero.heading')}
            </span>
          </h1>

          {/* Supporting Description */}
          <p className="max-w-2xl mx-auto text-gray-800 text-base sm:text-lg lg:text-xl font-light mb-12 tracking-wide leading-relaxed animate-fadeIn" id="hero-desc">
            {t('hero.description')}
          </p>

          {/* Quick Nav Options */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20">
            <button
              onClick={onExploreRooms}
              className="flex items-center gap-2 px-8 py-4 w-full sm:w-auto text-sm tracking-widest uppercase font-semibold text-gray-900 bg-gradient-to-r from-regal-red-500 via-regal-red-600 to-regal-red-700 hover:from-regal-red-400 hover:to-regal-red-600 text-white rounded transition duration-300 shadow-xl shadow-gold-500/15 cursor-pointer"
              id="hero-rooms-cta"
            >
              {t('hero.cta.rooms')}
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={onExploreRestaurant}
              className="flex items-center gap-2 px-8 py-4 w-full sm:w-auto text-sm tracking-widest uppercase font-semibold text-gray-900 hover:text-gold-400 border border-gold-500/30 hover:border-gold-400 bg-[#FAFAFA]/45 hover:bg-white/80 rounded transition duration-300 cursor-pointer"
              id="hero-dining-cta"
            >
              {t('hero.cta.dining')}
            </button>
          </div>
        </motion.div>

        {/* Interactive Check availability card */}
        <div className="max-w-5xl mx-auto" id="quick-booking-panel">
          <div className="bg-gradient-to-br from-regal-red-900/95 to-regal-red-950/95 border border-gold-500/20 rounded-xl p-6 shadow-2xl backdrop-blur-md">
            
            <form onSubmit={handleQuickInquiry} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end text-left">
              
              {/* Date Input */}
              <div>
                <label className="block text-[11px] font-bold text-gold-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {t('rooms.drawer.checkin')}
                </label>
                <input 
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-gold-500/20 rounded px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gold-400 transition"
                  id="hero-input-checkin"
                />
              </div>

              {/* Guest Count */}
              <div>
                <label className="block text-[11px] font-bold text-gold-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  {language === 'fr' ? 'Convives' : 'Guests'}
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-white bg-[#FAFAFA] border border-gold-500/20 rounded px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gold-400 transition cursor-pointer"
                  style={{ colorScheme: 'dark' }}
                  id="hero-select-guests"
                >
                  <option value="1">{language === 'fr' ? '1 Personne' : '1 Guest'}</option>
                  <option value="2">{language === 'fr' ? '2 Personnes' : '2 Guests'}</option>
                  <option value="3">{language === 'fr' ? '3 Personnes' : '3 Guests'}</option>
                  <option value="4">{language === 'fr' ? '4 Personnes & Plus' : '4+ Guests'}</option>
                </select>
              </div>

              {/* Chambre/Suite Category */}
              <div>
                <label className="block text-[11px] font-bold text-gold-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Hotel className="w-3.5 h-3.5" />
                  {t('hero.featured')}
                </label>
                <select
                  value={preferredSuite}
                  onChange={(e) => setPreferredSuite(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-gold-500/20 rounded px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gold-400 transition cursor-pointer"
                  style={{ colorScheme: 'dark' }}
                  id="hero-select-suite"
                >
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Inquiry Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-gray-900 font-bold py-2.5 rounded transition duration-200 text-xs tracking-widest uppercase cursor-pointer flex items-center justify-center gap-1.5"
                  id="hero-submit-inquiry"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {language === 'fr' ? 'Vérifier' : 'Verify'}
                </button>
              </div>

            </form>

            {/* Popup message inside */}
            {showStatus && (
              <div className="mt-4 p-3 bg-gold-500/10 border border-gold-500/20 rounded text-gold-300 text-sm tracking-wide text-center animate-fadeIn" id="hero-booking-feedback">
                {showStatus}
              </div>
            )}

            {/* Micro-Features Row */}
            <div className="mt-6 pt-5 border-t border-gold-500/10 flex flex-wrap justify-center items-center gap-8 text-[11px] uppercase tracking-widest text-gray-200 font-medium">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-gold-400" />
                {t('hero.badge')}
              </span>
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-gold-400" />
                {language === 'fr' ? 'Service majordome inclus' : 'Butler service included'}
              </span>
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-gold-400" />
                {language === 'fr' ? 'Sécurité diplomatique intégrée' : 'Diplomatic security built-in'}
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
