import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { 
  Product, User, Order, Review, CartItem, Address, OrderStatus, 
  ToastMessage, ToneColor, CategoryName 
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_USER, ADMIN_USER, INITIAL_ORDERS, INITIAL_REVIEWS, CATEGORIES_DATA } from '../data/mockData';

interface AppContextType {
  products: Product[];
  categories: typeof CATEGORIES_DATA;
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  orders: Order[];
  reviews: Review[];
  activeRoute: string;
  selectedProductId: string | null;
  selectedCategoryFilter: string;
  searchQuery: string;
  toast: ToastMessage | null;
  
  // Navigation
  navigate: (route: string, params?: { productId?: string; category?: string; searchQuery?: string }) => void;
  
  // Cart Actions
  addToCart: (productId: string, quantity?: number, color?: ToneColor, material?: string) => void;
  removeFromCart: (productId: string, color: ToneColor) => void;
  updateCartQuantity: (productId: string, color: ToneColor, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  deliveryFee: number;
  cartTotal: number;
  
  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCart: (productId: string, color?: ToneColor) => void;
  
  // Auth Actions
  login: (email: string, password?: string, asAdmin?: boolean) => boolean;
  register: (name: string, email: string, phone: string) => void;
  logout: () => void;
  updateProfile: (name: string, email: string, phone: string) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  
  // Order Actions
  placeOrder: (paymentMethod: any, shippingAddress: Address) => Order;
  cancelOrder: (orderId: string) => void;
  returnOrder: (orderId: string) => void;
  adminUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  
  // Review Actions
  addReview: (productId: string, rating: number, comment: string) => void;
  deleteReview: (reviewId: string) => void;
  
  // Product Admin Actions
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Search and Filter
  setSearchQuery: (query: string) => void;
  setSelectedCategoryFilter: (category: string) => void;
  
  // Toasts
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error', title?: string) => void;
  hideToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('furnish_products');
    if (saved) {
      try {
        const parsed: Product[] = JSON.parse(saved);
        if (parsed.length < INITIAL_PRODUCTS.length) {
          const parsedIds = new Set(parsed.map(p => p.id));
          const missing = INITIAL_PRODUCTS.filter(p => !parsedIds.has(p.id));
          return [...parsed, ...missing];
        }
        return parsed;
      } catch (e) {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('furnish_cart');
    return saved ? JSON.parse(saved) : [{ productId: 'prod-1', quantity: 1, selectedColor: 'rust', selectedMaterial: 'Fabric' }];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('furnish_wishlist');
    return saved ? JSON.parse(saved) : ['prod-3', 'prod-8'];
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('furnish_user');
    return saved !== null ? JSON.parse(saved) : INITIAL_USER;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('furnish_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('furnish_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [activeRoute, setActiveRoute] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('furnish_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('furnish_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('furnish_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user !== undefined) {
      localStorage.setItem('furnish_user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('furnish_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('furnish_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Toast auto-hide
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success', title?: string) => {
    setToast({
      id: Math.random().toString(36).substring(2, 9),
      type,
      message,
      title
    });
  };

  const hideToast = () => setToast(null);

  const navigate = (route: string, params?: { productId?: string; category?: string; searchQuery?: string }) => {
    if (params?.productId) {
      setSelectedProductId(params.productId);
    }
    if (params?.category !== undefined) {
      setSelectedCategoryFilter(params.category);
    }
    if (params?.searchQuery !== undefined) {
      setSearchQuery(params.searchQuery);
    }
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  const cartSubtotal = cart.reduce((total, item) => {
    const prod = products.find(p => p.id === item.productId);
    return total + (prod ? prod.price * item.quantity : 0);
  }, 0);

  const deliveryFee = cartSubtotal === 0 ? 0 : (cartSubtotal > 50000 ? 0 : 1500);
  const cartTotal = cartSubtotal + deliveryFee;

  // Cart Actions
  const addToCart = (productId: string, quantity = 1, color?: ToneColor, material?: string) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const chosenColor = color || prod.color || 'rust';
    const chosenMaterial = material || prod.material;

    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.productId === productId && item.selectedColor === chosenColor);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { productId, quantity, selectedColor: chosenColor, selectedMaterial: chosenMaterial }];
      }
    });

    showToast(`Added "${prod.name}" (${chosenColor}) to your studio cart`, 'success', 'Cart Updated');
  };

  const removeFromCart = (productId: string, color: ToneColor) => {
    setCart(prev => prev.filter(item => !(item.productId === productId && item.selectedColor === color)));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, color: ToneColor, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, color);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.productId === productId && item.selectedColor === color) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  // Wishlist Actions
  const toggleWishlist = (productId: string) => {
    const prod = products.find(p => p.id === productId);
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast(`Removed "${prod?.name || 'Item'}" from saved wishlist`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast(`Saved "${prod?.name || 'Item'}" to your studio wishlist`, 'success', 'Saved to Wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveToCart = (productId: string, color?: ToneColor) => {
    addToCart(productId, 1, color);
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  // Auth Actions
  const login = (email: string, _password?: string, asAdmin?: boolean) => {
    if (asAdmin || email.toLowerCase().includes('admin')) {
      setUser(ADMIN_USER);
      showToast('Welcome back, Julian Vance! Admin Studio activated.', 'success', 'Admin Portal');
      navigate('admin');
      return true;
    } else {
      const updatedUser: User = {
        ...INITIAL_USER,
        email: email || INITIAL_USER.email,
        name: email.split('@')[0].replace('.', ' ') || INITIAL_USER.name,
      };
      setUser(updatedUser);
      showToast(`Welcome back to The Furnish Studio, ${updatedUser.name}!`, 'success', 'Studio Signed In');
      navigate('home');
      return true;
    }
  };

  const register = (name: string, email: string, phone: string) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name || 'Valued Member',
      email: email || 'customer@example.com',
      phone: phone || '+91 98765 00000',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      addresses: INITIAL_USER.addresses
    };
    setUser(newUser);
    showToast(`Registration complete! Welcome to The Furnish Studio, ${newUser.name}.`, 'success', 'Account Created');
    navigate('home');
  };

  const logout = () => {
    setUser(null);
    showToast('You have securely logged out of your studio account.', 'info');
    navigate('home');
  };

  const updateProfile = (name: string, email: string, phone: string) => {
    if (!user) return;
    setUser({ ...user, name, email, phone });
    showToast('Studio profile successfully updated.', 'success');
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddr: Address = {
      ...address,
      id: `addr-${Date.now()}`,
      isDefault: user.addresses.length === 0
    };
    setUser({ ...user, addresses: [...user.addresses, newAddr] });
    showToast('New delivery address saved.', 'success');
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    setUser({ ...user, addresses: user.addresses.filter(a => a.id !== id) });
    showToast('Address removed.', 'info');
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    setUser({
      ...user,
      addresses: user.addresses.map(a => ({ ...a, isDefault: a.id === id }))
    });
    showToast('Default shipping address updated.', 'success');
  };

  // Order Actions
  const placeOrder = (paymentMethod: any, shippingAddress: Address): Order => {
    const orderItems = cart.map(item => {
      const prod = products.find(p => p.id === item.productId);
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: prod ? prod.price : 0,
        selectedColor: item.selectedColor
      };
    });

    const newOrder: Order = {
      id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
      orderNumber: `FS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: user ? user.id : 'guest',
      items: orderItems,
      subtotal: cartSubtotal,
      deliveryFee: deliveryFee,
      totalPrice: cartTotal,
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      orderStatus: 'Processing',
      shippingAddress: shippingAddress,
      createdAt: new Date().toISOString().split('T')[0],
      estimatedDelivery: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    showToast(`Order #${newOrder.orderNumber} placed successfully!`, 'success', 'Order Confirmed');
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        return { ...ord, orderStatus: 'Cancelled', paymentStatus: 'Refunded' };
      }
      return ord;
    }));
    showToast('Order has been cancelled.', 'warning');
  };

  const returnOrder = (orderId: string) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        return { ...ord, orderStatus: 'Returned', paymentStatus: 'Refunded' };
      }
      return ord;
    }));
    showToast('Return request submitted. White-glove pickup scheduled within 48 hours.', 'info');
  };

  const adminUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(ord => ord.id === orderId ? { ...ord, orderStatus: status } : ord));
    showToast(`Order status updated to "${status}"`, 'success');
  };

  // Review Actions
  const addReview = (productId: string, rating: number, comment: string) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      userId: user ? user.id : 'guest',
      userName: user ? user.name : 'Verified Customer',
      userAvatar: user?.avatar,
      productId,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      verifiedPurchase: true
    };

    setReviews(prev => [newRev, ...prev]);
    
    // Update product rating average
    setProducts(prev => prev.map(prod => {
      if (prod.id === productId) {
        const prodRevs = [...reviews.filter(r => r.productId === productId), newRev];
        const avg = Number((prodRevs.reduce((acc, r) => acc + r.rating, 0) / prodRevs.length).toFixed(1));
        return { ...prod, rating: avg, reviewCount: prodRevs.length };
      }
      return prod;
    }));

    showToast('Thank you! Your verified review has been published.', 'success');
  };

  const deleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
    showToast('Review deleted from catalog.', 'info');
  };

  // Product Admin Actions
  const addProduct = (newProd: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>) => {
    const created: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [created, ...prev]);
    showToast(`"${created.name}" added to Studio catalog!`, 'success', 'Product Added');
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
    showToast('Product catalog item updated.', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalog.', 'info');
  };

  const categories = useMemo(() => {
    return CATEGORIES_DATA.map(cat => ({
      ...cat,
      count: products.filter(p => p.category === cat.name).length
    }));
  }, [products]);

  return (
    <AppContext.Provider value={{
      products, categories, cart, wishlist, user, orders, reviews,
      activeRoute, selectedProductId, selectedCategoryFilter, searchQuery, toast,
      navigate, addToCart, removeFromCart, updateCartQuantity, clearCart,
      cartCount, cartSubtotal, deliveryFee, cartTotal, toggleWishlist, isInWishlist, moveToCart,
      login, register, logout, updateProfile, addAddress, deleteAddress, setDefaultAddress,
      placeOrder, cancelOrder, returnOrder, adminUpdateOrderStatus,
      addReview, deleteReview, addProduct, updateProduct, deleteProduct,
      setSearchQuery, setSelectedCategoryFilter, showToast, hideToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
