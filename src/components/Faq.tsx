import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data';

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>('f1'); // Default open first FAQ

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-black relative overflow-hidden border-b border-yellow-400/10">
      {/* Decorative details */}
      <div className="absolute left-0 top-1/3 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-zinc-950/60 border border-yellow-400/20 text-yellow-400 text-xs tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Diner Information</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Frequently Asked <span className="text-yellow-400 italic">Diner Questions</span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-4 font-normal">
            Have queries regarding our cooking standards, catering capabilities, or reservations? Find answers curated directly by Chef Arjun Mehta below.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-yellow-400/10 bg-zinc-950/60 hover:bg-zinc-950/90 transition-colors overflow-hidden shadow-md"
              >
                {/* Header click bar */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus:ring-1 focus:ring-yellow-400/20"
                >
                  <span className="font-display font-semibold text-white text-sm sm:text-base pr-4">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black border border-yellow-400/20 flex items-center justify-center text-yellow-400 flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-yellow-450" /> : <ChevronDown className="w-4 h-4 text-yellow-450" />}
                  </div>
                </button>

                {/* Collapsible Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-yellow-400/10">
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
