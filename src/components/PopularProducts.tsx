
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PopularProducts = () => {
  const products = [
    {
      name: "Redken All Soft Shampoo",
      price: "$24.99",
      originalPrice: "$28.99",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "Moisturizing shampoo for dry, brittle hair. Perfect for color-treated and damaged hair.",
      badge: "Client Favorite"
    },
    {
      name: "Redken All Soft Conditioner",
      price: "$26.99",
      originalPrice: "$30.99",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "Deep conditioning treatment that softens and adds shine to dry hair.",
      badge: "Best Seller"
    },
    {
      name: "Redken Color Extend Shampoo",
      price: "$28.99",
      originalPrice: "$32.99",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "Color-protecting shampoo that extends the life of your hair color for weeks longer.",
      badge: "Color Safe"
    },
    {
      name: "Redken Frizz Dismiss Serum",
      price: "$32.99",
      originalPrice: "$36.99",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "Anti-frizz serum that provides humidity protection and smooths hair for up to 72 hours.",
      badge: "Professional Choice"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-rose-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Salon-Quality Products</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Take home the same professional Redken products we use in our salon. 
            These are our clients' favorites for maintaining healthy, beautiful hair between visits.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 border border-rose-100">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-rose-500 hover:bg-rose-600">
                  {product.badge}
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{product.name}</h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-rose-500">{product.price}</span>
                    <span className="text-sm text-slate-400 line-through">{product.originalPrice}</span>
                  </div>
                </div>
                <Button size="sm" className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 bg-white rounded-xl p-8 shadow-lg border border-rose-100">
          <h3 className="text-2xl font-semibold text-slate-900 mb-4">Professional Product Consultation</h3>
          <p className="text-slate-600 mb-6">
            Not sure which products are right for your hair type? Our stylists can recommend 
            the perfect Redken products during your appointment or consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50">
              View All Products
            </Button>
            <Button size="lg" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
