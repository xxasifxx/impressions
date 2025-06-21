
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Clock, User, Package } from 'lucide-react';
import { useAppointmentBooking } from '@/hooks/useAppointmentBooking';
import { useSalonServices } from '@/hooks/useSalonServices';
import { useSalonSpecialists } from '@/hooks/useSalonSpecialists';

interface CartItem {
  service: any;
  quantity: number;
  actualDuration: number;
  notes?: string;
}

interface AppointmentBookingModalProps {
  trigger: React.ReactNode;
  defaultServiceId?: string;
  prefilledService?: {
    name: string;
    price: string;
    duration: string;
  };
  cartItems?: CartItem[];
  totalDuration?: number;
  totalPrice?: number;
  appliedDiscount?: any;
  sourcePage: string;
  className?: string;
  onBookingComplete?: () => void;
}

const AppointmentBookingModal = ({ 
  trigger, 
  defaultServiceId, 
  prefilledService,
  cartItems,
  totalDuration,
  totalPrice,
  appliedDiscount,
  sourcePage, 
  className = "",
  onBookingComplete
}: AppointmentBookingModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceId: defaultServiceId || '',
    specialistId: '',
    appointmentDate: '',
    appointmentTime: '',
    notes: ''
  });

  const { bookAppointment, isSubmitting } = useAppointmentBooking();
  const { data: services } = useSalonServices();
  const { data: specialists } = useSalonSpecialists();

  const selectedService = services?.find(s => s.id === formData.serviceId);
  const availableSpecialists = specialists?.filter(spec => 
    !selectedService?.specialist_requirements?.length || 
    selectedService.specialist_requirements.some(req => spec.specialties.includes(req))
  );

  const isCartBooking = !!cartItems;
  const serviceDuration = isCartBooking ? totalDuration : (selectedService?.duration_min || 60);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        slots.push({ value: time, label: displayTime });
      }
    }
    return slots;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let notes = formData.notes;
    
    // Add cart details to notes if booking multiple services
    if (isCartBooking && cartItems) {
      const servicesList = cartItems.map(item => 
        `${item.service.name} (${item.quantity}x - ${item.actualDuration * item.quantity}min)`
      ).join(', ');
      
      notes = `Multi-service booking: ${servicesList}`;
      if (appliedDiscount) {
        notes += `. Applied discount: ${appliedDiscount.name} (${appliedDiscount.couponCode})`;
      }
      if (formData.notes) {
        notes += `. Additional notes: ${formData.notes}`;
      }
    }
    
    const result = await bookAppointment({
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      serviceId: formData.serviceId || 'multi-service',
      specialistId: formData.specialistId || undefined,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      durationMinutes: serviceDuration!,
      totalPrice: isCartBooking ? totalPrice : (selectedService?.base_price ? Number(selectedService.base_price) : undefined),
      notes,
      sourcePage
    });

    if (result.success) {
      setIsOpen(false);
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        serviceId: defaultServiceId || '',
        specialistId: '',
        appointmentDate: '',
        appointmentTime: '',
        notes: ''
      });
      onBookingComplete?.();
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className={className}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-600" />
            Book Your Appointment
            {isCartBooking && (
              <span className="text-sm font-normal text-stone-600">
                - Multiple Services
              </span>
            )}
            {prefilledService && !isCartBooking && (
              <span className="text-sm font-normal text-stone-600">
                - {prefilledService.name}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="clientName">Full Name *</Label>
              <Input
                id="clientName"
                type="text"
                required
                value={formData.clientName}
                onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clientEmail">Email *</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  required
                  value={formData.clientEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="clientPhone">Phone</Label>
                <Input
                  id="clientPhone"
                  type="tel"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Service Selection */}
          {isCartBooking ? (
            <div className="bg-blue-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-blue-600" />
                <h4 className="font-medium text-stone-800">Selected Services</h4>
              </div>
              {cartItems?.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-blue-200 last:border-0">
                  <div>
                    <div className="font-medium text-blue-700">{item.service.name}</div>
                    <div className="text-sm text-stone-600">
                      {item.quantity}x • {item.actualDuration * item.quantity} minutes
                    </div>
                  </div>
                  <div className="text-sm font-medium text-blue-700">
                    ${(parseFloat(item.service.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(0)}
                  </div>
                </div>
              ))}
              
              {appliedDiscount && (
                <div className="mt-3 p-2 bg-green-100 rounded border border-green-200">
                  <div className="text-sm font-medium text-green-700">{appliedDiscount.name}</div>
                  <div className="text-xs text-green-600">Code: {appliedDiscount.couponCode}</div>
                </div>
              )}
              
              <div className="flex justify-between items-center pt-2 border-t border-blue-300 font-bold text-blue-800">
                <span>Total: {Math.ceil((totalDuration || 0) / 60)}h {(totalDuration || 0) % 60}min</span>
                <span>${(totalPrice || 0).toFixed(2)}</span>
              </div>
            </div>
          ) : prefilledService ? (
            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-stone-800">Selected Service</h4>
              <div className="space-y-1">
                <div className="text-lg font-medium text-blue-700">{prefilledService.name}</div>
                <div className="text-sm text-stone-600">Duration: {prefilledService.duration}</div>
                <div className="text-sm text-stone-600">Price: {prefilledService.price}</div>
              </div>
            </div>
          ) : (
            <div>
              <Label htmlFor="service">Service *</Label>
              <Select 
                value={formData.serviceId} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, serviceId: value, specialistId: '' }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services?.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      <div className="flex justify-between items-center w-full">
                        <span>{service.name}</span>
                        <span className="text-sm text-red-600 ml-2">
                          ${service.base_price}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Specialist Selection */}
          {availableSpecialists && availableSpecialists.length > 0 && !isCartBooking && (
            <div>
              <Label htmlFor="specialist">Preferred Specialist</Label>
              <Select 
                value={formData.specialistId} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, specialistId: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Any available specialist" />
                </SelectTrigger>
                <SelectContent>
                  {availableSpecialists.map((specialist) => (
                    <SelectItem key={specialist.id} value={specialist.id}>
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        <span>{specialist.name}</span>
                        <span className="text-xs text-stone-500">
                          ({specialist.years_experience}+ years)
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="appointmentDate">Date *</Label>
              <Input
                id="appointmentDate"
                type="date"
                required
                min={minDate}
                value={formData.appointmentDate}
                onChange={(e) => setFormData(prev => ({ ...prev, appointmentDate: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="appointmentTime">Time *</Label>
              <Select 
                value={formData.appointmentTime} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, appointmentTime: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {generateTimeSlots().map((slot) => (
                    <SelectItem key={slot.value} value={slot.value}>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {slot.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Service Details */}
          {selectedService && !prefilledService && !isCartBooking && (
            <div className="bg-stone-50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-stone-800">Service Details</h4>
              <div className="text-sm text-stone-600 space-y-1">
                <div>Duration: {selectedService.duration_min} minutes</div>
                <div>Price: ${selectedService.base_price}</div>
                {selectedService.description && (
                  <div className="italic">{selectedService.description}</div>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Special Requests or Notes</Label>
            <Textarea
              id="notes"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any special requests, allergies, or preferences..."
              className="mt-1"
            />
          </div>

          <Button 
            type="submit" 
            size="lg" 
            disabled={isSubmitting || (!formData.serviceId && !prefilledService && !isCartBooking) || !formData.appointmentDate || !formData.appointmentTime}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            {isSubmitting ? "Booking..." : `Book Appointment${isCartBooking ? 's' : ''}`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentBookingModal;
