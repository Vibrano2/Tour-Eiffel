export type ActiveTab = 'home' | 'rooms' | 'restaurant' | 'events' | 'chat';

export interface Room {
  id: string;
  name: string;
  tagline: string;
  pricePerNight: number;
  size: string;
  capacity: string;
  view: string;
  bedType: string;
  description: string;
  amenities: string[];
  imageUrl: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'entrée' | 'plat' | 'dessert' | 'signature' | 'cocktail' | 'wine';
  price: number;
  isVegetarian?: boolean;
}

export interface EventHall {
  id: string;
  name: string;
  capacity: number;
  description: string;
  ratePerHalfDay: number;
  rateFullDay: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  timestamp: Date;
}
