import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { Toaster } from './components/ui/toaster';

// Import pages
import HomePage from './pages/Home';
import HairSalonLanding from './pages/HairSalonLanding';
import MakeupStudioLanding from './pages/MakeupStudioLanding';
import MedSpaLanding from './pages/MedSpaLanding';
import ServicesPage from './pages/Services';
import PersonalizedResultsPage from './pages/PersonalizedResultsPage';
import BookingPage from './pages/BookingPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';

// Import components
import Cart from './components/Cart';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          {/* Global Cart Component */}
          <div className="fixed top-4 right-4 z-50">
            <Cart />
          </div>
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hair-salon" element={<HairSalonLanding />} />
            <Route path="/makeup-studio" element={<MakeupStudioLanding />} />
            <Route path="/med-spa" element={<MedSpaLanding />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/personalized-results" element={<PersonalizedResultsPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
          </Routes>
          
          {/* Toast notifications */}
          <Toaster />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

