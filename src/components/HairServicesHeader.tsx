
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone } from 'lucide-react';

const HairServicesHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-stone-600 hover:text-stone-800">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Back</span>
          </Link>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-light text-stone-800" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.05em' }}>
              Hair Services
            </h1>
          </div>
          
          <Button size="sm" className="bg-red-700 hover:bg-red-800 text-xs md:text-sm">
            <Phone className="w-3 h-3 md:w-4 md:h-4 mr-1" />
            <span className="hidden sm:inline">Call Now</span>
            <span className="sm:hidden">Call</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HairServicesHeader;
