'use client';

import Image from 'next/image';
import { Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';

interface FeaturedBloomSectionProps {
  onOpenConsultation?: (tier?: string) => void;
}

export default function FeaturedBloomSection({ onOpenConsultation }: FeaturedBloomSectionProps) {
  return (
    <section id="featured-bloom" className="relative py-24 px-6 bg-obsidian border-y border-white/10 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-crimson-rose/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-gold-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="p-8 md:p-12 rounded-3xl bg-surface/80 border border-white/15 backdrop-blur-2xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Details & CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-gold-accent/30 text-gold-accent text-xs font-bold tracking-widest uppercase shadow-xl">
                <Sparkles className="w-3.5 h-3.5" />
                BOTANICAL SPOTLIGHT
              </div>

              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white leading-tight">
                Pink Damask <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-rose via-white to-gold-accent">
                  Radiance & Dew
                </span>
              </h2>

              <p className="font-body text-slate-300 text-base leading-relaxed">
                Freshly captured at peak bloom in our private botanical sanctuary. Each dual-tone pink petal holds micro-droplets of morning monsoon dew, embodying living geometry and timeless elegance.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface/60 border border-white/10 backdrop-blur-md">
                  <span className="block text-2xl font-bold text-gold-accent font-heading">100%</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-body">Pure Organic</span>
                </div>
                <div className="p-4 rounded-2xl bg-surface/60 border border-white/10 backdrop-blur-md">
                  <span className="block text-2xl font-bold text-emerald-accent font-heading">Dew Optics</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-body">Macro Precision</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => onOpenConsultation?.('Atelier Commercial License ($799)')}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-crimson-rose to-crimson-dark text-white font-bold text-sm tracking-wide shadow-lg shadow-crimson-rose/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Reserve Bouquet
                </button>
                <a
                  href="#collection"
                  className="px-6 py-3.5 rounded-full bg-white/5 border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                >
                  Explore Gallery
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Featured Image Display */}
            <div className="lg:col-span-7">
              <div className="relative group overflow-hidden rounded-3xl border border-white/20 shadow-2xl shadow-crimson-rose/10 transition-all duration-500 hover:border-gold-accent/50">
                <div className="relative h-[450px] sm:h-[520px] w-full">
                  <Image
                    src="/pink_roses_midsection.jpg"
                    alt="Vibrant Pink Roses in Full Dew-Glistening Bloom - Roseverse Atelier"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500" />
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-6 rounded-2xl bg-surface/80 backdrop-blur-xl border border-white/20 flex justify-between items-center text-white">
                  <div>
                    <h4 className="font-heading font-bold text-lg sm:text-xl text-white">Grand Pink Sonata</h4>
                    <p className="text-xs text-slate-300 font-body mt-0.5">Heritage Dual Bloom &bull; Monsoon Hydrated</p>
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-crimson-rose/30 border border-crimson-rose/50 text-gold-accent text-xs font-bold uppercase tracking-wider">
                    Spotlight
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
