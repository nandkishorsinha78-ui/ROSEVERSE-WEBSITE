import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-obsidian text-slate-100 pt-24 pb-16 px-6 md:px-16">
      <div className="max-w-4xl mx-auto bg-surface/80 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-2xl">
        <div className="mb-8">
          <Link href="/" className="text-gold-accent hover:underline text-sm font-semibold mb-4 inline-block">
            ← Return to Atelier Home
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gold-accent">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm mt-2">Effective Date: August 4, 2026</p>
        </div>

        <section className="space-y-8 text-slate-300 leading-relaxed font-body">
          <div>
            <h2 className="text-xl font-bold text-gold-accent mb-3">1. Privacy-First Commitment</h2>
            <p>ROSEVERSE Atelier prioritizes client and visitor privacy. We operate on a privacy-first model: we do not sell, rent, or trade your personal data to third-party advertising networks.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gold-accent mb-3">2. Data Collection & Local Storage</h2>
            <p>Our website utilizes local storage (`localStorage`) exclusively to persist user accessibility preferences (such as High-Legibility Eye Comfort Mode) and canvas display states. No cross-site tracking cookies are deployed.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gold-accent mb-3">3. Consultation & Inquiries</h2>
            <p>Information submitted via our Sales Assistant AI or Consultation Booking form (name, email, service tier, and project notes) is used solely to confirm your booking and fulfill your engineering requests.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gold-accent mb-3">4. Security Standards</h2>
            <p>All data transmissions are encrypted using standard TLS protocol. Assets delivered through our Vercel infrastructure benefit from global edge protection and strict Content Security Policies.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
