
import React from 'react';
import { Button } from '@/components/ui/button';
import AppointmentBookingModal from './AppointmentBookingModal';

const AppointmentForm = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Make an Appointment</h2>
            <p className="text-lg text-slate-600">
              Book your appointment today and let our expert team take care of you.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <AppointmentBookingModal
              trigger={
                <Button 
                  size="lg"
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                >
                  Book Your Appointment
                </Button>
              }
              sourcePage="appointment-form"
            />
            
            <div className="mt-6 text-sm text-stone-600">
              <p>• Instant booking confirmation</p>
              <p>• Google Calendar integration</p>
              <p>• Email and SMS reminders</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;
