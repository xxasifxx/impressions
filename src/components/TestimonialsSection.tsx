
import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Amazing service! The staff is so friendly and professional. My hair has never looked better!",
      service: "Hair Styling"
    },
    {
      name: "Maria Rodriguez",
      rating: 5,
      text: "I love that they speak Spanish here. The makeup artist did an incredible job for my wedding!",
      service: "Bridal Makeup"
    },
    {
      name: "Aisha Khan",
      rating: 5,
      text: "The private area is perfect for my needs. Very respectful and accommodating staff.",
      service: "Hair Care"
    },
    {
      name: "Jennifer Chen",
      rating: 5,
      text: "Best facial I've ever had! My skin is glowing. Will definitely be back!",
      service: "Facial Treatment"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">What Our Clients Say</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients about their experience at Impressions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-4 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-slate-900">{testimonial.name}</p>
                <p className="text-sm text-slate-500">{testimonial.service}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">See more reviews on Google</p>
          <Button variant="outline">View Google Reviews</Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
