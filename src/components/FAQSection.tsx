import { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Clock, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle 
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: string;
  questionFR: string;
  questionEN: string;
  answerFR: string;
  answerEN: string;
  icon: any;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    category: "policies",
    questionFR: "Quels sont les horaires et conditions d'enregistrement et de départ ?",
    questionEN: "What are your check-in and check-out policies?",
    answerFR: "L'enregistrement standard débute à 15h00 et les départs s'effectuent avant 12h00. Pour nos invités résidant dans les suites et membres du cercle de prestige, des services d'enregistrement anticipé ou de départ tardif de courtoisie peuvent être coordonnés directement avec votre majordome privé, selon disponibilité.",
    answerEN: "Standard check-in is welcome from 15:00, and check-out is requested by 12:00. For our suite guests and members of our prestigious circle, complimentary early check-in or extended late check-out options can be custom arranged with your private butler, subject to availability.",
    icon: Clock
  },
  {
    id: "faq-2",
    category: "transport",
    questionFR: "Comment s'organisent la navette aéroport et les déplacements locaux ?",
    questionEN: "How are airport transfers and local private transport coordinated?",
    answerFR: "Nous offrons des transferts hautement sécurisés depuis l'Aéroport International de Cotonou-Cadjehoun (COO) en limousine privée avec chauffeur, incluant un accès accéléré au salon diplomatique. De plus, notre établissement dispose d'un héliport privé agréé sur le toit pour des arrivées d'urgence ou de prestige en toute discrétion.",
    answerEN: "We organize elite, highly secure transfers from Cotonou-Cadjehoun International Airport (COO) using our private chauffeured luxury fleet, complete with fast-track diplomatic salon access. Additionally, our estate features a certified rooftop helipad for swift, fully discrete helicopter arrivals.",
    icon: MapPin
  },
  {
    id: "faq-3",
    category: "amenities",
    questionFR: "Quels sont les équipements majeurs et services de loisirs disponibles ?",
    questionEN: "What signature amenities and wellness activities do you provide?",
    answerFR: "Les résidents bénéficient d'un accès illimité à notre spectaculaire piscine suspendue à débordement dominant la lagune de Porto-Novo, à notre bar de spiritueux d'exception 'Le Céleste', et à notre collection privée d'œuvres d'art contemporain béninois. Un service de conciergerie et de majordome dédié est disponible 24h/24 pour planifier vos excursions culturelles.",
    answerEN: "Guests enjoy complimentary 24/7 access to our iconic rooftop infinity pool overlooking the Porto-Novo lagoon, the refined 'Le Céleste' spirits lounge bar, and our custom-curated gallery of contemporary Beninese masterworks. A dedicated butler concierge desk remains on hand to tailor your cultural itineraries.",
    icon: Sparkles
  },
  {
    id: "faq-4",
    category: "security",
    questionFR: "Quel est le protocole de confidentialité et de sécurité de l'établissement ?",
    questionEN: "What security measures are implemented to protect residents?",
    answerFR: "La sécurité et la totale discrétion de nos hôtes sont au cœur de nos priorités. L'établissement bénéficie d'une protection diplomatique de haut rang, d'un contrôle d'accès biométrique discret aux ascenseurs des suites, d'une surveillance continue 24h/24 par des agents certifiés et de salons de réception privés dédiés aux délégations officielles.",
    answerEN: "The safety, absolute privacy, and total peace of mind of our guests are paramount. The estate is fortified with professional diplomatic-grade security details, biometric smart access for suite elevators, continuous 24/7 perimeter checks, and private secure receiving halls for official state delegates.",
    icon: ShieldCheck
  }
];

export default function FAQSection() {
  const { language } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const title = language === 'fr' ? "Questions Fréquentes" : "Sovereign FAQ";
  const subtitle = language === 'fr' ? "Conciergerie & Renseignements Officiels" : "Registry & General Inquiries";
  const desc = language === 'fr'
    ? "Tout ce qu'il convient de savoir pour préparer votre mémorable résidence dans les plus hauts standards de distinction."
    : "Everything required to curate your stay, aligned with the absolute highest standards of international hospitality luxury.";

  return (
    <section 
      className="py-24 bg-gradient-to-b from-[#050917] to-[#FAFAFA] border-t border-gold-500/10 relative overflow-hidden" 
      id="faq-accordion-section"
    >
      {/* Structural visual glows */}
      <div className="absolute inset-0 bg-[#FAFAFA]/20 pointer-events-none" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gold-500/[0.03] blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading Panel */}
        <div className="text-center mb-16">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.35em] text-gold-400 uppercase block mb-3">
            {subtitle}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-gray-900 uppercase">
            {title}
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
          <p className="max-w-xl mx-auto text-gray-600 text-xs sm:text-sm font-light mt-4">
            {desc}
          </p>
        </div>

        {/* Accordion list container */}
        <div className="space-y-4" id="faq-accordions-container">
          {FAQ_ITEMS.map((item) => {
            const isExpanded = expandedId === item.id;
            const heading = language === 'fr' ? item.questionFR : item.questionEN;
            const body = language === 'fr' ? item.answerFR : item.answerEN;
            const Icon = item.icon;

            return (
              <div 
                key={item.id}
                className={`border rounded-lg bg-white backdrop-blur-sm transition-all duration-300 ${
                  isExpanded 
                    ? 'border-gold-400 shadow-lg shadow-gold-500/5 bg-white/95' 
                    : 'border-gold-500/10 hover:border-gold-500/30'
                }`}
                id={`accordion-wrapper-${item.id}`}
              >
                {/* Accordion header button bar */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none group cursor-pointer"
                  id={`accordion-trigger-${item.id}`}
                  aria-expanded={isExpanded}
                  aria-controls={`accordion-content-${item.id}`}
                >
                  <div className="flex items-start gap-4 pr-4">
                    {/* Circle icon label */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border shrink-0 transition-colors ${
                      isExpanded 
                        ? 'bg-gold-500/10 border-gold-400 text-gold-400' 
                        : 'bg-white/5 border-white/10 text-gray-600 group-hover:text-gold-400 group-hover:border-gold-500/30'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    
                    <span className={`font-serif text-sm sm:text-base font-medium transition-colors duration-300 ${
                      isExpanded ? 'text-gold-300' : 'text-gray-900 group-hover:text-gray-900'
                    }`}>
                      {heading}
                    </span>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${
                    isExpanded 
                      ? 'border-gold-400 bg-gold-400 text-gray-900 rotate-180' 
                      : 'border-white/10 text-gray-600 group-hover:text-gray-900 group-hover:border-white/25'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated expandable content drawer */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`accordion-content-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: "auto", 
                        opacity: 1,
                        transition: {
                          height: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.25, delay: 0.05 }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3, ease: "easeInOut" },
                          opacity: { duration: 0.15 }
                        }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-8 pl-5 sm:pl-20 border-t border-white/5 pt-4 text-xs sm:text-sm font-light leading-relaxed text-gray-800">
                        {body}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

        {/* Visual Help-Desk Signature Footer banner */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white border border-gold-500/5 rounded-lg" id="faq-luxury-support-footer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                {language === 'fr' ? "Une question protocolaire particulière ?" : "Require bespoke assistance?"}
              </h4>
              <p className="text-[10px] text-gray-600 font-light">
                {language === 'fr' ? "Notre secrétariat diplomatique répond en direct 24h/24." : "Our administrative suite remains at your continuous command."}
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/22955123456?text=Bonjour%20Tour%20Eiffel%20H%C3%B4tel%2C%20je%20souhaite%20poser%20une%20question%20particuli%C3%A8re"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-gold-400/40 text-gold-400 hover:text-gray-900 hover:bg-gold-400 rounded text-[9px] tracking-widest font-bold uppercase transition duration-300 active:scale-95"
          >
            {language === 'fr' ? "Contacter le Maître d'Hôtel" : "Message Head Butler"}
          </a>
        </div>

      </div>
    </section>
  );
}
