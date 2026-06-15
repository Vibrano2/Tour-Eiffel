import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CalendarDays, 
  Clock, 
  Users2, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Smartphone, 
  UtensilsCrossed,
  HelpCircle,
  Wine,
  BellRing
} from 'lucide-react';

interface TastingMenu {
  id: string;
  nameFR: string;
  nameEN: string;
  price: number;
  descFR: string;
  descEN: string;
}

const TASTING_MENUS: TastingMenu[] = [
  {
    id: "imperial-d-almeida",
    nameFR: "Menu Dégustation Impérial Kofi d'Almeida",
    nameEN: "Kofi d'Almeida Imperial Tasting Experience",
    price: 45000,
    descFR: "Sodabi de garde sublimé, truffe noire d'hiver mariée à l'igname pilée d'honneur.",
    descEN: "Aged premium local spirits, black winter truffles paired with gold-level pounded yam."
  },
  {
    id: "lagoon-sea-gourmet",
    nameFR: "Symphonie Côtière & Capitaine Sauvage",
    nameEN: "Wild Lagoon Sea-Harvest Symphony",
    price: 38000,
    descFR: "Poisson Capitaine rôti au beurre de muscade et croustillant de cajou caramélisé.",
    descEN: "Native wild Capitaine fish poached in nutmeg butter, crusted with caramelized local cashew."
  },
  {
    id: "oueme-botanical",
    nameFR: "Jardin Botanique de l'Ouémé (Vigano)",
    nameEN: "Royal Botanical Herb Garden (Vegan Elite)",
    price: 32000,
    descFR: "Millet biologique infusé au tamarin du Roi Toffa, écume de coco et piment doux d'Adjara.",
    descEN: "Organic wild millet slow-infused with Toffa tamarind, coconut froth, and sweet Adjara pepper."
  }
];

export default function RestaurantReservation() {
  const { language } = useLanguage();
  const [guestName, setGuestName] = useState('');
  const [suiteNumber, setSuiteNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('20:00');
  const [guestCount, setGuestCount] = useState('2');
  const [selectedMenu, setSelectedMenu] = useState('imperial-d-almeida');
  const [winePairing, setWinePairing] = useState<boolean>(true);
  const [conciergeSpecialNote, setConciergeSpecialNote] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  // Time slot arrays customized for French-African fine dining
  const timeSlots = [
    { value: "12:00", labelFR: "12h00 - Déjeuner d'Affaires d'État", labelEN: "12:00 PM — State Business Luncheon" },
    { value: "13:30", labelFR: "13h30 - Service de Midi Privilège", labelEN: "1:30 PM — Midday Privilege Seating" },
    { value: "19:30", labelFR: "19h30 - Rituel d'Ouverture du Dîner", labelEN: "7:30 PM — Sunset Dinner Seating" },
    { value: "20:30", labelFR: "20h30 - Haute Gastronomie Impériale", labelEN: "8:30 PM — High Imperial Dining Hour" },
    { value: "21:30", labelFR: "21h30 - Confidentialité de Fin de Soirée", labelEN: "9:30 PM — Late Night Discretion Seating" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !selectedDate) {
      alert(language === 'fr' 
        ? "Veuillez renseigner votre nom suprême et la date souhaitée." 
        : "Please supply your supreme name and target reservation date.");
      return;
    }
    setBookingSuccess(true);
  };

  const selectedMenuData = TASTING_MENUS.find(m => m.id === selectedMenu) || TASTING_MENUS[0];

  return (
    <div className="bg-gradient-to-b from-[#0b1227] to-[#040612] border border-gold-500/20 rounded-xl p-6 sm:p-10 shadow-2xl relative" id="restaurant-reservation-gourmet">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/[0.015] rounded-full blur-3xl pointer-events-none" />
      
      {!bookingSuccess ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Panel: Luxury Reservation Form fields */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <div className="inline-flex items-center gap-1.5 text-gold-400 text-[10px] tracking-widest uppercase font-mono font-bold mb-2">
                <Wine className="w-4 h-4 text-gold-400 animate-bounce" />
                {language === 'fr' ? "Réservation en Temps Réel • Salon d'Honneur" : "Real-time Fine Dining Seat Allocator"}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-gray-900 uppercase">
                {language === 'fr' ? "Réserver Votre Expérience Gastronomique" : "Gourmet Table Reservation"}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed mt-2">
                {language === 'fr' 
                  ? "Assurez-vous d'obtenir l'un de nos dix couverts confidentiels pour déguster le meilleur du terroir béninois revisité."
                  : "Ensure your placement at our exclusive ten-table salon. Experience royal Beninese cuisine curated by legendary French-African Chef."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Guest Name input */}
                <div>
                  <label className="block text-[9px] tracking-widest font-bold uppercase text-gray-600 mb-1.5">
                    {language === 'fr' ? "Nom Complet d'Honneur" : "Full Noble Name"}
                  </label>
                  <input 
                    type="text" 
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder={language === 'fr' ? "Ex: Sa Majesté Prince d'Adjara" : "e.g., Honorable Ambassador James"}
                    className="w-full bg-[#FAFAFA] border border-gold-500/10 focus:border-gold-400 rounded p-2.5 text-xs outline-none text-gray-900 transition-all font-sans"
                    id="gourmet-guest-name"
                  />
                </div>

                {/* Optional Suite Number */}
                <div>
                  <label className="block text-[9px] tracking-widest font-bold uppercase text-gray-600 mb-1.5">
                    {language === 'fr' ? "Numéro de Suite (Facultatif)" : "Suite Number (Optional)"}
                  </label>
                  <input 
                    type="text" 
                    value={suiteNumber}
                    onChange={(e) => setSuiteNumber(e.target.value)}
                    placeholder={language === 'fr' ? "Ex: Suite Royale 304" : "e.g., Presidential Suite 412"}
                    className="w-full bg-[#FAFAFA] border border-gold-500/10 focus:border-gold-400 rounded p-2.5 text-xs outline-none text-gray-900 transition-all font-sans"
                    id="gourmet-suite-num"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Date Selection */}
                <div>
                  <label className="block text-[9px] tracking-widest font-bold uppercase text-gray-600 mb-1.5 flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5 text-gold-400" />
                    {language === 'fr' ? "Date" : "Date"}
                  </label>
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                    className="w-full bg-[#FAFAFA] border border-gold-500/10 focus:border-gold-400 rounded p-2.5 text-xs outline-none text-gray-900 cursor-pointer"
                    style={{ colorScheme: 'dark' }}
                    id="gourmet-reserve-date"
                  />
                </div>

                {/* Time slot picker */}
                <div>
                  <label className="block text-[9px] tracking-widest font-bold uppercase text-gray-600 mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gold-400" />
                    {language === 'fr' ? "Créneau Horaire" : "Time Slot"}
                  </label>
                  <select 
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-gold-500/10 focus:border-gold-400 rounded p-2.5 text-xs outline-none text-gray-900 cursor-pointer"
                    id="gourmet-time-slot"
                  >
                    {timeSlots.map(slot => (
                      <option key={slot.value} value={slot.value}>
                        {language === 'fr' ? slot.labelFR : slot.labelEN}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Number of Guests dropdown */}
                <div>
                  <label className="block text-[9px] tracking-widest font-bold uppercase text-gray-600 mb-1.5 flex items-center gap-1">
                    <Users2 className="w-3.5 h-3.5 text-gold-400" />
                    {language === 'fr' ? "Couverts" : "Guests"}
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-gold-500/10 focus:border-gold-400 rounded p-2.5 text-xs outline-none text-gray-900 cursor-pointer"
                    id="gourmet-guest-count"
                  >
                    <option value="1">1 {language === 'fr' ? "Table Solitaire" : "Solo Guest"}</option>
                    <option value="2">2 {language === 'fr' ? "Tête-à-tête Impérial" : "2 Guests (Private Dual)"}</option>
                    <option value="3">3 {language === 'fr' ? "3 Couverts d'Honneur" : "3 Guests (Gourmet Trio)"}</option>
                    <option value="4">4 {language === 'fr' ? "4 Couverts Conviviaux" : "4 Guests"}</option>
                    <option value="6">6 {language === 'fr' ? "6 Couverts Diplomatiques" : "6 Guests (Ambassador Table)"}</option>
                    <option value="8">8+ {language === 'fr' ? "Banquet de Prestige (Rotonde)" : "8+ High Society Banquet"}</option>
                  </select>
                </div>

              </div>

              {/* Advanced Fine Dining Selections */}
              <div className="space-y-3 pt-2">
                <label className="block text-[9px] tracking-widest font-bold uppercase text-gray-600 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  {language === 'fr' ? "Sélectionner un Menu de Collection" : "Choose Your Signature Collection Menu"}
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {TASTING_MENUS.map(m => {
                    const isSelected = selectedMenu === m.id;
                    return (
                      <div 
                        key={m.id}
                        onClick={() => setSelectedMenu(m.id)}
                        className={`p-3 rounded border text-left cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-gold-400/10 border-gold-400 text-gray-900' 
                            : 'bg-white/[0.01] border-white/5 text-gray-600 hover:border-gold-500/30'
                        }`}
                        id={`gourmet-menu-option-${m.id}`}
                      >
                        <div className="flex justify-between items-start gap-1">
                          <span className="font-serif text-[10px] font-bold block leading-tight text-gray-900">
                            {language === 'fr' ? m.nameFR : m.nameEN}
                          </span>
                        </div>
                        <span className="text-[10px] text-gold-400 font-mono font-bold block mt-1">{m.price.toLocaleString()} FCFA</span>
                        <p className="text-[9px] text-gray-600 leading-tight mt-1 truncate">
                          {language === 'fr' ? m.descFR : m.descEN}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bespoke Wine Cellar Pairing switch */}
              <div className="p-3 rounded bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[10px] font-bold text-gray-900 block uppercase tracking-wider">
                    {language === 'fr' ? "Associer Notre Sélection de Grands Crus" : "Incorporate Rare Vintage wine Pairing"}
                  </span>
                  <p className="text-[9px] text-gray-500 font-light leading-snug">
                    {language === 'fr' 
                      ? "Une coupe de Champagne millésimé et 3 verres de grands crus sélectionnés d'Anjou, de Bordeaux et d'Alsace." 
                      : "A premium glass of vintage Champagne and three meticulously aligned grand-cru selections."}
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={() => setWinePairing(prev => !prev)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 cursor-pointer ${winePairing ? 'bg-gold-500' : 'bg-gray-800'}`}
                  id="gourmet-wine-pairing-switch"
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-lg transform transition-transform duration-200 ${winePairing ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Special Concierge Note */}
              <div>
                <label className="block text-[9px] tracking-widest font-bold uppercase text-gray-600 mb-1">
                  {language === 'fr' ? "Demandes Particulières & Allergies" : "Special Dietary Directives & Preferences"}
                </label>
                <textarea
                  value={conciergeSpecialNote}
                  onChange={(e) => setConciergeSpecialNote(e.target.value)}
                  placeholder={language === 'fr' ? "Ex: Célébration de mariage d'argent, allergies aux cajous, intimité renforcée..." : "e.g., Cashew allergy, discrete corner table preferred, champagne welcoming..."}
                  className="w-full bg-[#FAFAFA] border border-gold-500/10 focus:border-gold-400 rounded p-2.5 text-xs outline-none text-gray-900 h-16 resize-none font-sans"
                  id="gourmet-special-note"
                />
              </div>

              {/* Submit button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-4 rounded text-xs font-bold tracking-widest uppercase text-gray-900 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:brightness-110 cursor-pointer transition flex items-center justify-center gap-2"
                  id="gourmet-reserve-btn"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>{language === 'fr' ? "Sécuriser Mon Couvert de Collection" : "Secure Gourmet Table Selection"}</span>
                </button>
              </div>

            </form>
          </div>

          {/* Right Panel: Selected Experience Summary & Credentials */}
          <div className="lg:col-span-5 bg-[#FAFAFA]/80 p-6 rounded border border-gold-500/10 relative flex flex-col justify-between" id="gourmet-summary-panel">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-gold-300">
                  {language === 'fr' ? "Devis d'Atmosphère" : "Atmospheric Estimate"}
                </span>
                <span className="text-[9px] bg-gold-400/10 text-gold-300 px-2.5 py-0.5 rounded border border-gold-400/20 font-mono select-none">
                  Porto-Novo Fine Dining
                </span>
              </div>

              <div className="space-y-4 text-xs font-light text-slate-300">
                <p className="italic text-[11px] text-gray-600 leading-relaxed border-l-2 border-gold-400/40 pl-3">
                  {language === 'fr' 
                    ? "« Le raffinement ne tolère aucun raccourci. Votre table fera l'objet d'un dressage d'or exclusif et recevra la pleine attention du Maître d'Hôtel. »"
                    : "“Refinement compromises on no details. Your personal table will showcase pristine alignment, gold glassware, and absolute focus.”"}
                </p>

                <div className="bg-[#030612] p-4 rounded-lg space-y-3 border border-white/5" id="gourmet-billing-spec">
                  <div className="flex justify-between border-b border-white/[0.04] pb-1.5">
                    <span className="text-gray-600">{language === 'fr' ? "Nombre de Couverts" : "Total Covers"}</span>
                    <span className="font-mono text-gray-900">{guestCount}</span>
                  </div>

                  <div className="flex justify-between border-b border-white/[0.04] pb-1.5 leading-snug">
                    <span className="text-gray-600">{language === 'fr' ? "Parcours Sélectionné" : "Selected Course"}</span>
                    <span className="text-right text-gray-900 font-semibold max-w-[170px] truncate">
                      {language === 'fr' ? selectedMenuData.nameFR : selectedMenuData.nameEN}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-white/[0.04] pb-1.5">
                    <span className="text-gray-600">{language === 'fr' ? "Accord Mets & Vins" : "Grand Cru Vintage Pairing"}</span>
                    <span className={`font-mono text-xs ${winePairing ? 'text-emerald-400 font-bold' : 'text-gray-500'}`}>
                      {winePairing ? (language === 'fr' ? "+15 000 FCFA / cov" : "+24 USD / cv") : (language === 'fr' ? "Non" : "No")}
                    </span>
                  </div>

                  <div className="flex justify-between pt-1 text-sm font-semibold items-baseline">
                    <span className="text-gold-400 font-serif uppercase tracking-widest text-[9px]">
                      {language === 'fr' ? "Montant Estimé" : "Total Evaluation"}
                    </span>
                    <span className="font-mono text-gold-300 text-sm">
                      {((selectedMenuData.price + (winePairing ? 15000 : 0)) * parseInt(guestCount || '1')).toLocaleString()}{" "}
                      FCFA
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro warning indicator */}
            <div className="mt-6 p-3 rounded bg-amber-500/5 border border-amber-500/10 text-[9px] text-gray-900 font-sans flex gap-2 items-start">
              <BellRing className="w-4 h-4 text-amber-500 shrink-0" />
              <p className="leading-snug">
                {language === 'fr' 
                  ? "Tenue de soirée ou costume traditionnel formel requis. Toute annulation doit nous parvenir au moins 4 heures avant le service."
                  : "Elegant evening apparel or ceremonial traditional attire requested. Notify of cancellation at least 4 hours in advance."}
              </p>
            </div>

          </div>

        </div>
      ) : (
        
        /* Interactive Receipt / Booking success verification */
        <div className="max-w-xl mx-auto text-center py-6 animate-scaleUp" id="gourmet-receipt">
          <div className="w-16 h-16 rounded-full bg-gold-400/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 animate-pulse" />
          </div>

          <h4 className="font-serif text-2xl font-bold text-gold-300 uppercase tracking-widest mb-2">
            {language === 'fr' ? "Souverain Détenteur Envoyé" : "Fine Dining Seats Allocated"}
          </h4>
          
          <p className="text-gray-800 text-[13px] leading-relaxed mb-6 font-light">
            {language === 'fr' 
              ? `Félicitations cher ${guestName}. Votre réservation gastronomique exclusive est enregistrée avec soin pour le ${selectedDate} à ${selectedTimeSlot}. Notre Maître d'Hôtel vous a attribué le meilleur emplacement du Salon d'Or.`
              : `Congratulations ${guestName}. Your exclusive fine dining reservation is securely logged for ${selectedDate} at ${selectedTimeSlot}. Our Head Host has allocated prime parlor placement for your cover.`}
          </p>

          <div className="p-4 bg-[#FAFAFA] border border-gold-500/10 rounded-lg text-left text-xs mb-6 space-y-2.5 font-mono">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-gray-500">{language === 'fr' ? "DÉTENTEUR DU COUVERT:" : "RESERVATION OWNER:"}</span>
              <span className="text-gray-900 font-bold uppercase">{guestName}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-gray-500">{language === 'fr' ? "COMMUNICATION DIRECTE:" : "GUEST CATEGORY:"}</span>
              <span className="text-gold-300 font-bold">{suiteNumber ? `Guest Suite ${suiteNumber}` : "Global Exclusive VIP"}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-gray-500">{language === 'fr' ? "CRÉNEAU CHOISI:" : "TIME SLOT ALLOCATION:"}</span>
              <span className="text-gray-900">{selectedTimeSlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{language === 'fr' ? "MENU ADJUGÉ:" : "MENU DESIGNATION:"}</span>
              <span className="text-gold-400">{language === 'fr' ? selectedMenuData.nameFR : selectedMenuData.nameEN}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/22955123456?text=Bonjour%20concierge%20de%2520l'Hermitage.%20Je%20viens%20de%20réserver%20un%20couvert%20gastronomique%20pour%20${encodeURIComponent(guestName)}%20le%20${selectedDate}%20à%20${selectedTimeSlot}.%20Merci.`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 text-gray-900 font-bold text-xs uppercase tracking-widest rounded flex items-center justify-center gap-1.5 shadow-md shadow-gold-500/20 hover:brightness-110"
              id="gourmet-wa-confirm"
            >
              <Smartphone className="w-3.5 h-3.5 animate-bounce" />
              {language === 'fr' ? "Partager Détails avec le Sommelier (WhatsApp)" : "Verify Reservation with Sommelier (WhatsApp)"}
            </a>

            <button
              onClick={() => {
                setBookingSuccess(false);
                setGuestName('');
              }}
              className="px-6 py-3 border border-gold-500/15 rounded text-xs uppercase tracking-widest font-semibold text-gray-800 hover:text-gray-900 bg-[#FAFAFA] cursor-pointer"
              id="gourmet-reset-form-btn"
            >
              {language === 'fr' ? "Faire une nouvelle réservation" : "Book Another Table"}
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
