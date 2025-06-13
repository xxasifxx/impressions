
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Heart, Users } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="relative h-[750px] bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 flex items-center justify-center overflow-hidden">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-16 left-16 w-40 h-40 bg-rose-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-16 right-16 w-48 h-48 bg-purple-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-pink-400 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/2 w-36 h-36 bg-rose-300 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-1/4 animate-bounce delay-200">
          <Star className="w-6 h-6 text-rose-400 opacity-60" fill="currentColor" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-bounce delay-700">
          <Heart className="w-8 h-8 text-pink-400 opacity-60" fill="currentColor" />
        </div>
        <div className="absolute top-1/2 right-20 animate-bounce delay-1000">
          <Users className="w-7 h-7 text-purple-400 opacity-60" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-slate-800 px-4 max-w-5xl mx-auto">
        {/* Trust indicators */}
        <div className="flex justify-center items-center gap-6 mb-6 text-sm text-slate-600">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
            <span className="font-medium">9+ Years in Central Jersey</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-rose-500" fill="currentColor" />
            <span className="font-medium">Family-Owned & Operated</span>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            Impressions
          </span>
          <br />
          <span className="text-slate-900 text-4xl md:text-5xl font-light">
            Hair Salon & Spa
          </span>
        </h1>
        
        <div className="text-2xl md:text-3xl mb-6 font-medium text-slate-700">
          <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
            Where Every Family Feels at Home
          </span>
        </div>
        
        <p className="text-lg md:text-xl mb-4 text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Serving Central Jersey families since 2015 with <strong>multilingual stylists</strong> who speak 
          English, Spanish, Hindi, Urdu & Arabic
        </p>
        
        {/* Unique value props */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
          <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-rose-200">
            <span className="text-rose-600 font-medium">✨ Private Area Available</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-200">
            <span className="text-pink-600 font-medium">👨‍👩‍👧‍👦 Walk-ins Welcome</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200">
            <span className="text-purple-600 font-medium">🧕 Head Covering Friendly</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            💅 Book Your Appointment
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-rose-500 text-rose-600 hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-500 hover:text-white px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            📞 Call (732) 613-1942
          </Button>
        </div>
        
        {/* Social proof */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 mb-2">Trusted by families across Central Jersey</p>
          <div className="flex justify-center items-center gap-1">
            {[1,2,3,4,5].map((star) => (
              <Star key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" />
            ))}
            <span className="ml-2 text-sm text-slate-600 font-medium">4.8/5 from 150+ happy clients</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
