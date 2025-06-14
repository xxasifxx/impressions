
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="relative h-[80vh] bg-gradient-to-br from-neutral-50 via-stone-50 to-rose-50/30 flex items-center justify-center overflow-hidden">
      {/* Elegant background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-rose-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-stone-100/30 rounded-full blur-3xl"></div>
      </div>
      
      {/* Main hero image */}
      <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
        <img 
          src="/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png" 
          alt="Professional makeup and hair styling at Impressions"
          className="w-full h-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/10 to-white/80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-left text-slate-900 px-8 max-w-6xl mx-auto grid grid-cols-2 gap-12 items-center">
        <div>
          {/* Brand Identity */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-light mb-2 tracking-tight leading-tight">
              <span className="text-slate-800 font-extralight">Impressions</span>
            </h1>
            <p className="text-lg text-rose-600 font-medium tracking-wider uppercase">
              Hair Salon • Makeup Studio • Med Spa
            </p>
          </div>
          
          {/* Refined Value Proposition */}
          <div className="text-xl md:text-2xl mb-8 font-light text-slate-700 leading-relaxed">
            Elevating beauty through 
            <span className="font-medium text-slate-900"> expert artistry</span> and 
            <span className="font-medium text-slate-900"> personalized care</span> since 2015
          </div>
          
          {/* Key Differentiators */}
          <div className="grid grid-cols-1 gap-4 mb-8 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
              <span className="text-slate-700">Multilingual team serving diverse families</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
              <span className="text-slate-700">Private area for cultural preferences</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
              <span className="text-slate-700">Professional makeup & lash artistry</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
              <span className="text-slate-700">Specializing in bridal & special events</span>
            </div>
          </div>
          
          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              size="lg" 
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 text-base font-medium"
            >
              Book Appointment
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 text-base font-medium"
            >
              (732) 613-1942
            </Button>
          </div>
          
          {/* Location & Hours */}
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>East Brunswick, NJ</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Mon-Sat 9AM-7PM</span>
            </div>
          </div>
        </div>
        
        {/* Right side is for the image */}
        <div></div>
      </div>
    </section>
  );
};

export default HeroBanner;
