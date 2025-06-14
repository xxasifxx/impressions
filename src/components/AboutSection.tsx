
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
                  <li>• Curls & texture styling</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-slate-900">Beauty Services</h4>
                <ul className="text-slate-600 space-y-1 text-sm">
                  <li>• Bridal & event makeup</li>
                  <li>• Professional lash extensions</li>
                  <li>• Eyebrow threading & shaping</li>
                  <li>• Henna tattoo artistry</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="/lovable-uploads/46eaf28c-0012-415c-a930-cc3832c40ac8.png" 
                alt="Beautiful curled hairstyles for mother and daughter"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <img 
                src="/lovable-uploads/4b442d70-6a94-4270-b29a-dc3cf4168b64.png" 
                alt="Professional lash extension before and after results"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-4 mt-8">
              <img 
                src="/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png" 
                alt="Elegant bridal makeup and hair styling"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <div className="bg-slate-900 rounded-lg p-6 text-white">
                <h4 className="font-medium mb-2">Special Packages</h4>
                <p className="text-sm text-slate-300">Complete transformation packages for proms, weddings, and special events including makeup, hair, and lashes</p>
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
            <p className="text-slate-600">Our skilled team brings years of experience and artistic vision to every service, from precision cuts to intricate henna designs.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-rose-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-3">Cultural Respect</h3>
            <p className="text-slate-600">We honor all backgrounds with multilingual service and private areas when needed, celebrating diverse beauty traditions.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-rose-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-3">Family Focus</h3>
            <p className="text-slate-600">From children's first cuts to bridal makeup, we serve the whole family with care and attention to detail.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
