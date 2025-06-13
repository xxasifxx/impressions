
import React from 'react';
import { Globe, Heart, Users } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-rose-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Welcome to Impressions Hair Salon
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Located in the heart of Central Jersey, Impressions Hair Salon has been serving busy families 
            since 2015. We understand that life gets hectic, which is why we welcome walk-ins while 
            prioritizing our appointment clients to ensure everyone receives exceptional service.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Our diverse team of skilled stylists speaks multiple languages including English, Spanish, 
            Hindi, Urdu, and Arabic, making every client feel at home. We also offer a private area 
            for clients seeking additional privacy - we're head covering friendly and respect all 
            cultural and personal preferences.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-rose-100">
            <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Multilingual Team</h3>
            <p className="text-slate-600">Our stylists speak English, Spanish, Hindi, Urdu, and Arabic to serve our diverse Central Jersey community.</p>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-rose-100">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Private Area Available</h3>
            <p className="text-slate-600">We offer a private space for clients seeking additional privacy - head covering friendly and culturally respectful.</p>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-rose-100">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Family Focused</h3>
            <p className="text-slate-600">Specializing in services for busy families - from kids' first haircuts to special occasion styling for the whole family.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
