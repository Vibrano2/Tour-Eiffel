import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coins, 
  RefreshCw, 
  ArrowLeftRight, 
  HelpCircle, 
  TrendingUp, 
  DollarSign, 
  Euro, 
  ChevronRight, 
  X,
  CreditCard,
  Building,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface ExchangeRates {
  [key: string]: number;
}

const DEFAULT_RATES: ExchangeRates = {
  XOF: 1,
  USD: 0.00165, // 1 FCFA ≈ 0.00165 USD
  EUR: 0.00152, // 1 FCFA ≈ 0.00152 EUR (Fixed pegs approximate: 655.957 FCFA = 1 EUR)
  GBP: 0.00130, // 1 FCFA ≈ 0.00130 GBP
  NGN: 2.45,   // 1 FCFA ≈ 2.45 NGN
  CAD: 0.00225, // 1 FCFA ≈ 0.00225 CAD
};

const CURRENCY_LABELS: Record<string, { symbol: string; nameFR: string; nameEN: string }> = {
  XOF: { symbol: "CFA", nameFR: "Franc CFA (Bénin)", nameEN: "CFA Franc (Benin)" },
  USD: { symbol: "$", nameFR: "Dollar Américain", nameEN: "US Dollar" },
  EUR: { symbol: "€", nameFR: "Euro Européen", nameEN: "Euro" },
  GBP: { symbol: "£", nameFR: "Livre Sterling", nameEN: "British Pound" },
  NGN: { symbol: "₦", nameFR: "Naira Nigérian", nameEN: "Nigerian Naira" },
  CAD: { symbol: "C$", nameFR: "Dollar Canadien", nameEN: "Canadian Dollar" },
};

export default function CurrencyConverter() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rates, setRates] = useState<ExchangeRates>(DEFAULT_RATES);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastFetched, setLastFetched] = useState<Date>(new Date());
  
  // Custom calculator state
  const [inputAmount, setInputAmount] = useState<string>("120000"); // Default room price
  const [fromCurrency, setFromCurrency] = useState<string>("XOF");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [conversionResult, setConversionResult] = useState<number | null>(null);

  // Sync state with global pricing events
  const [selectedGlobalCurrency, setSelectedGlobalCurrency] = useState<string>(() => {
    return localStorage.getItem('tour-eiffel-currency') || 'XOF';
  });

  const fetchExchangeRates = async () => {
    setLoading(true);
    try {
      // Fetch latest rates relative to XOF
      const res = await fetch('https://open.er-api.com/v6/latest/XOF');
      if (!res.ok) throw new Error("Could not download rates");
      const data = await res.json();
      
      if (data && data.rates) {
        const matchedRates: ExchangeRates = {};
        Object.keys(DEFAULT_RATES).forEach(cur => {
          if (data.rates[cur] !== undefined) {
            matchedRates[cur] = data.rates[cur];
          } else {
            matchedRates[cur] = DEFAULT_RATES[cur];
          }
        });
        
        // Ensure accurate euro-peg parity
        matchedRates['XOF'] = 1;
        // In case API fails to return EUR, keep exact peg
        if (!matchedRates['EUR']) {
          matchedRates['EUR'] = 1 / 655.957;
        }

        setRates(matchedRates);
        setLastFetched(new Date());
      }
    } catch (err) {
      console.warn("Using luxurious fixed West-African gold pegs due to secure sandbox restrictor:", err);
      // Keep state at high fidelity static pegs
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  // Recalculate converter values
  useEffect(() => {
    const amt = parseFloat(inputAmount);
    if (isNaN(amt) || amt <= 0) {
      setConversionResult(null);
      return;
    }

    // Convert fromCurrency to base XOF first, then to toCurrency
    const amountInBase = amt / rates[fromCurrency];
    const targetAmount = amountInBase * rates[toCurrency];
    setConversionResult(targetAmount);
  }, [inputAmount, fromCurrency, toCurrency, rates]);

  // Handle setting a preferred hotel display currency globally
  const handleGlobalCurrencyChange = (cur: string) => {
    setSelectedGlobalCurrency(cur);
    localStorage.setItem('tour-eiffel-currency', cur);
    // Dispatch custom window event to notify other sections
    const event = new CustomEvent('tourEiffelCurrencyChanged', { detail: { currency: cur, rates } });
    window.dispatchEvent(event);
  };

  const formattedValue = (amtFCFA: number, curCode: string) => {
    const rate = rates[curCode] || DEFAULT_RATES[curCode];
    const converted = amtFCFA * rate;
    const meta = CURRENCY_LABELS[curCode];
    
    if (curCode === 'XOF') {
      return amtFCFA.toLocaleString() + " FCFA";
    }
    
    return `${meta.symbol} ${converted.toLocaleString(undefined, { maximumFractionDigits: curCode === 'USD' || curCode === 'EUR' || curCode === 'GBP' || curCode === 'CAD' ? 2 : 0 })}`;
  };

  return (
    <>
      {/* Floating Gilded Sovereign Treasury Tag */}
      <div className="fixed bottom-6 left-6 z-40" id="currency-floating-trigger">
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#061026] hover:bg-[#0b1b3e] text-gold-400 border border-gold-400/30 shadow-2xl transition-all duration-300 font-sans cursor-pointer group active:scale-95"
          id="currency-trigger-button"
        >
          <Coins className="w-5 h-5 text-gold-400 animate-pulse group-hover:rotate-12 transition-transform" />
          <span className="text-[10px] tracking-[0.2em] font-bold uppercase hidden md:inline">
            {language === 'fr' ? "Bureau de Change" : "Currency Desk"}
          </span>
          <span className="text-[9px] bg-gold-400/10 text-gold-300 px-2 py-0.5 rounded-full border border-gold-400/20 font-mono">
            {selectedGlobalCurrency}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-20 left-6 z-50 w-[350px] sm:w-[410px] bg-[#060a1d]/98 border border-gold-400/30 rounded-lg shadow-2xl overflow-hidden text-left"
            id="currency-converter-panel"
          >
            {/* Master Header */}
            <div className="bg-gradient-to-r from-[#FAFAFA] to-[#070b1f] px-5 py-4 border-b border-gold-500/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-gold-400" />
                <div>
                  <span className="text-[8px] tracking-[0.3em] font-bold uppercase text-gold-400 block">
                    {language === 'fr' ? "Trésorerie Impériale" : "Sovereign Treasury Desk"}
                  </span>
                  <h3 className="font-serif text-sm font-bold text-gray-900 uppercase tracking-wider">
                    {language === 'fr' ? "Parité & Devises" : "Exchange Rates"}
                  </h3>
                </div>
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-white/5 border border-white/5 flex items-center justify-center text-gray-600 hover:text-gray-900 cursor-pointer active:scale-90"
                id="currency-close-panel-btn"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Inner Dashboard */}
            <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              
              {/* Feature 1: Global Site Currency Preference config */}
              <div className="space-y-2 bg-[#FAFAFA]/60 p-3.5 rounded border border-gold-500/5">
                <span className="text-[9px] font-bold tracking-widest text-gold-400 uppercase block">
                  {language === 'fr' ? "Devise d'Affichage du Site" : "Preferred Site Currency"}
                </span>
                <p className="text-[10px] text-gray-600 font-light leading-snug">
                  {language === 'fr' 
                    ? "Sélectionnez votre devise pour convertir à la volée les prix de nos chambres et menus." 
                    : "Translate all lodging, dining, and event estimates into your local currency."}
                </p>
                
                {/* Rapid Currency Badges */}
                <div className="grid grid-cols-3 gap-1.5 mt-3">
                  {Object.keys(CURRENCY_LABELS).map((cur) => {
                    const isSelected = selectedGlobalCurrency === cur;
                    return (
                      <button
                        key={cur}
                        onClick={() => handleGlobalCurrencyChange(cur)}
                        className={`px-3 py-1.5 rounded text-[10px] font-bold tracking-widest text-center border cursor-pointer transition-all duration-200 ${
                          isSelected 
                            ? 'bg-gradient-to-r from-gold-300 to-gold-500 text-gray-900 border-gold-400 hover:brightness-110 font-bold'
                            : 'bg-white/[0.02] text-gray-800 border-white/5 hover:bg-white/5 hover:text-gray-900'
                        }`}
                        id={`global-curr-btn-${cur}`}
                      >
                        {cur} ({CURRENCY_LABELS[cur].symbol})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feature 2: The Real-time Interactive Calculator desk */}
              <div className="space-y-3">
                <span className="text-[9px] font-bold tracking-widest text-gold-400 uppercase block">
                  {language === 'fr' ? "Calculateur de Conversion" : "Instant Exchange Calculator"}
                </span>

                <div className="grid grid-cols-12 gap-2 items-center">
                  
                  {/* Left: Input Amount */}
                  <div className="col-span-6">
                    <label className="text-[8px] text-gray-500 uppercase tracking-widest block mb-1">
                      {language === 'fr' ? "Montant" : "Amount"}
                    </label>
                    <input 
                      type="number" 
                      value={inputAmount}
                      onChange={(e) => setInputAmount(e.target.value)}
                      className="w-full bg-[#030612] border border-white/10 rounded px-2.5 py-1.5 text-xs text-gray-900 font-mono focus:border-gold-400 focus:outline-none"
                      placeholder="e.g. 150000"
                    />
                  </div>

                  {/* Middle: From selector */}
                  <div className="col-span-3">
                    <label className="text-[8px] text-gray-500 uppercase tracking-widest block mb-1">
                      {language === 'fr' ? "De" : "From"}
                    </label>
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="w-full bg-[#030612] border border-white/10 rounded px-1.5 py-1.5 text-[10px] text-gray-900 focus:border-gold-400 focus:outline-none"
                    >
                      {Object.keys(rates).map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Right: To selector */}
                  <div className="col-span-3">
                    <label className="text-[8px] text-gray-500 uppercase tracking-widest block mb-1">
                      {language === 'fr' ? "Vers" : "To"}
                    </label>
                    <select
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="w-full bg-[#030612] border border-white/10 rounded px-1.5 py-1.5 text-[10px] text-gray-900 focus:border-gold-400 focus:outline-none"
                    >
                      {Object.keys(rates).map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Calculation Result strip */}
                {conversionResult !== null && (
                  <div className="p-3 rounded bg-gold-400/5 border border-gold-400/10 flex items-center justify-between" id="converter-result-box">
                    <div className="flex items-center gap-1.5">
                      <ArrowLeftRight className="w-3.5 h-3.5 text-gold-400" />
                      <span className="text-[10px] text-slate-300 font-sans">
                        {parseFloat(inputAmount).toLocaleString()} {fromCurrency} =
                      </span>
                    </div>
                    <span className="text-[12px] font-mono font-bold text-gold-300">
                      {conversionResult.toLocaleString(undefined, { maximumFractionDigits: toCurrency === 'XOF' ? 0 : 2 })} {CURRENCY_LABELS[toCurrency].symbol}
                    </span>
                  </div>
                )}
              </div>

              {/* Feature 3: Standard Palace Estimates Summary Desk */}
              <div className="space-y-2.5 pt-4 border-t border-white/5">
                <span className="text-[9px] font-bold tracking-widest text-gold-400 uppercase block">
                  {language === 'fr' ? "Tarifs de Référence en Devises" : "Essential Palace Estimates"}
                </span>

                <div className="space-y-1.5 text-[10px]">
                  
                  {/* Ivory Standard row */}
                  <div className="flex justify-between items-center py-1 border-b border-white/[0.03]">
                    <span className="text-gray-600">{language === 'fr' ? "Chambre d'Ivoire (Standard)" : "Ivory Standard (Night)"}</span>
                    <span className="font-mono text-gray-900 font-semibold">
                      {formattedValue(120000, selectedGlobalCurrency)}
                    </span>
                  </div>

                  {/* Signature Suite row */}
                  <div className="flex justify-between items-center py-1 border-b border-white/[0.03]">
                    <span className="text-gray-600">{language === 'fr' ? "Suite Prestige (Signature)" : "Prestige Suite (Night)"}</span>
                    <span className="font-mono text-gray-900 font-semibold">
                      {formattedValue(260000, selectedGlobalCurrency)}
                    </span>
                  </div>

                  {/* Presidential Suite row */}
                  <div className="flex justify-between items-center py-1 border-b border-white/[0.03]">
                    <span className="text-gray-600">{language === 'fr' ? "Suite Présidentielle" : "Presidential Suite"}</span>
                    <span className="font-mono text-gold-300 font-bold">
                      {formattedValue(650000, selectedGlobalCurrency)}
                    </span>
                  </div>

                  {/* Gastronomic signature dish */}
                  <div className="flex justify-between items-center py-1 border-b border-white/[0.03]">
                    <span className="text-gray-600">{language === 'fr' ? "Menu d'Or (Chef Kofi)" : "Chef Kofi Gold Dish"}</span>
                    <span className="font-mono text-gray-900">
                      {formattedValue(32000, selectedGlobalCurrency)}
                    </span>
                  </div>

                  {/* Gala Seat Estimate */}
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600">{language === 'fr' ? "Siège Gala Prestige" : "Prestige Gala seat"}</span>
                    <span className="font-mono text-gray-900">
                      {formattedValue(150000, selectedGlobalCurrency)}
                    </span>
                  </div>

                </div>
              </div>

              {/* Status footer with Sync */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[8px] text-gray-500 font-mono">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5 text-emerald-400" />
                  {language === 'fr' ? "Taux mis à jour : " : "Synchronized: "}
                  {lastFetched.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                
                <button
                  onClick={fetchExchangeRates}
                  className="text-gold-400 hover:text-gold-300 uppercase tracking-wider flex items-center gap-0.5"
                >
                  <RefreshCw className={`w-2 h-2 ${loading ? 'animate-spin' : ''}`} />
                  {language === 'fr' ? "Force Sync" : "Sync"}
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
