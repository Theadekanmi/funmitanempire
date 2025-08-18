import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Funmitan Empire</h3>
            <p className="text-gray-400 mb-4">
              Premium fashion wear for women, teens, and men. Quality fabrics, gele, and ready-made designs with FREE delivery to Manchester and UK mainland £50+.
            </p>
            <div className="text-gray-400 text-sm">
              <p>📧 funmitanempire@gmail.com</p>
              <p>📞 +447368369348</p>
              <p>📍 Manchester, United Kingdom</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/women" className="hover:text-white transition-colors">Women's Fashion</Link></li>
              <li><Link href="/men" className="hover:text-white transition-colors">Men's Fashion</Link></li>
              <li><Link href="/teens" className="hover:text-white transition-colors">Teen's Collection</Link></li>
              <li><Link href="/fabrics" className="hover:text-white transition-colors">Premium Fabrics</Link></li>
              <li><Link href="/gele" className="hover:text-white transition-colors">Gele Collection</Link></li>
              <li><Link href="/sale" className="hover:text-white transition-colors">Sale Items</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns-exchange" className="hover:text-white transition-colors">Returns & Exchange</Link></li>
              <li><Link href="/track-order" className="hover:text-white transition-colors">Track Your Order</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Help & FAQ</Link></li>
            </ul>
          </div>

          {/* Legal & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">Subscribe to our newsletter for updates and exclusive offers.</p>
              <Link 
                href="/newsletter" 
                className="inline-block bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors text-sm"
              >
                Subscribe
              </Link>
            </div>
            
            <h4 className="font-medium mb-2">Follow Us</h4>
            <div className="flex space-x-3 mb-4">
              <a href="https://www.facebook.com/share/1AHGWcKrWq/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://instagram.com/funmitan2022" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.324-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.324C5.901 8.248 7.052 7.758 8.349 7.758s2.448.49 3.324 1.297c.876.876 1.366 2.027 1.366 3.324s-.49 2.448-1.297 3.324c-.876.876-2.027 1.366-3.324 1.366z"/>
                </svg>
              </a>
              <a href="https://tiktok.com/@funmitan2022" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
                <span className="sr-only">TikTok</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.321 5.562a5.122 5.122 0 01-.443-.258 6.228 6.228 0 01-1.137-.966c-.849-.912-1.285-1.99-1.285-3.338v-.5h-3.35v12.794c0 1.357-1.1 2.458-2.458 2.458-1.357 0-2.458-1.1-2.458-2.458 0-1.357 1.1-2.458 2.458-2.458.270 0 .530.044.774.124v-3.39c-.245-.029-.494-.044-.744-.044C7.357 7.526 4.5 10.383 4.5 13.704s2.857 6.178 6.178 6.178 6.178-2.857 6.178-6.178V9.298c1.339.961 2.93 1.481 4.6 1.481v-3.35c-1.188 0-2.287-.451-3.135-1.867z"/>
                </svg>
              </a>
            </div>
            
            <h4 className="font-medium mb-2">Legal</h4>
            <ul className="space-y-1 text-gray-400 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Funmitan Empire Limited. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="https://www.facebook.com/share/1AHGWcKrWq/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://instagram.com/funmitan2022" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.324-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.324C5.901 8.248 7.052 7.758 8.349 7.758s2.448.49 3.324 1.297c.876.876 1.366 2.027 1.366 3.324s-.49 2.448-1.297 3.324c-.876.876-2.027 1.366-3.324 1.366z"/>
                </svg>
              </a>
              <a href="https://tiktok.com/@funmitan2022" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
                <span className="sr-only">TikTok</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.321 5.562a5.122 5.122 0 01-.443-.258 6.228 6.228 0 01-1.137-.966c-.849-.912-1.285-1.99-1.285-3.338v-.5h-3.35v12.794c0 1.357-1.1 2.458-2.458 2.458-1.357 0-2.458-1.1-2.458-2.458 0-1.357 1.1-2.458 2.458-2.458.270 0 .530.044.774.124v-3.39c-.245-.029-.494-.044-.744-.044C7.357 7.526 4.5 10.383 4.5 13.704s2.857 6.178 6.178 6.178 6.178-2.857 6.178-6.178V9.298c1.339.961 2.93 1.481 4.6 1.481v-3.35c-1.188 0-2.287-.451-3.135-1.867z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}