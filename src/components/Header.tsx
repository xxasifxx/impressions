
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Clock } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Mon-Sat: 9AM-7PM | Sun: 10AM-5PM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>732-613-1942</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>123 Main Street, Central Jersey, NJ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl text-slate-900">
            <Link to="/" className="block">
              <div className="text-4xl font-normal italic text-red-700 tracking-wide" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
                Impressions
              </div>
              <div className="text-xs font-light tracking-[0.2em] text-slate-600 mt-1">
                SALON & SPA
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
              About
            </Link>
            <Link to="/services" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
              Services
            </Link>
            <Link to="/shop" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
              Shop
            </Link>
            <Link to="/contact" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-slate-700 hover:text-slate-900 font-medium py-2">
                Home
              </Link>
              <Link to="/about" className="text-slate-700 hover:text-slate-900 font-medium py-2">
                About
              </Link>
              <Link to="/services" className="text-slate-700 hover:text-slate-900 font-medium py-2">
                Services
              </Link>
              <Link to="/shop" className="text-slate-700 hover:text-slate-900 font-medium py-2">
                Shop
              </Link>
              <Link to="/contact" className="text-slate-700 hover:text-slate-900 font-medium py-2">
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
