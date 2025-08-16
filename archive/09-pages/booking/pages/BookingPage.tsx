import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { ArrowLeft, Clock, DollarSign, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

/**
 * Booking page with calendar selection and service summary
 */
const BookingPage: React.FC = () => {
  const { items, totalPrice, totalDuration, clearCart } = useCart();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const navigate = useNavigate();
  
  // Generate mock available times when date is selected
  useEffect(() => {
    if (selectedDate) {
      // In a real implementation, this would call an API
      const times = generateMockAvailableTimes(totalDuration);
      setAvailableTimes(times);
      setSelectedTime(undefined);
    }
  }, [selectedDate, totalDuration]);
  
  // Generate mock available times
  const generateMockAvailableTimes = (duration: number) => {
    // More slots for shorter services, fewer for longer ones
    const slotCount = Math.max(2, Math.min(8, Math.floor(480 / duration)));
    const times = [];
    
    // Start at 9 AM
    let hour = 9;
    let minute = 0;
    
    for (let i = 0; i < slotCount; i++) {
      // Format time as HH:MM AM/PM
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12;
      const formattedMinute = minute.toString().padStart(2, '0');
      times.push(`${formattedHour}:${formattedMinute} ${ampm}`);
      
      // Increment by 30 minutes
      minute += 30;
      if (minute >= 60) {
        minute = 0;
        hour += 1;
      }
      
      // Stop at 5 PM
      if (hour >= 17) break;
    }
    
    return times;
  };
  
  // Handle booking confirmation
  const handleBooking = () => {
    // In a real implementation, this would call an API
    // For now, just show a success message and clear cart
    toast({
      title: "Booking Confirmed!",
      description: `Your appointment is scheduled for ${selectedDate?.toLocaleDateString()} at ${selectedTime}.`,
      duration: 5000,
    });
    
    // Clear cart
    clearCart();
    
    // Navigate to confirmation page
    navigate('/booking-confirmation', { 
      state: { 
        date: selectedDate, 
        time: selectedTime,
        services: items,
        totalPrice,
        totalDuration
      } 
    });
  };
  
  // Check if cart is empty
  if (items.length === 0) {
    return (
      <div className="booking-page container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-light mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add services to your cart before booking.</p>
          <Button onClick={() => navigate('/')}>
            Browse Services
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="booking-page container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-gray-600 mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
      
      <h1 className="text-3xl font-light mb-8 text-center">Book Your Services</h1>
      
      <div className="booking-container grid md:grid-cols-2 gap-8">
        <div className="services-summary">
          <h2 className="text-xl font-medium mb-4">Your Services</h2>
          <div className="service-list space-y-4 mb-6">
            {items.map(item => (
              <div key={item.id} className="service-item bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-medium">{item.name}</h3>
                <div className="service-meta flex items-center text-sm text-gray-500 mt-1">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span className="mr-4">${item.price}</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{item.duration} min</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="total-summary bg-gray-50 p-4 rounded-lg">
            <div className="summary-row flex justify-between text-sm mb-2">
              <span>Total Duration:</span>
              <span className="font-medium">{totalDuration} min</span>
            </div>
            <div className="summary-row total flex justify-between text-lg font-medium">
              <span>Total Price:</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        </div>
        
        <div className="booking-calendar">
          <h2 className="text-xl font-medium mb-4">Select a Date & Time</h2>
          
          <div className="calendar-container bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={{ before: new Date() }}
              className="mx-auto"
            />
          </div>
          
          {selectedDate && (
            <div className="time-selection">
              <h3 className="text-lg font-medium mb-3">Available Times</h3>
              <div className="time-slots grid grid-cols-3 gap-2">
                {availableTimes.map(time => (
                  <button
                    key={time}
                    className={`time-slot p-2 border rounded-md text-center transition-colors ${
                      selectedTime === time 
                        ? 'bg-primary text-white border-primary' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="booking-actions mt-8 text-center">
        <Button
          size="lg"
          disabled={!selectedDate || !selectedTime}
          onClick={handleBooking}
          className="booking-button"
        >
          {!selectedDate || !selectedTime ? 'Select Date & Time' : 'Confirm Booking'}
        </Button>
      </div>
    </div>
  );
};

export default BookingPage;

