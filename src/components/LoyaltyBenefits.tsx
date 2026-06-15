import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Crown, 
  Gem, 
  Award, 
  Sparkles, 
  Compass, 
  Gift, 
  ShieldCheck, 
  CheckCircle2, 
  Plus, 
  Calendar,
  Zap,
  ArrowRight
} from 'lucide-react';

interface LoyaltyTier {
  id: string;
  nameFR: string;
  nameEN: string;
  badgeFR: string;
  badgeEN: string;
  requirementsFR: string;
  requirementsEN: string;
  textColor: string;
  borderColor: string;
  bgGlow: string;
  icon: any;
  benefitsFR: { title: string; desc: string; icon: any }[];
  benefitsEN: { title: string; desc: string; icon: any }[];
}

const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    id: "ivory",
    nameFR: "Cercle Ivoire",
    nameEN: "Ivory Circle",
    badgeFR: "Accès Privilégié",
    badgeEN: "Preferred Access",
    requirementsFR: "Dès la première nuitée",
    requirementsEN: "Upon first registry night",
    textColor: "text-slate-300",
    borderColor: "border-slate-500/20",
    bgGlow: "from-slate-500/5 to-slate-400/[0.02]",
    icon: Compass,
    benefitsFR: [
      { title: "Verre d'accueil d'Exception", desc: "Sodabi de garde ou nectar de bienvenue infusé servi au salon d'or.", icon: Sparkles },
      { title: "Fibre Internet Diplomatique", desc: "Accès prioritaire très haut débit illimité dans tout l'établissement.", icon: Zap },
      { title: "Presse Numérique de Prestige", desc: "Acceso gratuit à plus de 200 revues et journaux internationaux.", icon: Gift }
    ],
    benefitsEN: [
      { title: "Exquisite Welcome Cocktail", desc: "Crafted traditional welcome elixir or custom mocktail on the golden parlor.", icon: Sparkles },
      { title: "Diplomatic High-Speed Line", desc: "Top priority full-speed fiber connectivity anywhere within our premises.", icon: Zap },
      { title: "Prestige Digital Library", desc: "Complimentary elite access to international newspapers and cultural journals.", icon: Gift }
    ]
  },
  {
    id: "bronze",
    nameFR: "Bronze Royal",
    nameEN: "Royal Bronze",
    badgeFR: "Distinction Améliorée",
    badgeEN: "Enhanced Distinction",
    requirementsFR: "Dès 10 nuitées par an",
    requirementsEN: "From 10 nights per annum",
    textColor: "text-amber-600",
    borderColor: "border-amber-700/20",
    bgGlow: "from-amber-700/5 to-amber-600/[0.02]",
    icon: Award,
    benefitsFR: [
      { title: "Surclassement Préférentiel", desc: "Surclassement systématique en Suite supérieure selon les disponibilités.", icon: Plus },
      { title: "Arrivée Anticipée de Courtoisie", desc: "Enregistrement hâtif dès 11h00 sans frais supplémentaires.", icon: Calendar },
      { title: "Prestation Bien-être", desc: "Réduction exclusive de 15% sur tous les rituels et soins de notre complexe.", icon: Sparkles }
    ],
    benefitsEN: [
      { title: "Preferred Upgrades", desc: "Systematic upgrade to superior suites and rooms, subject to availability.", icon: Plus },
      { title: "Courtesy Check-In", desc: "Early check-in from 11:00 AM completely free of charges.", icon: Calendar },
      { title: "Wellness Invitation", desc: "15% exclusive allowance on all relaxing body rituals and spa therapies.", icon: Sparkles }
    ]
  },
  {
    id: "celeste",
    nameFR: "Or Céleste",
    nameEN: "Celestial Gold",
    badgeFR: "Prestige Supérieur",
    badgeEN: "Superior Prestige",
    requirementsFR: "Dès 30 nuitées ou par cooptation",
    requirementsEN: "From 30 nights or by custom co-optation",
    textColor: "text-gold-400",
    borderColor: "border-gold-500/30",
    bgGlow: "from-gold-600/[0.07] to-gold-500/[0.02]",
    icon: Crown,
    benefitsFR: [
      { title: "Majordome Dédié H24", desc: "Un intendant à votre entière disposition pour vos moindres désirs.", icon: ShieldCheck },
      { title: "Départ Tardif jusqu'à 16h00", desc: "Conservez vos quartiers d'or plus longtemps selon vos contraintes.", icon: Calendar },
      { title: "Coupe de Fruits & Krug", desc: "Une bouteille de champagne Krug fraîchement sabrée installée en suite.", icon: Gift }
    ],
    benefitsEN: [
      { title: "24/7 Personal Butler Carey", desc: "An esteemed valet fully committed to curate every stage of your comfort.", icon: ShieldCheck },
      { title: "Extended Late Departure", desc: "Keep holding your gold suite keys until 4:00 PM for absolute ease.", icon: Calendar },
      { title: "Krug Welcome & Fruits Basket", desc: "Chilled vintage Krug Champagne paired with organic tropical fruits.", icon: Gift }
    ]
  },
  {
    id: "imperial",
    nameFR: "Diamant Impérial",
    nameEN: "Imperial Diamond",
    badgeFR: "Pinnacle Diplomatique",
    badgeEN: "Diplomatic Summit",
    requirementsFR: "Sur Invitation Souveraine",
    requirementsEN: "By Sovereign Invitation Only",
    textColor: "text-cyan-400",
    borderColor: "border-cyan-500/35",
    bgGlow: "from-[#0e3b48]/15 to-cyan-500/[0.02]",
    icon: Gem,
    benefitsFR: [
      { title: "Héliport & Navette Limousine", desc: "Transferts aéroportuaires souverains ou transferts par hélicoptères privés.", icon: Crown },
      { title: "Accès Salon Diplomatique", desc: "Accès accéléré et salon VIP à l'Aéroport de Cotonou-Cadjehoun.", icon: ShieldCheck },
      { title: "Chef Kofi de Table Privée", desc: "Dîner privé annuel d'exception concocté en alcôve par notre Maître Chef.", icon: Sparkles }
    ],
    benefitsEN: [
      { title: "Heliport & Private Limousine", desc: "Complimentary airport limousine fleet or rooftop helicopter transfer.", icon: Crown },
      { title: "Diplomatic Salon Privilege", desc: "Fast-track border checks and private VIP salon at COO Airport.", icon: ShieldCheck },
      { title: "Chef Kofi Private Feast", desc: "Exclusive annual custom tasting menu designed inside your private suite.", icon: Sparkles }
    ]
  }
];

export default function LoyaltyBenefits() {
  const { language } = useLanguage();
  const [activeTierId, setActiveTierId] = useState<string>("celeste");
  
  // Quick Application Form State
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [submittingForm, setSubmittingForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const selectedTier = LOYALTY_TIERS.find(t => t.id === activeTierId) || LOYALTY_TIERS[2];

  const handleEnrollForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) return;

    setSubmittingForm(true);
    setTimeout(() => {
      setSubmittingForm(false);
      setFormSubmitted(true);
    }, 1200);
  };

  const resetFormStatus = () => {
    setApplicantName("");
    setApplicantEmail("");
    setFormSubmitted(false);
  };

  return (
    <section 
      className="py-24 bg-[#FAFAFA] border-t border-gold-500/10 relative overflow-hidden" 
      id="loyalty-benefits-section"
    >
      {/* Decorative luxury radial background spotlights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.04),transparent_50%)] pointer-events-none" />
      <div className="absolute -left-48 bottom-0 w-[500px] h-[500px] rounded-full bg-gold-400/[0.015] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16" id="loyalty-header">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.4em] text-gold-400 uppercase block mb-3">
            {language === 'fr' ? "Cercle des Initiés de l'Hermitage" : "The Sovereign Loyalty Circle"}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-gray-900 uppercase">
            {language === 'fr' ? "Privilèges & Tiers Impériaux" : "Exclusive Loyalty Tiers"}
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
          <p className="max-w-2xl mx-auto text-gray-600 text-xs sm:text-sm font-light mt-4 leading-relaxed">
            {language === 'fr' 
              ? "Rejoignez le cercle d'élite de la Tour Eiffel Hôpital. Bénéficiez d'une considération protocolaire d'ambassade et d'expériences conçues sur-mesure pour magnifier chaque seconde de votre résidence."
              : "Command your rightful place in our distinguished hierarchy. Relish bespoke butler assistance, swift diplomatic transitions, and artistic creations custom-sculpted for our lifetime guests."}
          </p>
        </div>

        {/* Core Layout Grid: Left Tiers, Right Benefits Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16" id="loyalty-tiers-dashboard">
          
          {/* Left Column: Tiers Selection Blocks */}
          <div className="lg:col-span-5 flex flex-col gap-4" id="tiers-list-selector">
            <h3 className="text-xs font-bold tracking-widest text-gold-400 uppercase mb-2 text-left pl-1">
              {language === 'fr' ? "LES QUATRE ORDRES DE PRESTIGE" : "THE FOUR DEGREES OF PRESTIGE"}
            </h3>

            {LOYALTY_TIERS.map((tier) => {
              const TierIcon = tier.icon;
              const isActive = tier.id === activeTierId;
              const isCelestial = tier.id === 'celeste';
              const isImperial = tier.id === 'imperial';

              let titleCol = tier.textColor;
              if (isActive) titleCol = "text-gray-900";

              return (
                <button
                  key={tier.id}
                  onClick={() => {
                    setActiveTierId(tier.id);
                    setFormSubmitted(false);
                  }}
                  className={`w-full text-left p-5 rounded-lg border backdrop-blur-sm transition-all duration-300 flex items-center justify-between group cursor-pointer relative overflow-hidden ${
                    isActive 
                      ? `border-gold-400/50 bg-gradient-to-r ${tier.bgGlow} shadow-md shadow-gold-500/[0.04]` 
                      : 'border-gold-500/5 bg-white/80 hover:border-gold-400/25 hover:bg-gray-50'
                  }`}
                  id={`tier-trigger-${tier.id}`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-gold-500/15 border-gold-400 text-gold-400' 
                        : 'bg-white/5 border-white/10 text-gray-500 group-hover:text-gold-400 group-hover:border-gold-500/20'
                    }`}>
                      <TierIcon className="w-5 h-5" />
                    </div>

                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className={`font-serif text-base font-semibold ${titleCol} transition-colors`}>
                          {language === 'fr' ? tier.nameFR : tier.nameEN}
                        </span>
                        
                        {(isCelestial || isImperial) && (
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                        )}
                      </div>
                      <span className="text-[10px] text-gray-600 block mt-0.5">
                        {language === 'fr' ? tier.requirementsFR : tier.requirementsEN}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end pr-1 relative z-10">
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                      isActive 
                        ? 'bg-gold-400/10 border-gold-400 text-gold-300' 
                        : 'bg-white/5 border-white/5 text-gray-500 group-hover:text-gray-800 group-hover:border-white/10'
                    }`}>
                      {language === 'fr' ? tier.badgeFR : tier.badgeEN}
                    </span>
                  </div>

                  {/* Active highlight side line */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold-300 to-gold-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Presentation on Frame */}
          <div className="lg:col-span-7" id="tier-details-presenter">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTier.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="bg-white/95 shadow-xl border border-gold-400/15 p-6 sm:p-10 rounded-lg min-h-[460px] flex flex-col justify-between relative backdrop-blur-md"
                id={`presenter-card-${selectedTier.id}`}
              >
                {/* Background decorative corner ribbon */}
                <div className="absolute top-0 right-0 p-4 font-mono text-[9px] tracking-widest text-gold-500/40 select-none">
                  ROYAL PROTOCOL // {selectedTier.id.toUpperCase()}
                </div>

                {/* Main presentation header block */}
                <div className="text-left" id="presenter-header">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                      <selectedTier.icon className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                      <span className="text-[10px] tracking-widest text-gold-400 uppercase font-medium">
                        {language === 'fr' ? selectedTier.badgeFR : selectedTier.badgeEN}
                      </span>
                      <h4 className="font-serif text-2xl font-bold text-gray-900 uppercase tracking-wider">
                        {language === 'fr' ? selectedTier.nameFR : selectedTier.nameEN}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 font-light italic leading-relaxed border-b border-white/5 pb-4 mb-6">
                    {language === 'fr' 
                      ? `Statut honorifique : ${selectedTier.requirementsFR.toLowerCase()}. Accès continu aux privilèges ci-dessous.`
                      : `Honorary clearance status: ${selectedTier.requirementsEN.toLowerCase()}. Regular privileges structured below.`}
                  </p>

                  {/* Benefits items list rendering */}
                  <div className="space-y-6" id="presenter-benefits-list">
                    {(language === 'fr' ? selectedTier.benefitsFR : selectedTier.benefitsEN).map((benefit, bIdx) => {
                      const BenefitIcon = benefit.icon;
                      return (
                        <div key={bIdx} className="flex gap-4 items-start" id={`benefit-item-${bIdx}`}>
                          <div className="w-8 h-8 rounded-lg bg-gold-400/10 border border-gold-400/25 flex items-center justify-center shrink-0 mt-0.5 text-gold-400">
                            <BenefitIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
                              {benefit.title}
                            </h5>
                            <p className="text-xs text-gray-600 font-light mt-1 leading-relaxed">
                              {benefit.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Small luxury disclaimer or notice */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px]">
                  <div className="flex items-center gap-2 text-gray-600 text-left">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      {language === 'fr' 
                        ? "Prestations permanentes et cumulables sur l'ensemble du séjour." 
                        : "Perpetual benefits cumulative during every presidential séjour."}
                    </span>
                  </div>
                  <a 
                    href={`https://wa.me/22955123456?text=Bonjour%20Concierge%20Tour%20Eiffel%20B%C3%A9nin.%20Je%20souhaite%20m%27enqu%C3%A9ter%20sur%20le%20statut%20${selectedTier.nameFR}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-400 font-bold uppercase tracking-wider hover:text-gold-300 transition duration-300 cursor-pointer text-right flex items-center gap-1 shrink-0"
                  >
                    <span>{language === 'fr' ? "Détails Secrétariat" : "Inquire Secretary"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Interactive Registration Callout Card */}
        <div id="loyalty-enrollment-card" className="max-w-4xl mx-auto bg-gradient-to-r from-white via-[#FAFAFA] to-white shadow-xl border border-gold-500/15 p-6 sm:p-10 rounded-lg relative overflow-hidden text-center z-10">
          
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold-400/[0.02] rounded-full blur-xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-400/[0.03] rounded-full blur-2xl pointer-events-none" />

          {/* Luxury Crown Accent Icon */}
          <div className="w-12 h-12 bg-gold-500/10 border border-gold-400/30 rounded-full flex items-center justify-center text-gold-400 mx-auto mb-6">
            <Crown className="w-5 h-5 text-gold-400 animate-pulse" />
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-gray-900 uppercase tracking-wider mb-2">
            {language === 'fr' ? "Demande de Clé Privée Royale" : "Request Gilded Club Access"}
          </h3>
          <p className="max-w-lg mx-auto text-[11px] sm:text-xs text-gray-600 font-light leading-relaxed mb-8">
            {language === 'fr' 
              ? "Confiez vos coordonnées à notre officier de protocole pour initier l'analyse de vos nuitées admissibles et accéder immédiatement au statut de distinction Ivoire."
              : "Register below to secure Ivory Circle membership. An administrative officer will review any past registries to immediately activate your sovereign benefits."}
          </p>

          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.form 
                key="enroll-form"
                onSubmit={handleEnrollForm}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-center p-1"
                id="loyalty-registration-form"
              >
                <div className="w-full flex flex-col sm:flex-row gap-3">
                  <div className="relative w-full text-left">
                    <input 
                      type="text" 
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder={language === 'fr' ? "Nom Complet d'Honneur" : "Preferred Full Name"}
                      className="w-full bg-[#FAFAFA]/90 border border-gold-500/20 text-xs text-gray-900 placeholder-gray-500 px-4 py-3 rounded focus:outline-none focus:border-gold-400 transition"
                      id="loyalty-input-name"
                    />
                  </div>
                  
                  <div className="relative w-full text-left">
                    <input 
                      type="email" 
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder={language === 'fr' ? "Adresse Électronique de Contact" : "Secure Email Address"}
                      className="w-full bg-[#FAFAFA]/90 border border-gold-500/20 text-xs text-gray-900 placeholder-gray-500 px-4 py-3 rounded focus:outline-none focus:border-gold-400 transition"
                      id="loyalty-input-email"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submittingForm}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 text-gray-900 font-bold uppercase text-[10px] tracking-widest rounded whitespace-nowrap active:scale-95 transition-all cursor-pointer shadow-lg shadow-gold-500/10 hover:from-gold-200 hover:to-gold-400 disabled:opacity-40"
                  id="loyalty-form-submit-btn"
                >
                  {submittingForm 
                    ? (language === 'fr' ? "Vérification..." : "Verifying...") 
                    : (language === 'fr' ? "Rejoindre le Cercle" : "Join the Circle")}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="enroll-success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="p-5 bg-gold-400/5 border border-gold-400/20 rounded inline-block max-w-lg mx-auto text-center"
                id="loyalty-enroll-success"
              >
                <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">
                  {language === 'fr' ? "Adhésion Enregistrée" : "Privilege Application Lodged"}
                </h4>
                <p className="text-[11px] text-gray-800 font-light leading-relaxed mb-4">
                  {language === 'fr' 
                    ? `Félicitations, ${applicantName}. Votre demande de Clé d'Ivoire a été logée avec succès. Notre Secrétaire Général vous transmettra votre carte digitale sécurisée sous 24h.`
                    : `Salutations, ${applicantName}. Your Ivory keys allocation has been assigned to queue. A digital privilege passport card will be issued to your secure email shorty.`}
                </p>
                <button
                  onClick={resetFormStatus}
                  className="text-[9px] font-bold text-gold-400 uppercase tracking-widest border-b border-gold-500/20 hover:border-gold-400 transition"
                  id="enroll-reset-btn"
                >
                  {language === 'fr' ? "Saisir une autre demande" : "Submit another request"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
