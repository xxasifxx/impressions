
import React from 'react';
import { Button } from '@/components/ui/button';

const PopularProducts = () => {
  const products = [
    {
      name: "Redken All Soft Shampoo",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "Moisturizing shampoo for dry, brittle hair"
    },
    {
      name: "Redken All Soft Conditioner",
      price: "$26.99",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "Nourishing conditioner for softness and shine"
    },
    {
      name: "Redken Color Extend Shampoo",
      price: "$28.99",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "Color-protecting shampoo for vibrant hair"
    },
    {
      name: "Redken Frizz Dismiss Serum",
      price: "$32.99",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "Anti-frizz serum for smooth, manageable hair"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Popular Products</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our bestselling professional hair care products from Redken and other premium brands.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{product.name}</h3>
                <p className="text-slate-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-rose-500">{product.price}</span>
                  <Button size="sm" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
