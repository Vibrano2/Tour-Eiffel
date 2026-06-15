import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CloudSun, 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  CloudFog, 
  CloudDrizzle, 
  Wind, 
  Droplets, 
  Thermometer, 
  Compass, 
  Calendar, 
  RefreshCw, 
  Sparkles, 
  Info,
  MapPin,
  Umbrella,
  Heart
} from 'lucide-react';

interface CurrentWeatherData {
  temperatureC: number;
  feelsLikeC: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  weatherCode: number;
  isDay: boolean;
}

interface DailyForecastData {
  date: string;
  weatherCode: number;
  tempMaxC: number;
  tempMinC: number;
}

const DEFAULT_REALTIME_WEATHER: CurrentWeatherData = {
  temperatureC: 30.8,
  feelsLikeC: 35.5,
  humidity: 78,
  windSpeed: 14.5,
  precipitation: 0.0,
  weatherCode: 1, // partly cloudy
  isDay: true
};

const DEFAULT_DAILY_FORECASTS: DailyForecastData[] = [
  { date: "Mardi", weatherCode: 1, tempMaxC: 32, tempMinC: 25 },
  { date: "Mercredi", weatherCode: 3, tempMaxC: 31, tempMinC: 24 },
  { date: "Jeudi", weatherCode: 80, tempMaxC: 30, tempMinC: 24 },
];

export default function PortoNovoWeather() {
  const { language } = useLanguage();
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData>(DEFAULT_REALTIME_WEATHER);
  const [forecasts, setForecasts] = useState<DailyForecastData[]>(DEFAULT_DAILY_FORECASTS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [fetchError, setFetchError] = useState<boolean>(false);

  const fetchWeather = async () => {
    setIsLoading(true);
    setFetchError(false);
    try {
      // Porto-Novo coordinates: Lat 6.4969, Lon 2.6281
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=6.4969&longitude=2.6281&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,is_day,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Africa/Porto-Novo'
      );
      
      if (!response.ok) {
        throw new Error('Sovereign weather payload could not be loaded');
      }

      const data = await response.json();

      if (data && data.current) {
        setCurrentWeather({
          temperatureC: data.current.temperature_2m,
          feelsLikeC: data.current.apparent_temperature,
          humidity: data.current.relative_humidity_2m,
          windSpeed: data.current.wind_speed_10m,
          precipitation: data.current.precipitation,
          weatherCode: data.current.weather_code,
          isDay: data.current.is_day !== undefined ? data.current.is_day === 1 : true
        });

        if (data.daily && data.daily.time) {
          const mappedForecast: DailyForecastData[] = [];
          // Skip today (index 0) or offset politely to show next 3 days
          const daysOfWeekFR = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
          const daysOfWeekEN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

          for (let i = 1; i <= 3; i++) {
            if (data.daily.time[i]) {
              const dateObj = new Date(data.daily.time[i]);
              const dayIndex = dateObj.getDay();
              const dayStr = language === 'fr' ? daysOfWeekFR[dayIndex] : daysOfWeekEN[dayIndex];
              mappedForecast.push({
                date: dayStr,
                weatherCode: data.daily.weather_code[i] ?? 1,
                tempMaxC: data.daily.temperature_2m_max[i] ?? 32,
                tempMinC: data.daily.temperature_2m_min[i] ?? 24
              });
            }
          }
          if (mappedForecast.length > 0) {
            setForecasts(mappedForecast);
          }
        }
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.warn("Using luxurious default Benin climate payload due to offline/sandbox restriction:", err);
      // Keep static high-fidelity fallbacks and mark soft flag
      setFetchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // Auto sync every 15 minutes
    const interval = setInterval(fetchWeather, 900000);
    return () => clearInterval(interval);
  }, [language]);

  const convertTemp = (tempC: number) => {
    if (temperatureUnit === 'F') {
      return Math.round((tempC * 9/5) + 32);
    }
    return Math.round(tempC * 10) / 10;
  };

  // Map WMO codes to gorgeous visual cards & text description
  const getWeatherDetails = (code: number) => {
    switch (code) {
      case 0:
        return {
          icon: Sun,
          textFR: "Ciel Pur Impérial",
          textEN: "Imperial Sun-Kissed Sky",
          color: "text-amber-400",
          bgGradient: "from-amber-500/10 to-transparent"
        };
      case 1:
      case 2:
      case 3:
        return {
          icon: CloudSun,
          textFR: "Nuages Subtils",
          textEN: "Subtle Royal Clouds",
          color: "text-gold-300",
          bgGradient: "from-blue-500/10 to-transparent"
        };
      case 45:
      case 48:
        return {
          icon: CloudFog,
          textFR: "Brume Mystique sur la Lagune",
          textEN: "Mystical Lagoon Mist",
          color: "text-slate-400",
          bgGradient: "from-slate-500/10 to-transparent"
        };
      case 51:
      case 53:
      case 55:
        return {
          icon: CloudDrizzle,
          textFR: "Ondée Douce de l'Ouémé",
          textEN: "Gentle Oueme Drizzle",
          color: "text-cyan-300",
          bgGradient: "from-cyan-500/10 to-transparent"
        };
      case 61:
      case 63:
      case 65:
        return {
          icon: CloudRain,
          textFR: "Pluie Régénératrice Tropicale",
          textEN: "Regenerative Tropical Rain",
          color: "text-sky-400",
          bgGradient: "from-sky-500/10 to-transparent"
        };
      case 80:
      case 81:
      case 82:
        return {
          icon: Umbrella,
          textFR: "Chaleur d'Averse Lagune",
          textEN: "Warm Lagoon Showers",
          color: "text-indigo-400",
          bgGradient: "from-indigo-500/10 to-transparent"
        };
      case 95:
      case 96:
      case 99:
        return {
          icon: CloudLightning,
          textFR: "Orage Sacré du Bénin",
          textEN: "Sacred Thunderstorm Authority",
          color: "text-red-400",
          bgGradient: "from-red-500/10 to-transparent"
        };
      default:
        return {
          icon: Sun,
          textFR: "Climat Souverain Standard",
          textEN: "Exquisite Ambient Climate",
          color: "text-gold-400",
          bgGradient: "from-gold-600/10 to-transparent"
        };
    }
  };

  const weatherMeta = getWeatherDetails(currentWeather.weatherCode);
  const CurrentIcon = weatherMeta.icon;

  // Custom advisory system based on temperature and precipitation level
  const getDynamicExcursionAdvisory = () => {
    const isRainy = currentWeather.precipitation > 2 || [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(currentWeather.weatherCode);
    const temp = currentWeather.temperatureC;

    if (isRainy) {
      return {
        titleFR: "Retrait d'Or & Bien-être Impérial",
        titleEN: "Golden Sanctuary & Inner Indulgence",
        adviceFR: "Une ondée poétique arrose la cité. Le moment est parfait pour savourer un thé rare de notre collection ou un somptueux Sodabi de garde vieilli dans notre salon d'or. Profitez-en pour réserver un soin régénérant chaud d'Ananas de Terre au Spa de l'Hermitage.",
        adviceEN: "A majestic touch of tropical rain graces Porto-Novo. This is the ultimate call to cozy up inside our Gilded Lounge with a rare warm Beninese cocoa, or block out administrative noise inside our private, heated luxury Spa cabins."
      };
    }

    if (temp >= 33) {
      return {
        titleFR: "Fraîcheur Royale de Midi",
        titleEN: "High Noon Oasis Refreshment",
        adviceFR: "La chaleur impériale est à son zénith. Notre Conciergerie recommande d'éviter l'exposition directe et de succomber à nos cocktails Signature givrés servis sous l'ombrage tamisé du Bar Céleste, ou de vous plonger dans les archives historiques de l'Hôtel à la bibliothèque.",
        adviceEN: "The tropical sun shines at its highest zenith. We highly recommend reclining under the cooling geometric canopies of our pool courtyard, customized with chilled lemongrass towels and fresh tropical passionfruit sorbets curated by Chef Kofi."
      };
    }

    // Default sunny/lovely days
    return {
      titleFR: "Embarquement Royal sur la Lagune",
      titleEN: "Sovereign Lagoon Excursion Splendor",
      adviceFR: "La brise est douce et le ciel se prête à la découverte. Notre majordome peut privatiser notre pirogue royale motorisée d'honneur pour une promenade d'exception sur la lagune de Porto-Novo à la rencontre des cités sur pilotis et du Musée Honmè historique.",
      adviceEN: "Breezy coastal currents and exquisite visibility are aligned. Inquire at our front desk to deploy our private mahogany luxury boat for a customized sunset safari toward Porto-Novo's historic royal palaces and remote lagoon pathways."
    };
  };

  const advisory = getDynamicExcursionAdvisory();

  return (
    <section 
      className="py-16 bg-white border-t border-gold-500/10 relative overflow-hidden" 
      id="portonovo-weather-hub"
    >
      {/* Visual Ambient Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.025),transparent_40%)] pointer-events-none" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-gold-500/[0.01] blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12" id="weather-section-header">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.4em] text-gold-400 uppercase block mb-3">
            {language === 'fr' ? "Climatologie & Explorations" : "Atmosphere & Excursions"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 uppercase">
            {language === 'fr' ? "Porto-Novo en Temps Réel" : "Porto-Novo Skies"}
          </h2>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-4" />
        </div>

        {/* Core Layout Multi-Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="weather-dashboard-layout">
          
          {/* Panel 1: Current readings dashboard (span 5) */}
          <div className="lg:col-span-5 bg-white border border-gold-400/10 sm:p-8 p-6 rounded-lg flex flex-col justify-between relative shadow-xl min-h-[380px]" id="weather-live-readings">
            
            {/* Corner status syncing indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="text-[8px] tracking-widest text-[#9ca3af] font-mono uppercase bg-white/5 border border-white/5 px-2 py-0.5 rounded-full select-none">
                {language === 'fr' ? "PORTO-NOVO, BÉNIN" : "PORTO-NOVO METEO"}
              </span>

              {/* Unit swapper button */}
              <button 
                onClick={() => setTemperatureUnit(prev => prev === 'C' ? 'F' : 'C')}
                className="w-7 h-7 rounded border border-gold-500/25 bg-white text-[9.5px] text-gold-400 hover:bg-gold-400 hover:text-gray-900 hover:border-gold-400 transition-all cursor-pointer font-bold flex items-center justify-center shadow-md active:scale-90"
                title={language === 'fr' ? "Changer l'unité de température" : "Swap temperature metrics"}
                id="weather-unit-swapper"
              >
                °{temperatureUnit}
              </button>
            </div>

            {/* Reading details & large visual */}
            <div className="text-left mt-4">
              <div className="flex gap-1.5 items-center text-[10px] text-gray-600 uppercase tracking-widest font-mono">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>Latitude 6.49°N • Longitude 2.62°E</span>
              </div>

              {/* Large Temperature Display */}
              <div className="flex items-center gap-5 mt-4" id="weather-main-climate-stats">
                <div className={`w-16 h-16 rounded-full bg-gold-400/5 border border-gold-500/20 flex items-center justify-center shrink-0 ${weatherMeta.color}`}>
                  <CurrentIcon className="w-9 h-9 animate-pulse" />
                </div>
                
                <div className="text-left">
                  <div className="flex items-start">
                    <span className="font-serif text-5xl sm:text-6xl font-light text-gray-900 tracking-tighter transition-all">
                      {convertTemp(currentWeather.temperatureC)}
                    </span>
                    <span className="text-gold-400 font-serif text-2xl font-bold mt-1 ml-0.5 select-none">
                      °{temperatureUnit}
                    </span>
                  </div>
                  <span className={`text-xs block mt-1 tracking-wider uppercase font-semibold ${weatherMeta.color}`}>
                    {language === 'fr' ? weatherMeta.textFR : weatherMeta.textEN}
                  </span>
                </div>
              </div>

              {/* Secondary sensor grid readings */}
              <div className="grid grid-cols-3 gap-2.5 mt-8 pt-6 border-t border-white/5" id="weather-secondary-readings-row">
                <div className="bg-white border border-white/5 p-2.5 rounded text-left">
                  <span className="text-[8px] text-gray-500 uppercase tracking-wider block">{language === 'fr' ? "Ressenti" : "Apparent"}</span>
                  <div className="flex items-center gap-1 mt-1 text-gray-900 font-mono text-xs font-semibold">
                    <Thermometer className="w-3.5 h-3.5 text-gold-400" />
                    <span>{convertTemp(currentWeather.feelsLikeC)}°{temperatureUnit}</span>
                  </div>
                </div>

                <div className="bg-white border border-white/5 p-2.5 rounded text-left">
                  <span className="text-[8px] text-gray-500 uppercase tracking-wider block">{language === 'fr' ? "Humidité" : "Humidity"}</span>
                  <div className="flex items-center gap-1 mt-1 text-gray-900 font-mono text-xs font-semibold">
                    <Droplets className="w-3.5 h-3.5 text-gold-400" />
                    <span>{currentWeather.humidity}%</span>
                  </div>
                </div>

                <div className="bg-white border border-white/5 p-2.5 rounded text-left">
                  <span className="text-[8px] text-gray-500 uppercase tracking-wider block">{language === 'fr' ? "Vents" : "Wind Speed"}</span>
                  <div className="flex items-center gap-1 mt-1 text-gray-900 font-mono text-xs font-semibold">
                    <Wind className="w-3.5 h-3.5 text-gold-400" />
                    <span>{currentWeather.windSpeed} km/h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sync trigger button */}
            <div className="mt-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-500">
              <span className="font-mono">
                {language === 'fr' ? "Base de données synchronisée il y a: " : "Telemetry updated: "}
                {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>

              <button
                onClick={fetchWeather}
                disabled={isLoading}
                className="flex items-center gap-1 text-gold-400 font-bold uppercase tracking-widest hover:text-gold-300 transition cursor-pointer select-none disabled:opacity-40"
                id="weather-force-sync-btn"
              >
                <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{language === 'fr' ? "Mettre à jour" : "Sync Now"}</span>
              </button>
            </div>

          </div>

          {/* Panel 2: Dynamic Excursion Recommendation card (span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6" id="weather-recommendation-block">
            
            {/* Top Excursion Planner Box */}
            <div className="bg-gradient-to-r from-[#070c1e] to-[#0a112c] border border-gold-400/15 p-6 sm:p-8 rounded-lg text-left flex-grow relative overflow-hidden" id="weather-excursion-advice">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/[0.015] rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                  <Compass className="w-4.5 h-4.5 text-gold-400 animate-spin-slow" />
                </div>
                <div>
                  <span className="text-[8px] tracking-[0.2em] text-gold-400 font-bold uppercase block">
                    {language === 'fr' ? "PLANIFICATEUR INDIGÈNE D'EXCURSIONS" : "LOCAL HERITAGE COMPASS"}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-gray-900 uppercase tracking-wider">
                    {language === 'fr' ? advisory.titleFR : advisory.titleEN}
                  </h4>
                </div>
              </div>

              <p className="text-xs text-gray-800 font-light leading-relaxed mb-6 bg-[#FAFAFA]/40 p-4 rounded border border-gold-500/5">
                {language === 'fr' ? advisory.adviceFR : advisory.adviceEN}
              </p>

              {/* Recommended Activities Quick Badge Array */}
              <div className="flex flex-wrap gap-2 text-[9px] font-semibold text-gold-400 uppercase tracking-widest">
                <span className="px-2.5 py-1 rounded bg-gold-400/5 border border-gold-500/15">
                  🕌 Musée Honmè
                </span>
                <span className="px-2.5 py-1 rounded bg-gold-400/5 border border-gold-500/15">
                  ⛵ Balade en Pirogue Royale
                </span>
                <span className="px-2.5 py-1 rounded bg-gold-400/5 border border-gold-500/15">
                  ☕ Salon Privé L'Art de Vivre
                </span>
              </div>
            </div>

            {/* Bottom 3-Day Forecast Strip */}
            <div className="bg-white border border-white/5 p-4 rounded-lg text-left" id="weather-mini-forecast">
              <h5 className="font-serif text-[10px] font-bold text-gold-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold-400" />
                {language === 'fr' ? "Perspectives Climatologiques (3 Jours)" : "3-Day Local Atmospheric Outlook"}
              </h5>

              <div className="grid grid-cols-3 gap-3" id="weather-forecast-grid">
                {forecasts.map((fc, i) => {
                  const fcMeta = getWeatherDetails(fc.weatherCode);
                  const FcIcon = fcMeta.icon;

                  return (
                    <div 
                      key={i} 
                      className="p-3 bg-white border border-gold-500/5 hover:border-gold-500/15 transition rounded flex flex-col items-center text-center gap-1"
                      id={`forecast-day-card-${i}`}
                    >
                      <span className="text-[10px] text-gray-600 font-medium block">
                        {fc.date}
                      </span>
                      
                      <FcIcon className={`w-6 h-6 my-1 ${fcMeta.color}`} />
                      
                      <span className="text-[9px] text-gray-500 uppercase block truncate max-w-full text-center">
                        {language === 'fr' ? fcMeta.textFR.split(' ')[0] : fcMeta.textEN.split(' ')[0]}
                      </span>

                      <div className="font-mono text-[10px] font-semibold text-gray-900 mt-1">
                        <span>{convertTemp(fc.tempMaxC)}°</span>
                        <span className="text-gray-500 font-light mx-0.5">/</span>
                        <span className="text-slate-400 font-light">{convertTemp(fc.tempMinC)}°</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Soft interactive note */}
        <div className="mt-8 text-center text-[10px] text-gray-500 font-light flex items-center justify-center gap-1.5" id="weather-footer-credentials">
          <Info className="w-3.5 h-3.5 text-gold-500" />
          <span>
            {language === 'fr' 
              ? "Données de télémétrie fournies par l'Office Météorique de Cotonou-Porto-Novo pour l'Hermitage." 
              : "Meteorological credentials real-time tracked for our hotel guests by Open-Meteo."}
          </span>
          {fetchError && (
            <span className="text-amber-500 font-bold ml-2">
              ({language === 'fr' ? "Mode Climat Statique Actif" : "Static Benin Climate Mode Active"})
            </span>
          )}
        </div>

      </div>
    </section>
  );
}
