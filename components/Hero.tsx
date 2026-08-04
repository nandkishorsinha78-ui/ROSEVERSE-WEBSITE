'use client';

import { Play, Sliders, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onPlayVideo: () => void;
}

export default function Hero({ onPlayVideo }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson-rose/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-gold-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto text-center relative z-10 space-y-8"
      >
        {/* Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-gold-accent text-xs font-bold tracking-widest uppercase shadow-xl">
          <span className="w-2 h-2 rounded-full bg-crimson-rose animate-ping" />
          300-FRAME BOTANICAL MOTION SEQUENCE
        </div>

        {/* Heading */}
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] text-white">
          NATURAL KINETICS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-accent via-white to-crimson-rose">
            IN 300 FRAMES
          </span>
        </h1>

        {/* Subheading */}
        <p className="font-body text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          An immersive digital atelier capturing the metamorphosis of a velvet crimson rose in night monsoon with 60FPS canvas precision.
        </p>

        {/* Action Triggers */}
        <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
          <button
            onClick={onPlayVideo}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-crimson-rose via-crimson-dark to-crimson-rose text-white font-semibold text-sm flex items-center gap-3 shadow-[0_0_30px_rgba(255,26,64,0.45)] hover:shadow-[0_0_45px_rgba(255,26,64,0.7)] hover:scale-105 transition-all duration-300"
          >
            <Play className="w-4 h-4 fill-current" />
            Launch 60FPS Video
          </button>

          <a
            href="#kinetic-studio"
            className="px-8 py-4 rounded-full bg-white/5 border border-gold-accent/40 text-gold-accent font-semibold text-sm flex items-center gap-3 hover:bg-gold-accent/15 hover:border-gold-accent transition-all duration-300"
          >
            <Sliders className="w-4 h-4" />
            Interactive Studio
          </a>
        </div>

        {/* Scroll Cue */}
        <div className="pt-12 flex flex-col items-center gap-3 text-slate-400 text-xs font-bold tracking-widest uppercase">
          <div className="w-px h-12 bg-gradient-to-b from-crimson-rose to-transparent animate-bounce" />
          <span className="flex items-center gap-1.5">
            Scroll to Unchain Motion <ArrowDown className="w-3.5 h-3.5 text-gold-accent" />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
