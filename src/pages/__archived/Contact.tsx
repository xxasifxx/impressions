
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-800 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-light text-stone-800 mb-8 text-center" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Contact Us
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-stone-800 mb-2">Phone</h3>
                  <p className="text-stone-600">(732) 613-1942</p>
                  <p className="text-sm text-stone-500">Call for appointments and inquiries</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-stone-800 mb-2">Location</h3>
                  <p className="text-stone-600">123 Main Street</p>
                  <p className="text-stone-600">Central Jersey, NJ</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-stone-800 mb-2">Hours</h3>
                  <div className="text-stone-600 space-y-1">
                    <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                    <p>Sunday: 10:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-light text-stone-800 mb-6">Send us a message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                  <input type="email" className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Message</label>
                  <textarea rows={4} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"></textarea>
                </div>
                <button type="submit" className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
