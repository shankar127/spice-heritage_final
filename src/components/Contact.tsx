import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Compass, Car, Train, Navigation, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data';

export default function Contact() {
  const [mapOverlay, setMapOverlay] = useState<'default' | 'parking' | 'metro'>('default');

  const contacts = [
    {
      icon: <MapPin className="w-5 h-5 text-yellow-400" />,
      label: "Our Heritage Address",
      value: RESTAURANT_INFO.address,
      link: "https://maps.google.com/?q=" + encodeURIComponent(RESTAURANT_INFO.address)
    },
    {
      icon: <Phone className="w-5 h-5 text-yellow-400" />,
      label: "Call Reservation Desk",
      value: RESTAURANT_INFO.phone,
      link: `tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`
    },
    {
      icon: <Mail className="w-5 h-5 text-yellow-400" />,
      label: "Corporate & Catering Enquiries",
      value: RESTAURANT_INFO.email,
      link: `mailto:${RESTAURANT_INFO.email}`
    }
  ];

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-zinc-950/60 border border-yellow-400/20 text-yellow-400 text-xs tracking-wider uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Find Us Here</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Dine With Us on <span className="text-yellow-400 italic">MG Road</span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-4 font-normal">
            Conveniently situated in the premium dining hub of Indiranagar, Bengaluru. Join us for an unparalleled culinary voyage.
          </p>
        </div>

        {/* Master Grid: Left Info Column, Right Map Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Contact Coordinates & Hours */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Hour Block */}
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-yellow-400/10 shadow-lg space-y-4">
              <div className="flex items-center space-x-2.5 pb-3 border-b border-yellow-400/10">
                <Clock className="w-5 h-5 text-yellow-400" />
                <h4 className="font-serif text-lg font-bold text-yellow-450">Opening Hours</h4>
              </div>
              <div className="space-y-3">
                {RESTAURANT_INFO.openingHours.map((sched, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-zinc-400 uppercase tracking-wider font-bold font-mono text-[10px] sm:text-xs">
                      {sched.days}
                    </span>
                    <span className="font-display font-bold text-yellow-400">
                      {sched.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Connect Blocks */}
            <div className="space-y-4">
              {contacts.map((contact, idx) => (
                <a
                  key={idx}
                  href={contact.link}
                  target={contact.link.startsWith('http') ? '_blank' : undefined}
                  rel={contact.link.startsWith('http') ? 'noreferrer' : undefined}
                  className="p-5 rounded-2xl bg-zinc-950/40 border border-yellow-400/5 hover:border-yellow-400/30 hover:bg-zinc-950 flex items-start space-x-4 transition-all duration-300 group shadow-md"
                >
                  <div className="p-3 rounded-xl bg-black border border-yellow-400/10 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-500">
                    {contact.icon}
                  </div>
                  <div className="overflow-hidden">
                    <span className="block text-[10px] text-yellow-400 font-display font-black uppercase tracking-wider">
                      {contact.label}
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-350 font-normal leading-relaxed mt-1 group-hover:text-yellow-400 transition-colors">
                      {contact.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Premium Interactive Mock Map */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-yellow-400/10 bg-zinc-950 shadow-xl flex flex-col justify-between p-6 relative min-h-[350px]">
            {/* Map Canvas backdrop */}
            <div className="absolute inset-0 z-0 bg-black opacity-90 relative overflow-hidden">
              {/* Drawing abstract grid line vectors */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10 pointer-events-none">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-yellow-400/20" />
                ))}
              </div>
              
              {/* Mock Roads */}
              <div className="absolute top-1/2 left-0 right-0 h-10 bg-zinc-950 border-y border-yellow-400/10 rotate-[-12deg] flex items-center justify-center">
                <span className="text-[9px] font-mono tracking-widest text-yellow-400/20 uppercase font-black">
                  Mahatma Gandhi Road (M.G. Road)
                </span>
              </div>
              <div className="absolute left-1/3 top-0 bottom-0 w-8 bg-zinc-950 border-x border-yellow-400/10 rotate-[20deg]" />

              {/* Major Landmarks / Overlay indicators */}
              {/* Spice Heritage (Centerpiece) */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute top-[48%] left-[45%] z-10 flex flex-col items-center"
              >
                <div className="relative">
                  {/* Glowing rings */}
                  <div className="absolute -inset-2 bg-yellow-400/20 rounded-full animate-ping pointer-events-none" />
                  <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-black flex items-center justify-center text-black shadow-md relative z-10">
                    <Navigation className="w-4 h-4 fill-current rotate-45 text-black" />
                  </div>
                </div>
                <div className="bg-zinc-950 border border-yellow-400/40 rounded px-2 py-0.5 mt-2 shadow-xl">
                  <span className="text-[10px] font-serif font-black text-yellow-400">Spice Heritage</span>
                </div>
              </motion.div>

              {/* Transit Stop Ring */}
              <div className="absolute top-[20%] left-[25%] flex items-center space-x-1">
                <div className={`w-3.5 h-3.5 rounded-full border border-yellow-400/30 flex items-center justify-center bg-black ${mapOverlay === 'metro' ? 'ring-2 ring-yellow-400 scale-110' : ''} transition-all`}>
                  <Train className="w-2 h-2 text-yellow-400" />
                </div>
                <span className="text-[8px] font-display text-zinc-400 uppercase tracking-widest bg-black px-1 py-0.5 rounded font-bold">
                  Indiranagar Metro (200m)
                </span>
              </div>

              {/* Valet Parking Ring */}
              <div className="absolute bottom-[20%] left-[60%] flex items-center space-x-1">
                <div className={`w-3.5 h-3.5 rounded-full border border-yellow-400/30 flex items-center justify-center bg-black ${mapOverlay === 'parking' ? 'ring-2 ring-yellow-400 scale-110' : ''} transition-all`}>
                  <Car className="w-2 h-2 text-yellow-400" />
                </div>
                <span className="text-[8px] font-display text-zinc-400 uppercase tracking-widest bg-black px-1 py-0.5 rounded font-bold">
                  Dedicated Parking Lot
                </span>
              </div>
            </div>

            {/* Map Information overlay card */}
            <div className="relative z-10 self-end w-full max-w-sm p-4 rounded-xl bg-zinc-950/95 border border-yellow-400/20 backdrop-blur-md shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-display font-black text-yellow-400 uppercase tracking-widest">
                  Map Utilities
                </h5>
                <span className="text-[9px] text-green-400 font-bold bg-green-950 px-1.5 py-0.5 rounded uppercase">
                  GPS Active
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setMapOverlay('default')}
                  className={`py-1.5 px-2 rounded-lg text-[10px] font-black uppercase tracking-wider border text-center transition-colors ${
                    mapOverlay === 'default'
                      ? 'bg-yellow-400 text-black border-transparent'
                      : 'bg-zinc-950 text-zinc-300 border-yellow-400/10 hover:border-yellow-400/30'
                  }`}
                >
                  Clear View
                </button>
                <button
                  onClick={() => setMapOverlay('parking')}
                  className={`py-1.5 px-2 rounded-lg text-[10px] font-black uppercase tracking-wider border text-center transition-colors ${
                    mapOverlay === 'parking'
                      ? 'bg-yellow-400 text-black border-transparent'
                      : 'bg-zinc-950 text-zinc-300 border-yellow-400/10 hover:border-yellow-400/30'
                  }`}
                >
                  Valet Lot
                </button>
                <button
                  onClick={() => setMapOverlay('metro')}
                  className={`py-1.5 px-2 rounded-lg text-[10px] font-black uppercase tracking-wider border text-center transition-colors ${
                    mapOverlay === 'metro'
                      ? 'bg-yellow-400 text-black border-transparent'
                      : 'bg-zinc-950 text-zinc-300 border-yellow-400/10 hover:border-yellow-400/30'
                  }`}
                >
                  Metro Route
                </button>
              </div>

              <p className="text-[10px] text-zinc-400 leading-relaxed font-normal">
                {mapOverlay === 'default' && "Centering on 45 MG Road. Valet parking is located at the building rear. Highchairs available."}
                {mapOverlay === 'parking' && "Yes, we provide secure free valet parking for cars and two-wheelers. Ring desk upon arrival!"}
                {mapOverlay === 'metro' && "Nearest metro is Indiranagar Purple Line Station. 3-minute walking distance down MG Road."}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
