
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Star, Phone, Search, Filter, Heart } from 'lucide-react';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'hair-care', name: 'Hair Care' },
    { id: 'styling', name: 'Styling' },
    { id: 'makeup', name: 'Makeup' },
    { id: 'tools', name: 'Tools & Accessories' }
  ];

  const products = [
    {
      id: 1,
      name: 'Professional Shampoo',
      category: 'hair-care',
      price: 28,
      rating: 4.8,
      image: '/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png',
      description: 'Sulfate-free formula for all hair types',
      brand: 'SalonPro'
    },
    {
      id: 2,
      name: 'Heat Protectant Spray',
      category: 'styling',
      price: 22,
      rating: 4.9,
      image: '/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png',
      description: 'Protects hair up to 450°F',
      brand: 'ThermalGuard'
    },
    {
      id: 3,
      name: 'Long-Wear Foundation',
      category: 'makeup',
      price: 35,
      rating: 4.7,
      image: '/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png',
      description: '24-hour wear, all skin tones',
      brand: 'ProMakeup'
    },
    {
      id: 4,
      name: 'Professional Hair Dryer',
      category: 'tools',
      price: 165,
      rating: 4.9,
      image: '/lovable-uploads/f41c2f8a-628b-41e1-b27c-4fab5011976b.png',
      description: 'Ionic technology, multiple speed settings',
      brand: 'SalonTech'
    },
    {
      id: 5,
      name: 'Color Safe Conditioner',
      category: 'hair-care',
      price: 32,
      rating: 4.6,
      image: '/lovable-uploads/5b93eca0-6808-4052-af4d-cf567c69ecdf.png',
      description: 'Extends color life, deeply moisturizing',
      brand: 'ColorProtect'
    },
    {
      id: 6,
      name: 'Curl Defining Cream',
      category: 'styling',
      price: 26,
      rating: 4.8,
      image: '/lovable-uploads/fbc6cbfd-042f-414f-bb0d-e91e731efe1f.png',
      description: 'Frizz control and curl enhancement',
      brand: 'CurlMaster'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-amber-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-amber-600 hover:text-amber-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Main</span>
            </Link>
            
            <div className="text-center">
              <div className="text-2xl font-light text-amber-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
                Product Shop
              </div>
              <div className="text-xs text-amber-500 tracking-wide">Professional Beauty Products</div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                <Phone className="w-4 h-4 mr-2" />
                (732) 613-1942
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-white via-amber-50 to-orange-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light mb-6 text-amber-800" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.05em' }}>
              Professional Products
            </h1>
            <p className="text-xl text-amber-600 max-w-3xl mx-auto mb-8">
              Salon-quality hair care, makeup, and styling tools • Same products we use in our services
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-amber-600 border border-amber-200 hover:bg-amber-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-shadow">
                <div className="relative mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-amber-600" />
                  </button>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-amber-500 uppercase tracking-wide">{product.brand}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-sm text-amber-600">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-amber-800 mb-2">{product.name}</h3>
                  <p className="text-sm text-amber-600 mb-3">{product.description}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-light text-amber-800">${product.price}</span>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Professional Consultation */}
          <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-3xl font-light text-center mb-6 text-amber-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
              Not Sure What You Need?
            </h3>
            <p className="text-amber-600 text-center mb-8">
              Our stylists can recommend the perfect products for your hair type and styling goals. 
              Get expert advice with your next service appointment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-4 text-lg">
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50 px-12 py-4 text-lg">
                Call for Advice
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-light text-center mb-12 text-amber-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
            Why Shop With Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-medium text-amber-800 mb-3">Professional Grade</h3>
              <p className="text-amber-600">Same high-quality products used in our salon services</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-medium text-amber-800 mb-3">Expert Guidance</h3>
              <p className="text-amber-600">Personalized recommendations from our stylists</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-medium text-amber-800 mb-3">Convenient Shopping</h3>
              <p className="text-amber-600">Order online or pick up during your next appointment</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
