
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const AppointmentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Appointment Request Sent!",
        description: "We'll get back to you shortly with a confirmation.",
      });
    }, 1000);
  };

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
          
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" required className="mt-2" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" required className="mt-2" />
              </div>
            </div>
            
            <div className="mb-6">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" required className="mt-2" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="service">Service</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="haircut">Haircut & Styling</SelectItem>
                    <SelectItem value="coloring">Hair Coloring</SelectItem>
                    <SelectItem value="makeup">Makeup Service</SelectItem>
                    <SelectItem value="facial">Facial Treatment</SelectItem>
                    <SelectItem value="spa">Spa Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date">Preferred Date</Label>
                <Input id="date" type="date" required className="mt-2" />
              </div>
            </div>
            
            <div className="mb-6">
              <Label htmlFor="message">Additional Notes</Label>
              <Textarea 
                id="message" 
                rows={4} 
                placeholder="Any special requests or preferences..."
                className="mt-2"
              />
            </div>
            
            <Button 
              type="submit" 
              size="lg" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
            >
              {isSubmitting ? "Sending..." : "Book Appointment"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;
