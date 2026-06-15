import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Landmark, Mail, Phone, MapPin, ArrowUp, Star, Send, Check } from 'lucide-react';
import { HOTEL_INFO } from '../data';
import { ActiveTab } from '../types';
import logoImage from '../../assets/images/logo1.svg';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      const errTxt = language === 'fr' 
        ? 'Veuillez saisir une adresse email valide.' 
        : 'Please specify a valid email address.';
      setErrorMessage(errTxt);
      return;
    }

    setStatus('loading');
    
    // Simulate luxury API call with artificial delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    setStatus('success');
    setEmail('');
  };

  return (
    <footer className="bg-[#030510] border-t border-gold-500/10 py-16 text-xs sm:text-sm text-gray-300 relative" id="footer-section">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Refined Form */}
        <div className="mb-16 pb-12 border-b border-gold-500/10" id="footer-newsletter-banner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-2">
              <span className="text-[10px] tracking-[0.25em] text-gold-400 font-bold uppercase block mb-1">
                {language === 'fr' ? "La Lettre Restreinte de l'Hermitage" : "The Restricted Gazette of the Hermitage"}
              </span>
              <h3 className="font-serif text-white text-xl sm:text-2xl font-medium tracking-wide">
                {language === 'fr' ? "Rejoignez le Cercle des Initiés" : "Join the Whispering Inner Circle"}
              </h3>
              <p className="text-gray-300 text-xs font-light leading-relaxed max-w-md">
                {language === 'fr'
                  ? "Inscrivez-vous pour recevoir en priorité nos invitations privées, offres confidentielles de suites royales, et l'actualité culinaire de notre table étoilée."
                  : "Subscribe to receive priority access to private gala invitations, confidential suite specials, and culinary heritage updates from our Master Chef."}
              </p>
            </div>
            
            <div className="lg:col-span-7" id="newsletter-form-container">
              {status === 'success' ? (
                <div 
                  className="bg-gold-500/5 border border-gold-500/30 rounded px-6 py-5 flex items-center gap-4 text-left shadow-lg shadow-gold-500/5"
                  id="newsletter-success-box"
                >
                  <div className="w-10 h-10 rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center text-gold-300 shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-white text-sm font-semibold tracking-wide">
                      {language === 'fr' ? "Votre invitation a été enregistrée" : "Your premium invitation is preserved"}
                    </h4>
                    <p className="text-[11px] text-gold-300 font-light mt-1">
                      {language === 'fr'
                        ? "Un email de confirmation royale vient de vous être envoyé. Bienvenue dans notre confrérie de prestige."
                        : "An email confirming your royal member tier has been transmitted. Welcome to our elite circle."}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3" id="newsletter-subscription-form">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === 'error') setStatus('idle');
                        }}
                        placeholder={language === 'fr' ? "Saisissez votre adresse email de prestige..." : "Enter your premium email address..."}
                        disabled={status === 'loading'}
                        className="w-full bg-regal-red-900/80 text-white placeholder-gray-500 text-xs sm:text-sm px-4 py-3.5 rounded border border-gold-500/20 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all font-light"
                        required
                        id="newsletter-email-input"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className={`px-6 py-3.5 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-white hover:bg-gold-300 text-xs tracking-widest uppercase font-bold rounded shadow-lg shadow-gold-500/10 cursor-pointer flex items-center justify-center gap-2 transition duration-300 shrink-0 ${
                        status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                      id="newsletter-submit-btn"
                    >
                      {status === 'loading' ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-midnight-950/35 border-t-midnight-950 animate-spin" />
                          <span>{language === 'fr' ? "Envoi en cours" : "Transmitting..."}</span>
                        </>
                      ) : (
                        <>
                          <span>{language === 'fr' ? "S'abonner" : "Subscribe"}</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between gap-2 text-[10px] text-gray-400 font-light px-1">
                    <span>
                      {language === 'fr'
                        ? "Confidentialité suprême garantie. Désabonnement à tout moment d'un clic."
                        : "Absolute confidentiality guaranteed. Escape from subscription in one simple click."}
                    </span>
                    {status === 'error' && (
                      <span className="text-red-400 font-medium animate-pulse" id="newsletter-error-text">
                        {errorMessage}
                      </span>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12" id="footer-grid">
          
          {/* Column 1: Brand details (5 span) */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3" id="footer-logo">
              <img src={logoImage} alt="Tour Eiffel Logo" className="h-10 w-auto object-contain drop-shadow-md brightness-200" />
            </div>

            <p className="text-gray-300 text-xs font-light leading-relaxed max-w-sm">
              {language === 'fr'
                ? "L'alliance d'or entre la culture et la royauté béninoise et la géométrie intemporelle de l'excellence de style français. Succombez aux charmes inestimables de la lagune de Porto-Novo."
                : "A golden architectural alliance between royal Beninese legacy and French timeless geometric precision, looking gracefully upon Porto-Novo's historic lagoon."}
            </p>

            {/* Stars rating visual */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
              ))}
              <span className="text-[10px] tracking-widest text-gold-400 font-bold uppercase ml-2">
                {language === 'fr' ? "Cinq Étoiles Distinction" : "Five Star Luxury Rating"}
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links Navigation (3 span) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-white uppercase font-bold tracking-widest text-gold-300">
              {language === 'fr' ? "Explorations" : "Curated Journeys"}
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <button 
                  onClick={() => { setActiveTab('home'); handleScrollToTop(); }}
                  className="hover:text-gold-400 transition cursor-pointer flex items-center gap-1 text-left"
                >
                  {language === 'fr' ? "Accueil Impérial" : "Imperial Suite Entrance"}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('rooms'); handleScrollToTop(); }}
                  className="hover:text-gold-400 transition cursor-pointer flex items-center gap-1 text-left"
                >
                  {language === 'fr' ? "Chambres & Suites d'Art" : "Artistic Chambers & Suites"}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('restaurant'); handleScrollToTop(); }}
                  className="hover:text-gold-400 transition cursor-pointer flex items-center gap-1 text-left"
                >
                  {language === 'fr' ? "Table Étoilée \"L'Art de Vivre\"" : "High Table \"L'Art de Vivre\""}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('events'); handleScrollToTop(); }}
                  className="hover:text-gold-400 transition cursor-pointer flex items-center gap-1 text-left"
                >
                  {language === 'fr' ? "Salons de Prestige Concorde" : "Prestigious Concorde Lounges"}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('chat'); handleScrollToTop(); }}
                  className="hover:text-gold-400 transition cursor-pointer flex items-center gap-1 text-left"
                >
                  {language === 'fr' ? "Concierge IA Dédié" : "Dedicated AI Concierge"}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contacts & Address details (4 span) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif text-white uppercase font-bold tracking-widest text-gold-300">
              {language === 'fr' ? "L'Adresse Royale" : "The Imperial Seat"}
            </h4>
            <ul className="space-y-3 font-light text-xs">
              
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-gray-300">
                  {HOTEL_INFO.address}
                </span>
              </li>

              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400" />
                <a href={`tel:${HOTEL_INFO.phone}`} className="hover:text-gold-400 transition font-mono">
                  {HOTEL_INFO.phone}
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400" />
                <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-gold-400 transition font-mono">
                  {HOTEL_INFO.email}
                </a>
              </li>

            </ul>
          </div>

        </div>

        {/* Lower Row copyright and back to top */}
        <div className="mt-12 pt-8 border-t border-gold-500/10 flex flex-col sm:flex-row justify-between items-center gap-6" id="footer-bottom">
          <div className="text-center sm:text-left text-[11px] text-gray-400 font-light">
            <p>© {new Date().getFullYear()} {HOTEL_INFO.name}. {language === 'fr' ? "Tous droits réservés." : "All rights reserved."}</p>
            <p className="mt-1">
              {language === 'fr' 
                ? "République du Bénin • Porto-Novo, Ville d'Histoire et de Légende." 
                : "Republic of Benin • Porto-Novo, Cradle of Sacred History and Royal Legend."}
            </p>
          </div>

          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 px-3 py-2 bg-regal-red-900 border border-gold-500/20 hover:border-gold-400 hover:text-gold-400 text-xs uppercase tracking-widest transition rounded cursor-pointer font-bold"
            id="footer-back-top"
          >
            <ArrowUp className="w-3.5 h-3.5 text-gold-400" />
            {language === 'fr' ? "Remonter au faîte" : "Return to Top"}
          </button>
        </div>

      </div>
    </footer>
  );
}
