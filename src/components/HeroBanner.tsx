
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, Sparkles } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="relative h-screen bg-gradient-to-br from-neutral-50 via-stone-50 to-emerald-50/30 flex items-center justify-center overflow-hidden">
      {/* Elegant background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-stone-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-50/40 rounded-full blur-2xl"></div>
      </div>
      
      {/* Main transformation showcase */}
      <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
        <div className="relative w-full h-full">
          <img 
            src="/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png" 
            alt="Stunning prom transformation - professional makeup and hair styling"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-white/70"></div>
          
          {/* Transformation story overlay */}
          <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm rounded-xl p-6 max-w-xs">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">Prom Transformation</span>
            </div>
            <p className="text-sm text-slate-600">
              "From everyday beautiful to prom night stunning - complete hair, makeup & styling"
            </p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-left text-slate-900 px-8 max-w-6xl mx-auto grid grid-cols-2 gap-12 items-center">
        <div>
          {/* Brand Identity */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-light mb-3 tracking-tight leading-tight">
              <span className="text-slate-800 font-extralight">Impressions</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mb-4"></div>
            <p className="text-xl text-emerald-700 font-medium tracking-wide">
              Beauty • Artistry • Transformation
            </p>
          </div>
          
          {/* Narrative Value Proposition */}
          <div className="text-2xl md:text-3xl mb-8 font-light text-slate-700 leading-relaxed">
            Where every client's story becomes a 
            <span className="font-medium text-emerald-800"> beautiful transformation</span>
          </div>
          
          {/* Story highlights */}
          <div className="space-y-4 mb-8 max-w-md">
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-slate-800">Prom & Special Events</span>
                <p className="text-slate-600 text-sm">Complete transformations that create lasting memories</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-slate-800">Cultural Celebrations</span>
                <p className="text-slate-600 text-sm">Honoring traditions with Ramadan, Diwali & seasonal specials</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-slate-800">Med Spa Services</span>
                <p className="text-slate-600 text-sm">Advanced skincare with hydrafacials & LED therapy</p>
              </div>
            </div>
          </div>
          
          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              size="lg" 
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 text-lg font-medium rounded-xl"
            >
              Book Your Transformation
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-8 py-4 text-lg font-medium rounded-xl"
            >
              (732) 613-1942
            </Button>
          </div>
          
          {/* Location & Social Proof */}
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>East Brunswick, NJ</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>4.9/5 • 200+ Reviews</span>
            </div>
          </div>
        </div>
        
        {/* Right side space for image */}
        <div></div>
      </div>
    </section>
  );
};

export default HeroBanner;
