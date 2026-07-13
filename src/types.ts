export type MenuCategory = 'starters' | 'main-course' | 'indian-breads' | 'desserts' | 'beverages';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  isVegetarian: boolean;
  popular: boolean;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  review: string;
  rating: number;
  date: string;
  avatar: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  tableNumber?: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  available: boolean;
}

export interface ChefInfo {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
}
