
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Sparkles, Star } from 'lucide-react';

const Transformations = () => {
  const transformations = [
    {
      title: "Prom Night Magic",
      before: "/lovable-uploads/46eaf28c-0012-415c-a930-cc3832c40ac8.png",
      after: "/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png",
      description: "From everyday beautiful to prom night stunning with professional makeup, elegant updo, and styling that made her feel like royalty.",
      services: ["Formal Updo", "Evening Makeup", "Lash Extensions"],
      testimonial: "I felt like a princess! The transformation was beyond my dreams."
    },
    {
      title: "Bridal Elegance",
      before: "/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png",
      after: "/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png",
      description: "A complete bridal transformation featuring traditional henna artistry, flawless makeup, and an elegant hairstyle perfect for her special day.",
      services: ["Bridal Makeup", "Henna Artistry", "Wedding Hair"],
      testimonial: "They understood exactly what I wanted for my cultural wedding."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Client Stories</span>
              </div>
              <h1 className="text-5xl font-light text-slate-900 mb-6">
                Beautiful <span className="font-medium">Transformations</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Every transformation tells a story. See how our clients' special moments 
                become unforgettable memories through expert artistry and personalized care.
              </p>
            </div>
          </div>
        </section>

        {/* Transformations Showcase */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="space-y-20">
              {transformations.map((transformation, index) => (
                <div key={index} className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div>
                      <h3 className="text-3xl font-light text-slate-900 mb-4">{transformation.title}</h3>
                      <p className="text-lg text-slate-600 leading-relaxed mb-6">
                        {transformation.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {transformation.services.map((service, idx) => (
                          <span key={idx} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                            {service}
                          </span>
                        ))}
                      </div>
                      
                      <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-slate-700 mb-6">
                        "{transformation.testimonial}"
                      </blockquote>
                      
                      <Button className="bg-emerald-700 hover:bg-emerald-800 text-white">
                        Book Similar Service
                      </Button>
                    </div>
                  </div>
                  
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <img 
                          src={transformation.before} 
                          alt="Before transformation"
                          className="w-full h-80 object-cover rounded-lg shadow-lg"
                        />
                        <p className="text-center text-sm text-slate-500 font-medium">Before</p>
                      </div>
                      <div className="space-y-2">
                        <img 
                          src={transformation.after} 
                          alt="After transformation"
                          className="w-full h-80 object-cover rounded-lg shadow-lg"
                        />
                        <p className="text-center text-sm text-emerald-600 font-medium">After</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-light mb-6">Ready for Your Transformation?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Let us create your perfect look for any occasion. Book a consultation to discuss your vision.
            </p>
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
              Schedule Consultation
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Transformations;
