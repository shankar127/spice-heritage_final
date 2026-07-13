import React from 'react';
import { ShieldCheck, HeartHandshake, Flame, Timer, Sparkles, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data';

export default function About() {
  const highlights = [
    {
      icon: <Flame className="w-6 h-6 text-yellow-400" />,
      title: "Traditional Recipes",
      desc: "Authentic, time-tested preparation techniques passed down through generations."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-yellow-400" />,
      title: "Hygienic & Fresh",
      desc: "Top-tier kitchen hygiene standards, with fresh organic ingredients sourced daily."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-yellow-400" />,
      title: "Cozy Ambience & Service",
      desc: "Elegant wood-and-brass seating with a warm, friendly, and attentive waitstaff."
    },
    {
      icon: <Timer className="w-6 h-6 text-yellow-400" />,
      title: "Affordable & Speedy",
      desc: "Delivering mouthwatering fine-dining taste at comfortable neighborhood prices."
    }
  ];

  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      {/* Decorative arch background detail mimicking the reference layout */}
      <div className="absolute right-0 top-1/4 w-[400px] h-[600px] border border-yellow-400/5 rounded-l-full pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[400px] h-[600px] border border-yellow-400/5 rounded-r-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-2">
              <span className="w-8 h-[1px] bg-yellow-400" />
              <span className="text-xs font-display font-black tracking-widest text-yellow-400 uppercase">
                Our Story
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Where Culinary Heritage Meets <span className="text-yellow-400 italic">Modern Passion</span>
            </h2>

            <p className="text-zinc-300 text-base leading-relaxed font-normal">
              Spice Heritage brings together the rich culinary traditions of India under one roof. Established in 2018 in the heart of Bengaluru by Arjun Mehta, our vision is to curate an unforgettable dining landscape where authentic legacy blends with contemporary premium presentation.
            </p>

            <p className="text-zinc-300 text-base leading-relaxed font-normal">
              From aromatic slow-cooked biryanis and clay-oven butter chicken to golden crispy dosas and flavorful vegan specialties, every single meal is prepared using freshly-ground spices, zero preservatives, and deep-seated devotion.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-zinc-800/60">
              <div>
                <span className="block font-serif text-3xl font-bold text-yellow-400">2018</span>
                <span className="text-xs text-zinc-400 uppercase tracking-widest mt-1 block">Established</span>
              </div>
              <div>
                <span className="block font-serif text-3xl font-bold text-yellow-400">100%</span>
                <span className="text-xs text-zinc-400 uppercase tracking-widest mt-1 block">Fresh Spices</span>
              </div>
              <div>
                <span className="block font-serif text-3xl font-bold text-yellow-400">5+</span>
                <span className="text-xs text-zinc-400 uppercase tracking-widest mt-1 block">Cuisine Types</span>
              </div>
            </div>
          </div>

          {/* Right Visual Highlight Block (The Why Choose Us Bento Grid) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-left mb-4">
              <h3 className="font-serif text-2xl font-bold text-yellow-100">
                Why Choose Us?
              </h3>
              <p className="text-xs font-display text-yellow-400 uppercase tracking-widest mt-1 font-semibold">
                Handcrafted Standards of Excellence
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {highlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4, borderColor: 'rgba(250, 204, 21, 0.4)' }}
                  className="p-5 rounded-xl bg-zinc-950/80 border border-yellow-400/10 shadow-lg flex items-start space-x-4 transition-all duration-300"
                >
                  <div className="p-2.5 rounded-lg bg-black border border-yellow-400/20 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-yellow-400 text-sm">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed mt-1 font-normal">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
