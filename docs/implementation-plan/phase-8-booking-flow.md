# Phase 8: Booking Flow Implementation

## Overview

This phase focuses on enhancing the booking flow to maintain the personalized experience established during consultation. The booking process should feel like a natural continuation of the journey, maintaining the same aesthetic and personalized touch. This phase completes the user journey, providing a satisfying conclusion to the experience and setting the stage for future visits.

## Timeline

**Duration:** 2 weeks
**Dependencies:** Phase 7 (Personalized Results), Phase 4 (State Management)

## Objectives

1. Create a visually appealing booking page with selected services
2. Implement an intuitive calendar component for date/time selection
3. Add complementary service suggestions during booking
4. Design a celebratory booking confirmation page
5. Ensure a seamless transition from results to booking to confirmation

## Detailed Tasks

### 1. Calendar Component

- [ ] Create `Calendar.tsx` component for date/time selection
- [ ] Implement date picker with available/unavailable dates
- [ ] Add time slot selection with availability indicators
- [ ] Create responsive design for different screen sizes
- [ ] Implement keyboard navigation and accessibility features

### 2. Complementary Service Suggestion

- [ ] Create `ComplementaryServiceSuggestion.tsx` component
- [ ] Implement algorithm for suggesting services that pair well
- [ ] Add visual styling that matches main aesthetic
- [ ] Create add-to-booking functionality
- [ ] Implement dismissible/collapsible behavior

### 3. Booking Page Enhancement

- [ ] Enhance `BookingPage.tsx` with visual service representation
- [ ] Create booking summary section with selected services
- [ ] Implement booking form with necessary fields
- [ ] Add validation for required information
- [ ] Create smooth transitions between booking steps

### 4. Booking Confirmation Page

- [ ] Design celebratory `BookingConfirmationPage.tsx`
- [ ] Create visual summary of booked services
- [ ] Implement booking details display (date, time, services)
- [ ] Add preparation tips based on booked services
- [ ] Create options for saving/sharing booking information

### 5. Integration with Cart System

- [ ] Enhance cart to booking flow transition
- [ ] Implement cart summary in booking process
- [ ] Add ability to modify cart during booking
- [ ] Create cart clearing after successful booking
- [ ] Implement cart recovery for abandoned bookings

### 6. Booking State Management

- [ ] Create booking state context for multi-step process
- [ ] Implement persistence for booking information
- [ ] Add validation logic for booking state
- [ ] Create error handling for booking process
- [ ] Implement analytics tracking for booking funnel

## Technical Considerations

### Calendar Component

The Calendar component should be flexible and user-friendly:

```typescript
interface CalendarProps {
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
  selectedDate: Date | null;
  selectedTime: string | null;
  availableDates?: Date[];
  availableTimes?: Record<string, string[]>; // Date string -> available times
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  isLoading?: boolean;
}

export const Calendar: React.FC<CalendarProps> = ({
  onDateSelect,
  onTimeSelect,
  selectedDate,
  selectedTime,
  availableDates,
  availableTimes,
  minDate = new Date(),
  maxDate,
  disabledDates = [],
  isLoading = false
}) => {
  // Format date as string key for availableTimes lookup
  const selectedDateKey = selectedDate 
    ? selectedDate.toISOString().split('T')[0] 
    : '';
  
  // Get available times for selected date
  const timesForSelectedDate = selectedDate && availableTimes
    ? availableTimes[selectedDateKey] || []
    : [];
  
  // Check if a date is available
  const isDateAvailable = (date: Date) => {
    if (availableDates) {
      return availableDates.some(d => isSameDay(d, date));
    }
    return !disabledDates.some(d => isSameDay(d, date));
  };
  
  return (
    <div className="calendar-component">
      <div className="date-picker">
        <h3>Select a Date</h3>
        {isLoading ? (
          <div className="loading-indicator">Loading available dates...</div>
        ) : (
          <div className="calendar-grid">
            {/* Calendar implementation with date cells */}
            {/* Each cell should show availability and handle selection */}
          </div>
        )}
      </div>
      
      {selectedDate && (
        <div className="time-picker">
          <h3>Select a Time</h3>
          {isLoading ? (
            <div className="loading-indicator">Loading available times...</div>
          ) : timesForSelectedDate.length > 0 ? (
            <div className="time-slots">
              {timesForSelectedDate.map(time => (
                <button
                  key={time}
                  className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                  onClick={() => onTimeSelect(time)}
                >
                  {formatTime(time)}
                </button>
              ))}
            </div>
          ) : (
            <div className="no-times-available">
              No times available for this date. Please select another date.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
```

### Complementary Service Suggestion

The complementary service suggestion component should be engaging:

```typescript
interface ComplementaryServiceSuggestionProps {
  bookedServices: Service[];
  onAddService: (service: Service) => void;
  onDismiss: (serviceId: string) => void;
  maxSuggestions?: number;
}

export const ComplementaryServiceSuggestion: React.FC<ComplementaryServiceSuggestionProps> = ({
  bookedServices,
  onAddService,
  onDismiss,
  maxSuggestions = 3
}) => {
  // Get all services from data
  const allServices = useServices();
  
  // Find complementary services
  const complementaryServices = useMemo(() => {
    if (!bookedServices.length || !allServices.length) return [];
    
    // Get IDs of already booked services
    const bookedIds = bookedServices.map(s => s.id);
    
    // Collect all complementary service IDs from booked services
    const complementaryIds = bookedServices.flatMap(
      service => service.complementaryServices || []
    );
    
    // Filter out already booked services and duplicates
    const uniqueComplementaryIds = [...new Set(complementaryIds)]
      .filter(id => !bookedIds.includes(id));
    
    // Get the actual service objects
    const suggestions = uniqueComplementaryIds
      .map(id => allServices.find(s => s.id === id))
      .filter(Boolean) as Service[];
    
    // Sort by relevance (could be based on various factors)
    const sortedSuggestions = sortByRelevance(suggestions, bookedServices);
    
    // Limit to max suggestions
    return sortedSuggestions.slice(0, maxSuggestions);
  }, [bookedServices, allServices, maxSuggestions]);
  
  if (!complementaryServices.length) return null;
  
  return (
    <div className="complementary-suggestions">
      <h3>Complete Your Experience</h3>
      <p>These services pair perfectly with your selections:</p>
      
      <div className="suggestion-cards">
        {complementaryServices.map(service => (
          <div key={service.id} className="suggestion-card">
            <div className="suggestion-image">
              <img src={service.imageUrl} alt={service.name} />
            </div>
            
            <div className="suggestion-content">
              <h4>{service.name}</h4>
              <p>{service.shortDescription}</p>
              
              <div className="suggestion-meta">
                <span className="suggestion-price">${service.price}</span>
                <span className="suggestion-duration">{service.duration} min</span>
              </div>
              
              <div className="suggestion-reason">
                <p>Pairs well with {findPairingService(service, bookedServices)}</p>
              </div>
            </div>
            
            <div className="suggestion-actions">
              <button 
                className="add-suggestion"
                onClick={() => onAddService(service)}
              >
                Add to Booking
              </button>
              
              <button 
                className="dismiss-suggestion"
                onClick={() => onDismiss(service.id)}
              >
                No Thanks
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Booking Page Structure

The booking page should guide users through a clear process:

```typescript
export const BookingPage: React.FC = () => {
  // Get cart items
  const { items: cartItems, totalDuration, totalPrice } = useCart();
  
  // Get aesthetic state
  const { state: aesthetic } = useAestheticState();
  
  // Booking state
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [specialRequests, setSpecialRequests] = useState('');
  const [step, setStep] = useState(1); // 1: Services, 2: Date/Time, 3: Contact Info
  
  // Navigation
  const navigate = useNavigate();
  
  // Handle booking submission
  const handleSubmitBooking = () => {
    // Validate all required fields
    if (!selectedDate || !selectedTime || !contactInfo.name || !contactInfo.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Create booking object
    const booking = {
      services: cartItems,
      date: selectedDate,
      time: selectedTime,
      contactInfo,
      specialRequests,
      totalDuration,
      totalPrice,
      bookingId: generateBookingId(),
      createdAt: new Date()
    };
    
    // Save booking to localStorage
    saveBooking(booking);
    
    // Navigate to confirmation page
    navigate('/booking-confirmation', { state: { booking } });
  };
  
  return (
    <div 
      className="booking-page"
      style={{
        '--color-primary': aesthetic?.colors.primary,
        '--color-background': aesthetic?.colors.background
      } as React.CSSProperties}
    >
      <header className="booking-header">
        <h1>Complete Your Booking</h1>
        <div className="booking-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>Services</div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>Schedule</div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>Details</div>
        </div>
      </header>
      
      <div className="booking-content">
        {step === 1 && (
          <section className="services-step">
            <h2>Your Selected Services</h2>
            
            {cartItems.length > 0 ? (
              <div className="selected-services">
                {cartItems.map(item => (
                  <div key={item.id} className="selected-service">
                    {/* Service details */}
                  </div>
                ))}
                
                <div className="service-summary">
                  <div className="total-duration">
                    <span>Total Duration:</span>
                    <span>{totalDuration} min</span>
                  </div>
                  <div className="total-price">
                    <span>Total Price:</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>
                
                <ComplementaryServiceSuggestion
                  bookedServices={cartItems}
                  onAddService={(service) => addToCart(service.id)}
                  onDismiss={() => {}}
                />
                
                <button 
                  className="next-step-button"
                  onClick={() => setStep(2)}
                >
                  Continue to Scheduling
                </button>
              </div>
            ) : (
              <div className="empty-cart">
                <p>You haven't selected any services yet.</p>
                <button 
                  onClick={() => navigate('/personalized-results')}
                >
                  View Recommended Services
                </button>
              </div>
            )}
          </section>
        )}
        
        {step === 2 && (
          <section className="schedule-step">
            <h2>Select Date & Time</h2>
            
            <Calendar
              onDateSelect={setSelectedDate}
              onTimeSelect={setSelectedTime}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              // Additional props...
            />
            
            <div className="step-navigation">
              <button 
                className="back-button"
                onClick={() => setStep(1)}
              >
                Back to Services
              </button>
              
              <button 
                className="next-step-button"
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime}
              >
                Continue to Details
              </button>
            </div>
          </section>
        )}
        
        {step === 3 && (
          <section className="details-step">
            <h2>Your Information</h2>
            
            <form className="contact-form">
              {/* Form fields for contact information */}
              
              <div className="form-group">
                <label htmlFor="special-requests">Special Requests</label>
                <textarea
                  id="special-requests"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Any special requests or notes for your appointment..."
                />
              </div>
            </form>
            
            <div className="booking-summary">
              <h3>Booking Summary</h3>
              {/* Summary of services, date, time, etc. */}
            </div>
            
            <div className="step-navigation">
              <button 
                className="back-button"
                onClick={() => setStep(2)}
              >
                Back to Schedule
              </button>
              
              <button 
                className="submit-booking-button"
                onClick={handleSubmitBooking}
                disabled={!contactInfo.name || !contactInfo.email}
              >
                Complete Booking
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
```

### Booking Confirmation Page

The confirmation page should be celebratory and informative:

```typescript
export const BookingConfirmationPage: React.FC = () => {
  // Get booking from location state or localStorage
  const location = useLocation();
  const booking = location.state?.booking || loadLatestBooking();
  
  // Get aesthetic state
  const { state: aesthetic } = useAestheticState();
  
  // Navigate
  const navigate = useNavigate();
  
  // If no booking found, redirect to booking page
  useEffect(() => {
    if (!booking) {
      navigate('/booking');
    }
  }, [booking, navigate]);
  
  if (!booking) return null;
  
  return (
    <div 
      className="booking-confirmation-page"
      style={{
        '--color-primary': aesthetic?.colors.primary,
        '--color-background': aesthetic?.colors.background
      } as React.CSSProperties}
    >
      <div className="confirmation-content">
        <div className="confirmation-header">
          <div className="celebration-animation">
            {/* Animation or illustration */}
          </div>
          
          <h1>Your Booking is Confirmed!</h1>
          <p className="confirmation-message">
            We're looking forward to seeing you on {formatDate(booking.date)} at {booking.time}.
          </p>
          
          <div className="booking-id">
            Booking Reference: <span>{booking.bookingId}</span>
          </div>
        </div>
        
        <div className="booking-details">
          <h2>Your Appointment Details</h2>
          
          <div className="detail-section">
            <h3>Date & Time</h3>
            <p>{formatDate(booking.date)} at {booking.time}</p>
            <p>Duration: {booking.totalDuration} minutes</p>
          </div>
          
          <div className="detail-section">
            <h3>Services</h3>
            <ul className="booked-services">
              {booking.services.map(service => (
                <li key={service.id} className="booked-service">
                  <span className="service-name">{service.name}</span>
                  <span className="service-price">${service.price}</span>
                </li>
              ))}
            </ul>
            <p className="total-price">Total: ${booking.totalPrice}</p>
          </div>
          
          {booking.specialRequests && (
            <div className="detail-section">
              <h3>Special Requests</h3>
              <p>{booking.specialRequests}</p>
            </div>
          )}
        </div>
        
        <div className="preparation-tips">
          <h2>Preparing for Your Visit</h2>
          <ul className="tips-list">
            {generatePreparationTips(booking.services).map((tip, index) => (
              <li key={index} className="tip-item">{tip}</li>
            ))}
          </ul>
        </div>
        
        <div className="confirmation-actions">
          <button 
            className="add-to-calendar"
            onClick={() => generateCalendarEvent(booking)}
          >
            Add to Calendar
          </button>
          
          <button 
            className="return-home"
            onClick={() => navigate('/')}
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};
```

## Deliverables

1. `src/components/Calendar.tsx` - Date and time selection component
2. `src/components/ComplementaryServiceSuggestion.tsx` - Suggestion component
3. `src/pages/BookingPage.tsx` - Enhanced booking page
4. `src/pages/BookingConfirmationPage.tsx` - Celebratory confirmation page
5. `src/utils/bookingHelpers.ts` - Utilities for booking functionality

## Testing Criteria

1. **Functional Testing:**
   - Calendar allows date and time selection
   - Complementary suggestions are relevant to selected services
   - Booking form validates input correctly
   - Confirmation page displays all booking details
   - Navigation between steps works correctly

2. **Visual Testing:**
   - Page maintains aesthetic continuity from results page
   - Responsive layout works on all screen sizes
   - Animations and transitions are smooth
   - Confirmation page has celebratory feel
   - Empty and error states display correctly

3. **Performance Testing:**
   - Calendar loads and renders quickly
   - Date/time selection is responsive
   - Form submission is performant
   - Transitions between steps are smooth
   - Confirmation page loads quickly

4. **Accessibility Testing:**
   - Calendar is fully keyboard navigable
   - Form fields have proper labels and ARIA attributes
   - Error messages are announced to screen readers
   - Focus management works correctly between steps
   - Color contrast meets WCAG standards

## Next Steps

After completing this phase, we will move on to Phase 9: Mobile Optimization, which will ensure the entire journey works seamlessly on mobile devices.

