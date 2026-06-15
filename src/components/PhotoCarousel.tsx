import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Compass, ArrowRight, Shield, Award, Users } from 'lucide-react';
import { ActiveTab } from '../types';
import { useLanguage } from '../LanguageContext';

interface PhotoCarouselProps {
  onNavigateTab: (tab: ActiveTab) => void;
}

export default function PhotoCarousel({ onNavigateTab }: PhotoCarouselProps) {
  const { language, t, carouselSlides } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const getHighlightIcon = (id: string) => {
    if (id === 'suite') return <Award className="w-5 h-5 text-gold-400" />;
    if (id === 'dining') return <Compass className="w-5 h-5 text-gold-400" />;
    return <Users className="w-5 h-5 text-gold-400" />;
  };

  // Custom auto-play loop with fluid progress tracking
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 7000; // 7 seconds per slide
    const tickTime = 100; // Redraw progress every 100ms
    const totalTicks = intervalTime / tickTime;
    let currentTick = 0;

    const timer = setInterval(() => {
      currentTick += 1;
      setProgress((currentTick / totalTicks) * 100);

      if (currentTick >= totalTicks) {
        currentTick = 0;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselSlides.length);
        setProgress(0);
      }
    }, tickTime);

    return () => clearInterval(timer);
  }, [isPlaying, currentIndex, carouselSlides]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselSlides.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselSlides.length) % carouselSlides.length);
    setProgress(0);
  };

  const handleSelectSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const currentSlide = carouselSlides[currentIndex] || carouselSlides[0];

  return (
    <section 
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 overflow-hidden" 
      id="hotel-luxury-carousel-section"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Decorative luxury subheaders */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-gold-500 font-bold block mb-3">{t('carousel.subtitle')}</span>
        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-medium tracking-tight">
          {t('carousel.title')}
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4" />
      </div>

      {/* Main Stage Frame */}
      {currentSlide && (
        <div className="relative h-[550px] sm:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border border-gold-500/10 bg-white" id="carousel-stage-container">
          
          {/* Animated Image Layer (Ken Burns + Crossfade) */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
              id={`slide-img-layer-${currentSlide.id}`}
            >
              <img 
                src={currentSlide.imageUrl} 
                alt={currentSlide.title} 
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              {/* Darkening layered gradients for cinematic lighting and high text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/45 to-transparent z-10" />
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#FAFAFA]/40 to-transparent z-10" />
            </motion.div>
          </AnimatePresence>

          {/* Universal Top-Left Luxury Shield Indicator */}
          <div className="absolute top-6 left-6 z-20 hidden sm:flex items-center gap-2 bg-[#FAFAFA]/85 backdrop-blur-md px-4 py-2 border border-gold-500/30 rounded" id="luxury-category-badge">
            {getHighlightIcon(currentSlide.id)}
            <span className="text-xs uppercase tracking-[0.15em] text-gold-300 font-bold font-sans">
              {currentSlide.category}
            </span>
          </div>

          {/* Content Card Overlay (Glassmorphism layout) */}
          <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-10 flex flex-col md:flex-row md:items-end justify-between gap-8" id="carousel-card-overlay">
            <div className="max-w-xl text-left">
              {/* Sliding text transitions with custom delay */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="text-[11px] font-bold text-gold-400 tracking-[0.2em] uppercase mb-1.5 font-sans">
                    {currentSlide.tagline}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-sans text-gray-900 tracking-tight mb-3">
                    {currentSlide.title}
                  </h3>
                  <p className="text-gray-800 text-xs sm:text-sm tracking-wide leading-relaxed font-light font-sans line-clamp-3 sm:line-clamp-none">
                    {currentSlide.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-4 min-w-[200px]" id="carousel-interaction-buttons">
              {/* Luxury Action Call */}
              <button
                onClick={() => onNavigateTab(currentSlide.targetTab)}
                className="group px-6 py-3 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-gray-900 hover:bg-gold-300 text-xs tracking-widest uppercase font-bold rounded shadow-lg shadow-gold-500/10 cursor-pointer flex items-center justify-center gap-2 transition duration-300"
                id={`carousel-btn-action-${currentSlide.id}`}
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Quick Micro Status Line */}
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-gold-300/85">
                <Shield className="w-3 h-3 text-gold-400" />
                {t('carousel.certified')}
              </div>
            </div>
          </div>

          {/* Discrete Next / Prev Arrow Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 z-30 hidden sm:block" id="prev-btn-wrapper">
            <button
              onClick={handlePrev}
              className="p-3.5 rounded-full bg-[#FAFAFA]/70 border border-gold-500/20 text-gold-300 hover:text-gray-900 hover:bg-white hover:border-gold-400 transition cursor-pointer"
              aria-label="Previous Slide"
              id="carousel-arrow-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 z-30 hidden sm:block" id="next-btn-wrapper">
            <button
              onClick={handleNext}
              className="p-3.5 rounded-full bg-[#FAFAFA]/70 border border-gold-500/20 text-gold-300 hover:text-gray-900 hover:bg-white hover:border-gold-400 transition cursor-pointer"
              aria-label="Next Slide"
              id="carousel-arrow-next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Small Progress Indicator (Tours of the spaces) */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-[#FAFAFA]/50 z-30 overflow-hidden" id="carousel-progress-track">
            <div 
              className="h-full bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
              id="carousel-progress-bar"
            />
          </div>

        </div>
      )}

      {/* Slide Index Controllers & Dot Bar below Carousel */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-2" id="carousel-bottom-navigation-bar">
        
        {/* Interactive Segment Selectors resembling dynamic luxury tabs */}
        <div className="flex space-x-2 w-full sm:w-auto overflow-x-auto scroller-hidden pb-1" id="carousel-tabs-container">
          {carouselSlides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => handleSelectSlide(idx)}
                className={`flex items-center gap-2 px-4 py-2 text-[11px] tracking-widest uppercase font-bold transition border rounded-md whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? "bg-gold-500/10 text-gold-300 border-gold-500" 
                    : "bg-[#FAFAFA] text-gray-600 border-gold-500/10 hover:border-gold-500/30 hover:text-gray-900"
                }`}
                id={`carousel-tab-trigger-${slide.id}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-gold-400 animate-ping' : 'bg-gray-600'}`} />
                <span>{slide.id === 'suite' ? t('carousel.slides') : slide.id === 'dining' ? t('carousel.dining') : t('carousel.events')}</span>
              </button>
            );
          })}
        </div>

        {/* Sequential page number tracking */}
        <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold font-sans flex items-center gap-1" id="carousel-index-badge">
          <span className="text-gold-400">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span>/</span>
          <span>{String(carouselSlides.length).padStart(2, '0')}</span>
        </div>

      </div>

    </section>
  );
}
