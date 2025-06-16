
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, User, Award, CheckCircle, Heart, Sparkles } from 'lucide-react';
import { UnifiedService } from '@/data/unifiedServicesData';
import { useDomainTheme } from '@/contexts/DomainThemeContext';
import AppointmentBookingModal from './AppointmentBookingModal';

interface ServiceDetailModalProps {
  service: UnifiedService | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceDetailModal = ({ service, isOpen, onClose }: ServiceDetailModalProps) => {
  const { currentTheme } = useDomainTheme();

  if (!service) return null;

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-700 border-green-200',
    Moderate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Advanced: 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle 
                className="text-3xl font-light mb-2 pr-8"
                style={{ 
                  fontFamily: currentTheme.fonts.heading,
                  color: currentTheme.colors.primary 
                }}
              >
                {service.name}
              </DialogTitle>
              <div className="flex items-center gap-3 mb-4">
                <Badge 
                  className="flex items-center gap-1"
                  style={{ 
                    backgroundColor: currentTheme.colors.primary + '20',
                    color: currentTheme.colors.primary
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  {service.category}
                </Badge>
                {service.difficulty && (
                  <Badge className={difficultyColors[service.difficulty]}>
                    {service.difficulty} Level
                  </Badge>
                )}
                {service.featured && (
                  <Badge 
                    style={{ 
                      backgroundColor: currentTheme.colors.accent,
                      color: 'white'
                    }}
                  >
                    <Award className="w-3 h-3 mr-1" />
                    Featured Service
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div 
                className="text-2xl font-bold"
                style={{ color: currentTheme.colors.primary }}
              >
                {service.price}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{service.duration}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Service Image and Overview */}
          <div>
            <div className="relative rounded-2xl overflow-hidden mb-6">
              <img 
                src={service.imageUrl} 
                alt={service.name}
                className="w-full h-64 object-cover"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
              />
            </div>

            {/* Service Overview */}
            <div 
              className="rounded-xl p-6 mb-6"
              style={{ 
                backgroundColor: currentTheme.colors.background,
                border: `1px solid ${currentTheme.colors.primary}20`
              }}
            >
              <h3 
                className="text-lg font-medium mb-3"
                style={{ color: currentTheme.colors.primary }}
              >
                About This Service
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>
                {service.details?.specialist && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{service.details.specialist}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Client Story */}
            {service.clientStory && (
              <div 
                className="rounded-xl p-6"
                style={{ 
                  backgroundColor: currentTheme.colors.primary + '10',
                  border: `1px solid ${currentTheme.colors.primary}30`
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Heart 
                    className="w-5 h-5" 
                    style={{ color: currentTheme.colors.primary }}
                  />
                  <span 
                    className="font-medium"
                    style={{ color: currentTheme.colors.primary }}
                  >
                    Client Love
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < service.clientStory!.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <blockquote className="text-gray-700 italic mb-2 text-lg">
                  "{service.clientStory.quote}"
                </blockquote>
                <cite className="text-sm text-gray-600">
                  — {service.clientStory.name}
                  {service.clientStory.transformation && (
                    <span className="block text-xs mt-1">
                      {service.clientStory.transformation}
                    </span>
                  )}
                </cite>
              </div>
            )}
          </div>

          {/* Right Column - Process and Details */}
          <div className="space-y-6">
            {/* Process Steps */}
            {service.details?.process && (
              <div>
                <h3 
                  className="text-lg font-medium mb-4 flex items-center gap-2"
                  style={{ color: currentTheme.colors.primary }}
                >
                  <CheckCircle className="w-5 h-5" />
                  What to Expect
                </h3>
                <ol className="space-y-3">
                  {service.details.process.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span 
                        className="flex-shrink-0 w-7 h-7 rounded-full text-white text-sm flex items-center justify-center font-medium"
                        style={{ backgroundColor: currentTheme.colors.primary }}
                      >
                        {index + 1}
                      </span>
                      <span className="text-gray-700 leading-relaxed pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Benefits */}
            {service.details?.benefits && (
              <div>
                <h3 
                  className="text-lg font-medium mb-4"
                  style={{ color: currentTheme.colors.primary }}
                >
                  Key Benefits
                </h3>
                <ul className="space-y-3">
                  {service.details.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle 
                        className="w-5 h-5 mt-0.5 flex-shrink-0" 
                        style={{ color: currentTheme.colors.secondary }}
                      />
                      <span className="text-gray-700 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Perfect For */}
            {service.details?.perfectFor && (
              <div>
                <h3 
                  className="text-lg font-medium mb-4"
                  style={{ color: currentTheme.colors.primary }}
                >
                  Perfect For
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.details.perfectFor.map((item, index) => (
                    <Badge 
                      key={index}
                      variant="outline"
                      className="text-sm py-2 px-3"
                      style={{ 
                        borderColor: currentTheme.colors.secondary,
                        color: currentTheme.colors.secondary
                      }}
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Preparation */}
            {service.details?.preparation && (
              <div>
                <h3 
                  className="text-lg font-medium mb-3"
                  style={{ color: currentTheme.colors.primary }}
                >
                  How to Prepare
                </h3>
                <ul className="space-y-2">
                  {service.details.preparation.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span 
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: currentTheme.colors.accent }}
                      />
                      <span className="text-gray-700 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Aftercare */}
            {service.details?.aftercare && (
              <div>
                <h3 
                  className="text-lg font-medium mb-3"
                  style={{ color: currentTheme.colors.primary }}
                >
                  Aftercare Tips
                </h3>
                <ul className="space-y-2">
                  {service.details.aftercare.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span 
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: currentTheme.colors.secondary }}
                      />
                      <span className="text-gray-700 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t">
          <AppointmentBookingModal
            trigger={
              <Button 
                className="flex-1 py-3 text-lg"
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
            sourcePage={`service-modal-${service.domain}`}
          />
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="px-8 py-3"
            style={{ 
              borderColor: currentTheme.colors.primary,
              color: currentTheme.colors.primary
            }}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;
