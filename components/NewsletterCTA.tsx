'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <div className="p-10 md:p-16 rounded-3xl bg-gradient-to-r from-surface via-surface to-crimson-rose/15 border border-white/15 text-center relative overflow-hidden shadow-2xl space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-accent/10 rounded-full blur-[100px] pointer-events-none" />

        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-2xl mx-auto">
          Experience the Future of Web Animation
        </h2>
        <p className="font-body text-slate-300 text-sm md:text-base max-w-xl mx-auto">
          Subscribe to receive technical breakdowns on botanical kinetic design and HTML5 canvas engines.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 p-4 rounded-2xl bg-emerald-accent/20 border border-emerald-accent/40 text-emerald-accent font-semibold text-sm">
            <Check className="w-5 h-5" /> Thank you! Welcome to the AURA BLOOM Atelier Circle ({email}).
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your professional email..."
              required
              className="w-full px-5 py-3.5 rounded-full bg-white/5 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-gold-accent"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-crimson-rose text-white font-semibold text-sm flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-crimson-rose/30 shrink-0"
            >
              Join Circle <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
