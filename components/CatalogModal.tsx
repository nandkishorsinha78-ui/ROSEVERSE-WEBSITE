'use client';

import { X, Images } from 'lucide-react';
import Image from 'next/image';

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CatalogModal({ isOpen, onClose }: CatalogModalProps) {
  if (!isOpen) return null;

  const frames = Array.from({ length: 150 }, (_, i) => (i + 1) * 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-2xl">
      <div className="w-full max-w-5xl h-[85vh] p-8 rounded-3xl bg-surface border border-white/15 shadow-2xl flex flex-col relative overflow-hidden">
        <div className="flex items-center justify-between pb-6 border-b border-white/10 shrink-0">
          <div>
            <h3 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
              <Images className="w-6 h-6 text-gold-accent" /> 300-Frame Motion Catalog
            </h3>
            <p className="font-body text-xs text-slate-400">
              Inspect any frame thumbnail from the 300-frame botanical kinetic engine.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {frames.map((frameNum) => {
            const numStr = String(frameNum).padStart(3, '0');
            return (
              <div
                key={frameNum}
                className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group cursor-pointer hover:border-gold-accent/50 transition-all bg-obsidian"
              >
                <Image
                  src={`/frames/ezgif-frame-${numStr}.jpg`}
                  alt={`Frame ${frameNum}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  sizes="200px"
                  loading="lazy"
                />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-obsidian/80 text-[10px] font-mono text-gold-accent border border-white/10">
                  #{numStr}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
