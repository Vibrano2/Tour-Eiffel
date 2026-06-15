import { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { EventHall } from '../types';
import { 
  Building, 
  Users2, 
  Check, 
  TrendingUp, 
  Calculator, 
  Sparkles, 
  MapPin, 
  Volume2, 
  ShieldAlert, 
  Smartphone,
  CalendarDays
} from 'lucide-react';

export default function EventsSection() {
  const { language, t, halls, hotelInfo } = useLanguage();
  const [selectedHall, setSelectedHall] = useState<string>(halls[0].id);
  const [eventType, setEventType] = useState<'mariage' | 'gala' | 'seminaire' | 'cocktail'>('gala');
  const [guestsCount, setGuestsCount] = useState<number>(300);
  const [cateringTier, setCateringTier] = useState<'gastronomic' | 'elite' | 'standard'>('elite');
  const [techPackage, setTechPackage] = useState<string[]>([]);
  
  const activeHallDetails = halls.find(h => h.id === selectedHall) || halls[0];

  const toggleTechOption = (id: string) => {
    setTechPackage(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Pricing Calculation Engine
  const calculateQuote = () => {
    const baseHallPrice = activeHallDetails.rateFullDay;
    
    let cateringPricePerPerson = 45000; // gastronomic
    if (cateringTier === 'elite') cateringPricePerPerson = 30000;
    if (cateringTier === 'standard') cateringPricePerPerson = 18000;
    
    const totalCatering = cateringPricePerPerson * guestsCount;
    
    let techCost = 0;
    if (techPackage.includes('acoustics')) techCost += 150000;
    if (techPackage.includes('translation')) techCost += 400000;
    if (techPackage.includes('chandelier')) techCost += 250000;
    if (techPackage.includes('security')) techCost += 300000;

    const subtotal = baseHallPrice + totalCatering + techCost;
    const taxes = subtotal * 0.18; // 18% local VAT
    const total = subtotal + taxes;

    return {
      hallCost: baseHallPrice,
      cateringCost: totalCatering,
      techCost,
      subtotal,
      taxes,
      total
    };
  };

  const quoteResult = calculateQuote();

  const handleSendQuoteWhatsApp = () => {
    const textStr = language === 'fr'
      ? `Bonjour Concierge Tour Eiffel Hôtel Bénin! %0AJe souhaite solliciter une demande de devis officielle pour un événement d'élite.%0A%0A*Type d'Événement:* ${eventType.toUpperCase()}%0A*Salle Souhaitée:* ${activeHallDetails.name}%0A*Nombre d'invités:* ${guestsCount} Convives%0A*Service Traiteur:* ${cateringTier.toUpperCase()}%0A*Équipements Techniques:* ${techPackage.join(', ') || 'Standard'}%0A*Total Estimé:* ${Math.round(quoteResult.total).toLocaleString()} FCFA (TVA incluse)%0A%0AMerci de me mettre en contact avec votre Responsable Événementiel et Banquet.`
      : `Hello Concierge Tour Eiffel Hotel Benin! %0AI wish to request an official quote proposal for an exclusive event.%0A%0A*Event Theme:* ${eventType.toUpperCase()}%0A*Espace / Hall:* ${activeHallDetails.name}%0A*Guests:* ${guestsCount} Noble Covers%0A*Catering Class:* ${cateringTier.toUpperCase()}%0A*Bespoke Tech Packages:* ${techPackage.join(', ') || 'Standard'}%0A*Estimated Price Quote:* ${Math.round(quoteResult.total).toLocaleString()} FCFA (including local tax)%0A%0APlease coordinate with your Corporate Banquet Manager.`;
    window.open(`https://wa.me/22955123456?text=${textStr}`, '_blank');
  };

  const localizedEvents = language === 'fr'
    ? [
        {
          id: 'voodoo',
          title: 'Grande Veillée Vodoun d\'Élite',
          subtitle: 'Célébrer l\'ancestralité sacrée du Bénin sous les astres',
          description: 'Une immersion spirituelle exclusive pour nos hôtes de marque, guidée par de hauts dignitaires de Porto-Novo. Chœur traditionnel, dégustation de Sodabi centenaire et mets du terroir revisités à la lueur des flambeaux de bronze.',
          imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600',
          date: '10 Janvier',
          time: '20h00 - Minuit mystique',
          highlight: 'Danses sacrées, Chasseurs de nuit & Tambours d\'Or',
          price: 'Accès Réservé Hôtes / Sur invitation vip'
        },
        {
          id: 'sylvestre',
          title: 'Dîner de la Saint-Sylvestre Impériale',
          subtitle: 'Le passage au Nouvel An dans le faste et la grandeur',
          description: 'Un voyage sensoriel en 7 temps imaginé par le Chef Kofi, suivi d\'un spectacle lyrique au Salon Central d\'Or et d\'un compte à rebours depuis l\'héliport panoramique survolant la lagune étincelante.',
          imageUrl: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=600',
          date: '31 Décembre',
          time: '21h00 - Jusqu\'à l\'aube oratoire',
          highlight: 'Feu d\'artifice lacustre, orchestre symphonique & Champagne Krug illimité',
          price: 'Plein Tarif : 150 000 FCFA / pers'
        }
      ]
    : [
        {
          id: 'voodoo',
          title: 'Imperial Vodoun Sacred Night',
          subtitle: 'Celebrating the sacred spirit of Benin under the royal stars',
          description: 'An exclusive spiritual immersion for distinguished global guests, structured under guidance of Porto-Novo royal dignitaries. Ancestral choirs, tasting of century-aged fine Sodabi, and regional delicacies illuminated by grand torches.',
          imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600',
          date: 'January 10',
          time: '20:00 - Midnight mystique',
          highlight: 'Sacred dances, Night Hunters & Golden Ancestral Drums',
          price: 'Hotel Guest Reserved / VIP Invitation'
        },
        {
          id: 'sylvestre',
          title: 'Imperial Saint-Sylvestre Gala',
          subtitle: 'Stepping into the New Year with highest grand design',
          description: 'A sensory 7-course culinary voyage designed by Chef Kofi, followed by a live lyric representation in the Central Golden Salon, culminating in a champagne toast on the heliport overlooking the sparkling lagoon.',
          imageUrl: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=600',
          date: 'December 31',
          time: '21:00 - Until majestic twilight',
          highlight: 'Midnight waterfront fireworks, symphonic orchestra & unlimited Krug Champagne',
          price: 'Standard Entrance: 150,000 FCFA / guest'
        }
      ];

  const typesList = language === 'fr' 
    ? [
        { id: 'gala', label: 'Soirée de Gala' },
        { id: 'mariage', label: 'Mariage Princier' },
        { id: 'seminaire', label: 'Séminaire Exécutif' },
        { id: 'cocktail', label: 'Cocktail Mondain' },
      ]
    : [
        { id: 'gala', label: 'Royal Gala Celebration' },
        { id: 'mariage', label: 'Princely Sovereign Wedding' },
        { id: 'seminaire', label: 'Executive Board Retreat' },
        { id: 'cocktail', label: 'High Society Cocktail' },
      ];

  return (
    <section className="py-24 bg-midnight-900 text-white relative" id="events-section">
      <div className="absolute inset-0 bg-midnight-900/92 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-gold-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.35em] text-gold-400 uppercase block mb-3">
            {language === 'fr' ? 'Célébrations de Haute Volée' : 'High Society Gatherings & Summit'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white uppercase">
            {t('events.title')}
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
        </div>

        {/* Halls Catalog Cards */}
        <div className="mb-24 space-y-12" id="halls-catalog">
          <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-widest text-center text-gold-300 mb-8">
            {language === 'fr' ? "Nos Espaces d'Exception" : "Our Iconic High-Security Venues"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {halls.map((hall) => {
              const isSelected = selectedHall === hall.id;
              return (
                <div 
                  key={hall.id}
                  onClick={() => setSelectedHall(hall.id)}
                  className={`p-6 sm:p-8 rounded transition duration-300 flex flex-col justify-between cursor-pointer border ${
                    isSelected 
                      ? 'border-gold-400 bg-gradient-to-br from-[#0c142c] to-[#040612] shadow-xl shadow-gold-500/5' 
                      : 'border-gold-500/10 bg-midnight-950/40 hover:border-gold-400/30'
                  }`}
                  id={`hall-card-${hall.id}`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="w-10 h-10 rounded bg-gold-400/10 flex items-center justify-center text-gold-400">
                        <Building className="w-5 h-5" />
                      </span>
                      <span className="px-3 py-1 bg-midnight-900 border border-gold-500/10 text-[10px] tracking-widest text-gray-200 uppercase rounded font-bold">
                        {language === 'fr' ? `Capacité ${hall.capacity}+` : `Holds ${hall.capacity}+ guests`}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-white mb-2">
                      {hall.name}
                    </h4>
                    
                    <p className="text-gray-300 text-xs font-light leading-relaxed mb-6">
                      {hall.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gold-500/5 flex justify-between items-baseline">
                    <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">{language === 'fr' ? 'Journée complète' : 'Full-Day Rate'}</span>
                    <span className="font-serif text-base font-bold text-gold-400">
                      {hall.rateFullDay.toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Calculator Configurator Console */}
        <div className="bg-gradient-to-b from-[#0b1227] to-[#040612] border border-gold-500/20 rounded-xl p-6 sm:p-10 shadow-2xl" id="quote-calculator">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Calculator Inputs Left (5 span) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-white">
                  {language === 'fr' ? "Créateur de Devis d'Élite" : "Regal Event Cost Configurator"}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm font-light mt-1">
                  {language === 'fr'
                    ? "Configurez immédiatement en ligne votre séminaire d'affaires ou votre banquet royal et visualisez l'estimation en temps réel."
                    : "Instantly configure your board retreat or high sovereign banquet with instantaneous cost transparency."}
                </p>
              </div>

              {/* Form Input fields */}
              <div className="space-y-4">
                
                {/* Event Type selector */}
                <div>
                  <label className="block text-[10px] tracking-widest uppercase font-bold text-gray-300 mb-2">{language === 'fr' ? "Typologie de l'Événement" : "Event Theme Class"}</label>
                  <div className="grid grid-cols-2 gap-2" id="event-type-grid">
                    {typesList.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setEventType(item.id as any)}
                        className={`p-2.5 text-xs text-center border font-semibold rounded cursor-pointer transition ${
                          eventType === item.id 
                            ? 'border-gold-400 bg-gold-400 text-white font-bold' 
                            : 'border-gold-500/10 bg-midnight-900/40 text-gray-300 hover:text-white'
                        }`}
                        id={`event-type-btn-${item.id}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hall selector dropdown */}
                <div>
                  <label className="block text-[10px] tracking-widest uppercase font-bold text-gray-300 mb-2">{language === 'fr' ? "Espace & Salles" : "Select Target Lounge"}</label>
                  <select
                    value={selectedHall}
                    onChange={(e) => setSelectedHall(e.target.value)}
                    className="w-full bg-midnight-900 border border-gold-500/10 focus:border-gold-400 text-sm text-white p-2.5 rounded cursor-pointer outline-none"
                    style={{ colorScheme: 'dark' }}
                    id="calc-select-hall"
                  >
                    {halls.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} ({language === 'fr' ? `Max ${h.capacity} pers` : `Seats up to ${h.capacity} guests`})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guest Slider */}
                <div>
                  <div className="flex justify-between text-[11px] uppercase font-bold text-gray-300 mb-2">
                    <span>{language === 'fr' ? "Nombre de Nobles Convives" : "Expected Sovereign Guests"}</span>
                    <span className="text-gold-400 font-bold">{guestsCount} {language === 'fr' ? 'Personnes' : 'Covers'}</span>
                  </div>
                  <input 
                    type="range"
                    min={20}
                    max={activeHallDetails.capacity}
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                    className="w-full accent-gold-500 bg-midnight-900 rounded cursor-pointer"
                    id="calc-guests-slider"
                  />
                  <div className="flex justify-between text-[9px] text-gray-400 font-bold uppercase mt-1">
                    <span>Min: 20</span>
                    <span>{language === 'fr' ? `Salle Max: ${activeHallDetails.capacity} Pers` : `Lounge Max: ${activeHallDetails.capacity} Co`}</span>
                  </div>
                </div>

                {/* Catering level selector */}
                <div>
                  <label className="block text-[10px] tracking-widest uppercase font-bold text-gray-300 mb-2">{language === 'fr' ? "Prestige Gastronomique (Traiteur)" : "Bespoke Gastronomic Catering Plan"}</label>
                  <select
                    value={cateringTier}
                    onChange={(e) => setCateringTier(e.target.value as any)}
                    className="w-full bg-midnight-900 border border-gold-500/10 focus:border-gold-400 text-sm text-white p-2.5 rounded cursor-pointer outline-none"
                    style={{ colorScheme: 'dark' }}
                    id="calc-select-catering"
                  >
                    <option value="gastronomic">{language === 'fr' ? "Menu Étoilé d'Ivoire (~45,000 FCFA/pers)" : "Michelin Star Ivory Set Menu (~45,000 FCFA/head)"}</option>
                    <option value="elite">{language === 'fr' ? "Buffet Prestige du Chef Kofi (~30,000 FCFA/pers)" : "Chef Kofi Prestige Gala Buffet (~30,000 FCFA/head)"}</option>
                    <option value="standard">{language === 'fr' ? "Pause & Lunch Affaires (~18,000 FCFA/pers)" : "Executive Board Working Lunch (~18,000 FCFA/head)"}</option>
                  </select>
                </div>

                {/* Tech requirements checkboxes */}
                <div>
                  <span className="block text-[10px] tracking-widest uppercase font-bold text-gray-300 mb-3 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                    {language === 'fr' ? "Services & Technologies Additionnels" : "Add-on Sovereign Services"}
                  </span>
                  
                  <div className="space-y-2">
                    {[
                      { 
                        id: 'acoustics', 
                        label: language === 'fr' 
                          ? 'Régie Sonore, Écrans Led & Acoustique avancée (+150K)' 
                          : 'Advanced Acoustic system & active fine display grids (+150K)', 
                        icon: Volume2 
                      },
                      { 
                        id: 'translation', 
                        label: language === 'fr' 
                          ? 'Interprètes & Cabines de Traduction Simultanée (+400K)' 
                          : 'Professional translation booths & active translators (+400K)', 
                        icon: Sparkles 
                      },
                      { 
                        id: 'chandelier', 
                        label: language === 'fr' 
                          ? 'Déco Florale d\'Or & Lustres d\'apparat (+250K)' 
                          : 'Gold floral installations & majestic state chandeliers (+250K)', 
                        icon: Sparkles 
                      },
                      { 
                        id: 'security', 
                        label: language === 'fr' 
                          ? 'Garde Diplomatique & Sécurisation de l\'héliport (+300K)' 
                          : 'Ambassadorial private security & active heliport guarding (+300K)', 
                        icon: ShieldAlert 
                      }
                    ].map((opt) => {
                      const isChecked = techPackage.includes(opt.id);
                      return (
                        <div 
                          key={opt.id}
                          onClick={() => toggleTechOption(opt.id)}
                          className={`p-3 rounded border text-xs cursor-pointer select-none transition ${
                            isChecked 
                              ? 'border-gold-400 bg-gold-400/10 font-medium text-gold-300' 
                              : 'border-gold-500/10 bg-midnight-900/60 text-gray-300 hover:bg-midnight-950'
                          }`}
                          id={`tech-opt-${opt.id}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                              isChecked ? 'bg-gold-500 border-gold-400 text-white' : 'border-gold-500/30'
                            }`}>
                              {isChecked && <Check className="w-2.5 h-2.5 stroke-[4px]" />}
                            </span>
                            <span>{opt.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

            {/* Bill Statement Receipt Right (7 span) */}
            <div className="lg:col-span-7 bg-midnight-900/80 p-6 sm:p-8 rounded border border-gold-500/10 flex flex-col justify-between" id="quote-bill-panel">
              
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gold-500/5 pb-3">
                  <span className="text-xs uppercase tracking-widest font-bold text-gold-400 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-gold-400" />
                    {language === 'fr' ? "Estimation Instantanée du Devis" : "Instantaneous Quote Invoice Estimate"}
                  </span>
                  <span className="px-2 py-0.5 bg-gold-500/10 border border-gold-400/20 text-[9px] tracking-widest text-gold-300 uppercase rounded">
                    {language === 'fr' ? "Tarif 2026" : "2026 Sovereign Pricing"}
                  </span>
                </div>

                {/* Bill details list in monospace styling */}
                <div className="space-y-4 font-mono text-xs text-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase">{language === 'fr' ? "Salle Réservée :" : "Preempted Space:"}</span>
                    <span className="text-white text-right max-w-xs">{activeHallDetails.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase">{language === 'fr' ? "Durée Tarif :" : "Duration:"}</span>
                    <span className="text-white">{language === 'fr' ? "1 Journée Complète" : "1 State Full-Day Period"}</span>
                  </div>

                  <div className="flex justify-between border-b border-gold-500/5 pb-3">
                    <span className="text-gray-400 uppercase">{language === 'fr' ? "Frais d'Espace :" : "Base Space Cost:"}</span>
                    <span className="text-gold-400 font-bold">{quoteResult.hallCost.toLocaleString()} FCFA</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase">{language === 'fr' ? `Catering (${guestsCount} pers) :` : `Gourmet Catering (${guestsCount} covers) :`}</span>
                    <span className="text-white">{quoteResult.cateringCost.toLocaleString()} FCFA</span>
                  </div>

                  <div className="flex justify-between border-b border-gold-500/5 pb-3">
                    <span className="text-gray-400 uppercase">{language === 'fr' ? "Package Technicité :" : "Specialty Add-on packages:"}</span>
                    <span className="text-white">{quoteResult.techCost.toLocaleString()} FCFA</span>
                  </div>

                  {/* Inter-subtotal */}
                  <div className="flex justify-between text-sm text-gray-300">
                    <span className="uppercase">{language === 'fr' ? "Montant Hors Taxe (HT) :" : "Subtotal HT:"}</span>
                    <span>{quoteResult.subtotal.toLocaleString()} FCFA</span>
                  </div>

                  <div className="flex justify-between text-gray-400">
                    <span className="uppercase">{language === 'fr' ? "TVA Légale Bénin (18%) :" : "Beninese VAT (18%):"}</span>
                    <span>{Math.round(quoteResult.taxes).toLocaleString()} FCFA</span>
                  </div>

                  {/* Grand total */}
                  <div className="pt-4 border-t border-gold-500/20 flex justify-between items-baseline text-white">
                    <span className="text-sm uppercase font-bold text-gold-400">{language === 'fr' ? "Total Prévisionnel (TTC) :" : "Estimated Grand Total TTC:"}</span>
                    <span className="font-serif text-lg sm:text-2xl font-bold text-gold-400 font-sans">
                      {Math.round(quoteResult.total).toLocaleString()} FCFA
                    </span>
                  </div>
                </div>

              </div>

              {/* Action buttons */}
              <div className="mt-8 pt-4 border-t border-gold-500/5 space-y-3">
                <p className="text-[10px] text-gray-400 text-center leading-relaxed font-light">
                  {language === 'fr'
                    ? "*Ce calcul virtuel constitue une base d'évaluation conforme à notre tarification diplomatique 2026. Un expert événementiel prendra attache avec vous pour l'ajustement des protocoles de sécurité et de fleurissement."
                    : "*This instant estimate acts as a baseline compliant with our 2026 diplomatic standard. Our private Event Director will finalize layout, precise security steps and bespoke requirements."}
                </p>

                <button
                  type="button"
                  onClick={handleSendQuoteWhatsApp}
                  className="w-full py-3.5 rounded text-xs tracking-widest font-bold uppercase text-white bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gold-500/10 font-bold"
                  id="calc-whatsapp-btn"
                >
                  <Smartphone className="w-4 h-4" />
                  {language === 'fr' ? "Transmettre au Secrétariat d'Événements (WhatsApp)" : "Forward Draft to Banquet Office (WhatsApp)"}
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Upcoming events showcase section (Saint Sylvestre, Vodoun Fest) */}
        <div className="mt-24" id="upcoming-events-grid">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.25em] font-bold text-gold-400 uppercase block mb-2">{language === 'fr' ? "Les Grandes Heures du Palais" : "The Hall of Kings Calendar"}</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium uppercase text-white">{language === 'fr' ? "Événements Élite À Venir" : "Awaiting Iconic Gatherings"}</h3>
            <div className="w-8 h-[1px] bg-gold-400 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {localizedEvents.map((eve) => (
              <div 
                key={eve.id}
                className="bg-midnight-950/40 border border-gold-500/10 rounded-lg overflow-hidden flex flex-col justify-between hover:border-gold-400/30 transition shadow-lg"
                id={`upcoming-eve-${eve.id}`}
              >
                <div className="relative h-[200px]">
                  <img 
                    src={eve.imageUrl} 
                    alt={eve.title} 
                    className="w-full h-full object-cover filter brightness-[0.40] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <span className="px-2.5 py-0.5 rounded bg-gold-400 text-white font-bold text-[9px] uppercase tracking-wider block mb-1.5 w-fit">
                        {eve.date}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-white uppercase tracking-wide">
                        {eve.title}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-gold-300 text-xs italic font-light">« {eve.subtitle} »</p>
                  <p className="text-gray-200 text-xs leading-relaxed font-light">{eve.description}</p>
                  
                  <div className="bg-midnight-900 p-3 rounded border border-gold-500/5 text-xs text-gray-300 space-y-1 font-light">
                    <div><strong className="text-gold-400 font-medium">{language === 'fr' ? "Créneau d'exception :" : "Bespoke Timing:"}</strong> {eve.time}</div>
                    <div><strong className="text-gold-400 font-medium">{language === 'fr' ? "Attraction Élite :" : "Elite Attraction:"}</strong> {eve.highlight}</div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gold-500/5 flex justify-between items-center mt-auto">
                  <div>
                    <span className="block text-[9px] text-gray-400 uppercase font-bold tracking-wider">{language === 'fr' ? "Besoins d'accès" : "Access Pricing"}</span>
                    <span className="font-serif text-sm font-bold text-gold-400">{eve.price}</span>
                  </div>

                  <a 
                    href={`${hotelInfo.whatsappUrl}%20r%C3%A9server%20ma%20place%20pour%20le%20${encodeURIComponent(eve.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-transparent hover:bg-gold-500/10 text-gold-400 hover:text-gold-300 border border-gold-500/30 hover:border-gold-400 text-xs uppercase tracking-widest font-bold rounded transition"
                  >
                    {language === 'fr' ? "Réserver ma Table Élite" : "Acquire VIP Pass"}
                  </a>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
