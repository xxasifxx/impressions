
import React from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "The staff here is incredibly welcoming and professional. They really understand different hair types and textures. My daughter got her first haircut here and they made it such a special experience!",
      service: "Family Hair Care",
      location: "Central Jersey"
    },
    {
      name: "Maria Rodriguez",
      rating: 5,
      text: "Finally found a salon where I can communicate in Spanish! The stylists are so skilled and they really listened to what I wanted. The private area is perfect for when I need extra privacy.",
      service: "Hair Coloring & Styling",
      location: "Regular Client"
    },
    {
      name: "Aisha Khan",
      rating: 5,
      text: "I appreciate how respectful and accommodating the staff is. The private area gives me the comfort I need, and they understand my cultural preferences. Excellent service every time.",
      service: "Hair Care & Styling",
      location: "Loyal Customer"
    },
    {
      name: "Jennifer Chen",
      rating: 5,
      text: "Best facial I've ever had! The esthetician explained everything and gave me great skincare advice. The whole family comes here now - from my teenager's cuts to my husband's beard trims.",
      service: "Skincare & Family Services",
      location: "Family Client"
    },
    {
      name: "Priya Patel",
      rating: 5,
      text: "Love that they speak Hindi here! Makes me feel so comfortable. They did an amazing job on my bridal makeup and hair. All my wedding photos turned out beautiful thanks to their work.",
      service: "Bridal Package",
      location: "Special Occasion"
    },
    {
      name: "Lisa Thompson",
      rating: 5,
      text: "Been coming here for 3 years with my whole family. They're great with kids and the stylists really know their craft. Never had a bad experience and the prices are very reasonable.",
      service: "Regular Family Client",
      location: "3+ Years"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-rose-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">What Our Clients Say</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real reviews from real families who trust us with their beauty needs. 
            See why we've become Central Jersey's go-to salon for diverse communities.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-rose-100">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
              <div className="border-t border-rose-100 pt-4">
                <p className="font-semibold text-slate-900">{testimonial.name}</p>
                <p className="text-sm text-rose-600 font-medium">{testimonial.service}</p>
                <p className="text-xs text-slate-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-slate-600 mb-6">Check out more reviews on Google to see why families choose Impressions Hair Salon</p>
          <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50">
            View Google Reviews
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
