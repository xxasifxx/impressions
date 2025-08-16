
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AppointmentData {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  serviceId: string;
  specialistId?: string;
  appointmentDate: string;
  appointmentTime: string;
  durationMinutes: number;
  totalPrice?: number;
  notes?: string;
  sourcePage: string;
}

export const useAppointmentBooking = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const bookAppointment = async (appointmentData: AppointmentData) => {
    setIsSubmitting(true);
    
    try {
      // Create appointment in database
      const { data: appointment, error: appointmentError } = await supabase
        .from('appointments')
        .insert({
          client_name: appointmentData.clientName,
          client_email: appointmentData.clientEmail,
          client_phone: appointmentData.clientPhone,
          service_id: appointmentData.serviceId,
          specialist_id: appointmentData.specialistId,
          appointment_date: appointmentData.appointmentDate,
          appointment_time: appointmentData.appointmentTime,
          duration_minutes: appointmentData.durationMinutes,
          total_price: appointmentData.totalPrice,
          notes: appointmentData.notes,
          source_page: appointmentData.sourcePage,
          status: 'scheduled'
        })
        .select()
        .single();

      if (appointmentError) {
        throw appointmentError;
      }

      // Get service and specialist names for calendar event
      const { data: service } = await supabase
        .from('salon_services')
        .select('name')
        .eq('id', appointmentData.serviceId)
        .single();

      const { data: specialist } = appointmentData.specialistId 
        ? await supabase
            .from('salon_specialists')
            .select('name')
            .eq('id', appointmentData.specialistId)
            .single()
        : { data: null };

      // Create Google Calendar event
      try {
        await supabase.functions.invoke('create-calendar-event', {
          body: {
            appointmentId: appointment.id,
            clientName: appointmentData.clientName,
            clientEmail: appointmentData.clientEmail,
            serviceName: service?.name || 'Hair Service',
            specialistName: specialist?.name || 'Our Team',
            appointmentDate: appointmentData.appointmentDate,
            appointmentTime: appointmentData.appointmentTime,
            durationMinutes: appointmentData.durationMinutes
          }
        });
      } catch (calendarError) {
        console.log('Calendar event creation failed, but appointment was created:', calendarError);
      }

      toast({
        title: "Appointment Booked Successfully!",
        description: "We'll send you a confirmation email shortly.",
      });

      return { success: true, appointmentId: appointment.id };

    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive"
      });
      
      return { success: false, error: error.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    bookAppointment,
    isSubmitting
  };
};
