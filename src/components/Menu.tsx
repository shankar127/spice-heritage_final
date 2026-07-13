import React, { useState, useMemo } from 'react';
import { Search, Sparkles, SlidersHorizontal, Check, Plus, Minus, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from '../data';
import { MenuItem, MenuCategory } from '../types';

interface MenuProps {
  onAddToCart: (item: MenuItem, quantity: number, instructions?: string) => void;
}

const CATEGORY_DATA = {
  'starters': {
    label: 'Starters',
    desc: 'Sizzling tandoori clay-oven skewers',
    image: '/src/assets/images/paneer_tikka_1783514111288.jpg'
  },
  'main-course': {
    label: 'Main Course',
    desc: 'Rich, creamy and slow-cooked Indian classics',
    image: '/src/assets/images/butter_chicken_1783514073856.jpg'
  },
  'indian-breads': {
    label: 'Indian Breads',
    desc: 'Soft and crispy freshly baked tandoor breads',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=200'
  },
  'desserts': {
    label: 'Desserts',
    desc: 'Decadent sweet endings infused with saffron',
    image: '/src/assets/images/rasmalai_dessert_1783521149984.jpg'
  },
  'beverages': {
    label: 'Beverages',
    desc: 'Chilled traditional lassis and organic infusions',
    image: 'https://images.unsplash.com/photo-1571006831614-419b48b7f805?auto=format&fit=crop&q=80&w=200'
  },
};

export default function Menu({ onAddToCart }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('starters');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);
  
  // Customizer modal state
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [customQty, setCustomQty] = useState(1);
  const [customInstructions, setCustomInstructions] = useState('');

  // Filtering menu items based on category, search query, veg, and popular status
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = !vegOnly || item.isVegetarian;
      const matchesPopular = !popularOnly || item.popular;
      
      return matchesCategory && matchesSearch && matchesVeg && matchesPopular;
    });
  }, [selectedCategory, searchQuery, vegOnly, popularOnly]);

  const handleOpenCustomizer = (item: MenuItem) => {
    setCustomizingItem(item);
    setCustomQty(1);
    setCustomInstructions('');
  };

  const handleCloseCustomizer = () => {
    setCustomizingItem(null);
  };

  const handleAddCustomized = () => {
    if (customizingItem) {
      onAddToCart(customizingItem, customQty, customInstructions);
      handleCloseCustomizer();
    }
  };

  return (
    <section id="menu" className="py-24 bg-black relative">
      {/* Visual background details */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-zinc-950/60 border border-yellow-400/20 text-yellow-400 text-xs tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Premium Taste</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Our Handcrafted <span className="text-yellow-400 italic">Culinary Menu</span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-4 font-normal">
            Each recipe blends daily stone-ground Indian spices with fresh locally sourced ingredients, slow-cooked in traditional brass copperware.
          </p>
        </div>

        {/* Filter Toolbar (Search & Veg Buttons) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950 border border-yellow-400/10 mb-12 shadow-md">
          {/* Search bar */}
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-400" />
            <input
              type="text"
              placeholder="Search dishes... (e.g. Biryani, Naan)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-yellow-400/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all font-semibold"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase border transition-all duration-300 cursor-pointer ${
                vegOnly
                  ? 'bg-emerald-950/60 text-emerald-450 border-emerald-500/50'
                  : 'bg-zinc-900/40 text-zinc-300 border-yellow-400/10 hover:border-yellow-400/35'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${vegOnly ? 'bg-emerald-400' : 'bg-zinc-650'}`} />
              <span>Veg Only</span>
            </button>

            <button
              onClick={() => setPopularOnly(!popularOnly)}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase border transition-all duration-300 cursor-pointer ${
                popularOnly
                  ? 'bg-yellow-450 text-black border-yellow-400'
                  : 'bg-zinc-900/40 text-zinc-300 border-yellow-400/10 hover:border-yellow-400/35'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${popularOnly ? 'text-black' : 'text-zinc-650'}`} />
              <span>Chef Popular</span>
            </button>
          </div>
        </div>

        {/* Master Layout: Left sidebar category list, Right grid list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Category Column Sidebar */}
          <div className="lg:col-span-3 space-y-3 lg:sticky lg:top-28">
            <p className="text-xs font-display text-yellow-400/50 uppercase tracking-widest pl-3 mb-2 font-black">
              Menu Categories
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {(Object.keys(CATEGORY_DATA) as MenuCategory[]).map((catKey) => {
                const item = CATEGORY_DATA[catKey];
                const isActive = selectedCategory === catKey;
                return (
                  <button
                    key={catKey}
                    onClick={() => {
                      setSelectedCategory(catKey);
                      setSearchQuery(''); // Reset search when switching categories
                    }}
                    className={`flex items-center space-x-3 p-3 rounded-2xl border text-left transition-all duration-300 group cursor-pointer ${
                      isActive
                        ? 'bg-zinc-900 text-white border-yellow-400/55 shadow-md'
                        : 'bg-zinc-950/50 text-zinc-400 border-yellow-400/10 hover:border-yellow-400/30 hover:bg-zinc-950'
                    }`}
                  >
                    {/* Category Image Preview Thumbnail */}
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-yellow-400/10 relative">
                      <img
                        src={item.image}
                        alt={item.image.includes('paneer_tikka') ? 'Paneer Tikka' : item.image.includes('butter_chicken') ? 'Butter Chicken' : item.label}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className={`text-xs sm:text-sm font-bold truncate ${isActive ? 'text-yellow-400' : 'text-zinc-200 group-hover:text-yellow-400'}`}>
                        {item.label}
                      </h4>
                      <p className="text-[10px] text-zinc-400 truncate hidden lg:block font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Category Items Grid Panel */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-baseline justify-between border-b border-yellow-400/10 pb-3">
              <div>
                <h3 className="font-serif text-2xl font-bold text-yellow-400">
                  {CATEGORY_DATA[selectedCategory].label}
                </h3>
                <p className="text-xs text-zinc-400 italic mt-0.5">
                  {CATEGORY_DATA[selectedCategory].desc}
                </p>
              </div>
              <span className="text-xs text-zinc-500 font-display font-semibold">
                Showing {filteredItems.length} items
              </span>
            </div>

            {filteredItems.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-yellow-400/15 bg-zinc-950/30">
                <Info className="w-10 h-10 text-yellow-400/40 mx-auto mb-3" />
                <p className="text-white font-bold">No dishes match your active filter.</p>
                <p className="text-xs text-zinc-400 mt-1">Try resetting the veg filter or search keywords.</p>
                {(vegOnly || popularOnly || searchQuery) && (
                  <button
                    onClick={() => {
                      setVegOnly(false);
                      setPopularOnly(false);
                      setSearchQuery('');
                    }}
                    className="mt-4 px-4 py-2 rounded-lg bg-zinc-900 border border-yellow-400/20 text-yellow-400 text-xs hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    Reset Active Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ y: -6 }}
                      className="group rounded-2xl border border-yellow-400/5 bg-zinc-950 hover:bg-black overflow-hidden flex flex-col justify-between shadow-lg transition-all duration-300 hover:border-yellow-400/25"
                    >
                      {/* Image Frame with gold border curves similar to reference */}
                      <div className="relative aspect-4/3 w-full overflow-hidden bg-zinc-900 border-b border-yellow-400/5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        {/* Overlay badges */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex items-end justify-between">
                          <div className="flex items-center space-x-1.5">
                            {/* Veg / Non-Veg Indicator Dot */}
                            <span className={`w-5 h-5 flex items-center justify-center border rounded p-0.5 flex-shrink-0 ${item.isVegetarian ? 'border-emerald-500 bg-emerald-950/80' : 'border-red-500 bg-red-950/80'}`}>
                              <span className={`w-2 h-2 rounded-full ${item.isVegetarian ? 'bg-emerald-400' : 'bg-red-400'}`} />
                            </span>
                            <span className="text-[10px] text-white font-bold bg-black/60 px-2 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-xs">
                              {item.isVegetarian ? 'Vegetarian' : 'Non-Veg'}
                            </span>
                          </div>
                          
                          {item.popular && (
                            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-yellow-400 text-black text-[10px] font-black uppercase tracking-wider shadow-md">
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>Chef Specialty</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Info & Content */}
                      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-serif text-lg font-bold text-white group-hover:text-yellow-400 transition-colors leading-tight">
                              {item.name}
                            </h4>
                            <span className="font-serif text-lg font-bold text-yellow-400 shrink-0">
                              ₹{item.price}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed font-normal line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-yellow-400/5">
                          <div className="flex items-center text-xs text-yellow-400 font-bold">
                            <span className="text-yellow-400 mr-1">★ 4.8</span>
                            <span className="text-[10px] text-zinc-500 font-normal">(80+ orders)</span>
                          </div>
                          <button
                            onClick={() => handleOpenCustomizer(item)}
                            className="px-4 py-2 rounded-lg bg-black hover:bg-yellow-400 border border-yellow-400/10 hover:border-transparent text-yellow-400 hover:text-black text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CUSTOMIZER MODAL */}
      <AnimatePresence>
        {customizingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseCustomizer}
              className="absolute inset-0 bg-black/85 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-950 border border-yellow-400/10 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              <button
                onClick={handleCloseCustomizer}
                className="absolute top-4 right-4 p-2 rounded-full bg-black border border-yellow-400/20 text-zinc-300 hover:text-yellow-400 hover:scale-105 transition-all z-20 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Large Image Frame */}
              <div className="h-56 relative overflow-hidden bg-zinc-900">
                <img
                  src={customizingItem.image}
                  alt={customizingItem.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                  <span className={`w-5 h-5 flex items-center justify-center border rounded p-0.5 ${customizingItem.isVegetarian ? 'border-emerald-500 bg-emerald-950/90' : 'border-red-500 bg-red-950/90'}`}>
                    <span className={`w-2 h-2 rounded-full ${customizingItem.isVegetarian ? 'bg-emerald-400' : 'bg-red-400'}`} />
                  </span>
                  <span className="text-xs text-white font-bold font-display bg-black border border-yellow-400/20 px-2 py-0.5 rounded">
                    {customizingItem.isVegetarian ? 'Pure Vegetarian' : 'Non-Veg'}
                  </span>
                </div>
              </div>

              {/* Modal Details */}
              <div className="p-6 space-y-5 flex-grow">
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {customizingItem.name}
                    </h3>
                    <span className="font-serif text-xl font-bold text-yellow-400">
                      ₹{customizingItem.price}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed mt-2 font-normal">
                    {customizingItem.description}
                  </p>
                </div>

                {/* Adjust Quantity */}
                <div className="space-y-2">
                  <label className="text-xs font-display text-yellow-400 uppercase tracking-widest font-black block">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center rounded-xl bg-black border border-yellow-400/15 p-1">
                      <button
                        onClick={() => setCustomQty(Math.max(1, customQty - 1))}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-yellow-400 hover:bg-zinc-900 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center font-display font-black text-white text-sm">
                        {customQty}
                      </span>
                      <button
                        onClick={() => setCustomQty(customQty + 1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-yellow-400 hover:bg-zinc-900 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-sm font-display text-zinc-400 font-semibold">
                      Subtotal: <span className="font-serif font-bold text-yellow-400">₹{customizingItem.price * customQty}</span>
                    </span>
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="space-y-2">
                  <label className="text-xs font-display text-yellow-400 uppercase tracking-widest font-black block">
                    Chef Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. 'Make it spicy', 'No coriander', 'Add extra lemon'"
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black border border-yellow-400/10 text-white placeholder-zinc-650 text-xs focus:outline-none focus:border-yellow-400 transition-all resize-none font-semibold"
                  />
                </div>
              </div>

              {/* Footer Trigger */}
              <div className="p-4 bg-zinc-900 border-t border-yellow-400/10 flex gap-3">
                <button
                  onClick={handleCloseCustomizer}
                  className="flex-1 py-3 rounded-xl border border-yellow-400/25 text-white font-display text-xs font-bold uppercase tracking-wider hover:bg-zinc-950 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCustomized}
                  className="flex-1 py-3 rounded-xl bg-yellow-400 text-black hover:bg-yellow-300 font-display text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Add to Basket
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
