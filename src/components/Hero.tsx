import React from 'react';
import { ChevronRight, ArrowRight, Star, Award, ChefHat, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenReservation: () => void;
}

export default function Hero({ onExploreMenu, onOpenReservation }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-black">
      {/* Background with Ambient Premium Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/spice_heritage_hero_1783514009155.jpg"
          alt="Spice Heritage Dining Experience"
          className="w-full h-full object-cover opacity-35 transform scale-105 filter brightness-75"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />
      </div>

      {/* Floating Yellow Sparkles & Glow Particles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col items-center text-center">
        {/* Decorative Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/35 text-yellow-450 text-xs font-black uppercase tracking-wider mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/5"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span className="text-yellow-400">ESTABLISHED {RESTAURANT_INFO.established} • BENGALURU</span>
        </motion.div>

        {/* Catchy Serif Title with gold accents */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white max-w-4xl leading-[1.05]"
        >
          Flavors Unleashed
          <br />
          <span className="text-yellow-400 italic font-serif font-semibold">
            Your Culinary Escape
          </span>
        </motion.h1>

        {/* Dynamic Tagline and description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-zinc-200 text-base sm:text-xl max-w-2xl mt-6 font-sans font-medium leading-relaxed drop-shadow-md"
        >
          {RESTAURANT_INFO.tagline}. Discover a mosaic of culinary excellence, from farm-fresh tandoori marinades to simmered copper-pot gravies.
        </motion.p>

        {/* Action Callouts */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full max-w-md"
        >
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-yellow-400 text-black hover:bg-yellow-350 font-sans font-black tracking-wider uppercase text-sm transition-all duration-300 shadow-xl shadow-yellow-400/20 flex items-center justify-center space-x-2 group"
          >
            <span>Order Online</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-yellow-400 bg-transparent text-yellow-400 hover:bg-yellow-400 hover:text-black font-sans font-black tracking-wider uppercase text-sm transition-all duration-300 flex items-center justify-center space-x-2 group"
          >
            <span>Reserve Table</span>
            <ChevronRight className="w-4 h-4 text-yellow-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Achievement Badges - Styled as beautiful bento cards in Vibrant theme */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-20 w-full max-w-4xl"
        >
          {/* Stat 1 */}
          <div className="flex items-center space-x-4 px-6 py-4 rounded-2xl bg-zinc-950/80 border border-yellow-400/20 shadow-sm hover:border-yellow-400/40 transition-colors group">
            <div className="w-14 h-14 rounded-full flex items-center justify-center border border-yellow-400/20 bg-yellow-400/10 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-500 shadow-sm flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="block font-sans text-2xl font-black text-yellow-400 leading-none">6+</span>
              <span className="text-xs text-zinc-400 font-sans uppercase tracking-wider font-bold mt-1 block leading-tight">
                National Awards
              </span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center space-x-4 px-6 py-4 rounded-2xl bg-zinc-950/80 border border-yellow-400/20 shadow-sm hover:border-yellow-400/40 transition-colors group">
            <div className="w-14 h-14 rounded-full flex items-center justify-center border border-yellow-400/20 bg-yellow-400/10 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-500 shadow-sm flex-shrink-0">
              <ChefHat className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="block font-sans text-2xl font-black text-yellow-400 leading-none">3 Elite</span>
              <span className="text-xs text-zinc-400 font-sans uppercase tracking-wider font-bold mt-1 block leading-tight">
                Traditional Chefs
              </span>
            </div>
          </div>

          {/* Stat 3 - Solid Yellow Highlight Box for Visual Asymmetry */}
          <div className="flex items-center space-x-4 px-6 py-4 rounded-2xl bg-yellow-400 text-black shadow-xl shadow-yellow-400/20 hover:bg-yellow-350 transition-colors group">
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-black/20 text-black group-hover:scale-110 transition-transform duration-500 shadow-sm flex-shrink-0">
              <Star className="w-6 h-6 fill-current text-black" />
            </div>
            <div className="text-left">
              <span className="block font-sans text-2xl font-black text-black leading-none">4.7★</span>
              <span className="text-xs text-zinc-900 font-sans uppercase tracking-wider font-bold mt-1 block leading-tight">
                1,850+ Real Reviews
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
