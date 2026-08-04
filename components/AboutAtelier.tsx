'use client';

import { Check } from 'lucide-react';

export default function AboutAtelier() {
  return (
    <section id="about" className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <span className="text-xs font-bold tracking-widest text-crimson-rose uppercase block">
            BOTANICAL ATELIER
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white leading-tight">
            Crafting Motion <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-accent to-white">
              Frame by Frame
            </span>
          </h2>
          <p className="font-body text-slate-300 text-base leading-relaxed">
            AURA BLOOM bridges digital art and organic botanical physics. By digitizing 300 sequential micro-photographs into a high-performance HTML5 Canvas engine, we turn static photography into fluid interactive motion.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-emerald-accent/20 border border-emerald-accent/40 text-emerald-accent flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-white text-base">Sub-Frame Step Syncing</h4>
                <p className="font-body text-slate-400 text-sm mt-0.5">
                  Ensures scrolling steps smoothly through every single integer frame (1 to 300) without skipping.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-emerald-accent/20 border border-emerald-accent/40 text-emerald-accent flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-white text-base">Spatial Audio Feedback</h4>
                <p className="font-body text-slate-400 text-sm mt-0.5">
                  Real-time audio ticks and drone resonance synthesized in response to blooming velocity.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Metrics Grid */}
        <div className="grid grid-cols-2 gap-6 p-8 rounded-3xl bg-surface/80 border border-white/10 shadow-2xl backdrop-blur-2xl">
          <div className="p-6 rounded-2xl bg-white/5 border border-gold-accent/20 text-center hover:border-gold-accent/50 transition-all">
            <div className="font-heading text-4xl sm:text-5xl font-black text-gold-accent">300</div>
            <div className="font-body text-xs font-semibold text-slate-400 uppercase tracking-widest mt-2">
              RAW HD Frames
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-crimson-rose/20 text-center hover:border-crimson-rose/50 transition-all">
            <div className="font-heading text-4xl sm:text-5xl font-black text-crimson-rose">60</div>
            <div className="font-body text-xs font-semibold text-slate-400 uppercase tracking-widest mt-2">
              FPS Hardware Buffer
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-emerald-accent/20 text-center hover:border-emerald-accent/50 transition-all">
            <div className="font-heading text-4xl sm:text-5xl font-black text-emerald-accent">4K</div>
            <div className="font-body text-xs font-semibold text-slate-400 uppercase tracking-widest mt-2">
              Retina Pixel Ratio
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/20 text-center hover:border-white/50 transition-all">
            <div className="font-heading text-4xl sm:text-5xl font-black text-white">0ms</div>
            <div className="font-body text-xs font-semibold text-slate-400 uppercase tracking-widest mt-2">
              Input Latency
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
