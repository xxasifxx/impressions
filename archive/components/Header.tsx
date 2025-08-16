
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Clock } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-green-950 to-green-800 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-3 md:space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm">Mon-Sat: 9AM-7PM | Sun: 10AM-5PM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-3 w-3 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm">732-613-1942</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <span className="text-xs md:text-sm">123 Main Street, Central Jersey, NJ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl text-stone-900">
            <Link to="/" className="block">
              <div className="text-2xl md:text-4xl font-normal italic text-amber-700 tracking-wide" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
                Impressions
              </div>
              <div className="text-xs font-light tracking-[0.2em] text-stone-600 mt-1">
                SALON & SPA
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <Link to="/" className="text-stone-700 hover:text-stone-900 font-medium transition-colors text-sm lg:text-base">
              Home
            </Link>
            <Link to="/about" className="text-stone-700 hover:text-stone-900 font-medium transition-colors text-sm lg:text-base">
              About
            </Link>
            <Link to="/services" className="text-stone-700 hover:text-stone-900 font-medium transition-colors text-sm lg:text-base">
              Services
            </Link>
            <Link to="/shop" className="text-stone-700 hover:text-stone-900 font-medium transition-colors text-sm lg:text-base">
              Shop
            </Link>
            <Link to="/contact" className="text-stone-700 hover:text-stone-900 font-medium transition-colors text-sm lg:text-base">
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-stone-700 hover:text-stone-900 font-medium py-3 px-2 rounded-lg hover:bg-stone-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-stone-700 hover:text-stone-900 font-medium py-3 px-2 rounded-lg hover:bg-stone-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/services" 
                className="text-stone-700 hover:text-stone-900 font-medium py-3 px-2 rounded-lg hover:bg-stone-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/shop" 
                className="text-stone-700 hover:text-stone-900 font-medium py-3 px-2 rounded-lg hover:bg-stone-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/contact" 
                className="text-stone-700 hover:text-stone-900 font-medium py-3 px-2 rounded-lg hover:bg-stone-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
