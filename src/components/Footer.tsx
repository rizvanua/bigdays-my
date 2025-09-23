import React from 'react'
import { Facebook, Instagram, Twitter } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-green py-10 text-white">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center">
            <span className="font-serif text-2xl font-bold text-white">R</span>
          </div>
          
          {/* <nav className="flex flex-wrap gap-8 md:gap-10 items-center justify-center">
            <a href="/about" className="text-white/80 text-base transition-colors duration-300 hover:text-white">About us</a>
            <a href="/terms" className="text-white/80 text-base transition-colors duration-300 hover:text-white">Terms of Service</a>
            <a href="/privacy" className="text-white/80 text-base transition-colors duration-300 hover:text-white">Privacy Policy</a>
            <a href="/faq" className="text-white/80 text-base transition-colors duration-300 hover:text-white">FAQ</a>
          </nav> */}
          
          <div className="flex gap-5 items-center">
            <a href="https://facebook.com" className="text-white/80 transition-colors duration-300 hover:text-white" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <Facebook size={20} />
            </a>
            <a href="https://instagram.com" className="text-white/80 transition-colors duration-300 hover:text-white" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com" className="text-white/80 transition-colors duration-300 hover:text-white" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
