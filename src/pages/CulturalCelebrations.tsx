
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Heart, Star, Calendar } from 'lucide-react';

const CulturalCelebrations = () => {
  const celebrations = [
    {
      title: "Ramadan & Eid Specials",
      description: "Celebrate the holy month with special beauty packages designed with modesty and elegance in mind.",
      image: "/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png",
      services: ["Henna Artistry", "Modest Styling", "Private Area Services"],
      offer: "20% off complete packages during Ramadan"
    },
    {
      title: "Diwali Celebrations",
      description: "Embrace the festival of lights with traditional and contemporary beauty services that honor your heritage.",
      image: "/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png",
      services: ["Traditional Makeup", "Festive Hair Styling", "Special Event Packages"],
      offer: "Special pricing for Diwali season"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-emerald-50 via-rose-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Cultural Heritage</span>
              </div>
              <h1 className="text-5xl font-light text-slate-900 mb-6">
                Celebrating <span className="font-medium">Your Traditions</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Honor your cultural heritage with beauty services that respect and celebrate 
                your traditions. We understand the importance of cultural celebrations.
              </p>
            </div>
          </div>
        </section>

        {/* Cultural Services */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {celebrations.map((celebration, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={celebration.image}
                      alt={celebration.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-medium text-slate-900 mb-4">{celebration.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{celebration.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {celebration.services.map((service, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <span className="text-slate-700">{service}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-emerald-600" />
                        <span className="font-medium text-emerald-800">Special Offer</span>
                      </div>
                      <p className="text-emerald-700">{celebration.offer}</p>
                    </div>
                    
                    <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white">
                      Book Cultural Package
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Multilingual Services */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light text-slate-900 mb-6">
                Multilingual <span className="font-medium">Services</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Feel at home with our team that speaks your language and understands your cultural needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🗣️</span>
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-2">Languages Spoken</h3>
                <p className="text-slate-600">English, Spanish, Hindi, Urdu, Arabic</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-2">Private Areas</h3>
                <p className="text-slate-600">Comfortable spaces for cultural preferences</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-2">Traditional Arts</h3>
                <p className="text-slate-600">Henna, cultural makeup, traditional styling</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CulturalCelebrations;
