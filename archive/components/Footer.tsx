
import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-rose-400" />
                <span>123 Main Street<br />Central Jersey, NJ</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-rose-400" />
                <span>732-613-1942</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-rose-400" />
                <span>info@impressionsspasalon.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-rose-400 transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-rose-400 transition-colors">About Us</a></li>
              <li><a href="/services" className="hover:text-rose-400 transition-colors">Services</a></li>
              <li><a href="/shop" className="hover:text-rose-400 transition-colors">Shop</a></li>
              <li><a href="/contact" className="hover:text-rose-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Our Services</h3>
            <ul className="space-y-2">
              <li><span className="hover:text-rose-400 transition-colors cursor-pointer">Hair Styling & Cuts</span></li>
              <li><span className="hover:text-rose-400 transition-colors cursor-pointer">Hair Coloring</span></li>
              <li><span className="hover:text-rose-400 transition-colors cursor-pointer">Makeup Services</span></li>
              <li><span className="hover:text-rose-400 transition-colors cursor-pointer">Facial Treatments</span></li>
              <li><span className="hover:text-rose-400 transition-colors cursor-pointer">Spa Packages</span></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Working Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-5 w-5 text-rose-400" />
                <span className="font-medium">Opening Hours</span>
              </div>
              <div className="text-sm space-y-1">
                <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                <p>Sunday: 10:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 mb-4 md:mb-0">
              © 2024 Impressions Salon & Spa. All rights reserved.
            </div>
            <div className="text-slate-400 text-sm">
              Serving Central Jersey with Excellence
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
