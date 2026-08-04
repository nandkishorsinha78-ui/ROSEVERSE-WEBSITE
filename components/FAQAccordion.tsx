'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the 300-frame scroll animation work without lag?',
      a: 'All 300 high-definition frames are pre-buffered directly in browser RAM upon initial page load. Our HTML5 Canvas 2D engine utilizes linear step interpolation to render frames in GPU-accelerated requestAnimationFrame cycles.',
    },
    {
      q: 'Can I control playback speed and inspect individual frames?',
      a: 'Yes! You can toggle between 0.5x, 1.0x, 1.5x, and 2.0x playback speeds, use step buttons (-1 / +1), or open the 300-Frame Inspector Grid to inspect any frame thumbnail.',
    },
    {
      q: 'Is the audio track generated dynamically?',
      a: "Yes, we use the browser native Web Audio API to synthesize a relaxing harmonic drone tone and mechanical scroll ticks synchronized to blooming velocity.",
    },
    {
      q: 'Is the sequence compatible with Next.js and React?',
      a: 'Absolutely. The engine is modularized as a React component with strict TypeScript typing, canvas hardware acceleration, and full resource disposal.',
    },
  ];

  return (
    <section id="faq" className="py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-bold tracking-widest text-gold-accent uppercase">
          COMMON QUESTIONS
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">
          Frequently Asked Questions
        </h2>
        <p className="font-body text-slate-400 text-base">
          Everything you need to know about our 300-frame web canvas animation engine.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-surface/80 border border-white/10 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-display font-semibold text-white text-base md:text-lg hover:text-gold-accent transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gold-accent transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 font-body text-slate-300 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
