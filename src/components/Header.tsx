import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Calendar, Sparkles, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RESTAURANT_INFO } from '../data';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenAuth: () => void;
  currentUser: { email: string; name: string } | null;
  onLogout: () => void;
  onOpenDashboard: () => void;
  onOpenCustomerDashboard: () => void;
}

export default function Header({
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenAuth,
  currentUser,
  onLogout,
  onOpenDashboard,
  onOpenCustomerDashboard
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Track active section on scroll
      const sections = ['home', 'about', 'menu', 'chefs', 'gallery', 'reservations', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Menu', href: '#menu', id: 'menu' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    // A small delay ensures the mobile menu closes and page layout stabilizes before we compute scroll position
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 85; // Height of the sticky navbar + padding safety
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 180);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-yellow-400/20 py-3 shadow-lg shadow-yellow-400/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center space-x-3 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#home');
            }}
          >
            <div className="relative w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-400/20 transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="font-sans text-xl font-black tracking-tight text-yellow-400 uppercase block">
                {RESTAURANT_INFO.name}
              </span>
              <p className="text-[9px] font-sans text-yellow-400/80 font-bold tracking-[0.2em] uppercase leading-none mt-0.5">
                CRAFTED TRADITION
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`text-sm font-semibold transition-colors relative py-1 focus:outline-none ${
                  activeSection === link.id
                    ? 'text-yellow-400'
                    : 'text-yellow-100/70 hover:text-yellow-400'
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-yellow-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-yellow-100/70 hover:text-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-lg group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-6 h-6 text-yellow-100/70 group-hover:scale-110 group-hover:text-yellow-400 transition-all" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[10px] font-black font-sans w-5 h-5 flex items-center justify-center rounded-full shadow-md shadow-yellow-400/20"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </button>



            {/* Premium Auth Button */}
            {currentUser ? (
              <div className="hidden md:flex items-center space-x-3 bg-zinc-950/80 border border-yellow-400/30 px-4 py-1.5 rounded-full">
                <button
                  onClick={onOpenCustomerDashboard}
                  title="Open Patron Lounge"
                  className="text-xs font-bold text-yellow-400 hover:text-white font-sans cursor-pointer flex items-center space-x-1 transition-all duration-300"
                >
                  <Sparkles className="w-3 h-3 animate-pulse text-yellow-400" />
                  <span>{currentUser.name}</span>
                </button>
                <span className="text-zinc-700">|</span>
                <button
                  onClick={onLogout}
                  className="text-[10px] text-yellow-100/60 hover:text-red-400 uppercase tracking-wider font-black transition-all cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="hidden md:flex items-center space-x-1.5 px-5 py-2 bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-sans text-xs font-black tracking-wider uppercase rounded-full transition-all duration-300"
              >
                <span>Login / Register</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-yellow-100/70 hover:text-yellow-400 focus:outline-none lg:hidden rounded-lg"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 border-b border-yellow-400/20 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`block px-3 py-2 rounded-lg text-base font-semibold transition-colors ${
                    activeSection === link.id
                      ? 'bg-yellow-400/10 text-yellow-400 border-l-4 border-yellow-400'
                      : 'text-yellow-100/70 hover:bg-yellow-400/5 hover:text-yellow-400'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 px-3 space-y-2">


                {currentUser ? (
                  <div className="pt-2 border-t border-yellow-400/10 space-y-2">
                    <div className="text-center text-xs font-bold text-yellow-400">
                      Logged in as: {currentUser.name}
                    </div>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenCustomerDashboard();
                      }}
                      className="w-full py-2.5 bg-yellow-400 text-black font-sans text-xs font-black uppercase tracking-wider rounded-full shadow-lg shadow-yellow-400/15 cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      <span>My Patron Lounge</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full py-2.5 bg-zinc-900 text-yellow-100 font-sans text-xs font-bold uppercase rounded-full border border-yellow-400/20"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenAuth();
                    }}
                    className="w-full py-2.5 bg-transparent text-yellow-400 border-2 border-yellow-400 font-sans text-xs font-black uppercase rounded-full"
                  >
                    Login / Register
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
