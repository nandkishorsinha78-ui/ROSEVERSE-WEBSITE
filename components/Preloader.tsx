'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [isHidden, setIsHidden] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsHidden(true), 300);
          return 100;
        }
        return prev + 10;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  if (isHidden) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-obsidian transition-opacity duration-700">
      <div className="relative z-10 text-center max-w-sm w-full p-8 rounded-3xl bg-surface/90 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-4">
        <div className="w-20 h-20 mx-auto relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-crimson-rose/20 animate-ping" />
          <span className="w-12 h-12 rounded-full bg-crimson-rose/20 border border-crimson-rose text-crimson-rose flex items-center justify-center font-bold text-lg">
            RB
          </span>
        </div>

        <h1 className="font-heading text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gold-accent to-crimson-rose">
          AURA BLOOM
        </h1>
        <p className="font-body text-[10px] tracking-widest text-slate-400 font-bold uppercase">
          300-FRAME BOTANICAL KINETIC ATELIER
        </p>

        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-crimson-rose to-gold-accent transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="font-mono text-xs text-gold-accent font-semibold">
          {progress}% Loaded
        </div>
      </div>
    </div>
  );
}
