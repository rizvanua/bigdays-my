import React from 'react'
import { Facebook, Instagram, Twitter, LogOut, User } from 'lucide-react'

interface HeaderProps {
  guestName: string
  onLogout: () => void
}

const Header: React.FC<HeaderProps> = ({ guestName, onLogout }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 py-5 transition-all duration-300">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-serif text-3xl font-bold text-primary-green">R&O</span>
          </div>
          
          <nav className="hidden md:flex gap-10 items-center">
            <a href="#locations" className="text-secondary-gray font-medium text-base transition-colors duration-300 relative hover:text-primary-green after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary-green after:transition-all after:duration-300 hover:after:w-full">Location</a>
            <a href="#schedule" className="text-secondary-gray font-medium text-base transition-colors duration-300 relative hover:text-primary-green after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary-green after:transition-all after:duration-300 hover:after:w-full">Schedule</a>
            <a href="#wishlist" className="text-secondary-gray font-medium text-base transition-colors duration-300 relative hover:text-primary-green after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary-green after:transition-all after:duration-300 hover:after:w-full">Wishlist</a>
            {/* <a href="#contact" className="text-secondary-gray font-medium text-base transition-colors duration-300 relative hover:text-primary-green after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary-green after:transition-all after:duration-300 hover:after:w-full">Contact us</a> */}
          </nav>
          
          <div className="flex gap-5 items-center">
            {/* Guest Name Display */}
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <User size={16} />
              <span>Welcome, {guestName}</span>
            </div>
            
            {/* Social Links */}
            <a href="https://facebook.com" className="text-secondary-gray transition-colors duration-300 hover:text-primary-green" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <Facebook size={20} />
            </a>
            <a href="https://instagram.com" className="text-secondary-gray transition-colors duration-300 hover:text-primary-green" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com" className="text-secondary-gray transition-colors duration-300 hover:text-primary-green" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <Twitter size={20} />
            </a>
            
            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-secondary-gray hover:text-red-500 transition-colors duration-300 text-sm"
              title="Logout"
            >
              <LogOut size={16} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
