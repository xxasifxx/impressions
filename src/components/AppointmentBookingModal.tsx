
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Clock, User } from 'lucide-react';
import { useAppointmentBooking } from '@/hooks/useAppointmentBooking';
import { useSalonServices } from '@/hooks/useSalonServices';
import { useSalonSpecialists } from '@/hooks/useSalonSpecialists';

interface AppointmentBookingModalProps {
  trigger: React.ReactNode;
  defaultServiceId?: string;
  sourcePage: string;
  className?: string;
}

const AppointmentBookingModal = ({ 
  trigger, 
  defaultServiceId, 
  sourcePage, 
  className = "" 
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
    
    const result = await bookAppointment({
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      serviceId: formData.serviceId,
      specialistId: formData.specialistId || undefined,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      durationMinutes: selectedService?.duration_min || 60,
      totalPrice: selectedService?.base_price ? Number(selectedService.base_price) : undefined,
      notes: formData.notes,
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

          {/* Specialist Selection */}
          {availableSpecialists && availableSpecialists.length > 0 && (
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
          {selectedService && (
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
            disabled={isSubmitting || !formData.serviceId || !formData.appointmentDate || !formData.appointmentTime}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentBookingModal;
