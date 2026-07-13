/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Chefs from './components/Chefs';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import OrderDrawer from './components/OrderDrawer';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import CustomerDashboard from './components/CustomerDashboard';
import { MenuItem, CartItem, Reservation } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, X } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isCustomerDashboardOpen, setIsCustomerDashboardOpen] = useState(false);
  
  // Premium Authentication states
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [openPortalAfterAuth, setOpenPortalAfterAuth] = useState(false);
  
  // Active Customer Dashboard Tab state
  const [customerDashboardTab, setCustomerDashboardTab] = useState<'dashboard' | 'reservation' | 'order' | 'cart' | 'coupons' | 'settings'>('dashboard');
  // Pending cart item for post-auth action
  const [pendingCartItem, setPendingCartItem] = useState<{ menuItem: MenuItem; quantity: number; instructions?: string } | null>(null);

  // Custom Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isErrorAlertMessage = toastMessage
    ? /error|fail|invalid|please fill|must|please login|authenticate/i.test(toastMessage)
    : false;
  const shouldDimContent = Boolean(toastMessage) && !isAuthOpen;

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      // If it's an error/alert message, we do not auto-dismiss it. It stays until user clicks OK.
      if (!isErrorAlertMessage) {
        const timer = setTimeout(() => {
          setToastMessage(null);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [toastMessage]);

  // Protected Routes & Portals Guard: Force close portals if there is no authenticated session
  useEffect(() => {
    if (!currentUser) {
      setIsDashboardOpen(false);
      setIsCustomerDashboardOpen(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (isAuthOpen) {
      setToastMessage(null);
    }
  }, [isAuthOpen]);

  // Shopping Basket Actions
  const handleAddToCart = (menuItem: MenuItem, quantity: number, instructions?: string) => {
    if (!currentUser) {
      setPendingCartItem({ menuItem, quantity, instructions });
      setToastMessage("Please login/register first to add items to your royal basket.");
      setCustomerDashboardTab('cart');
      setIsAuthOpen(true);
      return;
    }

    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex((item) => item.menuItem.id === menuItem.id);
      
      if (existingIdx > -1) {
        // Update existing quantity and instructions
        const updated = [...prevItems];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + quantity,
          specialInstructions: instructions || updated[existingIdx].specialInstructions
        };
        return updated;
      } else {
        // Add new item
        return [...prevItems, { menuItem, quantity, specialInstructions: instructions }];
      }
    });

    // Show beautiful success notification toast and open customer portal cart tab
    setToastMessage(`Added ${quantity}x ${menuItem.name} to your basket!`);
    setCustomerDashboardTab('cart');
    setIsCustomerDashboardOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.menuItem.id === itemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.menuItem.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleExploreMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      const headerOffset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenReservation = () => {
    if (!currentUser) {
      setOpenPortalAfterAuth(true);
      setToastMessage("Please authenticate first to reserve a royal table.");
      setCustomerDashboardTab('reservation');
      setIsAuthOpen(true);
    } else {
      setCustomerDashboardTab('reservation');
      setIsCustomerDashboardOpen(true);
    }
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="relative min-h-screen bg-black text-yellow-100 font-sans selection:bg-yellow-400 selection:text-black">
      
      {/* Main app content */}
      <div className={`transition-all duration-150 ease-out ${
        shouldDimContent ? "opacity-60" : "opacity-100"
      }`}>
        {/* HEADER NAVBAR */}
        <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={handleOpenReservation}
        onOpenAuth={() => {
          setToastMessage(null);
          setOpenPortalAfterAuth(false);
          setIsAuthOpen(true);
        }}
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          setToastMessage('Logged out. Visit again soon!');
        }}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onOpenCustomerDashboard={() => {
          if (!currentUser) {
            setToastMessage(null);
            setOpenPortalAfterAuth(true);
            setToastMessage("Please authenticate first to access your royal lounge.");
            setCustomerDashboardTab('dashboard');
            setIsAuthOpen(true);
          } else {
            setCustomerDashboardTab('dashboard');
            setIsCustomerDashboardOpen(true);
          }
        }}
      />

      {/* DASHBOARD STAFF PORTAL */}
      <AnimatePresence>
        {isDashboardOpen && currentUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <Dashboard 
              onClose={() => setIsDashboardOpen(false)} 
              onAddToast={(msg) => setToastMessage(msg)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* DASHBOARD CUSTOMER PORTAL */}
      <AnimatePresence>
        {isCustomerDashboardOpen && currentUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <CustomerDashboard
              onClose={() => setIsCustomerDashboardOpen(false)}
              onAddToast={(msg) => setToastMessage(msg)}
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              currentUser={currentUser}
              onLogout={() => {
                setCurrentUser(null);
                setToastMessage("Signed out of your royal lounge. Farewell!");
              }}
              initialTab={customerDashboardTab}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE PAGES & SECTIONS */}
      <main>
        {/* HERO BANNER */}
        <Hero
          onExploreMenu={handleExploreMenu}
          onOpenReservation={handleOpenReservation}
        />

        {/* ABOUT SECTION */}
        <About />

        {/* INTERACTIVE MENU */}
        <Menu onAddToCart={handleAddToCart} />

        {/* OUR ELITE CHEFS */}
        <Chefs />

        {/* ATMOSPHERE GALLERY */}
        <Gallery />

        {/* REVIEWS & TESTIMONIALS */}
        <Testimonials />

        {/* FREQUENT diner FAQ */}
        <Faq />

        {/* COORDINATES & INTERACTIVE MAP */}
        <Contact />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* ORDER BASKET DRAWERS (SLIDING PANEL) */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onAddToast={(msg) => setToastMessage(msg)}
      />

      {/* PREMIUM AUTHENTICATION MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAddToast={(msg) => setToastMessage(msg)}
        onSuccess={(user, isStaff) => {
          setCurrentUser(user);
          if (isStaff) {
            setToastMessage(`Welcome, Staff Member ${user.name}! Accessing Kitchen Terminal.`);
            setIsDashboardOpen(true);
          } else {
            setToastMessage(`Namaste, ${user.name}! Welcome back to your Royal Lounge.`);
            setIsCustomerDashboardOpen(true);
            setOpenPortalAfterAuth(false);

            // Handle pending cart item adding and redirection
            if (pendingCartItem) {
              setCartItems((prevItems) => {
                const existingIdx = prevItems.findIndex((item) => item.menuItem.id === pendingCartItem.menuItem.id);
                if (existingIdx > -1) {
                  const updated = [...prevItems];
                  updated[existingIdx] = {
                    ...updated[existingIdx],
                    quantity: updated[existingIdx].quantity + pendingCartItem.quantity,
                    specialInstructions: pendingCartItem.instructions || updated[existingIdx].specialInstructions
                  };
                  return updated;
                } else {
                  return [...prevItems, { menuItem: pendingCartItem.menuItem, quantity: pendingCartItem.quantity, specialInstructions: pendingCartItem.instructions }];
                }
              });
              setToastMessage(`Added ${pendingCartItem.quantity}x ${pendingCartItem.menuItem.name} to your basket!`);
              setPendingCartItem(null);
            }
          }
        }}
      />

      </div>

      {/* ELEGANT AUTOMATIC DISMISS TOAST & BACKDROP OVERLAY */}
      <AnimatePresence>
        {toastMessage && (
          <>
            {/* Dark blur backdrop overlay behind the toast */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="fixed inset-0 bg-black/70 z-30 pointer-events-auto"
              onClick={() => setToastMessage(null)}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 40 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                className={`pointer-events-auto px-8 py-6 rounded-3xl border bg-zinc-950 text-yellow-100 shadow-[0_0_80px_rgba(250,204,21,0.25)] flex flex-col items-center text-center max-w-md ${
                  isErrorAlertMessage
                    ? 'border-red-500 shadow-red-500/20' 
                    : 'border-yellow-400 shadow-yellow-400/25'
                }`}
              >
                {/* Bigger icon with pulse effect */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 mb-4 animate-pulse ${
                  isErrorAlertMessage
                    ? 'bg-red-950/40 border-red-500 text-red-400' 
                    : 'bg-yellow-400/10 border-yellow-400 text-yellow-400'
                }`}>
                  {isErrorAlertMessage ? (
                    <X className="w-8 h-8" />
                  ) : (
                    <Check className="w-8 h-8" />
                  )}
                </div>

                <div className="space-y-1">
                  <span className={`text-[11px] font-bold block uppercase font-mono tracking-widest ${
                    isErrorAlertMessage
                      ? 'text-red-400' 
                      : 'text-yellow-400'
                  }`}>
                    {isErrorAlertMessage ? 'Alert' : 'Royal Lounge Notice'}
                  </span>
                  <p className="text-sm font-semibold text-white leading-relaxed mt-1">{toastMessage}</p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setToastMessage(null)}
                  className="mt-6 px-6 py-2 rounded-xl bg-yellow-400 text-black hover:bg-yellow-300 text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                >
                  Dismiss Notice
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
