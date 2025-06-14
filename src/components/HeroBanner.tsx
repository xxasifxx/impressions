
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="relative h-[700px] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-slate-900 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-slate-700 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-slate-900 px-4 max-w-4xl mx-auto">
        {/* Primary Heading */}
        <h1 className="text-6xl md:text-7xl font-light mb-4 tracking-tight">
          <span className="font-extralight text-slate-600">Impressions</span>
          <br />
          <span className="font-normal">Hair Salon & Spa</span>
        </h1>
        
        {/* Key Value Proposition */}
        <div className="text-xl md:text-2xl mb-12 font-light text-slate-700 max-w-2xl mx-auto leading-relaxed">
          Serving Central Jersey's diverse families since 2015 with 
          <span className="font-medium text-slate-900"> multilingual expertise</span> and 
          <span className="font-medium text-slate-900"> culturally respectful care</span>
        </div>
        
        {/* Trust Indicators - Clean Layout */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" fill="currentColor" />
            <span className="font-medium">9+ Years Established</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-slate-300"></div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-600" />
            <span className="font-medium">East Brunswick, NJ</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-slate-300"></div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-600" />
            <span className="font-medium">Walk-ins Welcome</span>
          </div>
        </div>
        
        {/* Core USPs - Strategic Placement */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <div className="text-center p-4">
            <div className="text-3xl mb-2">🌍</div>
            <h3 className="font-medium text-slate-900 mb-1">Multilingual Team</h3>
            <p className="text-sm text-slate-600">English, Spanish, Hindi, Urdu & Arabic</p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">🤱</div>
            <h3 className="font-medium text-slate-900 mb-1">Private Area Available</h3>
            <p className="text-sm text-slate-600">Head covering friendly environment</p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
            <h3 className="font-medium text-slate-900 mb-1">Family Focused</h3>
            <p className="text-sm text-slate-600">All ages, from kids to grandparents</p>
          </div>
        </div>
        
        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            size="lg" 
            className="bg-slate-900 hover:bg-slate-800 text-white px-12 py-4 text-base font-medium tracking-wide"
          >
            Book Appointment
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-50 px-12 py-4 text-base font-medium tracking-wide"
          >
            Call (732) 613-1942
          </Button>
        </div>
        
        {/* Social Proof - Minimal */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-1 mb-2">
            {[1,2,3,4,5].map((star) => (
              <Star key={star} className="w-4 h-4 text-amber-500" fill="currentColor" />
            ))}
          </div>
          <p className="text-sm text-slate-500">4.8/5 rating from 150+ families across Central Jersey</p>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
