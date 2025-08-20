export default function manifest() {
  return {
    name: 'Funmitan Empire Limited - African Fashion & Fabrics',
    short_name: 'Funmitan Empire',
    description: 'Discover premium fashion wear for women, teens, and men. Quality fabrics, gele, and ready-made designs. Fast UK delivery.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#dd6b20',
    orientation: 'portrait',
    categories: ['shopping', 'fashion', 'lifestyle'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}