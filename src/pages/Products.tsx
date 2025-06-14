
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Star, Package, Truck } from 'lucide-react';

const Products = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-orange-600 hover:text-orange-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Portals</span>
            </Link>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-800">
                PRODUCT SHOP
              </div>
              <div className="text-xs text-amber-600 tracking-wide">Professional Hair & Beauty Products</div>
            </div>
            
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Cart
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 text-orange-900">
              PROFESSIONAL PRODUCTS
            </h1>
            <p className="text-xl text-orange-700 max-w-3xl mx-auto mb-8">
              High-quality hair care and beauty products used by our professionals
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-orange-600">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <span>Salon Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-orange-500" />
                <span>Professional Brands</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>Fast Shipping</span>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200">
              <h3 className="text-2xl font-bold text-orange-800 mb-4">Hair Care</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-orange-600">Professional Shampoos</span>
                  <span className="font-medium text-orange-800">$24-$45</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange-600">Conditioners</span>
                  <span className="font-medium text-orange-800">$26-$48</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange-600">Hair Treatments</span>
                  <span className="font-medium text-orange-800">$35-$65</span>
                </div>
              </div>
              <Button className="w-full bg-amber-600 hover:bg-amber-700">Shop Hair Care</Button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200">
              <h3 className="text-2xl font-bold text-orange-800 mb-4">Styling Products</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-orange-600">Heat Protectants</span>
                  <span className="font-medium text-orange-800">$22-$38</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange-600">Styling Creams</span>
                  <span className="font-medium text-orange-800">$28-$42</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange-600">Hair Sprays</span>
                  <span className="font-medium text-orange-800">$18-$32</span>
                </div>
              </div>
              <Button className="w-full bg-amber-600 hover:bg-amber-700">Shop Styling</Button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200">
              <h3 className="text-2xl font-bold text-orange-800 mb-4">Color Care</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-orange-600">Color Protection</span>
                  <span className="font-medium text-orange-800">$32-$55</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange-600">Gloss Treatments</span>
                  <span className="font-medium text-orange-800">$28-$48</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange-600">Toning Shampoos</span>
                  <span className="font-medium text-orange-800">$26-$42</span>
                </div>
              </div>
              <Button className="w-full bg-amber-600 hover:bg-amber-700">Shop Color Care</Button>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-lg">
            <h3 className="text-3xl font-bold text-orange-800 mb-4">Professional Consultation Included</h3>
            <p className="text-orange-600 mb-6">Not sure which products are right for your hair? Schedule a consultation with our stylists.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8">
                Shop Online
              </Button>
              <Button size="lg" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50 px-8">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
