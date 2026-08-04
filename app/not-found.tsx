import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian text-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,26,64,0.15)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-lg p-12 bg-surface/80 border border-gold-accent/30 rounded-3xl shadow-2xl backdrop-blur-2xl relative z-10">
        <div className="font-heading text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gold-accent to-crimson-rose mb-4">
          404
        </div>
        <h1 className="font-display text-3xl text-white font-bold mb-4">
          Destination Beyond the Bloom
        </h1>
        <p className="font-body text-slate-400 text-base mb-8 leading-relaxed">
          The botanical page you are searching for does not exist or has been relocated within our kinetic atelier.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-secondary to-secondary-container text-white font-semibold shadow-lg shadow-secondary/30 hover:scale-105 transition-all duration-300"
        >
          Return to Roseverse Atelier
        </Link>
      </div>
    </div>
  );
}
