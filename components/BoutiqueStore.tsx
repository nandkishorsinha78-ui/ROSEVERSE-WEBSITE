'use client';

import Image from 'next/image';

interface BoutiqueStoreProps {
  onOpenConsultation: (tier?: string) => void;
}

export default function BoutiqueStore({ onOpenConsultation }: BoutiqueStoreProps) {
  const products = [
    {
      title: 'The Solitaire',
      desc: 'Single stem Crimson Velvet',
      price: '$45',
      tier: 'Essential Botanical Kit ($299)',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChohpAeODPC1qPPeQyyjePzQSz4Rd7KFT-7rbT-Yj4dT3W0RUeT-pvRcTqPvGZfhAt6I-d5ACScTbwj3UnIzlQKRfrdYXSi07w6Ljq_qIw9CI2nD81h5j4m7Kv2qNx3RpO_4W2v14lvJZ6L5eUv6outaOemAHbPWmDcKHf0n_cZf_Jeu1sxyfvLc0q9LroPB-HYgGOCjFPeE4AR7Ti6igeTbYT0hD6YytrLspKQ6ZFIsaSbg9JEi0',
    },
    {
      title: 'Morning Haze',
      desc: 'Half-dozen Blush Sonata',
      price: '$120',
      tier: 'Essential Botanical Kit ($299)',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7FaD3oVxLxedKzuNvVOYioFb1w_vDeDloRmWKZxSeR2_0NtFv_GdKH9h8x4sl4FZVd4QKMWEqPFTLmt5r2CAMIJ4iACMXt35hTquBwg56jIidLVDDq9OCFdflVf8E95owDGpGeRLhrIJo553o7N8WDRc6r1p3OlxNmZ9fMjWbmsPuggBWZyxY2bDtf8_90IbXHef6p8yxDGofb0wXxvX-tlDMI2kjkKY7g_xBnqNfSnA5PxIu6U0',
    },
    {
      title: 'Midnight Opera',
      desc: 'Two dozen mixed heritage',
      price: '$285',
      tier: 'Atelier Commercial License ($799)',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnHzu313ePW7xGSVe1jlzNhATnuHsQC7Vysnh7krS4SvVsZSsRc5e97usnJHEfgy0EHOA4_OyQgc27yS0kCa-5ngS3kWHV90q9auv9oIsrb3jzbee-ac-zV9FKJc-4EutOx0_7DPjnPSS823ITRoxglFF_b5yrfNBKniSUxUBfzRMlkLNzbWfPN6REvD-NtgHYvsqMnueeFbvvfiY61taAkmkvMGO30CfifX_8WOlUX4WLwahqIGQ',
    },
  ];

  return (
    <section id="boutique" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          <span className="text-xs font-bold tracking-widest text-crimson-rose uppercase block mb-2">
            BOUTIQUE STORE
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">The Boutique</h2>
          <p className="font-body text-slate-400 text-base max-w-md mt-2">
            Curated arrangements for delivery, designed with an uncompromising eye for proportion and color.
          </p>
        </div>
        <a href="#products" className="text-gold-accent hover:underline text-sm font-semibold">
          View All Options →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((p, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="relative h-[450px] rounded-3xl overflow-hidden border border-white/10 mb-6 bg-surface">
              <Image
                src={p.src}
                alt={p.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-obsidian/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 backdrop-blur-sm">
                <button
                  onClick={() => onOpenConsultation(p.tier)}
                  className="px-6 py-3 rounded-full bg-crimson-rose text-white font-semibold text-sm hover:scale-105 transition-transform shadow-lg shadow-crimson-rose/40"
                >
                  Acquire Option
                </button>
              </div>
            </div>
            <h3 className="font-heading text-2xl font-bold text-white mb-1">{p.title}</h3>
            <p className="font-body text-slate-400 text-sm mb-2">{p.desc}</p>
            <p className="font-display text-lg font-bold text-gold-accent">{p.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
