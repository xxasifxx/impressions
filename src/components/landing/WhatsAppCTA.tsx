import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { getProductionConfig } from '@/config/production';

const WhatsAppCTA = () => {
  const whatsappNumber = getProductionConfig().contact.whatsapp;
  const whatsappMessage = encodeURIComponent("Hi! I'd like to learn more about your beauty services. Can you help me?");
  
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Look?
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Open WhatsApp, tell us your beauty goals and preferences. We'll take care of everything else — from consultation to styling. No forms, no hassle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="xl" 
                className="group bg-white text-rose-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <MessageCircle className="mr-2 group-hover:scale-110 transition-transform" />
                Start Your Beauty Journey on WhatsApp
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>

          <div className="inline-flex flex-col sm:flex-row gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Usually respond within 2 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Consultation scheduled within 24 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Transparent, upfront pricing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppCTA;
