export interface Product {
  id: string;
  brand: string;
  model: string;
  year: number;
  market: string;
  price: number;
  currency: string;
  category: string;
  engine: string;
  horsepower: number;
  torque_nm: number;
  transmission: string;
  drivetrain: 'RWD' | 'AWD' | 'FWD';
  top_speed_kmh: number;
  acceleration_0_100_sec: number;
  seats: number;
  fuel_type: string;
  description: string;
  highlights: string[];
  image: string;
  sources: string[];
}

export interface FilterState {
  searchQuery: string;
  brand: string;
  category: string;
  drivetrain: string;
  minPrice: number;
  maxPrice: number;
  minHorsepower: number;
  sortBy: 'price-asc' | 'price-desc' | 'hp-desc' | 'acc-asc' | 'name-asc';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  sources?: string[];
  timestamp: string;
}
