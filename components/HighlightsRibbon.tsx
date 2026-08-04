'use client';

import { Film, Zap, Droplet, Sliders } from 'lucide-react';

export default function HighlightsRibbon() {
  const highlights = [
    {
      icon: Film,
      title: '300 HD FRAMES',
      desc: 'High-Density Motion Sequence',
    },
    {
      icon: Zap,
      title: '60 FPS BUFFER',
      desc: 'Zero-Lag Canvas Rendering',
    },
    {
      icon: Droplet,
      title: 'DEW OPTICS',
      desc: 'Crystal Rain Reflection',
    },
    {
      icon: Sliders,
      title: 'FRAME SCRUBBER',
      desc: 'Precision Motion Control',
    },
  ];

  return (
    <section id="highlights" className="relative py-12 px-6 border-y border-white/10 bg-surface/50 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {highlights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-gold-accent/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-crimson-rose/15 border border-crimson-rose/30 text-crimson-rose flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-crimson-rose group-hover:text-white transition-all">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="font-display font-bold text-base text-white tracking-wide group-hover:text-gold-accent transition-colors">
                  {item.title}
                </div>
                <div className="font-body text-xs text-slate-400 mt-0.5">
                  {item.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
