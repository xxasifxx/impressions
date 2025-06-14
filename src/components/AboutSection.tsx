
import React from 'react';
import { Palette, Heart, Users } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-light text-slate-900 mb-6">
              Where Beauty Meets <span className="font-medium">Artistry</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Since 2015, Impressions has been Central Jersey's premier destination for 
              professional beauty services. Our team of skilled artists specializes in 
              creating stunning looks for every occasion - from everyday elegance to 
              special event glamour.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              We understand that beauty is personal and cultural. That's why our multilingual 
              team speaks English, Spanish, Hindi, Urdu, and Arabic, and we offer a private 
              area for clients seeking additional privacy or those who prefer head covering 
              friendly services.
            </p>
            
            {/* Featured Services Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-slate-900">Hair Services</h4>
                <ul className="text-slate-600 space-y-1 text-sm">
                  <li>• Precision cuts & styling</li>
                  <li>• Professional color services</li>
                  <li>• Special occasion updos</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-slate-900">Makeup Artistry</h4>
                <ul className="text-slate-600 space-y-1 text-sm">
                  <li>• Bridal & event makeup</li>
                  <li>• Professional photography</li>
                  <li>• Makeup lessons</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="/lovable-uploads/88f3df0c-bbb4-4d55-b3d9-06a67281f0c4.png" 
                alt="Professional makeup application"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <img 
                src="/lovable-uploads/52cae70f-1233-4245-8345-ba3f7d434a46.png" 
                alt="Elegant hair and makeup styling"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-4 mt-8">
              <img 
                src="/lovable-uploads/5a3307f9-5b20-43a4-a327-3e2d9edf299e.png" 
                alt="Spa and wellness services"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <div className="bg-slate-900 rounded-lg p-6 text-white">
                <h4 className="font-medium mb-2">Special Packages</h4>
                <p className="text-sm text-slate-300">Complete transformation packages for proms, weddings, and special events</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette className="text-rose-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-3">Expert Artistry</h3>
            <p className="text-slate-600">Our skilled team brings years of experience and artistic vision to every service.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-rose-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-3">Cultural Respect</h3>
            <p className="text-slate-600">We honor all backgrounds with multilingual service and private areas when needed.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-rose-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-3">Family Focus</h3>
            <p className="text-slate-600">From children's first cuts to bridal makeup, we serve the whole family.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
