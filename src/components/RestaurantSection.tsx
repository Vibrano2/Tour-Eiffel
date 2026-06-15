import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { MenuItem } from '../types';
import RestaurantReservation from './RestaurantReservation';
import { 
  UtensilsCrossed, 
  Leaf, 
  Sparkles, 
  Clock, 
  Users2, 
  CalendarDays, 
  Armchair, 
  Check, 
  MapPin, 
  ChevronRight,
  Smartphone
} from 'lucide-react';

export default function RestaurantSection() {
  const { language, t, gastronomyData, hotelInfo } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'entrée' | 'plat' | 'dessert' | 'cocktail'>('all');
  
  // Seating Map and booking state
  const [reserveDate, setReserveDate] = useState('');
  const [reserveTime, setReserveTime] = useState('20:00');
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [bookingName, setBookingName] = useState('');
  const [bookingGuests, setBookingGuests] = useState('2');
  const [tableBookingSuccess, setTableBookingSuccess] = useState<string | null>(null);

  // Seating Layout translation
  const simulatorTables = language === 'fr' 
    ? [
        { id: 1, name: "Table Éclipse Lagune (VIP)", capacity: 2, view: "Sur la Lagune d'Ouémé", isOccupied: false },
        { id: 2, name: "Table des Ambassadeurs (Grande)", capacity: 6, view: "Salon Central d'Or", isOccupied: false },
        { id: 3, name: "Table Toffa Ier (VIP)", capacity: 4, view: "Exposition Artisanale", isOccupied: true },
        { id: 4, name: "Table Confidence d'Ivoire", capacity: 2, view: "Jardins de Palmier", isOccupied: false },
        { id: 5, name: "Table Cascade d'Or", capacity: 4, view: "Près de la Fontaine de Verre", isOccupied: false },
        { id: 6, name: "Table Sunset Club ( VIP )", capacity: 2, view: "Vue Panoramique Héliport", isOccupied: true },
        { id: 7, name: "Table Royal Cacao", capacity: 4, view: "Près du Piano Bar", isOccupied: false },
        { id: 8, name: "Table Privilège Impérial", capacity: 8, view: "Salon Privé Rotonde", isOccupied: false },
      ]
    : [
        { id: 1, name: "Lagoon Eclipse Table (VIP)", capacity: 2, view: "Facing the Ouémé Lagoon", isOccupied: false },
        { id: 2, name: "Ambassadors Table (Grand)", capacity: 6, view: "Central Hall of Gold", isOccupied: false },
        { id: 3, name: "King Toffa I Table (VIP)", capacity: 4, view: "Ancestral Crafts Exhibit", isOccupied: true },
        { id: 4, name: "Ivory Confidence Table", capacity: 2, view: "Surrounding Palm Gardens", isOccupied: false },
        { id: 5, name: "Golden Cascade Table", capacity: 4, view: "Near the Crystal Fountain", isOccupied: false },
        { id: 6, name: "Sunset Club Table (VIP)", capacity: 2, view: "Heliport Vista Height", isOccupied: true },
        { id: 7, name: "Royal Cacao Table", capacity: 4, view: "Next to the Piano Bar", isOccupied: false },
        { id: 8, name: "Imperial Privilege Table", capacity: 8, view: "Rotunda Private Lounge", isOccupied: false },
      ];

  const filteredMenu = activeCategory === 'all' 
    ? gastronomyData 
    : gastronomyData.filter(item => item.category === activeCategory);

  const handleTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTable) {
      const chooseMsg = language === 'fr' 
        ? "Veuillez sélectionner votre table préférentielle sur l'écran interactif rigoureusement conçu."
        : "Please select your preferred table from the interactive layout.";
      alert(chooseMsg);
      return;
    }
    if (!bookingName || !reserveDate) {
      const detailsMsg = language === 'fr'
        ? "Veuillez renseigner votre nom ainsi que la date de la dégustation."
        : "Please specify your name and target date of reservation.";
      alert(detailsMsg);
      return;
    }

    const tDetails = simulatorTables.find(t => t.id === selectedTable);
    const textConfirm = language === 'fr'
      ? `Félicitations cher ${bookingName}. Votre réservation pour la "${tDetails?.name}" (${tDetails?.view}) est sécurisée avec distinction pour le ${reserveDate} à ${reserveTime}.`
      : `Congratulations ${bookingName}. Your booking for the "${tDetails?.name}" (${tDetails?.view}) is secured for ${reserveDate} at ${reserveTime}.`;
    
    setTableBookingSuccess(textConfirm);
  };

  const resetTableBooking = () => {
    setTableBookingSuccess(null);
    setSelectedTable(null);
    setBookingName('');
    setReserveDate('');
  };

  return (
    <section className="py-24 bg-regal-red-900 text-white relative" id="restaurant-section">
      <div className="absolute inset-0 bg-regal-red-900/90 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#121c3d] via-[#FAFAFA] to-[#FAFAFA] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.35em] text-gold-400 uppercase block mb-3">
            {language === 'fr' ? "Hautes Saveurs d'Origine" : 'High Culinary Heritage'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white uppercase">
            {t('restaurant.title')}
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
        </div>

        {/* Chef Kofi d'Almeida Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 bg-regal-red-950/40 border border-gold-500/10 p-6 sm:p-10 rounded-lg shadow-xl" id="chef-profile">
          
          <div className="lg:col-span-4 relative group rounded overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=600" 
              alt="Chef Kofi D'Almeida" 
              className="w-full h-[320px] object-cover filter brightness-[0.8] contrast-[1.05]"
              id="chef-img"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA]/80 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-[10px] tracking-widest font-bold text-gold-400 uppercase block">
                {language === 'fr' ? 'Maître de Cuisine' : 'Executive Chef Owner'}
              </span>
              <span className="font-serif text-lg font-bold text-white block">Chef Kofi D\'Almeida</span>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-gold-500/10 border border-gold-500/20 text-gold-300 text-xs uppercase tracking-widest">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              Signature French-African Refinement
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl font-light text-white tracking-wide">
              {language === 'fr' 
                ? "« Exalter le terroir béninois par la rigueur classique française »" 
                : "“Elevating Beninese terroir with French classic rigor”"}
            </h3>

            <p className="text-gray-200 text-xs sm:text-sm font-light leading-relaxed">
              {language === 'fr'
                ? "Après avoir officié dans de prestigieux Palais Étoilés à Paris, Lyon et Dakar, le Chef Kofi D'Almeida dépose son art à l'Eiffel Hôtel de Porto-Novo. Sa philosophie culinaire célèbre avec panache les richesses ancestrales du golfe de Guinée : l'igname pilée d'ici s'associe à la truffe française de haute volée, le poisson Capitaine sauvage se drape de cajou caramélisé, tandis que le Sodabi de garde révèle des amers impériaux insoupçonnés."
                : "Having crafted culinary masterpieces in prestigious Michelin-starred Palaces across Paris, Lyon, and Dakar, Chef Kofi D'Almeida brings his high art to the Tour Eiffel Hotel in Porto-Novo. His cuisine celebrates ancestral resources of the Gulf of Guinea with dynamic French flair: local hand-pounded yam merges with French black winter truffles, wild caught Capitaine fish is glazed with caramelized local cashews, and fine aged Sodabi reveals royal, deep unexpected notes."}
            </p>

            {/* Menu Badges Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gold-500/10 text-xs font-light tracking-wide text-gray-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>{language === 'fr' ? "Ingrédients 100% bio & pêche durable" : "100% Organic & sustainable sources"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>{language === 'fr' ? "Accords mets-vins de grande garde" : "Bespoke vintage wine pairing cellar"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>{language === 'fr' ? "Terrasse au fil de l'eau (Lagune)" : "Lagoon-front waterfront seating area"}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Signature Dishes Cards & Category filter */}
        <div className="mb-24" id="gastronomy-menu">
          <div className="text-center mb-10">
            <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-widest text-gold-300 mb-6">
              {language === 'fr' ? "Le Menu de Collection" : "The Curated Gastronomy Menu"}
            </h3>
            
            {/* Category Select Toggles */}
            <div className="flex flex-wrap justify-center gap-2" id="menu-category-selectors">
              {(['all', 'entrée', 'plat', 'dessert', 'cocktail'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 text-xs tracking-widest uppercase font-semibold border rounded transition duration-200 cursor-pointer ${
                    activeCategory === cat 
                      ? 'border-gold-400 bg-gold-400 text-white font-bold' 
                      : 'border-gold-500/20 text-gray-300 hover:text-white hover:border-gold-500/55'
                  }`}
                  id={`cat-btn-${cat}`}
                >
                  {cat === 'all' 
                    ? (language === 'fr' ? 'Toutes les créations' : 'All creations') 
                    : (language === 'fr' ? cat + 's' : (cat === 'entrée' ? 'Appetizers' : cat === 'plat' ? 'Mains' : cat === 'dessert' ? 'Desserts' : 'Cocktails'))}
                </button>
              ))}
            </div>
          </div>

          {/* Dishes list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="menu-items-grid">
            {filteredMenu.map((item) => (
              <div 
                key={item.id}
                className="p-6 bg-gradient-to-br from-[#0c142c] to-[#040612] border border-gold-500/10 rounded overflow-hidden flex flex-col justify-between hover:border-gold-400/30 transition shadow-lg"
                id={`menu-item-card-${item.id}`}
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <span className="text-[9px] tracking-[0.25em] font-bold text-gold-400 uppercase bg-gold-400/10 px-2 py-1 rounded">
                      {item.category === 'entrée' ? (language === 'fr' ? 'Entrée' : 'Appetizer') : item.category === 'plat' ? (language === 'fr' ? 'Plat' : 'Main Course') : item.category === 'dessert' ? (language === 'fr' ? 'Dessert' : 'Dessert') : 'Cocktail'}
                    </span>
                    {item.isVegetarian && (
                      <span className="text-[9px] tracking-widest text-[#4ade80] font-bold uppercase flex items-center gap-1">
                        <Leaf className="w-3 h-3 text-[#4ade80]" />
                        {language === 'fr' ? 'Végétarien' : 'Vegetarian'}
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-gold-200">
                    {item.name}
                  </h4>
                  <p className="text-gray-300 text-xs font-light leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="flex justify-between items-baseline pt-4 border-t border-gold-500/5">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                    {language === 'fr' ? "Valeur Prestige" : "Prestige Pricing"}
                  </span>
                  <span className="font-serif text-base sm:text-lg font-bold text-gold-400">
                    {item.price.toLocaleString()} FCFA
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Gourmet Culinary Tasting Booking Desk */}
        <div className="mb-14" id="gourmet-tasting-experience-desk">
          <RestaurantReservation />
        </div>

        {/* Gilded partition */}
        <div className="flex items-center gap-4 justify-center mb-14">
          <div className="h-[1px] bg-gradient-to-r from-transparent to-gold-400/30 w-1/4" />
          <span className="text-[9px] tracking-[0.3em] font-mono text-gold-400 uppercase font-semibold">
            {language === 'fr' ? "Alternative : Choisir Votre Table Royale" : "Alternative: Select Exclusive Table Location"}
          </span>
          <div className="h-[1px] bg-gradient-to-l from-transparent to-gold-400/30 w-1/4" />
        </div>

        {/* Interactive Table reservation with mini map */}
        <div className="bg-gradient-to-b from-[#0b1227] to-[#040612] border border-gold-500/20 rounded-xl p-6 sm:p-10 shadow-2xl" id="table-reservation">
          
          {!tableBookingSuccess ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column: Form details */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-white">
                    {language === 'fr' ? "Sécuriser une Table Directe" : "Reserve an Executive Table"}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed mt-2">
                    {language === 'fr' 
                      ? "Choisissez votre atmosphère préférentielle et sélectionnez la table géolocalisée sur notre plan de sol en temps réel."
                      : "Choose your preferred atmosphere and select the corresponding real-time table location."}
                  </p>
                </div>

                <form onSubmit={handleTableSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] tracking-widest font-bold uppercase text-gray-300 mb-2">{language === 'fr' ? "Votre Identité" : "Your Name"}</label>
                    <input 
                      type="text" 
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder={language === 'fr' ? "Ex: Excellence Marcel da Silva" : "e.g., Ambassador da Silva"}
                      className="w-full bg-regal-red-900 border border-gold-500/10 focus:border-gold-400 rounded p-2.5 text-sm outline-none text-white"
                      id="table-input-name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] tracking-widest font-bold uppercase text-gray-300 mb-2 flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5 text-gold-400" />
                        {language === 'fr' ? "Choisir une Date" : "Date Selection"}
                      </label>
                      <input 
                        type="date" 
                        required
                        value={reserveDate}
                        onChange={(e) => setReserveDate(e.target.value)}
                        className="w-full bg-regal-red-900 border border-gold-500/10 focus:border-gold-400 rounded p-2.5 text-sm outline-none text-white"
                        id="table-input-date"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-widest font-bold uppercase text-gray-300 mb-2 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gold-400" />
                        {language === 'fr' ? "Heure exquise" : "Preferred Hour"}
                      </label>
                      <select 
                        value={reserveTime}
                        onChange={(e) => setReserveTime(e.target.value)}
                        className="w-full bg-regal-red-900 border border-gold-500/10 focus:border-gold-400 rounded p-2.5 text-sm outline-none text-white cursor-pointer"
                        style={{ colorScheme: 'dark' }}
                        id="table-select-time"
                      >
                        <option value="12:30">12h30 ({language === 'fr' ? "Déjeuner d'Affaires" : "Business Lunch"})</option>
                        <option value="13:30">13h30 ({language === 'fr' ? "Mondain Déjeuner" : "Fashionable Dinner"})</option>
                        <option value="19:30">19h30 ({language === 'fr' ? "Service Impérial Dîner" : "Imperial Dinner Service"})</option>
                        <option value="20:30">20h30 ({language === 'fr' ? "Heure de Dégustation Royale" : "Royal Chef Tasting Hour"})</option>
                        <option value="21:30">21h30 ({language === 'fr' ? "Dîner Confidentialité" : "Confidential Late Seating"})</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-widest font-bold uppercase text-gray-300 mb-2 flex items-center gap-1">
                      <Users2 className="w-3.5 h-3.5 text-gold-400" />
                      {language === 'fr' ? "Nombre d'invités" : "Number of Guests"}
                    </label>
                    <select
                      value={bookingGuests}
                      onChange={(e) => setBookingGuests(e.target.value)}
                      className="w-full bg-regal-red-900 border border-gold-500/10 focus:border-gold-400 rounded p-2.5 text-sm outline-none text-white cursor-pointer"
                      style={{ colorScheme: 'dark' }}
                      id="table-select-guests"
                    >
                      <option value="1">{language === 'fr' ? "1 Couvert Solitaire" : "1 Solo dining Cover"}</option>
                      <option value="2">{language === 'fr' ? "2 Couverts en tête-à-tête" : "2 Private Couple dining"}</option>
                      <option value="4">{language === 'fr' ? "4 Couverts Conviviaux" : "4 Friends / Family seating"}</option>
                      <option value="6">{language === 'fr' ? "6 Couverts Diplomatiques" : "6 Executive / Diplomatic covers"}</option>
                      <option value="8">{language === 'fr' ? "8 Couverts & Plus (Rotonde)" : "8+ Imperial Rotunda party"}</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded text-xs font-bold tracking-widest uppercase text-white bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-350 cursor-pointer transition font-bold"
                      id="table-submit-btn"
                    >
                      {language === 'fr' ? "Enregistrer mon couvert royal" : "Hold my premium cover"}
                    </button>
                  </div>

                </form>
              </div>

              {/* Right Column: Visual seating chart map */}
              <div className="lg:col-span-7 flex flex-col justify-between bg-regal-red-900/80 p-6 rounded border border-gold-500/10 relative">
                
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-gold-500/5 pb-3">
                    <span className="text-xs uppercase tracking-widest font-bold text-gold-400 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {language === 'fr' ? "Plan Interactif du Salon d'Or" : "Interactive Seating Plan — Salon of Gold"}
                    </span>
                    <span className="text-[10px] text-gray-300 italic">{language === 'fr' ? "Disponibilité exclusive h24" : "Exclusive 24/7 availability"}</span>
                  </div>

                  {/* Simulated interactive map layout */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4" id="interact-seating-grid">
                    {simulatorTables.map((tbl) => {
                      const isSelected = selectedTable === tbl.id;
                      return (
                        <div
                          key={tbl.id}
                          onClick={() => {
                            if (!tbl.isOccupied) {
                              setSelectedTable(tbl.id);
                            }
                          }}
                          className={`p-4 rounded border flex flex-col items-center justify-center text-center cursor-pointer select-none transition duration-200 ${
                            tbl.isOccupied 
                              ? 'border-red-500/30 bg-red-500/5 text-gray-400 cursor-not-allowed' 
                              : isSelected 
                                ? 'border-gold-400 bg-gold-400 text-white font-bold' 
                                : 'border-gold-500/20 bg-regal-red-950/80 text-gray-200 hover:border-gold-400/40 hover:bg-regal-red-950'
                          }`}
                          id={`seating-tbl-box-${tbl.id}`}
                        >
                          <Armchair className={`w-6 h-6 mb-2 ${
                            tbl.isOccupied 
                              ? 'text-gray-300' 
                              : isSelected 
                                ? 'text-white' 
                                : 'text-gold-400'
                          }`} />
                          <span className="block font-semibold text-[11px] truncate w-full">{tbl.name}</span>
                          <span className="block text-[9px] tracking-wide mt-1">
                            {tbl.isOccupied ? (language === 'fr' ? "Exclus" : "Occupied") : isSelected ? (language === 'fr' ? "Sélection" : "Selected") : `${tbl.capacity} max`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Legend bar */}
                <div className="mt-4 pt-3 border-t border-gold-500/5 flex flex-wrap justify-center gap-4 text-[10px] tracking-wider uppercase text-gray-300">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded bg-regal-red-950 border border-gold-500/20" />
                    <span>{language === 'fr' ? "Disponible" : "Available"}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded bg-gold-400" />
                    <span>{language === 'fr' ? "Sélectionné" : "Selected"}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded bg-red-500/20 border border-red-500/30" />
                    <span>{language === 'fr' ? "Déjà réservé (VIP occupée)" : "Booked / VIP occupied"}</span>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            
            /* Success table booking screen */
            <div className="max-w-xl mx-auto text-center py-8 animate-scaleUp" id="table-receipt">
              <div className="w-16 h-16 rounded-full bg-gold-400/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>

              <h4 className="font-serif text-2xl font-bold text-gold-300 uppercase tracking-widest mb-3">
                {language === 'fr' ? "Table Sécurisée" : "Table Code Secured"}
              </h4>
              <p className="text-gray-200 text-sm leading-relaxed mb-6 font-light">
                {tableBookingSuccess}
              </p>

              <div className="p-4 bg-regal-red-900 border border-gold-500/10 rounded-lg text-left text-xs mb-8 space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">{language === 'fr' ? "CONVIVES:" : "COVERS SEATED:"}</span>
                  <span className="text-white font-bold">{bookingGuests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{language === 'fr' ? "TABLE RETENUE:" : "ALLOCATED TABLE:"}</span>
                  <span className="text-gold-400 font-bold">{simulatorTables.find(t => t.id === selectedTable)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{language === 'fr' ? "SERVICE ACCÈS:" : "ENTRY SEATING SERVICE:"}</span>
                  <span className="text-white">{language === 'fr' ? "Dîner Impérial Accompagné" : "Imperial Premium Dinner Course"}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/22955123456?text=Bonjour%20Concierge%20Tour%20Eiffel%20B%C3%A9nin.%20Je%20viens%20de%20r%C3%A9server%20la%20table%20interactive%20suivante%20:%20${encodeURIComponent(simulatorTables.find(t => t.id === selectedTable)?.name || 'Table')}%20pour%20le%20nom%20de%20${encodeURIComponent(bookingName)}.%20Merci.`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 text-white font-bold text-xs uppercase tracking-widest rounded flex items-center justify-center gap-1.5 shadow-md shadow-gold-500/20"
                  id="table-wa-confirm"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  {language === 'fr' ? "Signaler mon arrivée au Maître d'Hôtel (WhatsApp)" : "Confirm selection to Maître d'Hôtel (WhatsApp)"}
                </a>

                <button
                  onClick={resetTableBooking}
                  className="px-6 py-3 border border-gold-500/15 rounded text-xs uppercase tracking-widest font-semibold text-gray-200 hover:text-white bg-regal-red-900 cursor-pointer"
                  id="table-close-confirm"
                >
                  {language === 'fr' ? "Fermer la confirmation" : "Close confirmation"}
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
