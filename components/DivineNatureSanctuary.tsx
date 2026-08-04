'use client';

import Image from 'next/image';
import { Mountain, Waves, Trees, Sparkles, Feather } from 'lucide-react';

export default function DivineNatureSanctuary() {
  const naturePillars = [
    {
      icon: Mountain,
      title: 'Majestic Peaks',
      subtitle: 'Immutable Elevation',
      desc: 'Misty alpine ridges rising above the clouds, capturing eternal light and grounding the botanical horizon.',
      color: 'text-gold-accent',
      border: 'hover:border-gold-accent/50',
    },
    {
      icon: Waves,
      title: 'Flowing Sanctuary',
      subtitle: 'Continuous Vitality',
      desc: 'Crystal alpine streams carrying life through the valley, echoing the fluid motion of our 300-frame canvas.',
      color: 'text-emerald-accent',
      border: 'hover:border-emerald-accent/50',
    },
    {
      icon: Trees,
      title: 'Forest Canopy',
      subtitle: 'Living Architecture',
      desc: 'Deep emerald pine canopies breathing harmony, balance, and quiet majesty into the night monsoon.',
      color: 'text-crimson-rose',
      border: 'hover:border-crimson-rose/50',
    },
  ];

  return (
    <section id="sanctuary" className="relative py-32 px-6 overflow-hidden bg-obsidian border-y border-white/10">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/divine_nature_sanctuary_twilight.png"
          alt="Majestic dark landscape with misty mountain peaks, forest canopy, and glowing river at twilight"
          fill
          className="object-cover opacity-35 scale-105 transition-transform duration-1000 ease-out"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/60 to-obsidian" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,211,140,0.12)_0%,transparent_75%)] pointer-events-none" />
      </div>

      {/* Floating Animated Birds SVGs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
        {/* Bird 1 */}
        <div className="absolute top-1/4 -left-12 animate-[flyRight_24s_linear_infinite]">
          <svg className="w-8 h-8 text-gold-accent/40 fill-current animate-pulse" viewBox="0 0 24 24">
            <path d="M21.5 5.5c-3 1.5-6 1-8.5-1-2.5 2-5.5 2.5-8.5 1 1.5 3 4 4.5 7 4.5s5.5-1.5 7-4.5z" />
          </svg>
        </div>

        {/* Bird 2 */}
        <div className="absolute top-1/3 -left-20 animate-[flyRight_28s_linear_infinite_4s]">
          <svg className="w-6 h-6 text-white/30 fill-current" viewBox="0 0 24 24">
            <path d="M21.5 5.5c-3 1.5-6 1-8.5-1-2.5 2-5.5 2.5-8.5 1 1.5 3 4 4.5 7 4.5s5.5-1.5 7-4.5z" />
          </svg>
        </div>

        {/* Bird 3 */}
        <div className="absolute top-1/5 -left-16 animate-[flyRight_20s_linear_infinite_8s]">
          <svg className="w-5 h-5 text-crimson-rose/40 fill-current" viewBox="0 0 24 24">
            <path d="M21.5 5.5c-3 1.5-6 1-8.5-1-2.5 2-5.5 2.5-8.5 1 1.5 3 4 4.5 7 4.5s5.5-1.5 7-4.5z" />
          </svg>
        </div>

        {/* Floating Petal Particles */}
        <div className="absolute top-12 left-1/4 w-2 h-2 rounded-full bg-crimson-rose/60 blur-xs animate-ping [animation-duration:4s]" />
        <div className="absolute bottom-20 right-1/3 w-3 h-3 rounded-full bg-gold-accent/50 blur-xs animate-ping [animation-duration:6s]" />
      </div>

      {/* Main Sanctuary Content */}
      <div className="max-w-7xl mx-auto relative z-20 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-gold-accent/30 text-gold-accent text-xs font-bold tracking-widest uppercase shadow-xl">
            <Sparkles className="w-3.5 h-3.5" />
            DIVINE CREATION & NATURAL HARMONY
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            The Geometry of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-accent via-white to-emerald-accent">
              Natural Creation
            </span>
          </h2>

          <p className="font-body text-slate-300 text-base sm:text-lg leading-relaxed pt-2">
            Beyond digital precision lies the infinite art of nature. From towering alpine peaks to gentle monsoon streams, every element reflects the sacred balance and beauty woven into existence.
          </p>

          {/* Reflection Quote */}
          <div className="p-6 rounded-2xl bg-surface/70 border border-white/10 backdrop-blur-xl max-w-xl mx-auto mt-6 italic text-slate-300 text-xs sm:text-sm font-body">
            &ldquo;In every unfolding petal, every mountain ridge, and every flowing stream lies the quiet grandeur of creation.&rdquo;
          </div>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {naturePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className={`p-8 rounded-3xl bg-surface/80 border border-white/15 backdrop-blur-2xl transition-all duration-500 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-crimson-rose/10 space-y-4 ${pillar.border}`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 ${pillar.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <Feather className="w-4 h-4 text-slate-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>

                <div>
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-white mt-1">
                    {pillar.title}
                  </h3>
                </div>

                <p className="font-body text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tailwind Keyframes Injector */}
      <style jsx global>{`
        @keyframes flyRight {
          0% {
            transform: translateX(-100px) translateY(0px) scale(0.8);
          }
          50% {
            transform: translateX(50vw) translateY(-25px) scale(1.1);
          }
          100% {
            transform: translateX(110vw) translateY(10px) scale(0.9);
          }
        }
      `}</style>
    </section>
  );
}
