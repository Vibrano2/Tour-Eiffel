import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  MessageSquareCode, 
  Crown, 
  Sun, 
  Compass, 
  Coffee,
  Sunset,
  ArrowRight
} from 'lucide-react';

interface GreetingScript {
  id: string;
  theme: 'morning' | 'afternoon' | 'sunset';
  labelFR: string;
  labelEN: string;
  subFR: string;
  subEN: string;
  icon: React.ComponentType<any>;
}

const GREETINGS: GreetingScript[] = [
  {
    id: "greet-morning",
    theme: "morning",
    labelFR: "Aube Royale de la Lagune",
    labelEN: "Royal Lagoon Sunrise",
    subFR: "« Bonjour, je suis Amara. Bienvenue à l'Hermitage Tour Eiffel. Le brouillard se lève doucement sur la lagune de Porto-Novo. Un café d'Afrique sauvage bio et votre majordome vous attendent dans le salon doré. Que votre séjour de haut standing commence sous les meilleurs augures. »",
    subEN: "“Good morning, I am Amara. Welcome to the Tour Eiffel Hermitage. As the soft mist rises from the Porto-Novo lagoon, a cup of wild organic African coffee and your personal butler await in our gilded parlor. May your high-society journey begin with absolute peace.”",
    icon: Sun
  },
  {
    id: "greet-afternoon",
    theme: "afternoon",
    labelFR: "Service d'Or de Midi",
    labelEN: "Golden Afternoon Welcoming",
    subFR: "« Chaleureux après-midi. Je suis Amara, ravie de guider vos pas. Chef Kofi d'Almeida vient d'allumer les fourneaux pour le déjeuner d'affaires au Salon d'Or, mariant truffe noire et igname pilée divine. Permettez-moi de privatiser votre table au fil de l'eau. »",
    subEN: "“An exquisite afternoon. I am Amara, delighted to assist you. Chef Kofi d'Almeida is presently initiating our signature business luncheon, melting French truffles with local pounded yam. May I immediately secure your private lagoon-front table?”",
    icon: Coffee
  },
  {
    id: "greet-sunset",
    theme: "sunset",
    labelFR: "Crépuscule d'Exception",
    labelEN: "Sovereign Sunset Indulgence",
    subFR: "« Le soleil béninois se couche dans un éclat d'or pur. Je vous invite à nous rejoindre au Piano-Bar céleste pour notre récital de harpe traditionnel et de jazz feutré. Notre sommelier a déjà sabré le champagne millésimé pour célébrer votre présence. »",
    subEN: "“The coastal sun sets in a brush of pure sovereign gold. I invite you to join us at our Celestial sky-parlor for tonight's live harp recital and smooth saxophone jazz. Our sommelier is opening our finest vintage champagne in your honor.”",
    icon: Sunset
  }
];

interface MeetYourHostProps {
  onNavigateToChat: () => void;
}

export default function MeetYourHost({ onNavigateToChat }: MeetYourHostProps) {
  const { language } = useLanguage();
  const [selectedGreetId, setSelectedGreetId] = useState('greet-morning');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [subtitlePointer, setSubtitlePointer] = useState(0);

  const currentGreet = GREETINGS.find(g => g.id === selectedGreetId) || GREETINGS[0];

  // Simulated live playback loop progress bar & subtitles pulsing
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setSubtitlePointer(prev => (prev + 1) % 40);
      }, 350);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <section 
      className="py-20 bg-regal-red-900 text-white relative overflow-hidden border-t border-gold-500/10" 
      id="meet-your-host-sec"
    >
      {/* Soft Ambient backgrounds */}
      <div className="absolute inset-0 bg-regal-red-950 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-gold-400/[0.015] blur-3xl rounded-full pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Module Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.4em] text-gold-400 uppercase block mb-3">
            {language === 'fr' ? "Conciergerie Virtuelle d'Élite" : "AI Custom Concierge Companion"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white uppercase">
            {language === 'fr' ? "Faites Connaissance avec Amara" : "Meet Your Virtual Host"}
          </h2>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-4" />
        </div>

        {/* Cinematic Dual Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="host-dashboard-layout">
          
          {/* Left Column: Gilded Video Loop Card Framework */}
          <div className="lg:col-span-5 relative flex justify-center" id="host-video-frame">
            <div className="w-full max-w-[340px] aspect-[3/4] rounded-2xl bg-regal-red-950 border border-gold-400/25 p-3.5 relative overflow-hidden shadow-2xl group">
              
              {/* Video visual representation with a scale/breathe animation */}
              <div className="w-full h-full rounded-xl overflow-hidden relative bg-slate-950">
                
                {/* Virtual host avatar using high fidelity illustration style portrait */}
                <motion.img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" 
                  alt="Virtual Host Amara" 
                  referrerPolicy="no-referrer"
                  animate={{
                    scale: isPlaying ? [1.02, 1.05, 1.02] : 1.02,
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.05]"
                  id="virtual-concierge-portrait-img"
                />

                {/* Subtitle Teleprompter overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-5 select-none">
                  
                  {/* Subtle pulsing live badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 relative" />
                    <span className="text-[8px] font-mono tracking-widest text-white font-bold uppercase bg-black/40 px-2 py-0.5 rounded border border-white/5">
                      {language === 'fr' ? "AMARA EN DIRECT" : "AMARA DIRECT"}
                    </span>
                  </div>

                  {/* Dynamic transcript box */}
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={selectedGreetId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-[10px] sm:text-xs text-gold-300 font-light leading-relaxed italic text-center drop-shadow-lg"
                    >
                      {language === 'fr' ? currentGreet.subFR : currentGreet.subEN}
                    </motion.p>
                  </AnimatePresence>

                  {/* Simulating equalizer waves */}
                  <div className="flex gap-0.5 items-end justify-center h-4 mt-4" id="audio-visualizer-wave">
                    {[...Array(14)].map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={{
                          height: isPlaying 
                            ? [
                                `${Math.sin(subtitlePointer + i) * 6 + 10}px`,
                                `${Math.cos(subtitlePointer - i) * 5 + 8}px`,
                                `${Math.sin(subtitlePointer + i * 2) * 4 + 11}px`
                              ]
                            : "3px"
                        }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="w-[2px] bg-gold-400/80 rounded-full"
                      />
                    ))}
                  </div>

                </div>

                {/* Interactive HUD controllers layer */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <button 
                    onClick={() => setIsMuted(prev => !prev)}
                    className="w-7 h-7 rounded-full bg-black/60 border border-white/10 hover:border-gold-400 flex items-center justify-center text-white cursor-pointer transition active:scale-90"
                    title={isMuted ? "Unmute" : "Mute"}
                    id="host-mute-toggle"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-gray-300" /> : <Volume2 className="w-3.5 h-3.5 text-gold-400" />}
                  </button>

                  <button 
                    onClick={() => setIsPlaying(prev => !prev)}
                    className="w-7 h-7 rounded-full bg-gold-400 hover:bg-gold-300 flex items-center justify-center text-white cursor-pointer transition active:scale-90"
                    title={isPlaying ? "Pause speech loop" : "Play speech loop"}
                    id="host-play-toggle"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Narrative credentials & trigger desk */}
          <div className="lg:col-span-7 text-left space-y-6" id="host-narrative-panel">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-gold-500/10 border border-gold-500/20 text-gold-300 text-[10px] uppercase tracking-widest font-mono">
                <Crown className="w-3.5 h-3.5 text-gold-400" />
                {language === 'fr' ? "Concierge Virtuelle Héréditaire" : "Eiffel Palace Custom Concierge"}
              </div>
              
              <h3 className="font-serif text-2xl sm:text-4xl font-light text-white tracking-wide">
                {language === 'fr' 
                  ? "« Une attention souveraine à toute heure de la nuit »" 
                  : "“Sovereign devotion for your refined residence”"}
              </h3>

              <p className="text-gray-200 text-xs sm:text-sm font-light leading-relaxed">
                {language === 'fr'
                  ? "Développée exclusivement pour notre cercle d'invités éminents, Amara orchestre avec une discrétion absolue votre séjour à l'Hôtel. De l'alignement des oreillers de plumes de votre suite impériale, à la privatisation de la péniche d'honneur pour une croisière lagunaire, notre concierge virtuelle associe les technologies d'écoute à la ferveur de l'hospitalité béninoise."
                  : "Developed exclusively for our distinguished circle of guests, Amara orchestrates your residence with absolute discretion. From adjusting the feather contours of your imperial bedding to securing private yacht cruises on the lagoon, our host combines supreme digital assistance with the natural warmth of Porto-Novo service."}
              </p>
            </div>

            {/* Step 2: Atmospheric greeting toggles */}
            <div className="space-y-3 pt-3 border-t border-gold-500/10">
              <span className="text-[9px] tracking-widest font-bold uppercase text-gold-400 block">
                {language === 'fr' ? "Tester Différentes Ambiances" : "Explore Alternate Live Atmosphere Greetings"}
              </span>

              <div className="grid grid-cols-3 gap-2" id="greet-atmosphere-selectors">
                {GREETINGS.map((g) => {
                  const isSelected = selectedGreetId === g.id;
                  const GreetIcon = g.icon;
                  return (
                    <button
                      key={g.id}
                      onClick={() => {
                        setSelectedGreetId(g.id);
                        setIsPlaying(true);
                      }}
                      className={`p-2.5 rounded border text-center transition-all duration-200 cursor-pointer flex flex-col items-center gap-1 ${
                        isSelected 
                          ? 'border-gold-400 bg-gold-400/10 text-white' 
                          : 'border-white/5 bg-regal-red-950/[0.01] text-gray-300 hover:border-gold-400/40 hover:text-white'
                      }`}
                      id={`greet-switcher-btn-${g.theme}`}
                    >
                      <GreetIcon className={`w-4 h-4 ${isSelected ? 'text-gold-400' : 'text-gray-400'}`} />
                      <span className="text-[9px] font-bold uppercase block truncate max-w-full">
                        {language === 'fr' ? g.labelFR : g.labelEN}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Fast access direct to Chat triggers */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onNavigateToChat}
                className="w-full sm:w-auto px-6 py-3.5 rounded text-xs font-bold tracking-widest uppercase text-white bg-gradient-to-r from-gold-300 via-gold-450 to-gold-500 hover:brightness-110 cursor-pointer transition flex items-center justify-center gap-2 shadow-lg shadow-gold-500/10"
                id="host-go-to-chat-btn"
              >
                <MessageSquareCode className="w-4 h-4" />
                <span>{language === 'fr' ? "Ouvrir la Liaison Concierge (Chat)" : "Open Gilded Concierge Desk (Chat)"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="text-[10px] text-gray-400 italic flex items-center gap-1">
                <Compass className="w-4 h-4 text-gold-500/60" />
                <span>{language === 'fr' ? "Disponible 24h/24 en français & anglais" : "Answering 24/7 in English & French"}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
