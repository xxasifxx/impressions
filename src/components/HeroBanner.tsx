
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, Sparkles } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="relative h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30 flex items-center justify-center overflow-hidden">
      {/* Elegant background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-rose-100/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-slate-100/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-50/30 rounded-full blur-2xl"></div>
      </div>
      
      {/* Main transformation showcase */}
      <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
        <div className="relative w-full h-full">
          <img 
            src="/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png" 
            alt="Stunning prom transformation - professional makeup and hair styling"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-white/80"></div>
          
          {/* Transformation story overlay */}
          <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 max-w-xs shadow-xl border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-rose-500" />
              <span className="text-sm font-medium text-slate-700">Prom Transformation</span>
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
              <span className="text-slate-800 font-extralight" style={{ fontFamily: 'Fleur De Leah, cursive' }}>Impressions</span>
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-rose-400 to-pink-300 mb-4"></div>
            <p className="text-xl text-slate-600 font-light tracking-wide" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
              Beauty • Artistry • Excellence
            </p>
          </div>
          
          {/* Narrative Value Proposition */}
          <div className="text-2xl md:text-3xl mb-8 font-light text-slate-700 leading-relaxed">
            Where exceptional quality meets 
            <span className="font-medium text-slate-800"> personal artistry</span>
          </div>
          
          {/* Quality-focused highlights */}
          <div className="space-y-4 mb-8 max-w-md">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-rose-400 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-slate-800">Expert Transformations</span>
                <p className="text-slate-600 text-sm">Premium prom, bridal & special event styling</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-rose-400 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-slate-800">Cultural Celebrations</span>
                <p className="text-slate-600 text-sm">Authentic Ramadan, Diwali & seasonal beauty services</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-rose-400 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-slate-800">Advanced Skincare</span>
                <p className="text-slate-600 text-sm">Professional hydrafacials & LED therapy treatments</p>
              </div>
            </div>
          </div>
          
          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              size="lg" 
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 text-lg font-light rounded-xl shadow-lg"
            >
              Book Your Session
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg font-light rounded-xl"
            >
              (732) 613-1942
            </Button>
          </div>
          
          {/* Location & Social Proof */}
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>East Brunswick, NJ</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
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
