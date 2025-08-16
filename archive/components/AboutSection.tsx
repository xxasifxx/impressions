
import React from 'react';
import { Palette, Heart, Users } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-light text-stone-900 mb-6 tracking-wide" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
              Where Quality Meets <span className="font-medium">Excellence</span>
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed mb-6">
              Since 2015, Impressions has established itself as Central Jersey's trusted 
              destination for exceptional beauty services. Our commitment to quality means 
              every service is performed with meticulous attention to detail and artistic precision.
            </p>
            <p className="text-lg text-stone-600 leading-relaxed mb-8">
              We believe in taking the time needed to achieve perfection. Our multilingual 
              team speaks English, Spanish, Hindi, Urdu, and Arabic, and we provide private 
              areas for clients who prefer additional privacy or culturally sensitive services.
            </p>
            
            {/* Featured Services Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-stone-900 tracking-wide" style={{ fontFamily: 'Fleur De Leah, cursive' }}>Hair Excellence</h4>
                <ul className="text-stone-600 space-y-1 text-sm">
                  <li>• Precision cuts & expert styling</li>
                  <li>• Professional color artistry</li>
                  <li>• Elegant special occasion updos</li>
                  <li>• Advanced texture treatments</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-stone-900 tracking-wide" style={{ fontFamily: 'Fleur De Leah, cursive' }}>Beauty Artistry</h4>
                <ul className="text-stone-600 space-y-1 text-sm">
                  <li>• Flawless bridal & event makeup</li>
                  <li>• Premium lash extensions</li>
                  <li>• Expert eyebrow shaping</li>
                  <li>• Traditional henna artistry</li>
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
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
              <img 
                src="/lovable-uploads/4b442d70-6a94-4270-b29a-dc3cf4168b64.png" 
                alt="Professional lash extension before and after results"
                className="w-full h-48 object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-4 mt-8">
              <img 
                src="/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png" 
                alt="Elegant bridal makeup and hair styling"
                className="w-full h-48 object-cover rounded-2xl shadow-lg"
              />
              <div className="bg-gradient-to-br from-green-950 to-green-800 rounded-2xl p-6 text-white shadow-lg">
                <h4 className="font-medium mb-2 tracking-wide" style={{ fontFamily: 'Fleur De Leah, cursive' }}>Premium Packages</h4>
                <p className="text-sm text-stone-300">Complete transformation experiences for proms, weddings, and special events with personalized attention to every detail</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Palette className="text-stone-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-medium text-stone-900 mb-3 tracking-wide" style={{ fontFamily: 'Fleur De Leah, cursive' }}>Masterful Artistry</h3>
            <p className="text-stone-600">Our skilled professionals bring years of expertise and artistic vision to every service, ensuring exceptional results every time.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="text-stone-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-medium text-stone-900 mb-3 tracking-wide" style={{ fontFamily: 'Fleur De Leah, cursive' }}>Cultural Respect</h3>
            <p className="text-stone-600">We honor all traditions with multilingual service and private accommodations, celebrating the beauty of cultural diversity.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="text-stone-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-medium text-stone-900 mb-3 tracking-wide" style={{ fontFamily: 'Fleur De Leah, cursive' }}>Quality Time</h3>
            <p className="text-stone-600">We believe great results require proper time and attention. Every service receives the care it deserves for lasting beauty.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
