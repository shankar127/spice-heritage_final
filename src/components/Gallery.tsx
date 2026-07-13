import React, { useState, useMemo } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_IMAGES } from '../data';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Extract all categories
  const categories = useMemo(() => {
    const list = new Set(GALLERY_IMAGES.map((img) => img.category));
    return ['All', ...Array.from(list)];
  }, []);

  // Filtered list
  const filteredImages = useMemo(() => {
    if (activeFilter === 'All') return GALLERY_IMAGES;
    return GALLERY_IMAGES.filter((img) => img.category === activeFilter);
  }, [activeFilter]);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % GALLERY_IMAGES.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-black relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-zinc-950/60 border border-yellow-400/20 text-yellow-400 text-xs tracking-wider uppercase mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Splendor</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Our Traditional <span className="text-yellow-400 italic">Visual Gallery</span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-4 font-normal">
            Feast your eyes on the elegant brass interiors, steaming clay-pot ovens, and premium slow-cooked recipes of Spice Heritage.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase border transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-yellow-400 text-black border-transparent shadow-md font-black'
                  : 'bg-zinc-950/40 text-zinc-300 border-yellow-400/10 hover:border-yellow-400/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid (Unique arched shapes inspired by the bento curved frames) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((item, originalIdx) => {
              // Find the global index in original GALLERY_IMAGES list
              const globalIdx = GALLERY_IMAGES.findIndex((img) => img.title === item.title);
              
              return (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setSelectedIdx(globalIdx)}
                  className="group relative h-80 rounded-3xl overflow-hidden border border-yellow-400/10 cursor-pointer bg-zinc-950/40 shadow-lg"
                >
                  {/* Decorative golden arc overlay in corners on hover */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-yellow-400/30 rounded-3xl transition-all duration-500 pointer-events-none z-20 m-2" />

                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

                  {/* Caption & Info */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end z-10 space-y-2">
                    <span className="text-[10px] text-yellow-400 uppercase tracking-widest font-black">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-yellow-400 transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed font-normal mt-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      {item.description}
                    </p>
                    
                    {/* Expand Badge */}
                    <div className="absolute top-4 right-4 p-2.5 rounded-full bg-zinc-950/80 border border-yellow-400/20 text-yellow-400 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-500 shadow-md">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
            {/* Backdrop Dismiss Trigger */}
            <div className="absolute inset-0" onClick={() => setSelectedIdx(null)} />

            {/* Floating Navigation Controls */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-zinc-950/90 border border-yellow-400/25 text-yellow-400 hover:text-yellow-300 transition-colors hover:scale-105 shadow-md z-30"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-6 p-3 rounded-full bg-zinc-950/80 border border-yellow-400/20 text-yellow-400 hover:text-yellow-300 transition-colors hover:scale-105 shadow-md z-20"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-6 p-3 rounded-full bg-zinc-950/80 border border-yellow-400/20 text-yellow-400 hover:text-yellow-300 transition-colors hover:scale-105 shadow-md z-20"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-yellow-400/20 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row h-auto md:h-[500px]"
            >
              {/* Image Column */}
              <div className="w-full md:w-3/5 h-64 md:h-full bg-zinc-900 relative border-b md:border-b-0 md:border-r border-yellow-400/10">
                <img
                  src={GALLERY_IMAGES[selectedIdx].image}
                  alt={GALLERY_IMAGES[selectedIdx].title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Description Column */}
              <div className="w-full md:w-2/5 p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-black border border-yellow-400/20 text-yellow-400 text-[10px] uppercase tracking-widest font-black">
                    <Sparkles className="w-3 h-3" />
                    <span>{GALLERY_IMAGES[selectedIdx].category}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white">
                    {GALLERY_IMAGES[selectedIdx].title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    {GALLERY_IMAGES[selectedIdx].description}. Experiencing Indian fine dining at Spice Heritage is more than ordering food—it is about honoring the timeless recipes, the hand-selected grains, and the smoky hearth.
                  </p>
                </div>

                <div className="pt-4 border-t border-yellow-400/10 flex justify-between items-center text-[11px] text-zinc-400">
                  <span>Image {selectedIdx + 1} of {GALLERY_IMAGES.length}</span>
                  <span className="font-display uppercase tracking-widest text-yellow-400 font-black">
                    Spice Heritage
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );

  function handleClose() {
    setSelectedIdx(null);
  }
}
