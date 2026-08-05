import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import {
  Cinzel_Decorative,
  Cinzel,
  Hanken_Grotesk,
  Libre_Caslon_Text,
  Outfit,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import './globals.css';

const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-cinzel-decorative',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hanken-grotesk',
  display: 'swap',
});

const libreCaslonText = Libre_Caslon_Text({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-libre-caslon',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#030305',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'ROSEVERSE • 300-Frame Botanical Kinetic Atelier',
  description: 'A 2026 luxury digital atelier showcasing 300-frame HTML5 canvas motion, 60FPS step LERP interpolation, 3D Three.js WebGL kinetics, and spatial audio synthesis.',
  keywords: [
    'RoseVerse',
    'Botanical Kinetic Atelier',
    '300 Frame Canvas',
    'HTML5 Motion Engine',
    '60FPS Canvas Scrubbing',
    'Three.js WebGL Rose',
    'Luxury Web Design',
    'Spatial Audio Synth',
    'React Three Fiber',
  ],
  authors: [{ name: 'ROSEVERSE Atelier Team' }],
  creator: 'ROSEVERSE',
  publisher: 'ROSEVERSE',
  category: 'Luxury Interactive Media',
  metadataBase: new URL('https://roseverse-website.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://roseverse-website.vercel.app/',
    title: 'ROSEVERSE • 300-Frame Botanical Kinetic Atelier',
    description: 'A 2026 luxury digital atelier showcasing 300-frame HTML5 canvas motion, 60FPS step LERP interpolation, 3D Three.js WebGL kinetics, and spatial audio synthesis.',
    siteName: 'ROSEVERSE Atelier',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvq7KsE4NPQp29mBDUYtNBr-uvmEu-gxPM49LX_1zusIXDc4f4CCdkATiTtZCFO5O8fjYyqS3d7AO08ujfErYEv4QekkFBhpRKfs41rNvrS44A02-lL84yN4-4CfF-FrdG0yDDoNmcsCBVOpx1PQH3l3cZJxL93zWu-0Y1tSrN3DoMyinm0Zewm2B6F648GHmqcTGr9iNdnMPi_rrCVOrpVj6hxidJQy9wsrvGtpBAhTfnufcgMbZePRAF94_bCQyv',
        width: 1200,
        height: 630,
        alt: 'ROSEVERSE 300-Frame Botanical Kinetic Atelier',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROSEVERSE • 300-Frame Botanical Kinetic Atelier',
    description: 'A 2026 luxury digital atelier showcasing 300-frame HTML5 canvas motion, 60FPS step LERP interpolation, 3D Three.js WebGL kinetics, and spatial audio synthesis.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCvq7KsE4NPQp29mBDUYtNBr-uvmEu-gxPM49LX_1zusIXDc4f4CCdkATiTtZCFO5O8fjYyqS3d7AO08ujfErYEv4QekkFBhpRKfs41rNvrS44A02-lL84yN4-4CfF-FrdG0yDDoNmcsCBVOpx1PQH3l3cZJxL93zWu-0Y1tSrN3DoMyinm0Zewm2B6F648GHmqcTGr9iNdnMPi_rrCVOrpVj6hxidJQy9wsrvGtpBAhTfnufcgMbZePRAF94_bCQyv',
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><path fill='%23ff1a40' d='M32 6c-8 0-14 6-14 14 0 5.2 3.1 9.7 7.6 11.9C20.2 34.2 16 40.5 16 48c0 8.8 7.2 16 16 16s16-7.2 16-16c0-7.5-4.2-13.8-9.6-16.1C42.9 29.7 46 25.2 46 20c0-8-6-14-14-14zm0 6c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8zm0 24c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10 4.5-10 10-10z'/></svg>",
        type: 'image/svg+xml',
      },
    ],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://roseverse-website.vercel.app/#organization',
      name: 'ROSEVERSE Atelier',
      url: 'https://roseverse-website.vercel.app/',
      sameAs: ['https://github.com/nandkishorsinha78-ui/ROSEVERSE-WEBSITE'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://roseverse-website.vercel.app/#website',
      url: 'https://roseverse-website.vercel.app/',
      name: 'ROSEVERSE',
      publisher: { '@id': 'https://roseverse-website.vercel.app/#organization' },
    },
    {
      '@type': 'Product',
      name: '300-Frame Botanical Kinetic Engine',
      description: '60FPS HTML5 Canvas motion sequence pre-cached in RAM for zero-latency frame scrubbing.',
      brand: { '@type': 'Brand', name: 'ROSEVERSE' },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: '299',
        highPrice: '2499',
        offerCount: '3',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${cinzelDecorative.variable} ${cinzel.variable} ${hankenGrotesk.variable} ${libreCaslonText.variable} ${outfit.variable} ${plusJakartaSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-obsidian text-slate-100 antialiased selection:bg-crimson-rose selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only fixed top-4 left-4 z-[999999] px-6 py-3 rounded-full bg-crimson-rose text-white text-xs font-bold shadow-2xl focus:outline-none focus:ring-2 focus:ring-gold-accent"
        >
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
