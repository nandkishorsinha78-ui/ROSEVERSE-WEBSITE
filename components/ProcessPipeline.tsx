'use client';

export default function ProcessPipeline() {
  const steps = [
    {
      num: '01',
      title: 'Macro Sensor Capture',
      desc: '300 continuous RAW photographs captured at sub-millimeter focal depth during night monsoon rainfall.',
    },
    {
      num: '02',
      title: 'Chromatic Color Grading',
      desc: 'Digital colorist mapping velvet crimson tones and crystal dew contrast for HDR web rendering.',
    },
    {
      num: '03',
      title: 'Canvas Step LERP',
      desc: 'Sub-frame mathematical interpolation delivering 60FPS smooth scroll synchronization without skipping.',
    },
    {
      num: '04',
      title: 'Spatial Audio Drone',
      desc: 'Web Audio API oscillator synthesizing harmonic resonance matching the flower blooming speed.',
    },
  ];

  return (
    <section id="process" className="py-24 bg-surface/50 border-y border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-crimson-rose uppercase">
            ENGINEERING PIPELINE
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">
            How the 300-Frame Engine Works
          </h2>
          <p className="font-body text-slate-400 text-base">
            From macro camera sensor to hardware-accelerated 60FPS browser canvas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-gold-accent/40 transition-all duration-300 relative space-y-4 group hover:-translate-y-1"
            >
              <div className="font-heading text-4xl font-black text-crimson-rose/40 group-hover:text-gold-accent transition-colors">
                {step.num}
              </div>
              <h3 className="font-display text-xl font-bold text-white">{step.title}</h3>
              <p className="font-body text-slate-300 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
