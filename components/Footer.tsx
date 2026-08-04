import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/10 py-16 px-6 relative z-10 text-center">
      <div className="max-w-7xl mx-auto space-y-8">
        <Link
          href="#hero"
          className="font-heading text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gold-accent to-crimson-rose inline-block"
        >
          AURA BLOOM
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm font-body text-slate-400">
          <Link href="/privacy" className="hover:text-gold-accent transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-gold-accent transition-colors">
            Terms of Service
          </Link>
          <a href="#products" className="hover:text-gold-accent transition-colors">
            Licensing & Shipping
          </a>
          <a href="#products" className="hover:text-gold-accent transition-colors">
            Contact Us
          </a>
        </div>

        <p className="font-body text-xs text-slate-400">
          © 2026 ROSEVERSE Atelier. Powered by 300-Frame HTML5 Canvas Engine. Cultivating elegance through every petal.
        </p>
      </div>
    </footer>
  );
}
