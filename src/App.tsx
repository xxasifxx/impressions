import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { Toaster } from './components/ui/toaster';
import { isFeatureEnabled } from './config/production';

// Import pages
import HomePage from './pages/Home';
import HairSalonLanding from './pages/HairSalonLanding';
import MakeupStudioLanding from './pages/MakeupStudioLanding';
import MedSpaLanding from './pages/MedSpaLanding';
import ServicesPage from './pages/Services';
import PersonalizedResultsPage from './pages/PersonalizedResultsPage';
import BookingPage from './pages/BookingPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import SimpleConsultationBrief from './components/consultation/SimpleConsultationBrief';
import LandingPage from './pages/LandingPage';

// Import components
import Cart from './components/Cart';

function App() {
  // Production mode: redirect everything to consultation
  const isConsultationOnly = isFeatureEnabled('consultationOnly');
  const showCart = !isConsultationOnly;

  return (
    <CartProvider>
      <Router>
        <div className="app">
          {/* Global Cart Component - Hidden in production consultation mode */}
          {showCart && (
            <div className="fixed top-4 right-4 z-50">
              <Cart />
            </div>
          )}
          
          <Routes>
            {/* Production Mode: Consultation-focused routing */}
            {isConsultationOnly ? (
              <>
                {/* Show landing page with embedded consultation */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/consultation" element={<SimpleConsultationBrief />} />
                
                {/* Redirect all other routes to landing page */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            ) : (
              <>
                {/* Development/Full Mode: All routes available */}
                <Route path="/" element={<HomePage />} />
                <Route path="/consultation" element={<SimpleConsultationBrief />} />
                
                {/* Conditional routes based on feature flags */}
                {isFeatureEnabled('servicePages') && (
                  <>
                    <Route path="/hair-salon" element={<HairSalonLanding />} />
                    <Route path="/makeup-studio" element={<MakeupStudioLanding />} />
                    <Route path="/med-spa" element={<MedSpaLanding />} />
                    <Route path="/services" element={<ServicesPage />} />
                  </>
                )}
                
                <Route path="/personalized-results" element={<PersonalizedResultsPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
                
                {/* Fallback for disabled routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
          
          {/* Toast notifications */}
          <Toaster />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
