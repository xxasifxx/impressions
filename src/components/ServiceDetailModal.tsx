
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Clock, Star, User } from 'lucide-react';
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle 
            className="text-3xl font-light mb-2"
            style={{ 
              fontFamily: currentTheme.fonts.heading,
              color: currentTheme.colors.primary 
            }}
          >
            {service.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Overview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 mb-4">{service.description}</p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{service.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>{service.price}</span>
              </div>
              {service.details?.specialist && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{service.details.specialist}</span>
                </div>
              )}
            </div>
          </div>

          {/* Process Steps */}
          {service.details?.process && (
            <div>
              <h3 className="text-lg font-medium mb-3 text-gray-800">What to Expect</h3>
              <ol className="space-y-2">
                {service.details.process.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span 
                      className="flex-shrink-0 w-6 h-6 rounded-full text-white text-sm flex items-center justify-center font-medium"
                      style={{ backgroundColor: currentTheme.colors.primary }}
                    >
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Benefits */}
          {service.details?.benefits && (
            <div>
              <h3 className="text-lg font-medium mb-3 text-gray-800">Benefits</h3>
              <ul className="space-y-2">
                {service.details.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span 
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: currentTheme.colors.primary }}
                    />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Aftercare */}
          {service.details?.aftercare && (
            <div>
              <h3 className="text-lg font-medium mb-3 text-gray-800">Aftercare</h3>
              <ul className="space-y-2">
                {service.details.aftercare.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span 
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: currentTheme.colors.secondary }}
                    />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <AppointmentBookingModal
              trigger={
                <Button 
                  className="flex-1"
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
            <Button variant="outline" onClick={onClose} className="px-8">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;
