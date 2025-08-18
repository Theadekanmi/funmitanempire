export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/account/',
        '/cart/',
        '/checkout/',
        '/login/',
        '/register/',
      ],
    },
    sitemap: 'https://funmitanempire.com/sitemap.xml',
    host: 'https://funmitanempire.com',
  }
}