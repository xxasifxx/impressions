
import React from 'react';
import { Clock, Phone } from 'lucide-react';
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
            <h2 className="text-4xl font-bold mb-6">Visit Us Today</h2>
            <p className="text-lg text-slate-300 mb-8">
              We're open throughout the week to serve you. Walk-ins are welcome, but appointments are prioritized 
              to ensure you receive the best service possible.
            </p>
            <div className="flex items-center space-x-4 mb-8">
              <Phone className="h-5 w-5 text-rose-400" />
              <span className="text-lg">732-613-1942</span>
            </div>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
            >
              Book Now
            </Button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <div className="flex items-center mb-6">
              <Clock className="h-6 w-6 text-rose-400 mr-3" />
              <h3 className="text-2xl font-semibold">Working Hours</h3>
            </div>
            <div className="space-y-4">
              {hours.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                  <span className="font-medium">{schedule.day}</span>
                  <span className="text-slate-300">{schedule.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingHours;
