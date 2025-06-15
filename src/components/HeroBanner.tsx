
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, Sparkles } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="relative h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/40 flex items-center justify-center overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-orange-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-br from-stone-200/30 to-slate-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-amber-100/40 to-yellow-100/30 rounded-full blur-2xl"></div>
      </div>
      
      {/* Main transformation showcase */}
      <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden">
        <div className="relative w-full h-full">
          <img 
            src="/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png" 
            alt="Stunning prom transformation - professional makeup and hair styling"
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-white/85"></div>
          
          {/* Enhanced transformation story overlay */}
          <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md rounded-2xl p-6 max-w-xs shadow-2xl border border-white/30 transition-all duration-300 hover:shadow-3xl hover:bg-white/95">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
              <span className="text-sm font-semibold text-stone-700 tracking-wide">Prom Transformation</span>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed">
              "From everyday beautiful to prom night stunning - complete hair, makeup & styling"
            </p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-left text-stone-900 px-8 max-w-6xl mx-auto grid grid-cols-2 gap-12 items-center">
        <div>
          {/* Enhanced Brand Identity */}
          <div className="mb-8">
            <h1 className="text-7xl md:text-8xl font-light mb-4 tracking-tight leading-tight animate-fade-in">
              <span className="text-stone-800 font-extralight tracking-wide bg-gradient-to-r from-stone-800 to-stone-600 bg-clip-text text-transparent" style={{ fontFamily: 'Fleur De Leah, cursive' }}>Impressions</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-400 mb-4 rounded-full animate-scale-in"></div>
            <p className="text-2xl text-stone-600 font-light tracking-wide" style={{ fontFamily: 'Fleur De Leah, cursive' }}>
              Beauty • Artistry • Excellence
            </p>
          </div>
          
          {/* Enhanced Value Proposition */}
          <div className="text-3xl md:text-4xl mb-8 font-light text-stone-700 leading-relaxed animate-fade-in">
            Where exceptional quality meets 
            <span className="font-medium text-stone-800 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"> personal artistry</span>
          </div>
          
          {/* Enhanced highlights with animations */}
          <div className="space-y-5 mb-10 max-w-md">
            <div className="flex items-start gap-4 group hover:bg-amber-50/50 p-3 rounded-xl transition-all duration-300">
              <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full mt-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
              <div>
                <span className="font-semibold text-stone-800 text-lg">Expert Transformations</span>
                <p className="text-stone-600">Premium prom, bridal & special event styling</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group hover:bg-amber-50/50 p-3 rounded-xl transition-all duration-300">
              <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full mt-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
              <div>
                <span className="font-semibold text-stone-800 text-lg">Cultural Celebrations</span>
                <p className="text-stone-600">Authentic Ramadan, Diwali & seasonal beauty services</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group hover:bg-amber-50/50 p-3 rounded-xl transition-all duration-300">
              <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full mt-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
              <div>
                <span className="font-semibold text-stone-800 text-lg">Advanced Skincare</span>
                <p className="text-stone-600">Professional hydrafacials & LED therapy treatments</p>
              </div>
            </div>
          </div>
          
          {/* Enhanced Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-950 to-green-900 hover:from-green-900 hover:to-green-800 text-white px-10 py-5 text-lg font-medium rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            >
              Book Your Session
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-stone-300 text-stone-700 hover:bg-stone-100 hover:border-stone-400 px-10 py-5 text-lg font-medium rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              (732) 613-1942
            </Button>
          </div>
          
          {/* Enhanced Location & Social Proof */}
          <div className="flex items-center gap-8 text-sm text-stone-500">
            <div className="flex items-center gap-2 hover:text-stone-700 transition-colors duration-300">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span className="font-medium">East Brunswick, NJ</span>
            </div>
            <div className="flex items-center gap-2 hover:text-stone-700 transition-colors duration-300">
              <Star className="w-4 h-4 text-yellow-500 fill-current animate-pulse" />
              <span className="font-medium">4.9/5 • 200+ Reviews</span>
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
