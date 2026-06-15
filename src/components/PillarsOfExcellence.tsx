import { useLanguage } from '../LanguageContext';
import { Hotel, Utensils, GlassWater, Landmark, ArrowUpRight, ShieldCheck, Heart, Compass } from 'lucide-react';
import { ActiveTab } from '../types';
import { motion } from 'motion/react';

interface PillarsOfExcellenceProps {
  onNavigate: (tab: ActiveTab) => void;
}

export default function PillarsOfExcellence({ onNavigate }: PillarsOfExcellenceProps) {
  const { language, t } = useLanguage();

  const pillars = language === 'fr' 
    ? [
        {
          id: 'rooms' as ActiveTab,
          category: "Dortoirs Impériaux",
          title: "Chambres & Suites d'Artiste",
          desc: "Découvrez des sanctuaires alliant luxe intemporel de style français et œuvres contemporaines des plus grands artistes béninois.",
          image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=600",
          icon: Hotel,
          gridSpan: "md:col-span-2 md:row-span-1"
        },
        {
          id: 'restaurant' as ActiveTab,
          category: "Étoile Gastronomique",
          title: "L'Art de Vivre - Haute Cuisine",
          desc: "Goûtez aux créations signatures de haute gastronomie orchestrées par le Chef de renom Kofi D'Almeida.",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600",
          icon: Utensils,
          gridSpan: "md:col-span-1"
        },
        {
          id: 'restaurant' as ActiveTab,
          category: "Sodabi & Millésimes",
          title: "Sunset Bar & Cave d'Élite",
          desc: "Savourez des élixirs uniques à base de spiritueux locaux dorés et de grands crus français au bord de notre piscine suspendue.",
          image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=600",
          icon: GlassWater,
          gridSpan: "md:col-span-1"
        },
        {
          id: 'events' as ActiveTab,
          category: "Gala & Business",
          title: "Salons Historiques de Prestige",
          desc: "De notre majestueuse salle Concorde de 1200 places aux salons diplomatiques confidentiels.",
          image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600",
          icon: Landmark,
          gridSpan: "md:col-span-2"
        }
      ]
    : [
        {
          id: 'rooms' as ActiveTab,
          category: "Imperial Chambers",
          title: "Fine Art Suites & Rooms",
          desc: "Discover sanctuaries blending French classical elegance with contemporary curated masterworks by premier Beninese artists.",
          image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=600",
          icon: Hotel,
          gridSpan: "md:col-span-2 md:row-span-1"
        },
        {
          id: 'restaurant' as ActiveTab,
          category: "Gastronomic Star",
          title: "High Fine-Dining Cuisine",
          desc: "Taste the signature culinary creations masterfully sculpted by our renowned Executive Chef Kofi D'Almeida.",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600",
          icon: Utensils,
          gridSpan: "md:col-span-1"
        },
        {
          id: 'restaurant' as ActiveTab,
          category: "Aged Sodabi & Fine Vintages",
          title: "Sunset Bar & Gold Cellar",
          desc: "Savor exclusive double-aged local spirits paired with vintage French reserves beside our rooftop suspended pool.",
          image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=600",
          icon: GlassWater,
          gridSpan: "md:col-span-1"
        },
        {
          id: 'events' as ActiveTab,
          category: "Gala & Summits",
          title: "Prestigious Grand Lounges",
          desc: "From our celebrated Concorde grand ballroom seating up to 1200 guests to secure confidential VIP state rooms.",
          image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600",
          icon: Landmark,
          gridSpan: "md:col-span-2"
        }
      ];

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  const badgeContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  return (
    <section className="py-24 bg-[#FAFAFA] border-t border-gold-500/10 relative" id="pillars-section">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.35em] text-gold-400 uppercase block mb-3">
            {language === 'fr' ? "Piliers de l'Art de Vivre" : "Pillars of Art de Vivre"}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-gray-900 uppercase">
            {language === 'fr' ? "L'Excellence Sans Compromis" : "Uncompromising Standards"}
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6" 
          id="bento-pillars-grid"
        >
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={idx}
                onClick={() => onNavigate(p.id)}
                variants={itemVariants}
                className={`relative group overflow-hidden rounded bg-white border border-gold-500/15 hover:border-gold-400/40 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-gold-500/5 flex flex-col justify-end min-h-[300px] sm:min-h-[340px] ${p.gridSpan}`}
                id={`pillar-card-${idx}`}
              >
                
                {/* Background image zoom effect */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.3] contrast-[1.1] group-hover:brightness-[0.4]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-6 md:p-8 flex flex-col gap-4">
                  
                  {/* Category Header with Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.25em] font-bold text-gold-400 uppercase flex items-center gap-2">
                       <Icon className="w-4 h-4" />
                      {p.category}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400 group-hover:bg-gold-400 group-hover:text-gray-900 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Main Title & Description */}
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-gold-600 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-gray-800 text-xs sm:text-sm font-light leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </motion.div>

        {/* Quality Badges Row */}
        <motion.div 
          variants={badgeContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-gold-500/10 text-center" 
          id="quality-badges-container"
        >
          <motion.div variants={badgeVariants} className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border border-gold-500/20 bg-gold-500/5 flex items-center justify-center text-gold-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-base font-semibold text-gray-900">
              {language === 'fr' ? "Sécurité Privée de Premier Plan" : "Diplomatic Class Security"}
            </h4>
            <p className="text-gray-600 text-xs font-light max-w-xs">
              {language === 'fr' 
                ? "Double filtrage d'accès et conciergerie diplomatique pour votre parfaite sérénité."
                : "Multilayer credential access filters and diplomatic support for absolute peace of mind."}
            </p>
          </motion.div>

          <motion.div variants={badgeVariants} className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border border-gold-500/20 bg-gold-500/5 flex items-center justify-center text-gold-400">
              <Compass className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-base font-semibold text-gray-900">
              {language === 'fr' ? "Service Navette de Luxe" : "Elite Chauffeur & Heliport"}
            </h4>
            <p className="text-gray-600 text-xs font-light max-w-xs">
              {language === 'fr'
                ? "Chauffeur privé, transferts diplomatiques et héliport sur demande préalable."
                : "Private concierge chauffeurs, armored escorts and rooftop heliport upon arrangement."}
            </p>
          </motion.div>

          <motion.div variants={badgeVariants} className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border border-gold-500/20 bg-gold-500/5 flex items-center justify-center text-gold-400">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-base font-semibold text-gray-900">
              {language === 'fr' ? "Fidélité Millésime Club" : "Millésime Elite Loyalty"}
            </h4>
            <p className="text-gray-600 text-xs font-light max-w-xs">
              {language === 'fr'
                ? "Avantages exclusifs, surclassements royaux et invitations d'initiés aux galas."
                : "Sovereign room upgrades, custom amenities and private banquet invitations."}
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
