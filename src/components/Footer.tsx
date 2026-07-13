import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Sparkles, Navigation, Clock, Phone, ArrowUp } from 'lucide-react';
import { RESTAURANT_INFO } from '../data';

export default function Footer() {
  const socialIcons = [
    { icon: <Facebook className="w-4 h-4" />, href: RESTAURANT_INFO.socials.facebook, label: "Facebook" },
    { icon: <Instagram className="w-4 h-4" />, href: RESTAURANT_INFO.socials.instagram, label: "Instagram" },
    { icon: <Twitter className="w-4 h-4" />, href: RESTAURANT_INFO.socials.twitter, label: "X / Twitter" },
    { icon: <Youtube className="w-4 h-4" />, href: RESTAURANT_INFO.socials.youtube, label: "YouTube" }
  ];

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-yellow-400/10 relative z-10 pt-16 pb-8">
      {/* Decorative vertical bounds */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand details */}
          <div className="space-y-4">
            <a href="#home" className="flex items-center space-x-2 focus:outline-none" onClick={(e) => { e.preventDefault(); handleScrollTop(); }}>
              <div className="w-8 h-8 rounded-full border border-yellow-400/20 bg-zinc-950 flex items-center justify-center text-yellow-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl font-bold tracking-wide text-white">
                {RESTAURANT_INFO.name}
              </span>
            </a>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              Bringing together the rich, royal culinary traditions of India. Marrying daily hand-ground spices with traditional copper-ware cooking.
            </p>
            {/* Social handles */}
            <div className="flex items-center space-x-3 pt-2">
              {socialIcons.map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-zinc-950 border border-yellow-400/10 text-zinc-400 hover:text-yellow-400 hover:border-yellow-400 hover:scale-105 flex items-center justify-center transition-all"
                  aria-label={soc.label}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation shortcuts */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-bold text-yellow-450">Quick Links</h4>
            <ul className="space-y-2 text-xs text-zinc-300 font-normal">
              <li>
                <a href="#home" className="hover:text-yellow-400 transition-colors">Home Base</a>
              </li>
              <li>
                <a href="#about" className="hover:text-yellow-400 transition-colors">Our Legacy Story</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-yellow-400 transition-colors">Traditional Menu</a>
              </li>
              <li>
                <a href="#chefs" className="hover:text-yellow-400 transition-colors">Expert Kitchen Chefs</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-yellow-400 transition-colors">Atmosphere Gallery</a>
              </li>
              <li>
                <a href="#reservations" className="hover:text-yellow-400 transition-colors">Book a Royal Table</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Location */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-bold text-yellow-450">Find Us</h4>
            <ul className="space-y-3 text-xs text-zinc-300 font-normal">
              <li className="flex items-start space-x-2.5">
                <Navigation className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{RESTAURANT_INFO.address}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>{RESTAURANT_INFO.phone}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="text-yellow-400 font-black uppercase tracking-wider text-[10px] w-4 shrink-0">@</span>
                <span>{RESTAURANT_INFO.email}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Opening Hours Summary */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-bold text-yellow-450">Dine-In Hours</h4>
            <div className="space-y-3 text-xs text-zinc-300 font-normal">
              {RESTAURANT_INFO.openingHours.map((sched, idx) => (
                <div key={idx} className="space-y-0.5">
                  <span className="text-[10px] text-yellow-400 uppercase tracking-widest font-black block leading-none">
                    {sched.days}
                  </span>
                  <span className="text-white font-bold block">
                    {sched.hours}
                  </span>
                </div>
              ))}
              <div className="p-2 bg-zinc-950 border border-yellow-400/10 text-[10px] text-zinc-400 rounded">
                * Weekend deliveries open until midnight.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="border-t border-yellow-400/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-zinc-500 tracking-wide font-semibold">
            © {new Date().getFullYear()} Spice Heritage. All Rights Reserved. Crafted with deep Indian culinary tradition.
          </p>

          {/* Back to top scroll */}
          <button
            onClick={handleScrollTop}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 border border-yellow-400/20 text-yellow-400 hover:text-yellow-350 hover:border-yellow-400 text-[10px] uppercase tracking-wider font-bold font-display transition-all cursor-pointer"
          >
            <span>Back To Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
