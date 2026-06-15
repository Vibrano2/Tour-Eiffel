import { Room, MenuItem, EventHall } from './types';

export const HOTEL_INFO = {
  name: "Tour Eiffel Hôtel Bénin",
  city: "Porto-Novo",
  country: "Bénin",
  phone: "+229 55 12 34 56",
  email: "concierge@toureiffelhotel.bj",
  whatsappUrl: "https://wa.me/22955123456?text=Bonjour%20Tour%20Eiffel%20H%C3%B4tel%20B%C3%A9nin%2C%20je%20souhaite",
  address: "Boulevard de la Lagune, Quartier Résidentiel, Porto-Novo, Bénin"
};

export const ROOMS_DATA: Room[] = [
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

export const GASTRONOMY_DATA: MenuItem[] = [
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

export const HALLS_DATA: EventHall[] = [
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

export const UPCOMING_EVENTS = [
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
