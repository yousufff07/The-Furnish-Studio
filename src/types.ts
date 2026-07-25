export type CategoryName = 
  | 'Living Room'
  | 'Bedroom'
  | 'Dining Room'
  | 'Office Furniture'
  | 'Outdoor Furniture'
  | 'Storage Furniture'
  | 'Decor & Accessories'
  | 'Lighting & Sculptures'
  | 'Rugs & Textiles'
  | 'Bar & Entertainment'
  | 'Bathroom & Spa'
  | 'Kids & Nursery'
  | 'Kitchen & Dining Island'
  | 'Lounge & Lobby'
  | 'Acoustic & Studio'
  | 'Wellness & Sanctuary'
  | 'Library & Study';

export type ToneColor = 'rust' | 'slate' | 'greige';

export interface Product {
  id: string;
  name: string;
  category: CategoryName;
  price: number;
  originalPrice?: number;
  description: string;
  material: 'Wood' | 'Metal' | 'Glass' | 'Fabric' | 'Leather' | 'Mixed' | 'Ceramic' | 'Stone';
  color: ToneColor;
  availableColors: ToneColor[];
  stock: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  galleryImages?: string[];
  dimensions?: string;
  weight?: string;
  sku?: string;
  isBestSeller?: boolean;
  isNew?: boolean;
  createdAt: string;
}

export interface Address {
  id: string;
  label: string; // e.g. "Home", "Office"
  fullName: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  role?: 'customer' | 'admin';
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedColor: ToneColor;
  selectedMaterial?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  selectedColor: ToneColor;
}

export type OrderStatus = 'Processing' | 'Confirmed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled' | 'Returned';
export type PaymentMethod = 'Card' | 'UPI' | 'Net Banking' | 'Cash on Delivery';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  orderStatus: OrderStatus;
  shippingAddress: Address;
  createdAt: string;
  estimatedDelivery?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase?: boolean;
}

export interface FilterState {
  category: string; // 'All' or CategoryName
  priceRange: [number, number];
  materials: string[];
  colors: ToneColor[];
  inStockOnly: boolean;
  ratingMin: number;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating' | 'best-selling';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  title?: string;
}
