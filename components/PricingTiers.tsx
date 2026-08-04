'use client';

import { Check, ArrowRight, Sparkles, Calendar } from 'lucide-react';

interface PricingTiersProps {
  onOpenConsultation: (tier?: string) => void;
}

export default function PricingTiers({ onOpenConsultation }: PricingTiersProps) {
  return (
    <section id="products" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-bold tracking-widest text-gold-accent uppercase">
          PRODUCTS & SOLUTIONS
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">
          Explore Our Atelier Offerings
        </h2>
        <p className="font-body text-slate-400 text-base">
          Transparent pricing, flexible licensing, and bespoke kinetic animation engineering for luxury digital experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tier 1 */}
        <div className="p-8 rounded-3xl bg-surface/80 border border-white/10 flex flex-col justify-between space-y-6 hover:border-gold-accent/40 transition-all">
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300">
              DEVELOPER KIT
            </span>
            <h3 className="font-heading text-2xl font-bold text-white">Essential Botanical Kit</h3>
            <p className="font-body text-slate-400 text-xs leading-relaxed">
              Complete 300 HD frame sequence pre-compiled for fast web canvas embedding.
            </p>
            <div className="pt-2">
              <span className="font-heading text-4xl font-extrabold text-white">$299</span>
              <span className="text-slate-400 text-xs ml-2">/ one-time</span>
            </div>
            <ul className="space-y-3 pt-4 text-xs font-body text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-accent" /> 300 1080p WebP/JPG HD Frames
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-accent" /> Raw HTML5 Canvas LERP Engine
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-accent" /> Single Commercial Project License
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-accent" /> Documentation & Integration Guides
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-accent" /> Web Audio Synth Module Included
              </li>
            </ul>
          </div>
          <button
            onClick={() => onOpenConsultation('Essential Botanical Kit ($299)')}
            className="w-full py-3.5 rounded-2xl bg-white/10 border border-white/15 text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
          >
            Select Essential Kit <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tier 2 Popular */}
        <div className="p-8 rounded-3xl bg-gradient-to-b from-surface via-surface to-crimson-rose/10 border-2 border-crimson-rose/60 flex flex-col justify-between space-y-6 shadow-2xl relative scale-105">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-crimson-rose text-white text-[10px] font-black tracking-widest uppercase shadow-lg">
            MOST POPULAR
          </div>
          <div className="space-y-4 pt-2">
            <span className="px-3 py-1 rounded-full bg-crimson-rose/20 text-xs font-bold text-crimson-rose">
              COMMERCIAL LICENSE
            </span>
            <h3 className="font-heading text-2xl font-bold text-white">Atelier Commercial License</h3>
            <p className="font-body text-slate-300 text-xs leading-relaxed">
              Full 4K resolution raw sequence, multi-domain license, and dedicated technical integration support.
            </p>
            <div className="pt-2">
              <span className="font-heading text-4xl font-extrabold text-white">$799</span>
              <span className="text-slate-400 text-xs ml-2">/ one-time</span>
            </div>
            <ul className="space-y-3 pt-4 text-xs font-body text-slate-200">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-accent" /> 300 4K Ultra-HD Raw Frame Sequence
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-accent" /> Multi-Domain Unlimited License
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-accent" /> Dual Canvas + WebGL Particle Engine
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-accent" /> Custom Filter & Shader Presets
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-accent" /> Priority 1-on-1 Integration Support
              </li>
            </ul>
          </div>
          <button
            onClick={() => onOpenConsultation('Atelier Commercial License ($799)')}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-crimson-rose to-crimson-dark text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-crimson-rose/40 hover:scale-105 transition-transform"
          >
            Acquire Commercial License <Sparkles className="w-4 h-4" />
          </button>
        </div>

        {/* Tier 3 */}
        <div className="p-8 rounded-3xl bg-surface/80 border border-white/10 flex flex-col justify-between space-y-6 hover:border-gold-accent/40 transition-all">
          <div className="space-y-4">
            <span className="px-3 py-1 rounded-full bg-gold-accent/15 border border-gold-accent/30 text-xs font-bold text-gold-accent">
              BESPOKE
            </span>
            <h3 className="font-heading text-2xl font-bold text-white">Custom Atelier Engineering</h3>
            <p className="font-body text-slate-400 text-xs leading-relaxed">
              Bespoke 300+ frame macro studio shoot, custom WebGL physics, and tailor-made brand kinetic experiences.
            </p>
            <div className="pt-2">
              <span className="font-heading text-4xl font-extrabold text-white">$2,499</span>
              <span className="text-slate-400 text-xs ml-2">+ / custom project</span>
            </div>
            <ul className="space-y-3 pt-4 text-xs font-body text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-accent" /> Custom 300-Frame Macro Shoot
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-accent" /> Tailored Shader & Audio Design
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-accent" /> Full Exclusive Ownership
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-accent" /> VIP Consultation Session
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-accent" /> 60FPS Optimization Guarantee
              </li>
            </ul>
          </div>
          <button
            onClick={() => onOpenConsultation('Custom Atelier Engineering ($2,499+)')}
            className="w-full py-3.5 rounded-2xl bg-white/10 border border-gold-accent/30 text-gold-accent font-semibold text-xs flex items-center justify-center gap-2 hover:bg-gold-accent/15 transition-colors"
          >
            Book Consultation <Calendar className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
