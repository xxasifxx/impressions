
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-800 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-light text-stone-800 mb-8 text-center" style={{ fontFamily: 'Imperial Script, cursive' }}>
            About Impressions Beauty
          </h1>
          
          <div className="prose prose-stone max-w-none">
            <p className="text-xl text-stone-600 mb-8 text-center">
              Your premier destination for hair, makeup, and wellness services in Central Jersey.
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 mt-16">
              <div>
                <h2 className="text-3xl font-light text-stone-800 mb-4">Our Story</h2>
                <p className="text-stone-600 mb-4">
                  Since 2010, Impressions Beauty has been transforming lives through exceptional beauty services. 
                  What started as a small hair salon has grown into a comprehensive beauty destination.
                </p>
                <p className="text-stone-600">
                  We believe that beauty is personal, and every client deserves a unique experience tailored to their individual style and needs.
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-light text-stone-800 mb-4">Our Mission</h2>
                <p className="text-stone-600 mb-4">
                  To provide exceptional beauty services that enhance our clients' natural beauty and boost their confidence.
                </p>
                <p className="text-stone-600">
                  We're committed to using the latest techniques and highest quality products to deliver results that exceed expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
