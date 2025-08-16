
import React from 'react';
import { Clock, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WorkingHours = () => {
  const hours = [
    { day: "Monday", time: "9:00 AM - 7:00 PM" },
    { day: "Tuesday", time: "9:00 AM - 7:00 PM" },
    { day: "Wednesday", time: "9:00 AM - 7:00 PM" },
    { day: "Thursday", time: "9:00 AM - 7:00 PM" },
    { day: "Friday", time: "9:00 AM - 7:00 PM" },
    { day: "Saturday", time: "9:00 AM - 7:00 PM" },
    { day: "Sunday", time: "10:00 AM - 5:00 PM" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Visit Us in Central Jersey</h2>
            <p className="text-lg text-slate-300 mb-8">
              We're conveniently located to serve families throughout Central Jersey. Walk-ins are 
              always welcome, but we recommend booking an appointment to guarantee your preferred 
              time slot and stylist.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-rose-400" />
                <div>
                  <span className="text-lg font-semibold">732-613-1942</span>
                  <p className="text-slate-300 text-sm">Call to book or ask questions</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="h-5 w-5 text-rose-400" />
                <div>
                  <span className="text-lg font-semibold">Central Jersey Location</span>
                  <p className="text-slate-300 text-sm">Serving families across the region</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
              >
                Book Appointment
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Get Directions
              </Button>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="flex items-center mb-6">
              <Clock className="h-6 w-6 text-rose-400 mr-3" />
              <h3 className="text-2xl font-semibold">Working Hours</h3>
            </div>
            <div className="space-y-4">
              {hours.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-white/10 last:border-b-0">
                  <span className="font-medium text-lg">{schedule.day}</span>
                  <span className="text-slate-300">{schedule.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-rose-500/20 rounded-lg border border-rose-400/30">
              <p className="text-sm text-rose-200">
                <strong>Walk-ins Welcome!</strong> Appointments are prioritized, but we always try to accommodate walk-in clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingHours;
