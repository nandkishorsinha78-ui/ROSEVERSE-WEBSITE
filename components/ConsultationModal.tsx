'use client';

import { useState, useEffect } from 'react';
import { X, CalendarCheck, ShieldCheck, Check } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  selectedTier = 'Atelier Commercial License ($799)',
}: ConsultationModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(selectedTier);
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setService(selectedTier);
  }, [selectedTier]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-xl">
      <div className="w-full max-w-xl p-8 rounded-3xl bg-surface border border-white/15 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <h3 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-gold-accent" /> Book Atelier Consultation
          </h3>
          <p className="font-body text-xs text-slate-400">
            Schedule a 1-on-1 strategy & kinetic integration consultation with our specialists.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-6 rounded-2xl bg-emerald-accent/20 border border-emerald-accent/40 text-emerald-accent text-sm font-semibold space-y-2 text-center">
            <Check className="w-8 h-8 mx-auto" />
            <div>
              Thank you, <strong>{name}</strong>! Your consultation request for <strong>{service}</strong> has been confirmed. Our team will reach out via email shortly.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-body text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-gold-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Professional Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="eleanor@studio.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-gold-accent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Service / Solution of Interest *</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-gold-accent"
                >
                  <option value="Essential Botanical Kit ($299)" className="bg-obsidian">
                    Essential Botanical Kit ($299)
                  </option>
                  <option value="Atelier Commercial License ($799)" className="bg-obsidian">
                    Atelier Commercial License ($799)
                  </option>
                  <option value="Custom Atelier Engineering ($2,499+)" className="bg-obsidian">
                    Custom Atelier Engineering ($2,499+)
                  </option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Preferred Date *</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-gold-accent"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Project Overview & Requirements</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell us about your brand, domain, or specific technical requirements..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-gold-accent"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-accent shrink-0" />
                Ethical & Transparent Promise: No hidden fees, instant confirmation.
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-crimson-rose text-white font-semibold text-xs hover:scale-105 transition-transform shadow-lg shadow-crimson-rose/30"
              >
                Confirm Consultation Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
