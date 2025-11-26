import React from 'react';
import SimpleConsultationBrief from '@/components/consultation/SimpleConsultationBrief';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
          alt="Professional beauty salon interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/95 via-rose-800/85 to-pink-700/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight animate-fade-in">
            Your Beauty Journey, Crafted with Care
          </h1>
          <p className="text-lg md:text-xl text-white/80 animate-fade-in">
            Tell us your vision, we'll create the perfect look
          </p>
        </div>

        <SimpleConsultationBrief />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-rose-300 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
