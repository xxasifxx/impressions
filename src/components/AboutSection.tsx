
import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Welcome to Impressions
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-12">
            Impressions Hair Salon caters to busy families in Central Jersey. Walk-ins are welcome, but appointments are prioritized. 
            Our team of diverse stylists provides a wide range of hair, makeup, and beauty services in several languages, including 
            English, Spanish, Hindi, Urdu and Arabic. A private area is also available for clients seeking additional privacy 
            (head covering friendly).
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Hair Care</h3>
              <p className="text-slate-600">Professional cuts, styling, coloring, and treatments for all hair types.</p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Makeup</h3>
              <p className="text-slate-600">Expert makeup application for special events, weddings, and everyday looks.</p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Skincare</h3>
              <p className="text-slate-600">Rejuvenating facials and skincare treatments for healthy, glowing skin.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
