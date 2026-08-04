'use client';

import Image from 'next/image';

export default function CollectionGallery() {
  const collection = [
    {
      title: 'Crimson Velvet',
      tag: 'Fragrant',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvq7KsE4NPQp29mBDUYtNBr-uvmEu-gxPM49LX_1zusIXDc4f4CCdkATiTtZCFO5O8fjYyqS3d7AO08ujfErYEv4QekkFBhpRKfs41rNvrS44A02-lL84yN4-4CfF-FrdG0yDDoNmcsCBVOpx1PQH3l3cZJxL93zWu-0Y1tSrN3DoMyinm0Zewm2B6F648GHmqcTGr9iNdnMPi_rrCVOrpVj6hxidJQy9wsrvGtpBAhTfnufcgMbZePRAF94_bCQyv',
      span: 'col-span-1',
    },
    {
      title: 'Blush Sonata',
      tag: 'Seasonal',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO7IYm-mu_czkkZNvfTVWGqGiQ4i03n3B4N2JG2OgKs1kC2wfYbYxwpScpXif3CL2KrhXrIcYgspbb4GtWAXk1vjLhIfIJCTZXTSdJznxYwWRx2Q8TG1IKZSit6iQuBEj4Jm8-YGylEvPrJr5WjfjhUGArMPbZDDUPFPwy7fatz3sGyxlzgOKm56z83Yf_pbT_0k2t41p6yJGQB9PxDJsLGvuXb7JQ_eRZ6NNpTpPdPOuW3JdZ-fE',
      span: 'col-span-1',
    },
    {
      title: 'The Atelier Arrangement',
      tag: 'Grand Spaces',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJSxnetdSa3De_5nVwwgcxMcDpdq5UkgBtS-0Qo5t0VphMyzIxM-GAeZNCmaQuvPrkIITJKkpG6miCc0b1LUBEYgJbZRCNfQ1yIFOzQ3e4vZKbDeErRdjGScrrDZ03TEnhhx3w8zG0eKQOeUZ352uXEJWtp6nA8vVQhz8zHV0wcldaBf5f4NG1OPKJ9cBSWzFTBPslEsJWSzZRCoNKpXoox69ACbByBNcQeaKqrirO3qHURBvPnHM',
      span: 'md:col-span-2',
    },
  ];

  return (
    <section id="collection" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-bold tracking-widest text-crimson-rose uppercase">
          CURATED GALLERY
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">
          The Collection
        </h2>
        <p className="font-body text-slate-400 text-base">
          A curated gallery of our finest varieties, selected for their extraordinary color, fragrance, and petal count.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collection.map((item, idx) => (
          <div
            key={idx}
            className={`relative h-[420px] rounded-3xl overflow-hidden border border-white/10 group shadow-2xl ${item.span}`}
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-transparent p-8 flex flex-col justify-end">
              <span className="inline-block px-3 py-1 bg-gold-accent/20 border border-gold-accent/40 text-gold-accent text-xs font-semibold rounded-full w-fit mb-2">
                {item.tag}
              </span>
              <h3 className="font-heading text-2xl font-bold text-white">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
