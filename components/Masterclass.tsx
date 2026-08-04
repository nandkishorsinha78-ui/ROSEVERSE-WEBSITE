'use client';

import Image from 'next/image';
import { Droplet, Scissors, ArrowRight } from 'lucide-react';

interface MasterclassProps {
  onOpenConsultation: (tier?: string) => void;
}

export default function Masterclass({ onOpenConsultation }: MasterclassProps) {
  return (
    <section id="masterclass" className="py-24 bg-surface/60 border-y border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative h-[500px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZc3Gnn5nPRaMefQrb4JoT_SQHoFb0pWXHX7kfP98Yj6DKynPdgEmR4Cc9J2VAp7Eq8W3flhK1CR3l-mj7FVSThTHHBpNpSItkABYIm4vIKlWp7Vt3rV_5Q8XZ-o7QKLmci78xSiJdYMg-YvkMo2Y8mVYP2JduXSZWl8voMDHbAnht7GN1Y2UazypAUTuXwCUuXzFzIZMqyWTB8h5xqtp6pyQEu-4C5Q7YmUoflTWZoUcyqGfeLmQ"
            alt="Masterclass floral pruning tools"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="space-y-6">
          <span className="text-xs font-bold tracking-widest text-gold-accent uppercase">
            MASTERCLASS
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">
            The Art of the Bloom
          </h2>
          <p className="font-body text-slate-300 text-base leading-relaxed">
            Elevate your understanding of floral care. Learn the delicate techniques of pruning, hydration, and placement to ensure your roses maintain their breathtaking presence.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-4 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-crimson-rose/15 text-crimson-rose flex items-center justify-center shrink-0">
                <Droplet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-white text-base">Hydration Techniques</h4>
                <p className="font-body text-slate-400 text-sm mt-0.5">The secret to structural longevity.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-gold-accent/15 text-gold-accent flex items-center justify-center shrink-0">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-white text-base">Precision Pruning</h4>
                <p className="font-body text-slate-400 text-sm mt-0.5">Encouraging optimal bloom unfurling.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenConsultation('Custom Atelier Engineering ($2,499+)')}
            className="inline-flex items-center gap-2 text-gold-accent hover:text-white font-semibold text-sm transition-colors group pt-4"
          >
            Join the Masterclass
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
