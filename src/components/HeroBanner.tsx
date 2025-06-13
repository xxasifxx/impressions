
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroBanner = () => {
  return (
    <section className="relative h-[670px] bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-rose-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-300 rounded-full blur-2xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-slate-800 px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-slate-900">
          Impressions Hair Salon
        </h1>
        <p className="text-xl md:text-2xl mb-4 font-light text-slate-700">
          Serving Central Jersey Families Since 2015
        </p>
        <p className="text-lg mb-8 text-slate-600 max-w-2xl mx-auto">
          Multilingual stylists • Private area available • Walk-ins welcome
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 text-lg font-medium"
          >
            Book Your Appointment
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-rose-500 text-rose-600 hover:bg-rose-50 px-8 py-3 text-lg font-medium"
          >
            Call (732) 613-1942
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
