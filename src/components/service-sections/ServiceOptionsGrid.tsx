
import React from 'react';
import { Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppointmentBookingModal from '@/components/AppointmentBookingModal';

interface ServiceOption {
  title: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  coverage: string;
}

interface ServiceOptionsGridProps {
  title: string;
  description: string;
  options: ServiceOption[];
  theme: string;
  buttonClass: string;
}

const ServiceOptionsGrid = ({ title, description, options, theme, buttonClass }: ServiceOptionsGridProps) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-6 text-stone-800" style={{ fontFamily: 'Imperial Script, cursive' }}>
            {title}
          </h2>
          <p className="text-lg text-stone-600">{description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {options.map((option, index) => (
            <div key={index} className={`${theme} rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow`}>
              <div className="h-48 overflow-hidden">
                <img src={option.image} alt={option.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-medium text-stone-800">{option.title}</h3>
                  <span className="text-lg font-bold text-emerald-600">{option.price}</span>
                </div>
                <p className="text-stone-600 mb-4">{option.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-stone-500">
                    <Clock className="w-4 h-4" />
                    <span>{option.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stone-500">
                    <RefreshCw className="w-4 h-4" />
                    <span>{option.coverage}</span>
                  </div>
                </div>
                <AppointmentBookingModal
                  trigger={
                    <Button className={`w-full ${buttonClass}`}>
                      Book This Service
                    </Button>
                  }
                  prefilledService={{
                    name: option.title,
                    price: option.price,
                    duration: option.duration
                  }}
                  sourcePage={`service-option-${option.title.toLowerCase().replace(/\s+/g, '-')}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceOptionsGrid;
