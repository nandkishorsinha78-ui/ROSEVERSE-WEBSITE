'use client';

import { useState, useEffect } from 'react';
import { Eye, LayoutGrid, CalendarCheck, Headset, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenCatalog: () => void;
  onOpenConsultation: (tier?: string) => void;
  onOpenAssistant: () => void;
}

export default function Navbar({
  onOpenCatalog,
  onOpenConsultation,
  onOpenAssistant,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isEyeComfort, setIsEyeComfort] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const scrollPos = window.scrollY + 120;
      const sections = ['hero', 'about', 'kinetic-studio', 'sanctuary', 'collection', 'masterclass', 'boutique', 'process', 'products', 'faq'];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleEyeComfort = () => {
    setIsEyeComfort((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('comfort-eye-mode');
        document.body.classList.add('comfort-eye-mode');
      } else {
        document.documentElement.classList.remove('comfort-eye-mode');
        document.body.classList.remove('comfort-eye-mode');
      }
      return next;
    });
  };

  const navItems = [
    { label: 'Overview', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Kinetic Studio', href: '#kinetic-studio' },
    { label: 'Sanctuary', href: '#sanctuary' },
    { label: 'Collection', href: '#collection' },
    { label: 'Masterclass', href: '#masterclass' },
    { label: 'Boutique', href: '#boutique' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#products' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 border-b ${
        isScrolled
          ? 'bg-surface/90 backdrop-blur-2xl py-3 border-secondary-fixed-dim/30 shadow-2xl'
          : 'bg-obsidian/40 backdrop-blur-lg py-5 border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-3 group">
          <span className="w-9 h-9 rounded-full bg-crimson-rose/15 border border-crimson-rose/35 text-crimson-rose flex items-center justify-center transition-transform group-hover:scale-110">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 64 64">
              <path d="M32 6c-8 0-14 6-14 14 0 5.2 3.1 9.7 7.6 11.9C20.2 34.2 16 40.5 16 48c0 8.8 7.2 16 16 16s16-7.2 16-16c0-7.5-4.2-13.8-9.6-16.1C42.9 29.7 46 25.2 46 20c0-8-6-14-14-14zm0 6c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8zm0 24c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10 4.5-10 10-10z" />
            </svg>
          </span>
          <span className="font-heading font-bold text-xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-gold-accent to-crimson-rose">
            AURA BLOOM
          </span>
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle Menu"
          className="md:hidden text-white p-2 focus:outline-none"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Navigation Links & Action Triggers */}
        <nav
          className={`fixed md:static inset-x-0 top-full md:top-auto bg-surface/95 md:bg-transparent backdrop-blur-2xl md:backdrop-blur-none p-6 md:p-0 flex flex-col md:flex-row items-start md:items-center gap-4 lg:gap-6 border-b md:border-none border-white/10 transition-all duration-300 ${
            isMobileOpen ? 'flex' : 'hidden md:flex'
          }`}
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const id = item.href.substring(1);
            const isActive = activeSection === id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`font-body text-sm font-medium transition-colors relative py-1 ${
                  isActive ? 'text-gold-accent font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-crimson-rose to-gold-accent rounded-full shadow-[0_0_8px_rgba(255,26,64,0.6)]" />
                )}
              </a>
            );
          })}

          <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-none border-white/10 w-full md:w-auto">
            <button
              onClick={toggleEyeComfort}
              title="Toggle High-Legibility Eye Comfort Mode"
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                isEyeComfort
                  ? 'bg-gold-accent text-obsidian border-gold-accent shadow-md'
                  : 'bg-white/5 border-white/15 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Eye Comfort
            </button>

            <button
              onClick={onOpenCatalog}
              className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 bg-white/5 border border-white/15 text-slate-300 hover:bg-white/10 hover:text-white transition-all"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Catalog (300)
            </button>

            <button
              onClick={() => onOpenConsultation()}
              className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-gold-accent/40 text-gold-accent hover:bg-gold-accent/15 transition-all"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              Consultation
            </button>

            <button
              onClick={onOpenAssistant}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 bg-gradient-to-r from-crimson-rose to-crimson-dark text-white shadow-lg shadow-crimson-rose/30 hover:scale-105 transition-all"
            >
              <Headset className="w-3.5 h-3.5" />
              AI Assistant
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
