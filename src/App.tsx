/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { OrderHistory } from './pages/OrderHistory';
import { UserProfile } from './pages/UserProfile';
import { Auth } from './pages/Auth';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { AdminDashboard } from './pages/AdminDashboard';

const MainLayout: React.FC = () => {
  const { activeRoute } = useApp();

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeRoute]);

  const renderPage = () => {
    switch (activeRoute) {
      case 'home':
        return <Home />;
      case 'shop':
        return <Shop />;
      case 'product-details':
        return <ProductDetails />;
      case 'cart':
        return <Cart />;
      case 'wishlist':
        return <Wishlist />;
      case 'checkout':
        return <Checkout />;
      case 'order-confirmation':
        return <OrderConfirmation />;
      case 'order-history':
        return <OrderHistory />;
      case 'profile':
        return <UserProfile />;
      case 'auth':
        return <Auth />;
      case 'about':
        return <AboutUs />;
      case 'contact':
        return <ContactUs />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8ECE1] text-[#1E1A17] font-sans selection:bg-[#CCA37E] selection:text-[#1E1A17]">
      <Toast />
      <Navbar />
      
      <main className="flex-1 w-full animate-in fade-in duration-300">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
