
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroBanner = () => {
  return (
    <section className="relative h-[670px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 flex items-center justify-center overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Beauty Redefined
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light">
          Your Premier Destination for Style
        </p>
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 text-lg font-medium"
        >
          Book Your Appointment
        </Button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
    </section>
  );
};

export default HeroBanner;
