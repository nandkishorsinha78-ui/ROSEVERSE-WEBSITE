'use client';

import { Film, Gauge, Box, Activity, Headset, Eye } from 'lucide-react';

export default function SpecificationsGrid() {
  const specs = [
    {
      icon: Film,
      title: '300 HD Frame Memory Cache',
      desc: 'All 300 high-definition micro-photographs pre-buffered in browser RAM upon load for zero-latency 60FPS frame scrubbing.',
    },
    {
      icon: Gauge,
      title: 'Sub-Frame Linear Step LERP',
      desc: 'Mathematical step interpolation algorithm ensuring continuous rendering from Frame 1 to 300 without stutter or black buffer gaps.',
    },
    {
      icon: Box,
      title: '3D Perspective Cosmos',
      desc: 'Interactive 3D particle depth layer featuring Z-axis camera space projection and real-time mouse magnetic parallax.',
    },
    {
      icon: Activity,
      title: 'Spatial Audio Synthesizer',
      desc: 'Native Web Audio API harmonic oscillator generating ambient drone tones and haptic scroll ticks tuned to blooming velocity.',
    },
    {
      icon: Headset,
      title: 'AI Sales & Business Assistant',
      desc: 'Built-in ethical AI assistant providing transparent solutions, instant consultation booking, and project recommendation.',
    },
    {
      icon: Eye,
      title: 'Multi-Scale Vision Accessibility',
      desc: 'Dynamic 90%, 100%, and 125% Eye Comfort resolution scaling ensuring high-legibility text on any display size.',
    },
  ];

  return (
    <section id="specs" className="py-24 bg-surface/40 border-y border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-crimson-rose uppercase">
            ATELIER ENGINE
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">
            ROSEVERSE Platform Architecture
          </h2>
          <p className="font-body text-slate-400 text-base">
            Built with zero external framework overhead, raw GPU hardware acceleration, and spatial kinetic audio synthesis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specs.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-gold-accent/40 transition-all duration-300 space-y-4 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-crimson-rose/15 border border-crimson-rose/30 text-crimson-rose flex items-center justify-center group-hover:scale-110 group-hover:bg-crimson-rose group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">{spec.title}</h3>
                <p className="font-body text-slate-400 text-sm leading-relaxed">{spec.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
