import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-obsidian text-slate-100 pt-24 pb-16 px-6 md:px-16">
      <div className="max-w-4xl mx-auto bg-surface/80 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-2xl">
        <div className="mb-8">
          <Link href="/" className="text-gold-accent hover:underline text-sm font-semibold mb-4 inline-block">
            ← Return to Atelier Home
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gold-accent">
            Terms & Conditions
          </h1>
          <p className="text-slate-400 text-sm mt-2">Effective Date: August 4, 2026</p>
        </div>

        <section className="space-y-8 text-slate-300 leading-relaxed font-body">
          <div>
            <h2 className="text-xl font-bold text-gold-accent mb-3">1. Atelier Asset Licensing</h2>
            <p>Upon purchasing the Essential Botanical Kit or Atelier Commercial License, ROSEVERSE grants you a non-exclusive, worldwide license to use the 300-frame motion sequence and Web Audio modules in client or personal digital projects.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gold-accent mb-3">2. Intellectual Property Rights</h2>
            <p>All original raw photography, 3D shader code, and HTML5 canvas step interpolation logic are protected intellectual property of ROSEVERSE Atelier.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gold-accent mb-3">3. Performance & 60FPS Guarantee</h2>
            <p>Our canvas sequence is optimized for modern hardware. Performance on legacy devices may depend on browser hardware acceleration settings.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
