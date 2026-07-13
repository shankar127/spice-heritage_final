import React, { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquareCode } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto-slide every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden border-y border-yellow-400/10">
      {/* Decorative vectors */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-zinc-950/60 border border-yellow-400/20 text-yellow-400 text-xs tracking-wider uppercase mb-3">
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span>Honest Feedbacks</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            What Our <span className="text-yellow-400 italic">Guests Whisper</span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-4 font-normal">
            With over 1,850+ five-star reviews on Google, we strive to deliver an unforgettable luxury dining experience with every single meal.
          </p>
        </div>

        {/* Carousel Slider */}
        <div className="max-w-4xl mx-auto relative px-4 md:px-12">
          
          {/* Main Card viewport */}
          <div className="min-h-[280px] md:min-h-[220px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="p-8 md:p-10 rounded-3xl bg-zinc-950/80 border border-yellow-400/10 shadow-xl relative flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 hover:border-yellow-400/30 transition-all duration-300"
              >
                {/* Large Quote Mark */}
                <Quote className="absolute top-6 left-6 w-12 h-12 text-yellow-400/10 rotate-180 pointer-events-none" />

                {/* Avatar */}
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-yellow-400/30 bg-black flex-shrink-0 relative">
                  <img
                    src={TESTIMONIALS[currentIdx].avatar}
                    alt={TESTIMONIALS[currentIdx].name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Text & Meta */}
                <div className="flex-grow space-y-4 text-center md:text-left">
                  {/* Star Ratings */}
                  <div className="flex items-center justify-center md:justify-start space-x-1">
                    {Array.from({ length: TESTIMONIALS[currentIdx].rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <blockquote className="font-serif text-base sm:text-lg text-zinc-100 leading-relaxed font-normal italic">
                    "{TESTIMONIALS[currentIdx].review}"
                  </blockquote>

                  {/* Author Name & Date */}
                  <div className="pt-2">
                    <h4 className="font-display font-bold text-yellow-400 text-sm tracking-wide">
                      {TESTIMONIALS[currentIdx].name}
                    </h4>
                    <span className="text-[10px] text-zinc-450 uppercase tracking-widest mt-0.5 block font-bold">
                      Verified Guest • {TESTIMONIALS[currentIdx].date}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-zinc-950 border border-yellow-400/20 text-yellow-400 hover:text-yellow-350 hover:border-yellow-400 hover:scale-105 transition-all shadow-md"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center space-x-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIdx ? 'w-6 bg-yellow-400' : 'w-1.5 bg-zinc-800'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-zinc-950 border border-yellow-400/20 text-yellow-400 hover:text-yellow-350 hover:border-yellow-400 hover:scale-105 transition-all shadow-md"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
