import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AURA BLOOM • ROSEVERSE Botanical Atelier',
    short_name: 'ROSEVERSE',
    description: 'A 2026 luxury digital atelier showcasing 300-frame HTML5 canvas motion sequence, 60FPS step LERP interpolation, and 3D WebGL kinetics.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030305',
    theme_color: '#030305',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
