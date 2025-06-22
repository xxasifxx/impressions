
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Contact from '@/pages/Contact';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';
import HairSalonLanding from '@/pages/HairSalonLanding';
import MakeupStudioLanding from '@/pages/MakeupStudioLanding';
import MedSpaLanding from '@/pages/MedSpaLanding';
import { ServiceCartProvider } from '@/contexts/ServiceCartContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ServiceCartProvider>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-white">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/hair-salon" element={<HairSalonLanding />} />
              <Route path="/makeup-studio" element={<MakeupStudioLanding />} />
              <Route path="/med-spa" element={<MedSpaLanding />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </BrowserRouter>
        </div>
      </ServiceCartProvider>
    </QueryClientProvider>
  );
}

export default App;
