import React, { createContext, useContext, useState, useEffect } from 'react';
import { Room, MenuItem, EventHall, ActiveTab } from './types';

export type Language = 'fr' | 'en';

interface CarouselSlide {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  targetTab: ActiveTab;
}

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  hotelInfo: typeof HOTEL_INFO_FR;
  rooms: Room[];
  gastronomy: MenuItem[];
  halls: EventHall[];
  upcomingEvents: typeof UPCOMING_EVENTS_FR;
  carouselSlides: CarouselSlide[];
  seatingTables: typeof SEATING_TABLES_FR;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// --- Static Hotel General Info translations ---
const HOTEL_INFO_FR = {
  name: "Tour Eiffel Hôtel Bénin",
  city: "Porto-Novo",
  country: "Bénin",
  phone: "+229 55 12 34 56",
  email: "concierge@toureiffelhotel.bj",
  whatsappUrl: "https://wa.me/22955123456?text=Bonjour%20Tour%20Eiffel%20H%C3%B4tel%20B%C3%A9nin%2C%20je%20souhaite",
  address: "Boulevard de la Lagune, Quartier Résidentiel, Porto-Novo, Bénin"
};

const HOTEL_INFO_EN = {
  name: "Tour Eiffel Benin Hotel",
  city: "Porto-Novo",
  country: "Benin",
  phone: "+229 55 12 34 56",
  email: "concierge@toureiffelhotel.bj",
  whatsappUrl: "https://wa.me/22955123456?text=Hello%20Tour%20Eiffel%20Benin%20Hotel%2C%20I%20wish%20to",
  address: "Lagoon Boulevard, Residential Area, Porto-Novo, Benin"
};

// --- Rooms translation data ---
const ROOMS_FR: Room[] = [
  {
    id: "standard-ivoire",
    name: "Chambre Standard d'Ivoire",
    tagline: "Harmonie Épurée & Clarté Tropicale",
    pricePerNight: 120000,
    size: "38 m²",
    capacity: "2 Adultes",
    view: "Jardins Tropicaux & Piscine",
    bedType: "King Size Imperial",
    description: "Une oasis de sérénité revêtue d'ivoire et de bois précieux du Bénin. Alliant raffinement moderne français et textiles tissés locaux, cet espace offre un confort suprême avec un balcon privé donnant sur nos jardins luxuriants suspendus.",
    amenities: [
      "Climatisation Individuelle",
      "WiFi Ultra-Rapide (Fibre)",
      "Smart TV 55\" 4K",
      "Machine à Espresso & Thés Fins",
      "Douche à l'Italienne en Marbre",
      "Balcon Privé Aménagé",
      "Articles de Toilette Signés"
    ],
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "suite-prestige",
    name: "Suite Prestige Signature",
    tagline: "Vue Panoramique & Noblesse des Matières",
    pricePerNight: 260000,
    size: "72 m²",
    capacity: "2 Adultes + 1 Enfant",
    view: "Lagune de Porto-Novo & Ville",
    bedType: "Grand Lit Royal",
    description: "Conçue pour les esthètes les plus exigeants, cette suite dispose d'un espace salon séparé et d'une collection originale de peintures contemporaines d'artistes béninois de renommée internationale. Sa baignoire îlot en marbre offre une vue féerique sur la lagune scintillante.",
    amenities: [
      "Salon Royal Indépendant",
      "Baignoire Îlot Panoramique",
      "Dressing sur Mesure",
      "Acoustique d'Exception (JBL)",
      "Sélection de Vins & Spiritueux",
      "Accès VIP au Club Privé",
      "Service Ménager Bi-Quotidien"
    ],
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "suite-presidentielle",
    name: "Suite Présidentielle Tour Eiffel",
    tagline: "Le Sommet du Prestige Souverain",
    pricePerNight: 650000,
    size: "185 m²",
    capacity: "4 Adultes",
    view: "360° Lagune, Palais Royal & Ville",
    bedType: "Deux Lits King Absolu",
    description: "Chef-d'œuvre de luxe culturel et d'élégance architecturale française. Cette somptueuse suite présidentielle comprend deux chambres majestueuses, un grand salon d'apparat, une salle à manger privée, un jacuzzi extérieur chauffé sur terrasse panoramique exclusive et un majordome dévoué à votre écoute 24h/24.",
    amenities: [
      "Majordome Privé 24h/24",
      "Jacuzzi Privatif en Terrasse Est",
      "Entrée & Ascenseur Sécurisés",
      "Salle à Manger Privée (8 Invités)",
      "Cuisine Professionnelle Équipée",
      "Transferts Aéroport en Limousine",
      "Bar de Dégustation Prestige"
    ],
    imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800"
  }
];

const ROOMS_EN: Room[] = [
  {
    id: "standard-ivoire",
    name: "Ivory Standard Room",
    tagline: "Sleek Harmony & Tropical Radiance",
    pricePerNight: 120000,
    size: "38 m²",
    capacity: "2 Adults",
    view: "Tropical Gardens & Pool",
    bedType: "Imperial King Size",
    description: "A serene oasis furnished in ivory tones and precious Beninese hardwood. Coupling modern French luxury with signature hand-woven textiles, this room offers supreme comfort and an executive private terrace looking over lush gardens.",
    amenities: [
      "Individual Climate Control",
      "Ultra-Fast Fiber WiFi",
      "55\" Smart 4K TV",
      "Espresso Machine & Selected Fine Teas",
      "Italian Marble Shower",
      "Furnished Private Terrace",
      "Luxury Signature Toiletries"
    ],
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "suite-prestige",
    name: "Signature Prestige Suite",
    tagline: "Panoramic View & Fine Art Materials",
    pricePerNight: 260000,
    size: "72 m²",
    capacity: "2 Adults + 1 Child",
    view: "Porto-Novo Lagoon & City Skyline",
    bedType: "Royal Grand Bed",
    description: "Curated for highly demanding aesthetes, this suite features a generous partitioned lounge room showcasing original contemporary paintings by world-renowned Beninese artists. Its marble island bathtub overlooks the glowing Porto-Novo lagoon.",
    amenities: [
      "Independent Royal Living Room",
      "Panoramic Island Bath",
      "Bespoke Walk-in Wardrobe",
      "JBL Premium Acoustics",
      "Curated Wine & Spirits Collection",
      "VIP Private Lounge Access",
      "Twice-Daily Premium Housekeeping"
    ],
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "suite-presidentielle",
    name: "Tour Eiffel Presidential Suite",
    tagline: "The Pinnacle of Sovereign Prestige",
    pricePerNight: 650000,
    size: "185 m²",
    capacity: "4 Adults",
    view: "360° Lagoon, Royal Palace & City",
    bedType: "Two Absolute King Beds",
    description: "A cultural masterpiece merging rich local heritage with classic French palatial architecture. This immense suite boasts two majestic bedrooms, an expansive reception hall, private dining table, a heated outdoor jacuzzi on a private deck, and a dedicated 24-hour butler.",
    amenities: [
      "24/7 Personal Butler Service",
      "Private Heated Rooftop Jacuzzi",
      "Secured VIP Entrance & Elevator",
      "Private Dining Hall (8 Guests)",
      "Fully Equipped Chef Kitchen",
      "Chauffeur-Driven Airport Limousine",
      "Exclusive Prestigious Tasting Bar"
    ],
    imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800"
  }
];

// --- Gastronomy translation data ---
const GASTRONOMY_FR: MenuItem[] = [
  {
    id: "entree-crab",
    name: "Dôme de Crabe de Lagune & Avocat Doré",
    description: "Chair fine de crabe de Porto-Novo infusée au citron caviar, lit de d'avocat crémeux, éclats de feuille d'or comestible.",
    category: "entrée",
    price: 18000,
    isVegetarian: false
  },
  {
    id: "entree-igname",
    name: "Cappuccino de Patates Douces & Truffe de Forêt",
    description: "Velouté onctueux de patates douces d'Ouémé, émulsion de truffes noires de sous-bois et croustillants de manioc.",
    category: "entrée",
    price: 14000,
    isVegetarian: true
  },
  {
    id: "plat-capitaine",
    name: "Pavé de Capitaine Brisé & Jus Royal",
    description: "Filet de poisson Capitaine pêché localement, croûte de noix de cajou torréfiées du Nord, mousseline d'igname truffée et réduction au vin de palme raffiné.",
    category: "plat",
    price: 32000,
    isVegetarian: false
  },
  {
    id: "plat-penja",
    name: "Filet de Bœuf au Poivre Sauvage de Penja",
    description: "Bœuf d'Afrique de l'Ouest maturé, sauce onctueuse au poivre blanc de Penja, bananes plantains caramélisées façon mille-feuille.",
    category: "plat",
    price: 38000,
    isVegetarian: false
  },
  {
    id: "dessert-cacao",
    name: "Déclinaison de Chocolat Pur Bénin & Kinkeliba",
    description: "Biscuit d'or, mousse aérienne de cacao bio de la région de Pobé à 72%, crème brûlée parfumée aux feuilles de kinkeliba.",
    category: "dessert",
    price: 12000,
    isVegetarian: true
  },
  {
    id: "drink-sodabi-gold",
    name: "Golden Sodabi Old Fashioned",
    description: "Sodabi artisanal vieilli en fût de chêne, amer de chicorée locale, zeste d'orange et sirop de gingembre sauvage.",
    category: "cocktail",
    price: 9000,
    isVegetarian: true
  }
];

const GASTRONOMY_EN: MenuItem[] = [
  {
    id: "entree-crab",
    name: "Lagoon Crab Dome & Golden Avocado",
    description: "Delicate crab lump from Porto-Novo infused with finger lime, layered on smooth whipped avocado, dusted with 24k gold leaf flakes.",
    category: "entrée",
    price: 18000,
    isVegetarian: false
  },
  {
    id: "entree-igname",
    name: "Sweet Potato Cappuccino & Forest Truffle",
    description: "Silky velouté made of high-grade Ouémé sweet potatoes, black forest truffle emulsion, topped with crispy cassava ribbons.",
    category: "entrée",
    price: 14000,
    isVegetarian: true
  },
  {
    id: "plat-capitaine",
    name: "Pan-Seared crusted Captain Fish & Royal Jus",
    description: "Freshly caught local wild Captain fish fillet, Northern roasted cashew nut crust, truffled yam mousseline and a reduction of refined palm wine.",
    category: "plat",
    price: 32000,
    isVegetarian: false
  },
  {
    id: "plat-penja",
    name: "Prime Beef Fillet with Wild Penja Pepper",
    description: "Aged premium West African beef sirloin, creamy sauce infused with white Penja pepper from Cameroon, plantain mille-feuille cake.",
    category: "plat",
    price: 38000,
    isVegetarian: false
  },
  {
    id: "dessert-cacao",
    name: "Organic Benin Kakao & Kinkeliba Infused Tasting",
    description: "Lustrous gold biscuit base, airy Pobé 72% single-origin bio cocoa mousse, French crème brûlée perfumed with kinkeliba tea herbal essence.",
    category: "dessert",
    price: 12000,
    isVegetarian: true
  },
  {
    id: "drink-sodabi-gold",
    name: "Golden Sodabi Old Fashioned",
    description: "Artisanal Sodabi palm liquor aged in oak barrels, bitter essence of local chicory, orange zest and wild honey ginger syrup.",
    category: "cocktail",
    price: 9000,
    isVegetarian: true
  }
];

// --- Hall translation data ---
const HALLS_FR: EventHall[] = [
  {
    id: "salle-concorde",
    name: "Le Grand Salon Concorde",
    capacity: 1200,
    description: "La plus prestigieuse salle de bal et de conférence de Porto-Novo. Idéale pour les sommets présidentiels, les mariages de haute société et les galas d'envergure. Équipée d'acoustique de pointe, de lustres géants en cristal français et d'une scène monumentale amovible.",
    ratePerHalfDay: 850000,
    rateFullDay: 1500000
  },
  {
    id: "salle-toffa",
    name: "L'Espace Impérial Toffa Ier",
    capacity: 350,
    description: "Inspiré de l'héritage culturel royal, cet espace marie à la perfection marbre brillant et tentures théâtrales. Convient merveilleusement bien pour vos mariages élégants, vos cocktails mondains et vos séminaires exécutifs d'élite.",
    ratePerHalfDay: 450000,
    rateFullDay: 800000
  },
  {
    id: "salle-porto-novo",
    name: "Le Salon Affaires Porto-Novo",
    capacity: 120,
    description: "Une salle de conférence d'affaires moderne et confidentielle, dotée des derniers écrans LED interactifs 4K de 98 pouces et d'équipements de visioconférence intégrés haut de gamme.",
    ratePerHalfDay: 250000,
    rateFullDay: 450000
  }
];

const HALLS_EN: EventHall[] = [
  {
    id: "salle-concorde",
    name: "The Concorde Grand Ballroom",
    capacity: 1200,
    description: "The most prestigious ballroom and summit hall in Porto-Novo. Perfect for presidential summits, historic high-class weddings, and state ceremonies. Outfitted with studio acoustics, monumental French crystal chandeliers, and a dynamic staging deck.",
    ratePerHalfDay: 850000,
    rateFullDay: 1500000
  },
  {
    id: "salle-toffa",
    name: "The King Toffa Imperial Hall",
    capacity: 350,
    description: "Grounded in Benin's royal architecture, this hall features brilliant golden marble and plush velvet drapery. Suited for romantic ceremonies, high-society dinner cocktail parties, and elite leadership symposiums.",
    ratePerHalfDay: 450000,
    rateFullDay: 800000
  },
  {
    id: "salle-porto-novo",
    name: "The Porto-Novo Business Salon",
    capacity: 120,
    description: "An advanced, highly secure boardroom, integrated with state-of-the-art 98-inch 4K smart screens and dual-channel military-grade videoconferencing equipment.",
    ratePerHalfDay: 250000,
    rateFullDay: 450000
  }
];

// --- Upcoming events translations ---
const UPCOMING_EVENTS_FR = [
  {
    id: "eve-saint-sylvestre",
    title: "Gala de la Saint-Sylvestre 2026",
    subtitle: "Raffinement Impérial & Éclats d'Or",
    date: "31 Décembre 2026",
    time: "21h00 - 05h00",
    price: "150 000 FCFA par invité",
    description: "Vivez une transition d'année légendaire sous la voûte céleste de Porto-Novo. Un menu en 7 services par le Chef Kofi, accompagné de champagne millésimé à discrétion, orchestre live international, et un feu d'artifice spectaculaire au-dessus de la lagune.",
    highlight: "Bar à champagne Krug & Cigare lounge exclusif.",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "eve-vodoun-heritage",
    title: "Soirée Prestige Vodoun Fest",
    subtitle: "Art, Sacré & Gastronomie Initiatique",
    date: "10 Janvier 2027",
    time: "19h00 - 01h00",
    price: "95 000 FCFA par invité",
    description: "Célébrez la richesse philosophique et spirituelle du Bénin. Une soirée mêlant performance théâtrale contemporaine, danses rituelles sublimées et un dîner d'inspiration ancestrale revisité avec brio par des chefs de renom.",
    highlight: "Exposition d'art tribal authentique & concert de chants d'origine.",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600"
  }
];

const UPCOMING_EVENTS_EN = [
  {
    id: "eve-saint-sylvestre",
    title: "New Year's Eve Gala 2026",
    subtitle: "Imperial Sophistication & Gold Glitz",
    date: "December 31, 2026",
    time: "9:00 PM - 5:00 AM",
    price: "150,000 FCFA per guest",
    description: "Experience a legendary transition under the starlit sky of Porto-Novo. Indulge in an exclusive 7-course menu designed by Chef Kofi, paired with vintage flowing champagne, a global jazz orchestra, and a massive fireworks launch over the lagoon.",
    highlight: "Krug Champagne Bar & Cigar Lounge privileges.",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "eve-vodoun-heritage",
    title: "Vodoun Heritage Prestige Night",
    subtitle: "Sacred Art & Ceremonial Gastronomy",
    date: "January 10, 2027",
    time: "7:00 PM - 1:00 AM",
    price: "95,000 FCFA per guest",
    description: "Dive deeply into the architectural and spiritual philosophy of Benin. An evening merging exquisite ritual choreography, traditional drum ensembles, and an organic feast revised by master culinary creators.",
    highlight: "Ancestral sculpture museum tour & sacred ceremonial songs.",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600"
  }
];

// --- Slides Translations ---
const CAROUSEL_SLIDES_FR: CarouselSlide[] = [
  {
    id: "suite",
    category: "Suites de Légende",
    title: "Suite Présidentielle Tour Eiffel",
    tagline: "Un Sanctuaire de Majesté",
    description: "Perchée au sommet de Porto-Novo, notre Suite Présidentielle symbolise la convergence ultime du raffinement français et du luxe royal béninois. Profitez de 185 m² d'élégance absolue, d'un jacuzzi extérieur privatif chauffé sur terrasse panoramique et d'un service de majordome dédié 24h/24.",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1600",
    ctaText: "Réserver cette Suite",
    targetTab: "rooms"
  },
  {
    id: "dining",
    category: "Gastronomie Haute Couture",
    title: "Le Céleste — Pavillon Culinaire",
    tagline: "L'Orfèvrerie Culinaire par le Chef Kofi",
    description: "Une odyssée culinaire distinguée où les saveurs de la lagune s'unissent aux techniques de la grande cuisine française. Dégustez d'exceptionnels dômes de crête locaux brodés à la feuille d'or comestible ou nos pièces de bœufs maturés au poivre sauvage de Penja dans un écrin de velours et de marbre.",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600",
    ctaText: "Découvrir la Carte du Chef",
    targetTab: "restaurant"
  },
  {
    id: "events",
    category: "Réceptions Magistrales",
    title: "Le Grand Salon Concorde",
    tagline: "L'Écrin des Grandes Célébrations",
    description: "Mariages de haute société, sommets diplomatiques d'Afrique de l'Ouest et galas d'envergure. Notre grand salon Concorde accueille jusqu'à 1200 convives sous d'immenses lustres de cristal français et offre une sonorisation de pointe alliée à une sécurité de protocole d'ambassade.",
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1600",
    ctaText: "Planifier un Événement",
    targetTab: "events"
  }
];

const CAROUSEL_SLIDES_EN: CarouselSlide[] = [
  {
    id: "suite",
    category: "Legendary Suites",
    title: "Tour Eiffel Presidential Suite",
    tagline: "A Sanctuary of Royal Majestic Splendor",
    description: "Suspended in the sky of Porto-Novo, our Presidential Suite merges high French luxury aesthetics with Benin's royal architecture. Enjoy 185 sqm of supreme elegance, a heated outdoor jacuzzi on the private terrace, and personalized 24-hour butler care.",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1600",
    ctaText: "Book this Suite",
    targetTab: "rooms"
  },
  {
    id: "dining",
    category: "Haute Couture Gastronomy",
    title: "Le Céleste — Dining Pavilion",
    tagline: "Gourmet Gold Craft by Chef Kofi",
    description: "A brilliant culinary odyssey where the organic secrets of our lagoons unite with French cooking mastery. Taste wild crab domes finished in 24k gold leaf or cuts of West African beef infused with Penja wild pepper, wrapped in marble and velvet context.",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600",
    ctaText: "Explore the Master Menu",
    targetTab: "restaurant"
  },
  {
    id: "events",
    category: "Magisterial Assemblies",
    title: "The Concorde Grand Ballroom",
    tagline: "The Magnificent Venue for State Banquets",
    description: "High-society weddings, diplomatic West African summits, and prestigious galas. Our Concorde Ballroom accommodates up to 1200 esteemed guests under immense crystal chandeliers with concert sound and ambassadorial security.",
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1600",
    ctaText: "Plan Your Event",
    targetTab: "events"
  }
];

// --- Tables translation ---
const SEATING_TABLES_FR = [
  { id: 1, name: "Table Éclipse Lagune (VIP)", capacity: 2, view: "Sur la Lagune d'Ouémé", isOccupied: false },
  { id: 2, name: "Table des Ambassadeurs (Grande)", capacity: 6, view: "Salon Central d'Or", isOccupied: false },
  { id: 3, name: "Table Toffa Ier (VIP)", capacity: 4, view: "Exposition Artisanale", isOccupied: true },
  { id: 4, name: "Table Confidence d'Ivoire", capacity: 2, view: "Jardins de Palmier", isOccupied: false },
  { id: 5, name: "Table Cascade d'Or", capacity: 4, view: "Près de la Fontaine de Verre", isOccupied: false },
  { id: 6, name: "Table Sunset Club ( VIP )", capacity: 2, view: "Vue Panoramique Héliport", isOccupied: true },
  { id: 7, name: "Table Royal Cacao", capacity: 4, view: "Près du Piano Bar", isOccupied: false },
  { id: 8, name: "Table Privilège Impérial", capacity: 8, view: "Salon Privé Rotonde", isOccupied: false },
];

const SEATING_TABLES_EN = [
  { id: 1, name: "Lagoon Eclipse Table (VIP)", capacity: 2, view: "Facing Ouémé Lagoon", isOccupied: false },
  { id: 2, name: "Ambassadors Table (Grand)", capacity: 6, view: "Golden Center Hall", isOccupied: false },
  { id: 3, name: "King Toffa I Table (VIP)", capacity: 4, view: "Artisan Crafts Gallery", isOccupied: true },
  { id: 4, name: "Ivory Confidence Table", capacity: 2, view: "Scented Palm Gardens", isOccupied: false },
  { id: 5, name: "Golden Cascade Table", capacity: 4, view: "By the Glass Waterwall", isOccupied: false },
  { id: 6, name: "Sunset Club Table ( VIP )", capacity: 2, view: "Heliport Horizon Vista", isOccupied: true },
  { id: 7, name: "Royal Cocoa Table", capacity: 4, view: "Beside the Grand Piano Bar", isOccupied: false },
  { id: 8, name: "Imperial Privilege Table", capacity: 8, view: "Private Circular Salon", isOccupied: false },
];

// --- Dictionary Database ---
const DICTIONARY: Record<string, { fr: string, en: string }> = {
  // Navigation / Header
  "nav.home": { fr: "Accueil", en: "Home" },
  "nav.rooms": { fr: "Chambres & Suites", en: "Rooms & Suites" },
  "nav.restaurant": { fr: "Gastronomie & Bar", en: "Gastronomy & Bar" },
  "nav.events": { fr: "Événements & Salles", en: "Events & Halls" },
  "nav.chat": { fr: "Concierge IA", en: "AI Concierge" },
  "header.sub": { fr: "Hôtel Bénin • Porto-Novo", en: "Benin Hotel • Porto-Novo" },
  "header.cta.desktop": { fr: "Réserver votre séjour", en: "Book Residence" },
  "header.cta.mobile": { fr: "Concierge de Secours", en: "Emergency Concierge" },

  // Hero Section
  "hero.tagline": { fr: "Un Joyau d'Élégance Française au Cœur du Bénin", en: "A Majestic Jewel of French Elegance in Benin" },
  "hero.heading": { fr: "L'Exceptionnel au Fil de la Céleste Lagune", en: "Sublime Living Beside the Celestial Lagoon" },
  "hero.description": { fr: "Bienvenue au Tour Eiffel Hôtel de Porto-Novo. Un sanctuaire d'exception où le raffinement de l'art de vivre français s'harmonise avec la majesté culturelle et l'hospitalité légendaire du Bénin.", en: "Welcome to the Tour Eiffel Hotel in Porto-Novo. An exceptional sanctuary where refined French living harmonizes with the cultural majesty and legendary hospitality of Benin." },
  "hero.cta.rooms": { fr: "Réserver Votre Séjour", en: "Book Your Journey" },
  "hero.cta.dining": { fr: "Découvrir la Table", en: "Discover Culinary Art" },
  "hero.badge": { fr: "Service Privilégié H24", en: "24/7 Prestigious butler" },
  "hero.featured": { fr: "En Vedette cette Semaine", en: "Featured Accommodation" },
  "hero.from": { fr: "dès", en: "from" },
  "hero.explore": { fr: "Explorer", en: "Inquire" },

  // Photo Carousel Section
  "carousel.subtitle": { fr: "Aperçu de la Propriété", en: "Property Showcase" },
  "carousel.title": { fr: "L'Immersion dans le Somptueux", en: "Sovereign Heritage Highlight" },
  "carousel.certified": { fr: "Prestation certifiée", en: "Certified luxury standards" },
  "carousel.slides": { fr: "Suites", en: "Suites" },
  "carousel.dining": { fr: "Restauration", en: "Dining" },
  "carousel.events": { fr: "Événements", en: "Events" },

  // Pillars of Excellence Section
  "pillars.subtitle": { fr: "Les Piliers de l'Hermitage", en: "The Pillars of Excellence" },
  "pillars.title": { fr: "L'Expérience de l'Absolu", en: "Experience the Sovereign State" },
  "pillars.cta": { fr: "Prendre rendez-vous", en: "Book Consultation" },
  "pillars.p1.title": { fr: "Hôtel & Suites souveraines", en: "Imperial Suites" },
  "pillars.p1.desc": { fr: "Des alcôves conçues comme des écrins royaux.", en: "Sanctuaries crafted with royal luxury details." },
  "pillars.p2.title": { fr: "Gastronomie d'origine", en: "Master Gastronomy" },
  "pillars.p2.desc": { fr: "Une symphonie culinaire signée du Chef Kofi.", en: "A culinary symphony crafted by Chef Kofi." },
  "pillars.p3.title": { fr: "Le Bar Céleste", en: "The Celestial Bar" },
  "pillars.p3.desc": { fr: "Des élixirs d'or et nectars insolites à la lagune.", en: "Golden cocktails and legendary private spirits." },
  "pillars.p4.title": { fr: "Salons Concorde & Toffa", en: "Ballrooms & Boardrooms" },
  "pillars.p4.desc": { fr: "L'écrin majestueux de vos événements d'État.", en: "The majestic stage for high-society affairs." },
  "pillars.p5.title": { fr: "Sécurité Diplomatique", en: "Diplomatic Security" },
  "pillars.p5.desc": { fr: "Protocole de haute protection et héliport sécurisé.", en: "Private heliport and strict safety protocols." },
  "pillars.p6.title": { fr: "L'Âme du Bénin", en: "The Soul of Benin" },
  "pillars.p6.desc": { fr: "Art contemporain original et excursions guidées.", en: "Original contemporary art and guided heritage tours." },

  // Rooms View
  "rooms.subtitle": { fr: "Hébergements Souverains", en: "Sovereign Sanctuaries" },
  "rooms.title": { fr: "Chambres & Suites d'Exception", en: "Exquisite Rooms & Suites" },
  "rooms.desc": { fr: "Chaque chambre est un poème architectural conjuguant étoffe de luxe, marbres lointains, peintures béninoises originales et service majordome attitré.", en: "Each chamber is an architectural masterpiece merging rich fabrics, exquisite marbles, original Beninese artwork, and dedicated butler care." },
  "rooms.pernight": { fr: "Par nuit", en: "Per night" },
  "rooms.comfort": { fr: "Conforts & Commodités de prestige", en: "Prestige Comforts & Amenities" },
  "rooms.hide": { fr: "Masquer la console", en: "Hide console" },
  "rooms.book": { fr: "Réserver cette Suite", en: "Book this Suite" },
  "rooms.whatsapp": { fr: "Inquiry WhatsApp Concierge", en: "Inquire on WhatsApp" },
  // Booking Drawer
  "rooms.drawer.title": { fr: "Saisir vos coordonnées pour une réservation impériale", en: "Enter your details for an imperial reservation" },
  "rooms.drawer.name": { fr: "Votre Nom Complet", en: "Your Full Name" },
  "rooms.drawer.namePlaceholder": { fr: "Ex: S.A.R. Saliou de Porto-Novo", en: "e.g., Honorable Guest Name..." },
  "rooms.drawer.email": { fr: "Adresse de messagerie", en: "Email Address" },
  "rooms.drawer.checkin": { fr: "Arrivée Prévue", en: "Scheduled Check-in" },
  "rooms.drawer.checkout": { fr: "Départ Prévu", en: "Scheduled Check-out" },
  "rooms.drawer.vipTitle": { fr: "Accompagnement VIP Exclusif", en: "Exclusive VIP Concierge Touches" },
  "rooms.drawer.vipOpt0": { fr: "Bouteille de Champagne Krug à l'accueil", en: "Bottle of Krug Champagne upon arrival" },
  "rooms.drawer.vipOpt1": { fr: "Service Escorte Héliportée", en: "Private Helicopter Ferry Escort" },
  "rooms.drawer.vipOpt2": { fr: "Majordome Dédié 24h/24", en: "24-Hour Dedicated butler" },
  "rooms.drawer.vipOpt3": { fr: "Expédition Gastronomique (Pension Complète)", en: "Chef Kofi Culinary Tour (Full Board)" },
  "rooms.drawer.vipOpt4": { fr: "Excursion Royale Historique de Porto-Novo", en: "Royal Historical Tour of Porto-Novo" },
  "rooms.drawer.special": { fr: "Demandes ou Protocoles Particuliers", en: "Special Requests or Diplomatic Protocol" },
  "rooms.drawer.specialPlaceholder": { fr: "Spécifiez tout protocole de voyage, régime alimentaire particulier ou aménagement de sécurité spécifique souhaité...", en: "Specify any travel protocol, dietary restrictions, or custom safety arrangements..." },
  "rooms.drawer.submit": { fr: "Valider mon Enregistrement Provisoire", en: "Validate Royal Reservation" },
  // Receipt
  "rooms.receipt.secured": { fr: "Réservation Enregistrée", en: "Reservation Booked" },
  "rooms.receipt.butler": { fr: "Un majordome se tient prêt à honorer votre prestigieux séjour.", en: "Your personal butler stands ready to honor your sublime stay." },
  "rooms.receipt.code": { fr: "Code de Réservation", en: "Booking Receipt Code" },
  "rooms.receipt.suite": { fr: "Suite Sélectionnée", en: "Selected Residence" },
  "rooms.receipt.dates": { fr: "Dates de Séjour", en: "Dates of Stay" },
  "rooms.receipt.total": { fr: "Total Prévisionnel", en: "Estimated Total Bill" },
  "rooms.receipt.watxt": { fr: "Afin de finaliser les préparatifs protocolaires (navette diplomatique, transfert de fonds sécurisé, préparation des alcôves d'or), veuillez transmettre cette note directement à notre Concierge par WhatsApp.", en: "To finalize diplomatic transfers, secured payment settlement, and room preparation, please transmit this receipt card to our concierge via WhatsApp." },
  "rooms.receipt.submitwa": { fr: "Transmettre sur WhatsApp", en: "Submit to WhatsApp Concierge" },
  "rooms.receipt.close": { fr: "Fermer & Retourner aux Suites", en: "Close & Return to Suites" },

  // Gastronomy Section
  "rest.subtitle": { fr: "Hautes Saveurs d'Origine", en: "Authentic High-Gourmet Origins" },
  "rest.title": { fr: "L'Art de Vivre — Gastronomie", en: "Art of Living — Signature Dining" },
  "rest.chefSub": { fr: "Maître de Cuisine", en: "Master Chef" },
  "rest.chefName": { fr: "Chef Kofi D'Almeida", en: "Chef Kofi d'Almeida" },
  "rest.chefQuote": { fr: "« Exalter le terroir béninois par la rigueur classique française »", en: "« Exalting Beninese authentic heritage through French classical rigor »" },
  "rest.chefDescription": { 
    fr: "Après avoir officié dans de prestigieux Palais Étoilés à Paris, Lyon et Dakar, le Chef Kofi D'Almeida dépose son art à l'Eiffel Hôtel de Porto-Novo. Sa philosophie culinaire célèbre avec panache les richesses ancestrales du golfe de Guinée : l'igname pilée d'ici s'associe à la truffe française de haute volée, le poisson Capitaine sauvage se drape de cajou caramélisé, tandis que le Sodabi de garde révèle des amers impériaux insoupçonnés.", 
    en: "After working in prestigious Michelin-starred Palaces across Paris, Lyon, and Dakar, Chef Kofi D'Almeida grounds his art at Tour Eiffel Porto-Novo. His culinary philosophy masterfully celebrates the ancestral treasures of the Gulf of Guinea: locally-pounded premium yam meets high-grade French truffles, wild-caught river Captain fish is blanketed in oxidized Northern Benin cashews, and vintage Sodabi liquor reveals unexpected royal bitters." 
  },
  "rest.badge0": { fr: "Ingrédients 100% bio & pêche durable", en: "100% organic ingredients & sustainable fish" },
  "rest.badge1": { fr: "Accords mets-vins de grande garde", en: "Grand vintage wine and dine pairings" },
  "rest.badge2": { fr: "Terrasse au fil de l'eau (Lagune)", en: "Lagoon boardwalk terrace dining" },
  "rest.menuTitle": { fr: "Le Menu de Collection", en: "The Curated Collection Menu" },
  "rest.cat.all": { fr: "Toutes les créations", en: "All Creations" },
  "rest.cat.entrée": { fr: "Entrées", en: "Starters" },
  "rest.cat.plat": { fr: "Plats", en: "Mains" },
  "rest.cat.dessert": { fr: "Desserts", en: "Desserts" },
  "rest.cat.cocktail": { fr: "Cocktails", en: "Cocktails" },
  "rest.veggie": { fr: "Végétarien", en: "Vegetarian" },
  "rest.val": { fr: "Valeur Prestige", en: "Prestige Value" },
  // Table reserve
  "rest.table.title": { fr: "Sécuriser une Table Directe", en: "Reserve a Seating Spot" },
  "rest.table.desc": { fr: "Choisissez votre atmosphère préférentielle et sélectionnez la table géolocalisée sur notre plan de sol en temps réel.", en: "Choose your preferred atmosphere and select your table on our real-time floor plan." },
  "rest.table.name": { fr: "Votre Identité", en: "Your Full Name" },
  "rest.table.namePlaceholder": { fr: "Ex: Excellence Marcel da Silva", en: "e.g., Ambassador da Silva..." },
  "rest.table.date": { fr: "Choisir une Date", en: "Choose a Date" },
  "rest.table.time": { fr: "Heure exquise", en: "Perfect Hour" },
  "rest.table.guests": { fr: "Nombre d'invités", en: "Number of Guests" },
  "rest.table.submit": { fr: "Enregistrer mon couvert royal", en: "Submit Seating Registry" },
  "rest.table.mapTitle": { fr: "Plan Interactif du Salon d'Or", en: "Salon d'Or Interactive Floor Plan" },
  "rest.table.mapSub": { fr: "Disponibilité exclusive h24", en: "Exclusive 24/7 room status" },
  "rest.table.legend.av": { fr: "Disponible", en: "Available" },
  "rest.table.legend.sel": { fr: "Sélectionné", en: "Selected" },
  "rest.table.legend.occ": { fr: "Déjà réservé (VIP occupée)", en: "Occupied (VIP Table)" },
  // Table success
  "rest.table.success.title": { fr: "Table Sécurisée", en: "Table Reserved" },
  "rest.table.success.guests": { fr: "CONVIVES :", en: "GUESTS:" },
  "rest.table.success.table": { fr: "TABLE RETENUE :", en: "SELECTED TABLE:" },
  "rest.table.success.service": { fr: "SERVICE ACCÈS :", en: "DINING SERVICE:" },
  "rest.table.success.serviceVal": { fr: "Dîner Impérial Accompagné", en: "Accompanied Imperial Dinner" },
  "rest.table.success.wa": { fr: "Signaler mon arrivée au Maître d'Hôtel (WhatsApp)", en: "Notify Head Butler via WhatsApp" },
  "rest.table.success.close": { fr: "Fermer la confirmation", en: "Close confirmation" },

  // Events Section
  "events.subtitle": { fr: "Célébrations de Haute Volée", en: "High-Society Banquets" },
  "events.title": { fr: "Événements de Prestige & Salons", en: "Prestige Events & Ballrooms" },
  "events.hallTitle": { fr: "Nos Espaces d'Exceptional", en: "Our Royal Meeting Rooms" },
  "events.day": { fr: "Journée complète", en: "Full Day" },
  "events.calc.title": { fr: "Créateur de Devis d'Élite", en: "Elite Banquet Estimator" },
  "events.calc.desc": { fr: "Configurez immédiatement en ligne votre séminaire d'affaires ou votre banquet royal et visualisez l'estimation en temps réel.", en: "Instantly configure your leadership conference or grand wedding and view a live pricing sheet." },
  "events.calc.type": { fr: "Typologie de l'Événement", en: "Banquet Typology" },
  "events.calc.hall": { fr: "Espace & Salles", en: "Espace & Salon" },
  "events.calc.guests": { fr: "Nombre de Nobles Convives", en: "Number of Noble Guests" },
  "events.calc.catering": { fr: "Prestige Gastronomique (Traiteur)", en: "Gourmet Catering Standard" },
  "events.calc.techTitle": { fr: "Services & Technologies Additionnels", en: "Additional VIP Tech Packages" },
  "events.calc.receipt": { fr: "Estimation Instantanée du Devis", en: "Instant Quote Audit Card" },
  "events.calc.study": { fr: "Bons d'étude h24", en: "24/7 Quote Study" },
  "events.calc.rows.hall": { fr: "Salle Réservée :", en: "Reserved Salon:" },
  "events.calc.rows.duration": { fr: "Durée Tarif :", en: "Rental Tariff:" },
  "events.calc.rows.durationVal": { fr: "1 Journée Complète", en: "1 Full Day Cycle" },
  "events.calc.rows.fee": { fr: "Frais d'Espace :", en: "Hall Rent Fees:" },
  "events.calc.rows.cat": { fr: "Catering", en: "Catering" },
  "events.calc.rows.tech": { fr: "Package Technicité :", en: "Advanced Tech Pack:" },
  "events.calc.rows.ht": { fr: "Montant Hors Taxe (HT) :", en: "Net Total (Excl. Tax):" },
  "events.calc.rows.vat": { fr: "TVA Légale Bénin (18%) :", en: "Benin Legal VAT (18%):" },
  "events.calc.rows.total": { fr: "Total Prévisionnel (TTC) :", en: "Estimated Total (Incl. Tax):" },
  "events.calc.note": { 
    fr: "*Ce calcul virtuel constitue une base d'évaluation conforme à notre tarification diplomatique 2026. Un expert événementiel prendra attache avec vous pour l'ajustement des protocoles de sécurité et de fleurissement.", 
    en: "*This virtual estimate provides a pricing draft aligned with our 2026 diplomatic tariff sheet. A banquet coordinator will reach out to organize floral designs, custom acoustics, and security." 
  },
  "events.calc.submit": { fr: "Transmettre au Secrétariat d'Événements (WhatsApp)", en: "Submit to Event Coordinator (WhatsApp)" },
  "events.upcoming.sub": { fr: "Les Grandes Heures du Palais", en: "Gilded Highlights" },
  "events.upcoming.title": { fr: "Événements Élite À Venir", en: "Upcoming Elite Events" },
  "events.upcoming.book": { fr: "Réserver ma Table Élite", en: "Inquire for Seating" },

  // Concierge Chat Section
  "chat.sub": { fr: "La Conciergerie Digitale Élite", en: "Elite Digital Luxury Concierge" },
  "chat.title": { fr: "Adjoint Virtuel", en: "Virtual Assistant" },
  "chat.desc": { fr: "Votre intendant diplomatique privé est disponible h24 pour planifier vos rituels, réserver nos suites et éclairer votre curiosité culturelle.", en: "Your private butler is online 24/7 to schedule your itinerary, reserve suites, and illuminate Porto-Novo's history." },
  "chat.barTitle": { fr: "CONCIERGE DE HAUTE VOLÉE", en: "HIGH-SOCIETY BUTLER" },
  "chat.status": { fr: "● En ligne à Porto-Novo", en: "● Online in Porto-Novo" },
  "chat.standard": { fr: "Standard Officiel", en: "Official Direct Line" },
  "chat.typing": { fr: "L'Adjoint Virtuel compose sa réponse...", en: "The Virtual Assistant is writing..." },
  "chat.suggest": { fr: "Sujets suggérés par la Conciergerie :", en: "Suggested Concierge Inquiries:" },
  "chat.placeholder": { fr: "Transmettez vos instructions au Concierge Privé Élite...", en: "Write your instructions to the Elite Private Concierge..." },

  // Footer
  "footer.newsletter.sub": { fr: "La Lettre Restreinte de l'Hermitage", en: "The Hermitage Confidential Letter" },
  "footer.newsletter.title": { fr: "Rejoignez le Cercle des Initiés", en: "Join the Circle of Initiates" },
  "footer.newsletter.desc": { fr: "Inscrivez-vous pour recevoir en priorité nos invitations privées, offres confidentielles de suites royales, et l'actualité culinaire de notre table étoilée.", en: "Subscribe to receive priority private keys, confidential suite opportunities, and signature creations at our culinary table." },
  "footer.newsletter.placeholder": { fr: "Saisissez votre adresse email de prestige...", en: "Enter your private email address..." },
  "footer.newsletter.btn": { fr: "S'abonner", en: "Subscribe" },
  "footer.newsletter.sending": { fr: "Envoi en cours", en: "Sending Request" },
  "footer.newsletter.privacy": { fr: "Confidentialité suprême garantie. Désabonnement à tout moment d'un clic.", en: "Absolute privacy guaranteed. Opt-out at any time with a single click." },
  "footer.newsletter.success.title": { fr: "Votre invitation a été enregistrée", en: "Private Access Granted" },
  "footer.newsletter.success.desc": { fr: "Un email de confirmation royale vient de vous être envoyé. Bienvenue dans notre confrérie de prestige.", en: "A royal confirmation email was sent. Welcome to our elite circle." },
  "footer.cols.about": { fr: "À PROPOS", en: "ABOUT US" },
  "footer.cols.aboutDesc": { fr: "Premier établissement palatial de Porto-Novo conjuguant la haute couture de l'hôtellerie française à la grandeur béninoise.", en: "Porto-Novo's premier luxury palace fusing French high-craft living with Beninese historical grandeur." },
  "footer.cols.nav": { fr: "LIENS UTILES", en: "QUICK LINKS" },
  "footer.cols.contact": { fr: "CONTACT ROYAL", en: "ROYAL ADDRESS" },
  "footer.cols.hours": { fr: "HORAIRES D'ACCÈS", en: "PALACE OPEN HOURS" },
  "footer.cols.hoursVal": { fr: "Chambres & Suites : Accès permanent h24. Salons de réception & Gastronomie 'L'Art de Vivre' : ouvert tous les jours de 12h00 à 23h30.", en: "Rooms & Suites: Open 24/7 permanently. Fine-Dining & Reception Salons: Daily from 12:00 PM to 11:30 PM." },
  "footer.backtotop": { fr: "REMONTER", en: "BACK TO TOP" },
  "footer.copyright": { fr: "Tous droits réservés. Établissement de très haute distinction.", en: "All Rights Reserved. Registered under Five-Star Diplomatic Distinction." },
  "footer.stars": { fr: "Classification Palace Agrée 5 Étoiles", en: "Certified 5-Star Sovereign Classification" }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('tour-eiffel-lang');
    return (saved === 'en' || saved === 'fr') ? saved : 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('tour-eiffel-lang', lang);
  };

  const t = (key: string): string => {
    const entry = DICTIONARY[key];
    if (!entry) return key;
    return entry[language] || entry['fr'] || key;
  };

  const currentRooms = language === 'fr' ? ROOMS_FR : ROOMS_EN;
  const currentGastronomy = language === 'fr' ? GASTRONOMY_FR : GASTRONOMY_EN;
  const currentHalls = language === 'fr' ? HALLS_FR : HALLS_EN;
  const currentUpcomingEvents = language === 'fr' ? UPCOMING_EVENTS_FR : UPCOMING_EVENTS_EN;
  const currentCarouselSlides = language === 'fr' ? CAROUSEL_SLIDES_FR : CAROUSEL_SLIDES_EN;
  const currentSeatingTables = language === 'fr' ? SEATING_TABLES_FR : SEATING_TABLES_EN;
  const currentHotelInfo = language === 'fr' ? HOTEL_INFO_FR : HOTEL_INFO_EN;

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      rooms: currentRooms,
      gastronomy: currentGastronomy,
      halls: currentHalls,
      upcomingEvents: currentUpcomingEvents,
      carouselSlides: currentCarouselSlides,
      seatingTables: currentSeatingTables,
      hotelInfo: currentHotelInfo
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
