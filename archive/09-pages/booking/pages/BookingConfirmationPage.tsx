import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarCheck, Clock, DollarSign, Home, Calendar } from 'lucide-react';

/**
 * Booking confirmation page
 */
const BookingConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;
  
  // If no booking data, redirect to home
  if (!bookingData) {
    navigate('/');
    return null;
  }
  
  const { date, time, services, totalPrice, totalDuration } = bookingData;
  
  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Generate confirmation number
  const confirmationNumber = `IMB-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  
  return (
    <div className="booking-confirmation-page container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CalendarCheck className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-light mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">
            Your appointment has been scheduled. We look forward to seeing you!
          </p>
        </div>
        
        <div className="confirmation-details bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-medium mb-4">Appointment Details</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="detail-group">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Date & Time</h3>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">{formatDate(date)}</p>
                    <p>{time}</p>
                  </div>
                </div>
              </div>
              
              <div className="detail-group">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Confirmation Number</h3>
                <p className="font-medium">{confirmationNumber}</p>
              </div>
              
              <div className="detail-group">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Duration</h3>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-2" />
                  <p>{totalDuration} minutes</p>
                </div>
              </div>
              
              <div className="detail-group">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Price</h3>
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
                  <p className="font-medium">${totalPrice}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h2 className="text-xl font-medium mb-4">Services Booked</h2>
            
            <div className="space-y-4">
              {services.map((service: any) => (
                <div key={service.id} className="service-item flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <div className="text-sm text-gray-500">{service.duration} min</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${service.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="confirmation-info bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium mb-2 text-blue-800">What's Next?</h2>
          <ul className="space-y-2 text-blue-700">
            <li className="flex items-start">
              <span className="inline-block w-5 h-5 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center text-blue-500 mr-2 mt-0.5">1</span>
              <span>You'll receive a confirmation email with your appointment details.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-5 h-5 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center text-blue-500 mr-2 mt-0.5">2</span>
              <span>Please arrive 10 minutes before your appointment time.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-5 h-5 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center text-blue-500 mr-2 mt-0.5">3</span>
              <span>If you need to reschedule, please contact us at least 24 hours in advance.</span>
            </li>
          </ul>
        </div>
        
        <div className="text-center">
          <Button 
            size="lg"
            onClick={() => navigate('/')}
            className="mx-auto"
          >
            <Home className="w-4 h-4 mr-2" />
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;

