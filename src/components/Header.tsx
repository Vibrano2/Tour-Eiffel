import { Star, Menu, X, Landmark, Compass, CalendarRange } from 'lucide-react';
import { useState } from 'react';
import { ActiveTab } from '../types';
import { useLanguage } from '../LanguageContext';
import { motion, useScroll } from 'motion/react';
import logoImage from '../../assets/images/logo1.svg';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t, hotelInfo } = useLanguage();
  const { scrollYProgress } = useScroll();

  const navigationItems: { id: ActiveTab; labelKey: string }[] = [
    { id: 'home', labelKey: 'nav.home' },
    { id: 'rooms', labelKey: 'nav.rooms' },
    { id: 'restaurant', labelKey: 'nav.restaurant' },
    { id: 'events', labelKey: 'nav.events' },
    { id: 'chat', labelKey: 'nav.chat' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#FAFAFA]/85 backdrop-blur-md border-b border-gold-500/10 transition-all duration-300">
      {/* Slim Gold Scroll Progress Bar */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-500 via-gold-400 to-gold-300 origin-left z-[60] shadow-sm shadow-gold-500/50"
        style={{ scaleX: scrollYProgress }}
        id="scroll-progress-bar"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            id="header-logo-container"
          >
            <img src={logoImage} alt="Tour Eiffel Logo" className="h-12 w-auto object-contain drop-shadow-md" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-4" id="desktop-nav">
            {navigationItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-4 py-2 text-sm tracking-widest font-medium uppercase transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'text-regal-red-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  {t(item.labelKey)}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-regal-red-600 to-transparent" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Reserve Button & Language Switcher (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 border border-gold-500/10 bg-[#FAFAFA]/60 p-1 rounded" id="header-lang-switcher-desktop">
              <button
                onClick={() => setLanguage('fr')}
                className={`px-2 py-1 text-[10px] font-bold tracking-widest rounded transition duration-200 cursor-pointer ${
                  language === 'fr' 
                    ? 'bg-gold-400 text-gray-900 font-black' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                id="desktop-lang-fr"
              >
                FR
              </button>
              <span className="text-gold-500/20 text-xs select-none">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-[10px] font-bold tracking-widest rounded transition duration-200 cursor-pointer ${
                  language === 'en' 
                    ? 'bg-gold-400 text-gray-900 font-black' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                id="desktop-lang-en"
              >
                EN
              </button>
            </div>

            <a 
              href={hotelInfo.whatsappUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 text-xs tracking-widest uppercase font-semibold text-gray-900 bg-gradient-to-r from-regal-red-500 via-regal-red-600 to-regal-red-700 hover:from-regal-red-400 hover:to-regal-red-600 text-white transition-all rounded transition duration-300 shadow-md shadow-gold-500/10 hover:shadow-gold-500/20"
              id="cta-whatsapp-navbar"
            >
              <CalendarRange className="w-3.5 h-3.5" />
              {t('header.cta.desktop')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition duration-150 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAFAFA] border-b border-gold-500/20 animate-fadeIn" id="mobile-nav-panel">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            
            {/* Mobile Language Switcher row */}
            <div className="px-4 py-2 flex items-center justify-between border-b border-gold-500/5 mb-2">
              <span className="text-[10px] tracking-widest text-gray-500 font-bold uppercase">Langue / Language</span>
              <div className="flex items-center gap-1 border border-gold-500/10 bg-white p-1 rounded" id="header-lang-switcher-mobile">
                <button
                  onClick={() => setLanguage('fr')}
                  className={`px-3 py-1 text-[10px] font-bold tracking-widest rounded transition cursor-pointer ${
                    language === 'fr' 
                      ? 'bg-gold-400 text-gray-900 font-black' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  id="mobile-lang-fr"
                >
                  FR
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 text-[10px] font-bold tracking-widest rounded transition cursor-pointer ${
                    language === 'en' 
                      ? 'bg-gold-400 text-gray-900 font-black' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  id="mobile-lang-en"
                >
                  EN
                </button>
              </div>
            </div>

            {navigationItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-md text-base font-medium tracking-wide transition duration-150 cursor-pointer ${
                    isActive 
                      ? 'bg-gold-500/15 text-gold-400 border-l-2 border-gold-500 pl-3' 
                      : 'text-gray-800 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  id={`mobile-nav-link-${item.id}`}
                >
                  {t(item.labelKey)}
                </button>
              );
            })}
            
            <div className="pt-4 pb-2 px-4">
              <a
                href={hotelInfo.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 text-center text-sm font-semibold tracking-wider text-gray-900 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 rounded shadow-md"
                id="mobile-cta-whatsapp"
              >
                <Compass className="w-4 h-4" />
                {t('header.cta.mobile')}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
