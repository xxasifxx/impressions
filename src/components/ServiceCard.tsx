
import React from 'react';
import { Clock, Star, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UnifiedService } from '@/data/unifiedServicesData';
import { useDomainTheme } from '@/contexts/DomainThemeContext';
import AppointmentBookingModal from './AppointmentBookingModal';

interface ServiceCardProps {
  service: UnifiedService;
  onDetailsClick: (service: UnifiedService) => void;
}

const ServiceCard = ({ service, onDetailsClick }: ServiceCardProps) => {
  const { currentTheme } = useDomainTheme();

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-700 border-green-200',
    Moderate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Advanced: 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Service Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={service.imageUrl} 
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {service.featured && (
          <Badge 
            className="absolute top-3 left-3"
            style={{ 
              backgroundColor: currentTheme.colors.accent,
              color: 'white'
            }}
          >
            <Award className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
        {service.difficulty && (
          <Badge 
            className={`absolute top-3 right-3 ${difficultyColors[service.difficulty]}`}
          >
            {service.difficulty}
          </Badge>
        )}
      </div>
      
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 
            className="text-xl font-medium group-hover:scale-105 transition-transform cursor-pointer"
            style={{ 
              color: currentTheme.colors.primary,
              fontFamily: currentTheme.fonts.heading 
            }}
            onClick={() => onDetailsClick(service)}
          >
            {service.name}
          </h3>
          <div className="text-right">
            <div 
              className="text-lg font-bold"
              style={{ color: currentTheme.colors.primary }}
            >
              {service.price}
            </div>
            <div className="text-xs text-gray-500">{service.duration}</div>
          </div>
        </div>

        {/* Service Info */}
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{service.duration}</span>
          </div>
          {service.details?.specialist && (
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span className="truncate">{service.details.specialist}</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {service.description}
        </p>

        {/* Client Story */}
        {service.clientStory && (
          <div 
            className="rounded-lg p-3 mb-4 border"
            style={{ 
              backgroundColor: currentTheme.colors.background,
              borderColor: currentTheme.colors.primary + '20'
            }}
          >
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < service.clientStory!.rating 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 italic mb-1">
              "{service.clientStory.quote}"
            </p>
            <p className="text-xs text-gray-500">— {service.clientStory.name}</p>
          </div>
        )}

        {/* CTAs */}
        <div className="space-y-3">
          <AppointmentBookingModal
            trigger={
              <Button 
                className="w-full"
                style={{ 
                  backgroundColor: currentTheme.colors.primary,
                  color: 'white'
                }}
              >
                Book {service.name} - {service.price}
              </Button>
            }
            prefilledService={{
              name: service.name,
              price: service.price,
              duration: service.duration
            }}
            sourcePage={`unified-services-${service.domain}`}
          />
          
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onDetailsClick(service)}
            style={{ 
              borderColor: currentTheme.colors.primary,
              color: currentTheme.colors.primary
            }}
          >
            View Details & Process
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
