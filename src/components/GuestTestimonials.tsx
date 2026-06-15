import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
}

const TESTIMONIALS_FR: Testimonial[] = [
  {
    id: "1",
    quote: "Un chef-d'œuvre absolu de l'hospitalité à Porto-Novo. De la sécurité de rang diplomatique au dôme de crabe à la feuille d'or du Chef Kofi, chaque instant s'est apparenté à une résidence royale privée. Les couchers de soleil sur la lagune depuis le jacuzzi sont tout simplement magiques.",
    author: "S.E. l'Ambassadeur Pierre-Yves Dupont",
    role: "Envoyé Diplomatique, Paris",
    rating: 5
  },
  {
    id: "2",
    quote: "Un séjour d'exception au cœur de l'âme du Bénin, enveloppé dans l'élégance classique française. La collection d'art béninois contemporain exposée est magistrale, et le Grand Salon Concorde a accueilli notre sommet de 500 délégués à la perfection absolue.",
    author: "Sénateur Chinedu Adeleke",
    role: "Conseiller principal à l'Union Ouest-Africaine",
    rating: 5
  },
  {
    id: "3",
    quote: "Savourer l'élixir de Sodabi vieilli près de la piscine suspendue restera un souvenir impérissable de mon passage au Bénin. Notre chauffeur privé s'est montré d'un dévouement sans faille, d'un professionnalisme digne des plus grands palaces mondiaux.",
    author: "Lady Caroline Sterling",
    role: "Conservatrice de Voyage d'Élite, Londres",
    rating: 5
  },
  {
    id: "4",
    quote: "L'Adjoint Virtuel s'est révélé incroyablement cultivé pour nous conter la glorieuse histoire des souverains de Porto-Novo. Notre dîner de célébration célébré au Salon Impérial Toffa fut un rêve éveillé. L'excellence sans aucun compromis.",
    author: "Prince Adebayo Soglo",
    role: "Président de la Fondation du Patrimoine",
    rating: 5
  }
];

const TESTIMONIALS_EN: Testimonial[] = [
  {
    id: "1",
    quote: "An absolute masterpiece of hospitality in Porto-Novo. From the diplomatic standard security to Chef Kofi's gold-leaf crab tartare, every moment felt like a private royal residency. The lagoon views from our presidential suite's jacuzzi are simply spectacular.",
    author: "H.E. Ambassador Pierre-Yves Dupont",
    role: "Diplomatic Envoy, Paris",
    rating: 5
  },
  {
    id: "2",
    quote: "Staying here was a journey through the soul of Benin, wrapped in classic French prestige. The contemporary Beninese art curated in our suite of art was breathtaking, and the Concorde Ballroom perfectly hosted our private 500-guest leadership summit.",
    author: "Senator Chinedu Adeleke",
    role: "Senior Advisor to the West African Union",
    rating: 5
  },
  {
    id: "3",
    quote: "Savoring the double-aged Sodabi elixir beside the suspended rooftop pool will remain a cherished memory of my visit to Benin. Our private chauffeur concierge treated us like royalty with unparalleled palace-grade service.",
    author: "Lady Caroline Sterling",
    role: "Luxury Travel Curator, London",
    rating: 5
  },
  {
    id: "4",
    quote: "The digital concierge assistant was amazingly resourceful in outlining Porto-Novo's history, and the Toffa Imperial Hall was the most magnificent backdrop for our royal wedding ceremony. Absolute 5-star perfection.",
    author: "Prince Adebayo Soglo",
    role: "Heritage Foundation President",
    rating: 5
  }
];

export default function GuestTestimonials() {
  const { language } = useLanguage();
  const list = language === 'fr' ? TESTIMONIALS_FR : TESTIMONIALS_EN;
  
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0); // -1 for left/prev, 1 for right/next
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slideDuration = 8000; // 8 seconds per slide

  // Setup auto-cycling timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, slideDuration);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index, isPlaying]);

  const handleNext = () => {
    setDirection(1);
    setIndex((prevIndex) => (prevIndex + 1) % list.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prevIndex) => (prevIndex - 1 + list.length) % list.length);
  };

  const currentTestimonial = list[index];

  // Variants for Framer Motion sliding animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      }
    })
  };

  return (
    <section 
      className="py-24 bg-gradient-to-b from-[#FAFAFA] to-[#050917] border-t border-gold-500/10 relative overflow-hidden" 
      id="guest-testimonials-section"
    >
      {/* Decorative stars / luxury vector grid backdrop */}
      <div className="absolute inset-0 bg-regal-red-900/30 pointer-events-none" />
      <div className="absolute -left-48 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -right-48 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.35em] text-gold-400 uppercase block mb-3">
            {language === 'fr' ? "Témoignages et Chroniques d'Hôtes" : "Guest Chronicles & Voices"}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white uppercase">
            {language === 'fr' ? "Paroles de Souverains" : "Whispers of the Elite"}
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
        </div>

        {/* Carousel Window */}
        <div 
          className="relative min-h-[340px] md:min-h-[280px] flex items-center justify-center bg-regal-red-950/80 border border-gold-500/10 rounded-lg p-8 sm:p-12 md:p-16 shadow-2xl backdrop-blur-sm group"
          id="testimonial-carousel-view"
        >
          {/* Background watermark quote */}
          <div className="absolute -top-1 right-6 text-gold-500/5 select-none pointer-events-none text-[120px] md:text-[180px] font-serif font-bold">
            ”
          </div>
          <div className="absolute -bottom-12 left-6 text-gold-500/5 select-none pointer-events-none text-[120px] md:text-[180px] font-serif font-bold">
            “
          </div>

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentTestimonial.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex flex-col items-center text-center"
              id={`slide-content-${currentTestimonial.id}`}
            >
              
              {/* Star Rating Panel */}
              <div className="flex items-center gap-1 mb-8" id="stars-row">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold-400 fill-gold-400" />
                ))}
              </div>

              {/* Quotation Icon Overlay */}
              <div className="w-10 h-10 rounded-full bg-gold-400/5 border border-gold-400/20 flex items-center justify-center text-gold-400 mb-6">
                <Quote className="w-4 h-4" />
              </div>

              {/* Quotation text */}
              <blockquote className="font-serif text-lg sm:text-2xl font-light text-gray-100 italic leading-relaxed max-w-3xl mb-8">
                "{currentTestimonial.quote}"
              </blockquote>

              {/* Author & Signature details */}
              <div className="mt-2" id="author-details-box">
                <cite className="not-italic text-sm sm:text-base font-medium tracking-widest text-[#f0f4f8] block uppercase">
                  {currentTestimonial.author}
                </cite>
                <span className="text-[10px] tracking-[0.25em] font-light text-gold-400 uppercase mt-1 block">
                  {currentTestimonial.role}
                </span>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls Panel */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-2" id="carousel-controls-bar">
          
          {/* Pause / Play interactive toggle button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 bg-regal-red-950 hover:bg-gray-50 text-[10px] tracking-[0.25em] font-bold text-gold-400 hover:text-gold-300 border border-gold-500/10 hover:border-gold-500/30 rounded transition-all cursor-pointer uppercase"
            id="toggle-playback-btn"
            title={isPlaying ? "Mettre en pause le cycle" : "Démarrer le cycle automatique"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 shrink-0" />
                <span>{language === 'fr' ? "PAUSE CYCLE" : "PAUSE CYCLE"}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-gold-400 shrink-0" />
                <span>{language === 'fr' ? "LECTURE AUTOCYCLE" : "AUTOCYCLE"}</span>
              </>
            )}
          </button>

          {/* Dots tracking state */}
          <div className="flex items-center gap-3" id="dots-container">
            {list.map((item, dIdx) => (
              <button
                key={item.id}
                onClick={() => {
                  setDirection(dIdx > index ? 1 : -1);
                  setIndex(dIdx);
                }}
                className={`transition-all duration-300 relative rounded-full cursor-pointer overflow-hidden ${
                  dIdx === index 
                    ? 'w-8 h-2.5 bg-gold-400' 
                    : 'w-2.5 h-2.5 bg-gold-400/25 hover:bg-gold-400/50'
                }`}
                id={`carousel-dot-${dIdx}`}
                aria-label={`Aller au témoignage ${dIdx + 1}`}
              >
                {/* Visual loading bar animation matching duration inside active dot */}
                {dIdx === index && isPlaying && (
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: slideDuration / 1000, ease: "linear" }}
                    className="absolute inset-0 bg-gold-200"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Prev/Next Luxury Hand Control Buttons */}
          <div className="flex items-center gap-2" id="prev-next-controllers">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded bg-regal-red-950 hover:bg-gold-400 text-gold-400 hover:text-white border border-gold-500/10 hover:border-gold-400 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
              id="prev-slide-btn"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded bg-regal-red-950 hover:bg-gold-400 text-gold-400 hover:text-white border border-gold-500/10 hover:border-gold-400 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
              id="next-slide-btn"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
