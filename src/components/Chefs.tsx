import React from 'react';
import { ChefHat, Facebook, Instagram, Twitter, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { CHEFS } from '../data';

export default function Chefs() {
  return (
    <section id="chefs" className="py-24 bg-black relative overflow-hidden">
      {/* Decorative vector background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-zinc-950/60 border border-yellow-400/20 text-yellow-400 text-xs tracking-wider uppercase mb-3">
            <ChefHat className="w-3.5 h-3.5" />
            <span>Master Craftsmen</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Our Elite <span className="text-yellow-400 italic">Heritage Chefs</span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-4 font-normal">
            Bringing decades of seasoned experience and culinary precision to recreate authentic slow-cooked Indian legacy dishes.
          </p>
        </div>

        {/* Chefs Grid (Inspired by the precise curves in the uploaded reference image) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {CHEFS.map((chef, idx) => (
            <motion.div
              key={chef.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Profile Image Frame with Reference-Inspired Curved Arcs */}
              <div className="relative w-48 h-48 mb-6">
                {/* Decorative gold track line wrapping around the circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90 scale-105 pointer-events-none opacity-60 group-hover:opacity-100 group-hover:rotate-0 transition-all duration-1000">
                  <circle
                    cx="96"
                    cy="96"
                    r="92"
                    stroke="#facc15"
                    strokeWidth="1.5"
                    fill="transparent"
                    strokeDasharray="200 400"
                    className="transition-all"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="84"
                    stroke="#27272a"
                    strokeWidth="1"
                    fill="transparent"
                    className="transition-all"
                  />
                </svg>

                {/* Main Profile Portrait */}
                <div className="w-full h-full rounded-full overflow-hidden border border-yellow-400/10 p-2 bg-zinc-950 shadow-xl relative z-10">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Mini Golden Sparkle Tag */}
                <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center text-black shadow-md relative z-20 hover:scale-110 transition-transform">
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                </div>
              </div>

              {/* Name & Role */}
              <div className="space-y-1.5 px-4">
                <h4 className="font-serif text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                  {chef.name}
                </h4>
                <p className="text-xs font-display text-yellow-400 uppercase tracking-widest font-black">
                  {chef.role}
                </p>
                <p className="text-xs text-zinc-300 leading-relaxed font-normal mt-3 max-w-xs">
                  {chef.bio}
                </p>
              </div>

              {/* Social Media Link Icons */}
              <div className="flex items-center space-x-3 mt-5">
                <a
                  href={chef.facebook || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-zinc-950 border border-yellow-400/10 text-zinc-400 hover:text-yellow-400 hover:border-yellow-400 hover:scale-105 transition-all"
                  aria-label={`${chef.name}'s Facebook`}
                >
                  <Facebook className="w-4 h-4 text-zinc-400 hover:text-black" />
                </a>
                <a
                  href={chef.instagram || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-zinc-950 border border-yellow-400/10 text-zinc-400 hover:text-yellow-400 hover:border-yellow-400 hover:scale-105 transition-all"
                  aria-label={`${chef.name}'s Instagram`}
                >
                  <Instagram className="w-4 h-4 text-zinc-400 hover:text-black" />
                </a>
                <a
                  href={chef.twitter || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-zinc-950 border border-yellow-400/10 text-zinc-400 hover:text-yellow-400 hover:border-yellow-400 hover:scale-105 transition-all"
                  aria-label={`${chef.name}'s Twitter`}
                >
                  <Twitter className="w-4 h-4 text-zinc-400 hover:text-black" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
