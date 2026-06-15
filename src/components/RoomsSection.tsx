import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { Room } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Map, 
  BedDouble, 
  Maximize2, 
  Users2, 
  ChevronDown, 
  ChevronUp, 
  Smartphone, 
  Send,
  CalendarDays,
  Sparkles,
  Ticket,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';

interface RoomsSectionProps {
  selectedRoomId?: string | null;
  onClearSelectedRoom?: () => void;
}

export default function RoomsSection({ selectedRoomId, onClearSelectedRoom }: RoomsSectionProps) {
  const { language, t, rooms, hotelInfo } = useLanguage();
  const [activeBookingRoom, setActiveBookingRoom] = useState<string | null>(null);
  const [expandedAmenities, setExpandedAmenities] = useState<Record<string, boolean>>({});
  
  // Booking Form State
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestsCount, setGuestsCount] = useState('2');

  // Calendar-Hub State and Functions
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [activeAdvisoryDate, setActiveAdvisoryDate] = useState<Date | null>(new Date());

  const currentCalendarYear = currentCalendarDate.getFullYear();
  const currentCalendarMonth = currentCalendarDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentCalendarDate(new Date(currentCalendarYear, currentCalendarMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentCalendarDate(new Date(currentCalendarYear, currentCalendarMonth + 1, 1));
  };

  // Luxury dynamic occupancy trend advisory
  const getDateAdvisory = (d: Date) => {
    const month = d.getMonth();
    const dayOfWeek = d.getDay();
    const dayOfMonth = d.getDate();
    
    // Procedural density/occupancy calculations
    let occupancyRate = 45;
    if (month === 11 || month === 0) {
      occupancyRate += 40; // peak hol
    } else if (month === 6 || month === 7) {
      occupancyRate += 25; // summer lagoon peak
    } else {
      occupancyRate += 10;
    }
    
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      occupancyRate += 15; // weekend demand addition
    }
    
    // Clamp
    occupancyRate = Math.min(occupancyRate, 98);
    
    // Price trend descriptors
    let priceTrendFR = "Standard d'Exception";
    let priceTrendEN = "Standard Elite";
    let trendColor = "text-gold-400";
    let trendBadgeTextFR = "Optimal";
    let trendBadgeTextEN = "Optimal";
    
    if (occupancyRate > 75) {
      priceTrendFR = "Haute Fréquentation (Tarif Premium)";
      priceTrendEN = "Peak Occupancy (Premium Peak)";
      trendColor = "text-rose-400";
      trendBadgeTextFR = "Affluence Forte";
      trendBadgeTextEN = "Peak Demand";
    } else if (occupancyRate < 60) {
      priceTrendFR = "Basse Affluence (Valeur Privilégiée)";
      priceTrendEN = "Light Occupancy (Optimal Choice)";
      trendColor = "text-emerald-400";
      trendBadgeTextFR = "Idéal";
      trendBadgeTextEN = "Best Value";
    }
    
    // Generative tips based on season of the hotel location in Benin (West Africa)
    let seasonalAdviceFR = "";
    let seasonalAdviceEN = "";
    
    if (month === 11 || month === 0 || month === 1) {
      seasonalAdviceFR = "Saison Sèche Impériale (Harmattan doux). Fortement demandée par d'illustres dignitaires. Réservation recommandée.";
      seasonalAdviceEN = "Celestial dry season. Coveted by global and domestic delegates. Early suite reservations advised.";
    } else if (month >= 3 && month <= 6) {
      seasonalAdviceFR = "Saison de Printemps d'Émeraude (pluies équatoriales douces). Intimité royale renforcée, ambiance sereine et -15% sur les packages SPA.";
      seasonalAdviceEN = "Emerald spring cycle (gentle equatorial rain & green paths). Enhanced romantic quietness, with 15% special spa treatments.";
    } else {
      seasonalAdviceFR = "Saison des moissons de lagune côtière. Climat maritime idéal. Période royale pour de belles excursions patrimoniales.";
      seasonalAdviceEN = "Lagoon festival phase. Elegant coastal breeze and moderate demand. Ideal for curated historic tours.";
    }
    
    // Generative weekday tip
    let dayAdviceFR = "";
    let dayAdviceEN = "";
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      dayAdviceFR = "Week-end impérial : récital musical feutré du soir et créations mixologiques d'art contemporain au bar Le Céleste.";
      dayAdviceEN = "Imperial weekend atmosphere: soft live melodies and custom sensory mixology inside our high-society sky parlor.";
    } else {
      dayAdviceFR = "Jours de semaine confidentiels. Parfait pour une discrétion souveraine absolue et l'attention continue de votre majordome.";
      dayAdviceEN = "Quiet mid-week. Ideal for absolute diplomatic discretion and dedicated swift personal room caretaker attention.";
    }
    
    // Best suite suggestion based on trends
    let suggestedSuiteId = "standard-ivoire";
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      suggestedSuiteId = "suite-prestige";
    } else if (dayOfMonth % 3 === 0) {
      suggestedSuiteId = "royale-concorde";
    } else if (dayOfMonth % 5 === 0) {
      suggestedSuiteId = "imperiale-toffa";
    }
    
    const suggRoomName = rooms.find(r => r.id === suggestedSuiteId)?.name || "Suite Impériale Toffa";

    return {
      occupancyRate,
      priceTrendFR,
      priceTrendEN,
      trendColor,
      trendBadgeTextFR,
      trendBadgeTextEN,
      seasonalAdviceFR,
      seasonalAdviceEN,
      dayAdviceFR,
      dayAdviceEN,
      suggestedSuiteName: suggRoomName
    };
  };

  // Pre-set some dates on mount if not already set, to populate the calendar
  useEffect(() => {
    if (!checkIn) {
      const today = new Date();
      const checkInDate = new Date();
      checkInDate.setDate(today.getDate() + 2);
      const checkOutDate = new Date();
      checkOutDate.setDate(today.getDate() + 5);
      
      const format = (d: Date) => d.toISOString().split('T')[0];
      setCheckIn(format(checkInDate));
      setCheckOut(format(checkOutDate));
    }
  }, []);

  const MONTHS_FR = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  const MONTHS_EN = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const WEEKDAYS_FR = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleSelectSuiteFromCalendar = (roomId: string) => {
    setActiveBookingRoom(roomId);
    setBookingConfirmation(null);
    
    setTimeout(() => {
      const el = document.getElementById(`room-card-${roomId}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  };

  const getRoomAvailabilityOnDates = (roomId: string, startStr: string, endStr: string) => {
    if (!startStr || !endStr) return { status: 'available', textFR: 'Disponible', textEN: 'Available' };
    
    const start = new Date(startStr);
    const end = new Date(endStr);
    const diffDays = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) || 1;
    
    if (roomId === 'standard-ivoire') {
      const d = start.getDay();
      if (d === 5 || d === 6) {
        return { 
          status: 'limited', 
          textFR: "Dernières chambres", 
          textEN: "Last rooms remaining" 
        };
      }
    }
    
    if (roomId === 'suite-prestige') {
      const dayNum = start.getDate();
      if (dayNum >= 10 && dayNum <= 14) {
        return {
          status: 'occupied',
          textFR: "Réservé (Délégation)",
          textEN: "Fully Booked (Delegation)"
        };
      }
    }
    
    if (roomId === 'imperiale-toffa') {
      const dayNum = start.getDate();
      if (dayNum % 3 === 0) {
        return { 
          status: 'diplomatic', 
          textFR: "Attribution Diplomatique", 
          textEN: "Diplomatic Designation" 
        };
      }
    }
    
    if (roomId === 'royale-concorde') {
      const dayNum = start.getDate();
      if (dayNum % 4 === 0) {
        return { 
          status: 'occupied', 
          textFR: "Sommet de l'Union", 
          textEN: "Union Summit Event" 
        };
      }
    }

    return { 
      status: 'available', 
      textFR: "Entièrement Libre", 
      textEN: "Fully Available" 
    };
  };

  const formatDateString = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isCheckInDay = (d: Date) => {
    return checkIn === formatDateString(d);
  };

  const isCheckOutDay = (d: Date) => {
    return checkOut === formatDateString(d);
  };

  const isWithinRange = (d: Date) => {
    if (!checkIn || !checkOut) return false;
    const dateStr = formatDateString(d);
    return dateStr > checkIn && dateStr < checkOut;
  };

  // Build the cell matrix
  const firstDayIndex = getFirstDayOfMonth(currentCalendarYear, currentCalendarMonth);
  const totalDays = getDaysInMonth(currentCalendarYear, currentCalendarMonth);
  const prevMonthDays = getDaysInMonth(currentCalendarYear, currentCalendarMonth - 1);

  const cells: { date: Date; isCurrentMonth: boolean; dayNum: number }[] = [];

  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = new Date(currentCalendarYear, currentCalendarMonth - 1, prevMonthDays - i);
    cells.push({
      date: d,
      isCurrentMonth: false,
      dayNum: prevMonthDays - i
    });
  }

  for (let i = 1; i <= totalDays; i++) {
    const d = new Date(currentCalendarYear, currentCalendarMonth, i);
    cells.push({
      date: d,
      isCurrentMonth: true,
      dayNum: i
    });
  }

  const remainingCells = 42 - cells.length;
  for (let i = 1; i <= remainingCells; i++) {
    const d = new Date(currentCalendarYear, currentCalendarMonth + 1, i);
    cells.push({
      date: d,
      isCurrentMonth: false,
      dayNum: i
    });
  }
  const [vipAssistance, setVipAssistance] = useState<string[]>([]);
  const [specialRequest, setSpecialRequest] = useState('');
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    code: string;
    roomName: string;
    checkIn: string;
    checkOut: string;
    totalPrice: number;
  } | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  // Auto scroll and select if came from Hero
  useEffect(() => {
    if (selectedRoomId) {
      setActiveBookingRoom(selectedRoomId);
      // Pre-set some dates
      const today = new Date();
      const inThreeDays = new Date();
      inThreeDays.setDate(today.getDate() + 3);
      const format = (d: Date) => d.toISOString().split('T')[0];
      setCheckIn(format(today));
      setCheckOut(format(inThreeDays));
      
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [selectedRoomId]);

  const toggleAmenities = (roomId: string) => {
    setExpandedAmenities(prev => ({ ...prev, [roomId]: !prev[roomId] }));
  };

  const toggleVipAssistance = (option: string) => {
    setVipAssistance(prev => 
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const calculateTotal = (room: Room) => {
    if (!checkIn || !checkOut) return room.pricePerNight * 2;
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    return room.pricePerNight * diffDays;
  };

  const handleBookingSubmit = (e: React.FormEvent, room: Room) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !checkIn || !checkOut) {
      const fillMsg = language === 'fr'
        ? "Veuillez remplir les informations indispensables (Nom, Email, Arrivée, Départ)."
        : "Please fill out required fields (Name, Email, Arrival, Departure).";
      alert(fillMsg);
      return;
    }

    const confCode = `TEH-${Math.floor(100000 + Math.random() * 900000)}`;
    const total = calculateTotal(room);

    setBookingConfirmation({
      code: confCode,
      roomName: room.name,
      checkIn,
      checkOut,
      totalPrice: total
    });
  };

  const handleSendWhatsApp = () => {
    if (!bookingConfirmation) return;
    const textStr = language === 'fr'
      ? `Bonjour Concierge Tour Eiffel Hôtel Bénin! %0AJe viens de valider une réservation en ligne.%0A%0A*Code:* ${bookingConfirmation.code}%0A*Nom:* ${guestName}%0A*Chambre:* ${bookingConfirmation.roomName}%0A*Séjour:* du ${bookingConfirmation.checkIn} au ${bookingConfirmation.checkOut}%0A*Total:* ${bookingConfirmation.totalPrice.toLocaleString()} FCFA%0A*Options VIP:* ${vipAssistance.join(', ') || 'Aucune'}%0A*Demandes:* ${specialRequest || 'Aucune'}%0A%0AJe souhaite confirmer mon séjour et organiser mon transfert diplomatique héliporté ou taxi d'élite.`
      : `Hello Concierge Tour Eiffel Hotel Benin! %0AI have just finalized an online booking inquiry.%0A%0A*Code:* ${bookingConfirmation.code}%0A*Name:* ${guestName}%0A*Suite:* ${bookingConfirmation.roomName}%0A*Stay:* from ${bookingConfirmation.checkIn} to ${bookingConfirmation.checkOut}%0A*Total:* ${bookingConfirmation.totalPrice.toLocaleString()} FCFA%0A*VIP Options:* ${vipAssistance.join(', ') || 'None'}%0A*Special Requests:* ${specialRequest || 'None'}%0A%0AI wish to finalize my stay and arrange my diplomatic airport transfer.`;
    window.open(`https://wa.me/22955123456?text=${textStr}`, '_blank');
  };

  const handleResetForm = () => {
    setBookingConfirmation(null);
    setActiveBookingRoom(null);
    setGuestName('');
    setGuestEmail('');
    setSpecialRequest('');
    setVipAssistance([]);
    if (onClearSelectedRoom) onClearSelectedRoom();
  };

  const vipOptionsList = language === 'fr' 
    ? [
        "Bouteille de Champagne Krug à l'accueil",
        "Service Escorte Héliportée",
        "Majordome Dédié 24h/24",
        "Expédition Gastronomique (Pension Complète)",
        "Excursion Royale Historique de Porto-Novo"
      ]
    : [
        "Bespoke chilled Krug champagne upon arrival",
        "Diplomatic Helicopter transfer package",
        "Dedicated Butler support 24h/24",
        "Gourmet Gastronomic full-board pass",
        "Royal historical excursion of Porto-Novo"
      ];

  return (
    <section className="py-24 bg-[#FAFAFA] text-gray-900 relative" id="rooms-section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-gold-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.35em] text-gold-400 uppercase block mb-3">
            {language === 'fr' ? 'Hébergements Souverains' : 'Sovereign Accommodations'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-gray-900 uppercase">
            {t('rooms.title')}
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
          <p className="max-w-xl mx-auto text-gray-600 text-xs sm:text-sm font-light mt-4">
            {t('rooms.subtitle')}
          </p>
        </div>

        {/* Calendar Hub Panel */}
        <div className="mb-20 bg-white border border-gold-400/15 rounded-lg p-6 sm:p-8 shadow-xl relative" id="sovereign-calendar-hub">
          {/* subtle gold corner labels */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[8px] tracking-[0.25em] text-gold-400 uppercase font-light pointer-events-none">
            <Sparkles className="w-3 h-3 text-gold-400 animate-pulse" />
            <span>REAL-TIME DATABASE SYNC</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Box: Simple calendar month grid picker */}
            <div className="lg:col-span-7" id="calendar-grid-section">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="text-left">
                  <h3 className="font-serif text-lg font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                    <CalendarDays className="w-4.5 h-4.5 text-gold-400" />
                    {language === 'fr' ? "Calendrier Impérial" : "Chronos Grid System"}
                  </h3>
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest mt-1">
                    {language === 'fr' ? "Sélectionnez votre intervalle de séjour" : "Select stay dates on the grid"}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-start gap-2">
                  <button 
                    onClick={handlePrevMonth}
                    className="w-8 h-8 rounded bg-white hover:bg-gold-400 text-gold-400 hover:text-gray-900 border border-gold-500/10 hover:border-gold-400 flex items-center justify-center transition-all cursor-pointer"
                    id="calendar-prev-month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-serif text-xs font-semibold tracking-wide text-gold-300 min-w-[110px] text-center uppercase">
                    {language === 'fr' ? MONTHS_FR[currentCalendarMonth] : MONTHS_EN[currentCalendarMonth]} {currentCalendarYear}
                  </span>
                  <button 
                    onClick={handleNextMonth}
                    className="w-8 h-8 rounded bg-white hover:bg-gold-400 text-gold-400 hover:text-gray-900 border border-gold-500/10 hover:border-gold-400 flex items-center justify-center transition-all cursor-pointer"
                    id="calendar-next-month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Day header cells */}
              <div className="grid grid-cols-7 gap-1 text-center mb-2" id="calendar-weekdays-row">
                {(language === 'fr' ? WEEKDAYS_FR : WEEKDAYS_EN).map((day, dIdx) => (
                  <span key={dIdx} className="text-[10px] font-bold text-gold-400 uppercase tracking-wider py-1 select-none">
                    {day}
                  </span>
                ))}
              </div>

              {/* Calendar cells grid */}
              <div className="grid grid-cols-7 gap-1" id="calendar-days-grid">
                {cells.map((cell, idx) => {
                  const dateStr = formatDateString(cell.date);
                  const isToday = formatDateString(new Date()) === dateStr;
                  const isSelectedStart = isCheckInDay(cell.date);
                  const isSelectedEnd = isCheckOutDay(cell.date);
                  const isRangePart = isWithinRange(cell.date);
                  const isPast = dateStr < formatDateString(new Date());

                  let cellClass = "aspect-square flex flex-col items-center justify-center text-xs relative rounded transition-all duration-300 cursor-pointer select-none border border-transparent group ";
                  
                  if (!cell.isCurrentMonth) {
                    cellClass += "opacity-20 hover:opacity-40 text-gray-600 ";
                  } else if (isPast) {
                    cellClass += "opacity-30 cursor-not-allowed text-gray-500 line-through ";
                  } else if (isSelectedStart) {
                    cellClass += "bg-gold-400 text-gray-900 font-bold border-gold-300 shadow-lg shadow-gold-500/20 ";
                  } else if (isSelectedEnd) {
                    cellClass += "bg-gold-500 text-gray-900 font-bold border-gold-400 shadow-lg shadow-gold-500/20 ";
                  } else if (isRangePart) {
                    cellClass += "bg-gold-500/20 text-gold-300 border border-gold-500/30 ";
                  } else {
                    cellClass += "bg-white/80 text-gray-800 hover:bg-gray-50 hover:text-gray-900 hover:border-gold-500/25 ";
                  }

                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => {
                        setHoveredDate(cell.date);
                        setActiveAdvisoryDate(cell.date);
                      }}
                      onMouseLeave={() => {
                        setHoveredDate(null);
                      }}
                      onClick={() => {
                        if (isPast) return;
                        const dateStr = formatDateString(cell.date);
                        setActiveAdvisoryDate(cell.date);
                        
                        if (!checkIn || (checkIn && checkOut)) {
                          setCheckIn(dateStr);
                          setCheckOut('');
                        } else {
                          if (dateStr < checkIn) {
                            setCheckIn(dateStr);
                          } else if (dateStr === checkIn) {
                            // ignore / clear
                          } else {
                            setCheckOut(dateStr);
                          }
                        }
                      }}
                      className={cellClass}
                      id={`calendar-cell-${dateStr}`}
                    >
                      <span className="relative z-10">{cell.dayNum}</span>
                      
                      {/* Floating Micro trend hover tooltip */}
                      {cell.isCurrentMonth && !isPast && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white border border-gold-400/35 px-2.5 py-1.5 rounded text-[9px] text-gray-900 font-sans pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 w-44 shadow-2xl text-left scale-90 origin-bottom group-hover:scale-100 flex flex-col gap-1">
                          {(() => {
                            const advisory = getDateAdvisory(cell.date);
                            return (
                              <>
                                <div className="flex items-center justify-between font-bold border-b border-white/5 pb-1 gap-1">
                                  <span className="text-gold-400 font-serif">
                                    {cell.date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short' })}
                                  </span>
                                  <span className={`${advisory.trendColor} font-mono`}>
                                    {advisory.occupancyRate}%
                                  </span>
                                </div>
                                <div className="text-[8px] text-gray-800 font-light flex flex-col gap-0.5">
                                  <div>
                                    <strong className="text-gold-300">{language === 'fr' ? 'Tendance: ' : 'Trend: '}</strong>
                                    <span>{language === 'fr' ? advisory.priceTrendFR.split(' ')[0] : advisory.priceTrendEN.split(' ')[0]}</span>
                                  </div>
                                  <div className="truncate">
                                    <strong className="text-gold-300">{language === 'fr' ? 'Idéal: ' : 'Best: '}</strong>
                                    <span>{advisory.suggestedSuiteName}</span>
                                  </div>
                                </div>
                              </>
                            );
                          })()}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[5px] w-0.5 h-0.5 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gold-400/40" />
                        </div>
                      )}

                      {/* Beautiful ambient dots */}
                      {isToday && !isSelectedStart && !isSelectedEnd && (
                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-gold-400" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quick instructions legend */}
              <div className="mt-4 flex flex-wrap gap-4 text-[10px] text-gray-600 justify-start" id="calendar-legend-bar">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-gradient-to-r from-gold-400 to-gold-500" />
                  <span>{language === 'fr' ? "Enregistrement / Départ" : "Check-in / Check-out"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-gold-500/20 border border-gold-500/30" />
                  <span>{language === 'fr' ? "Résidence Estimée" : "Stay Interval Selected"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>{language === 'fr' ? "Aujourd'hui" : "Today"}</span>
                </div>
              </div>
            </div>

            {/* Right Box: Dynamic analytical report card */}
            <div className="lg:col-span-5 bg-white/90 border border-gold-500/10 p-5 rounded" id="calendar-diagnostics-section">
              <h4 className="font-serif text-xs font-semibold text-gold-300 uppercase tracking-widest mb-4 flex items-center gap-1.5 pb-2 border-b border-gold-500/10">
                <Info className="w-4 h-4 shrink-0" />
                {language === 'fr' ? "Analyse de Disponibilité" : "Sovereign Stay Advisor"}
              </h4>

              {/* Occupancy Trends & Dynamic Predictor */}
              {activeAdvisoryDate && (
                <div className="mb-6 p-4 rounded bg-[#050814]/80 border border-gold-400/20 text-left text-xs text-slate-300" id="predictive-trends-panel">
                  <div className="flex items-center justify-between mb-3 border-b border-gold-500/10 pb-2">
                    <span className="font-serif text-[10px] font-bold text-gold-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
                      {language === 'fr' ? "Indice de Tendance" : "Predictive Trend"}
                    </span>
                    <span className="font-mono text-[9px] text-gold-300 font-bold bg-gold-400/10 px-2 py-0.5 rounded border border-gold-400/25">
                      {activeAdvisoryDate.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>

                  {(() => {
                    const advisory = getDateAdvisory(activeAdvisoryDate);
                    return (
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center text-[10px] mb-1">
                            <span className="text-gray-600">{language === 'fr' ? "Affluence projetée :" : "Projected Occupancy:"}</span>
                            <span className="font-bold text-gray-900 font-mono">{advisory.occupancyRate}%</span>
                          </div>
                          <div className="w-full bg-gray-50 h-1.5 rounded-full overflow-hidden animate-pulse">
                            <div 
                              className="h-full bg-gradient-to-r from-emerald-500 via-gold-400 to-rose-500 transition-all duration-500" 
                              style={{ width: `${advisory.occupancyRate}%` }} 
                            />
                          </div>
                        </div>

                        {/* Price Trend & Suggested Room */}
                        <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                          <div className="border border-white/5 bg-white/[0.02] p-2 rounded">
                            <div className="text-[8px] text-gray-500 uppercase tracking-wider">{language === 'fr' ? "Tendance" : "Tariff Trend"}</div>
                            <div className={`font-semibold mt-1 truncate ${advisory.trendColor}`}>
                              {language === 'fr' ? advisory.priceTrendFR : advisory.priceTrendEN}
                            </div>
                          </div>
                          <div className="border border-white/5 bg-white/[0.02] p-2 rounded">
                            <div className="text-[8px] text-gray-500 uppercase tracking-wider">{language === 'fr' ? "Match Idéal" : "Ideal Match"}</div>
                            <div className="font-semibold text-gold-300 mt-1 truncate">{advisory.suggestedSuiteName}</div>
                          </div>
                        </div>

                        {/* Season & Day Advices */}
                        <div className="text-[10px] text-gray-600 font-light space-y-1.5 bg-[#FAFAFA]/40 p-3 rounded border border-gold-500/5 leading-relaxed">
                          <p>
                            <strong className="text-gold-400">{language === 'fr' ? "Saison : " : "Season: "}</strong>
                            {language === 'fr' ? advisory.seasonalAdviceFR : advisory.seasonalAdviceEN}
                          </p>
                          <p className="border-t border-white/5 pt-1.5 mt-1.5">
                            <strong className="text-gold-400">{language === 'fr' ? "Note : " : "Note: "}</strong>
                            {language === 'fr' ? advisory.dayAdviceFR : advisory.dayAdviceEN}
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Selected stats info card */}
              <div className="bg-[#050814] p-3 rounded text-left border border-gold-500/5 mb-6 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="block text-[8px] text-gray-500 uppercase tracking-wider">{language === 'fr' ? "Arrivée" : "Check-In"}</span>
                    <span className="font-semibold text-gray-900 font-mono">{checkIn || '---'}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] text-gray-500 uppercase tracking-wider">{language === 'fr' ? "Départ" : "Check-Out"}</span>
                    <span className="font-semibold text-gray-900 font-mono">{checkOut || '---'}</span>
                  </div>
                </div>

                {checkIn && checkOut && (
                  <div className="mt-3 pt-3 border-t border-gold-500/5 flex justify-between items-center text-[10px] text-gold-400 font-bold uppercase tracking-wider">
                    <span>{language === 'fr' ? "Durée du séjour :" : "Duration of stay:"}</span>
                    <span>
                      {Math.ceil(Math.abs(new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))} {language === 'fr' ? "Nuits" : "Nights"}
                    </span>
                  </div>
                )}
              </div>

              {/* Room items with status reports */}
              <div className="space-y-4 text-left" id="suites-availability-list">
                {rooms.map((room) => {
                  const avail = getRoomAvailabilityOnDates(room.id, checkIn, checkOut);
                  const basePrice = room.pricePerNight;
                  
                  // Compute calculated price for selected interval
                  let localizedTotalPrice = "---";
                  if (checkIn && checkOut) {
                    const diffDays = Math.ceil(Math.abs(new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)) || 1;
                    localizedTotalPrice = `${(basePrice * diffDays).toLocaleString()} FCFA`;
                  }

                  // Determine color badges style
                  let badgeColors = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                  let btnEnabled = true;

                  if (avail.status === 'occupied') {
                    badgeColors = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
                    btnEnabled = false;
                  } else if (avail.status === 'diplomatic') {
                    badgeColors = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
                    btnEnabled = false;
                  } else if (avail.status === 'limited') {
                    badgeColors = 'bg-orange-500/10 text-orange-400 border-orange-500/20';
                  }

                  return (
                    <div 
                      key={room.id}
                      className="p-3 rounded border border-gold-500/5 bg-white/50 flex flex-col gap-2 hover:border-gold-500/15 transition"
                      id={`advisor-suite-card-${room.id}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h5 className="font-serif text-xs font-bold text-gray-900 tracking-wide">
                            {room.name}
                          </h5>
                          <span className="text-[10px] text-gray-600 mt-0.5 block font-mono">
                            {room.pricePerNight.toLocaleString()} FCFA / night
                          </span>
                        </div>

                        {/* Status Badge */}
                        <span className={`px-2 py-0.5 rounded text-[8px] uppercase font-bold border shrink-0 ${badgeColors}`} id={`badge-room-${room.id}`}>
                          {language === 'fr' ? avail.textFR : avail.textEN}
                        </span>
                      </div>

                      {/* Display calculated stays */}
                      {checkIn && checkOut && (
                        <div className="flex justify-between items-center text-[10px] border-t border-gold-500/5 pt-2 mt-1">
                          <span className="text-gray-500">{language === 'fr' ? "Total estimé :" : "Estimated total:"}</span>
                          <span className="font-semibold text-gold-300 font-mono">{localizedTotalPrice}</span>
                        </div>
                      )}

                      {/* Action trigger button */}
                      <button
                        onClick={() => handleSelectSuiteFromCalendar(room.id)}
                        disabled={!btnEnabled}
                        className={`w-full py-1.5 text-[9px] font-bold tracking-widest uppercase rounded mt-1.5 transition text-center cursor-pointer ${
                          btnEnabled 
                            ? 'bg-gold-500/15 text-gold-300 border border-gold-400/30 hover:bg-gold-400 hover:text-gray-900 hover:border-gold-400'
                            : 'bg-white/5 text-gray-600 border border-transparent cursor-not-allowed'
                        }`}
                        id={`advisor-book-btn-${room.id}`}
                      >
                        {!btnEnabled 
                          ? (language === 'fr' ? "Non disponible" : "Unavailable") 
                          : (language === 'fr' ? "Choisir cette Suite" : "Select This Suite")}
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </div>

        {/* Rooms Listing */}
        <div className="space-y-16" id="rooms-list-container">
          {rooms.map((room) => {
            const isBooking = activeBookingRoom === room.id;
            const isAmenitiesExpanded = expandedAmenities[room.id] || false;
            const priceEur = Math.round(room.pricePerNight / 655.957);

            return (
              <div 
                key={room.id}
                className="bg-white/80 border border-gold-500/10 rounded-lg overflow-hidden hover:border-gold-400/30 transition-all duration-300 shadow-xl"
                id={`room-card-${room.id}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  
                  {/* Aspect Media Column */}
                  <div className="relative h-[250px] sm:h-[350px] lg:h-auto lg:col-span-5">
                    <img 
                      src={room.imageUrl} 
                      alt={room.name} 
                      className="w-full h-full object-cover object-center filter brightness-[0.80] group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-900 via-transparent to-transparent lg:hidden" />
                    
                    {/* Floating Luxury Specifications */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="px-3 py-1 text-[10px] tracking-widest uppercase font-semibold bg-[#FAFAFA]/85 backdrop-blur-sm text-gold-400 border border-gold-500/20 rounded">
                        {room.size}
                      </span>
                    </div>
                  </div>

                  {/* Room Details & Actions */}
                  <div className="p-6 sm:p-8 lg:p-10 lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Title & Tagline */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-wide">
                          {room.name}
                        </h3>
                        {/* Price Tag */}
                        <div className="text-right">
                          <span className="block font-serif text-xl sm:text-2xl font-bold text-gold-400">
                            {room.pricePerNight.toLocaleString()} FCFA
                          </span>
                          <span className="block text-[10px] tracking-wider text-gray-600 uppercase">
                            {language === 'fr' ? `Par nuit • ~${priceEur} €` : `Per night • ~${priceEur} €`}
                          </span>
                        </div>
                      </div>

                      <p className="text-gold-300 text-xs sm:text-sm italic font-light tracking-wide mb-4">
                        « {room.tagline} »
                      </p>

                      <p className="text-gray-800 text-xs sm:text-sm font-light leading-relaxed mb-6">
                        {room.description}
                      </p>

                      {/* Specs badges Row */}
                      <div className="grid grid-cols-3 gap-3 p-4 bg-[#FAFAFA]/50 rounded border border-gold-500/5 mb-6 text-xs text-gray-800 font-light">
                        <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                          <Users2 className="w-3.5 h-3.5 text-gold-400" />
                          <span>{room.capacity}</span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                          <Map className="w-3.5 h-3.5 text-gold-400" />
                          <span>{room.view}</span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                          <BedDouble className="w-3.5 h-3.5 text-gold-400" />
                          <span>{room.bedType}</span>
                        </div>
                      </div>

                      {/* Amenities Toggle */}
                      <div className="mb-6">
                        <button
                          onClick={() => toggleAmenities(room.id)}
                          className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] text-gold-400 hover:text-gold-300 uppercase focus:outline-none cursor-pointer"
                          id={`amenities-toggle-${room.id}`}
                        >
                          {isAmenitiesExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          {language === 'fr' ? 'Conforts & Commodités de prestige' : ' Elite Comforts & Amenities'}
                        </button>
                        
                        {isAmenitiesExpanded && (
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 p-4 bg-[#FAFAFA]/85 rounded border border-gold-500/10 animate-fadeIn" id={`amenities-grid-${room.id}`}>
                            {room.amenities.map((am, amIdx) => (
                              <div key={amIdx} className="flex items-center gap-2 text-xs text-gray-800 font-light">
                                <Check className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                                <span>{am}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Booking Buttons row */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gold-500/5">
                      <button
                        onClick={() => {
                          setActiveBookingRoom(isBooking ? null : room.id);
                          setBookingConfirmation(null);
                        }}
                        className={`px-6 py-3 text-xs tracking-widest font-bold uppercase rounded transition cursor-pointer flex-1 text-center ${
                          isBooking 
                            ? 'bg-gray-50 text-gold-400 border border-gold-400/40' 
                            : 'bg-transparent text-gray-900 border border-gold-500/30 hover:border-gold-400'
                        }`}
                        id={`book-toggle-btn-${room.id}`}
                      >
                        {isBooking 
                          ? (language === 'fr' ? "Masquer la console" : "Hide Booking Console") 
                          : (language === 'fr' ? "Réserver cette Suite" : "Book This Suite")}
                      </button>

                      <a
                        href={`${hotelInfo.whatsappUrl}%20la%20suite%20${encodeURIComponent(room.name)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 text-xs tracking-widest font-bold uppercase rounded text-gray-900 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 transition cursor-pointer flex items-center justify-center gap-2 flex-1"
                        id={`whatsapp-inquiry-${room.id}`}
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        {language === 'fr' ? "Demande WhatsApp Concierge" : "Inquire via WhatsApp"}
                      </a>
                    </div>

                  </div>
                </div>

                {/* Sub-Interactive Booking Form Drawer */}
                {isBooking && (
                  <div 
                    ref={formRef}
                    className="border-t border-gold-500/20 bg-gradient-to-b from-[#0b1228] to-[#040612] p-6 sm:p-10"
                    id={`booking-drawer-${room.id}`}
                  >
                    {!bookingConfirmation ? (
                      <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-2 text-gold-400 mb-6 font-serif text-lg">
                          <Ticket className="w-5 h-5 text-gold-400" />
                          <h4>{language === 'fr' ? "Saisir vos coordonnées pour une réservation impériale" : "Enter details for a magnificent reservation"}</h4>
                        </div>

                        <form onSubmit={(e) => handleBookingSubmit(e, room)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          {/* Name */}
                          <div>
                            <label className="block text-[10px] tracking-widest uppercase font-bold text-gray-600 mb-2">{language === 'fr' ? "Votre Nom Complet" : "Your Full Name"}</label>
                            <input 
                              type="text" 
                              required
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              placeholder={language === 'fr' ? "Ex: S.A.R. Saliou de Porto-Novo" : "e.g., Honorable John Carter"}
                              className="w-full bg-[#FAFAFA]/80 border border-gold-500/10 focus:border-gold-400 text-sm text-gray-900 px-3 py-2.5 rounded focus:outline-none"
                              id={`book-input-name-${room.id}`}
                            />
                          </div>

                          {/* Email */}
                          <div>
                            <label className="block text-[10px] tracking-widest uppercase font-bold text-gray-600 mb-2">{language === 'fr' ? "Adresse de messagerie" : "Email Address"}</label>
                            <input 
                              type="email" 
                              required
                              value={guestEmail}
                              onChange={(e) => setGuestEmail(e.target.value)}
                              placeholder="votre-adresse@prestige.com"
                              className="w-full bg-[#FAFAFA]/80 border border-gold-500/10 focus:border-gold-400 text-sm text-gray-900 px-3 py-2.5 rounded focus:outline-none"
                              id={`book-input-email-${room.id}`}
                            />
                          </div>

                          {/* CheckIn CheckOut */}
                          <div>
                            <label className="block text-[10px] tracking-widest uppercase font-bold text-gray-600 mb-2 flex items-center gap-1.5">
                              <CalendarDays className="w-3.5 h-3.5 text-gold-400" />
                              {language === 'fr' ? "Arrivée Prévue" : "Expected Check-In"}
                            </label>
                            <input 
                              type="date" 
                              required
                              value={checkIn}
                              onChange={(e) => setCheckIn(e.target.value)}
                              className="w-full bg-[#FAFAFA]/80 border border-gold-500/10 focus:border-gold-400 text-sm text-gray-900 px-3 py-2.5 rounded focus:outline-none"
                              id={`book-input-checkin-${room.id}`}
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] tracking-widest uppercase font-bold text-gray-600 mb-2 flex items-center gap-1.5">
                              <CalendarDays className="w-3.5 h-3.5 text-gold-400" />
                              {language === 'fr' ? "Départ Prévu" : "Expected Check-Out"}
                            </label>
                            <input 
                              type="date" 
                              required
                              value={checkOut}
                              onChange={(e) => setCheckOut(e.target.value)}
                              className="w-full bg-[#FAFAFA]/80 border border-gold-500/10 focus:border-gold-400 text-sm text-gray-900 px-3 py-2.5 rounded focus:outline-none"
                              id={`book-input-checkout-${room.id}`}
                            />
                          </div>

                          {/* Custom VIP Options Checkboxes */}
                          <div className="md:col-span-2">
                            <span className="block text-[10px] tracking-widest uppercase font-bold text-gray-600 mb-3 flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                              {language === 'fr' ? "Accompagnement VIP Exclusif" : "Bespoke VIP Add-ons"}
                            </span>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {vipOptionsList.map((opt, i) => {
                                const isSelected = vipAssistance.includes(opt);
                                return (
                                  <div 
                                    key={i}
                                    onClick={() => toggleVipAssistance(opt)}
                                    className={`p-3 rounded border text-xs cursor-pointer select-none transition ${
                                      isSelected 
                                        ? 'border-gold-400 bg-gold-500/10 text-gold-300' 
                                        : 'border-gold-500/10 bg-[#FAFAFA]/50 hover:bg-white text-gray-600'
                                    }`}
                                    id={`vip-opt-${room.id}-${i}`}
                                  >
                                    {opt}
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Special Requirements */}
                          <div className="md:col-span-2">
                            <label className="block text-[10px] tracking-widest uppercase font-bold text-gray-600 mb-2 font-bold">{language === 'fr' ? "Demandes ou Protocoles Particuliers" : "Special Protocol Requests"}</label>
                            <textarea
                              rows={3}
                              value={specialRequest}
                              onChange={(e) => setSpecialRequest(e.target.value)}
                              placeholder={language === 'fr' ? "Spécifiez tout protocole de voyage, régime alimentaire particulier ou aménagement de sécurité spécifique souhaité..." : "Detail any dietary restrictions, travel protocol alignments or security details..."}
                              className="w-full bg-[#FAFAFA]/80 border border-gold-500/10 focus:border-gold-400 text-sm text-gray-900 px-3 py-2.5 rounded focus:outline-none resize-none"
                              id={`book-txt-request-${room.id}`}
                            />
                          </div>

                          {/* Submit button */}
                          <div className="md:col-span-2 flex justify-end">
                            <button
                              type="submit"
                              className="px-8 py-3.5 text-xs tracking-widest font-bold uppercase rounded text-gray-900 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-350 cursor-pointer shadow-lg shadow-gold-500/10"
                              id={`book-submit-btn-${room.id}`}
                            >
                              {language === 'fr' ? "Valider mon Enregistrement Provisoire" : "Hold Provisional Booking Guarantee"}
                            </button>
                          </div>

                        </form>
                      </div>
                    ) : (
                      
                      /* Success Receipt Visual */
                      <div className="max-w-xl mx-auto bg-gradient-to-b from-[#FAFAFA] to-midnight-900 border-2 border-dashed border-gold-500/30 rounded-lg p-6 sm:p-8 text-center animate-scaleUp" id={`receipt-${room.id}`}>
                        <div className="w-16 h-16 rounded-full bg-gold-400/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto mb-4 animate-pulse">
                          <Check className="w-8 h-8" />
                        </div>
                        
                        <h4 className="font-serif text-2xl font-bold text-gold-300 uppercase tracking-widest mb-2">
                          {language === 'fr' ? "Réservation Enregistrée" : "Reservation Preserved"}
                        </h4>
                        
                        <p className="text-gray-600 text-xs tracking-wider mb-6">
                          {language === 'fr' ? "Un majordome se tient prêt à honorer votre prestigieux séjour." : "A personal butler stands ready to welcome you for this majestic journey."}
                        </p>

                        {/* Bill Details */}
                        <div className="bg-[#FAFAFA] p-4 rounded border border-gold-500/10 text-left space-y-3 font-mono text-xs mb-6">
                          <div className="flex justify-between border-b border-gold-500/5 pb-2">
                            <span className="text-gray-500 uppercase">{language === 'fr' ? "Code de Réservation" : "Reservation Number"}</span>
                            <span className="text-gold-400 font-bold">{bookingConfirmation.code}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 uppercase">{language === 'fr' ? "Suite Sélectionnée" : "Bespoke Suite"}</span>
                            <span className="text-gray-900 font-semibold">{bookingConfirmation.roomName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 uppercase">{language === 'fr' ? "Dates de Séjour" : "Stay Dates"}</span>
                            <span className="text-gray-900">
                              {language === 'fr' 
                                ? `Du ${bookingConfirmation.checkIn} au ${bookingConfirmation.checkOut}` 
                                : `From ${bookingConfirmation.checkIn} to ${bookingConfirmation.checkOut}`}
                            </span>
                          </div>
                          <div className="flex justify-between border-t border-gold-500/5 pt-2">
                            <span className="text-gray-500 uppercase font-bold text-gold-400">{language === 'fr' ? "Total Prévisionnel" : "Estimated Total Due"}</span>
                            <span className="text-gold-400 font-bold text-sm">{bookingConfirmation.totalPrice.toLocaleString()} FCFA</span>
                          </div>
                        </div>

                        {/* Complete & Actions block */}
                        <p className="text-xs text-gray-600 leading-relaxed mb-6">
                          {language === 'fr'
                            ? "Afin de finaliser les préparatifs protocolaires (navette diplomatique, transfert de fonds sécurisé, préparation des alcôves d'or), veuillez transmettre cette note directement à notre Concierge par WhatsApp."
                            : "To complete official protocols (embassy airport pickup, safe transport, customized gold bed alcove arrangements), please forward this invoice docket directly to our Concierge on WhatsApp."}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={handleSendWhatsApp}
                            className="flex-1 py-3 px-4 rounded text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 text-gray-900 font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-gold-400/20"
                            id={`send-wa-${room.id}`}
                          >
                            <Send className="w-3.5 h-3.5" />
                            {language === 'fr' ? "Transmettre sur WhatsApp" : "Forward to WhatsApp"}
                          </button>
                          
                          <button
                            onClick={handleResetForm}
                            className="flex-1 py-3 px-4 rounded text-xs font-bold tracking-widest uppercase border border-gold-500/20 text-gray-800 hover:text-gray-900 bg-[#FAFAFA] cursor-pointer"
                            id={`reset-wa-${room.id}`}
                          >
                            {language === 'fr' ? "Fermer & Retourner aux Suites" : "Close & Back to Suites"}
                          </button>
                        </div>
                      </div>

                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
