import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Contact from '@/pages/Contact';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';
import UnifiedConsultationFlow from '@/components/UnifiedConsultationFlow';
import ConsultationResults from '@/pages/ConsultationResults';
import { ServiceCartProvider } from '@/contexts/ServiceCartContext';
import { AestheticProvider } from '@/components/ConsultationModal/AestheticProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ServiceCartProvider>
        <AestheticProvider>
          <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-white">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                
                {/* Unified consultation system */}
                <Route path="/consultation" element={<UnifiedConsultationFlow />} />
                <Route path="/consultation/results" element={<ConsultationResults />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </BrowserRouter>
          </div>
        </AestheticProvider>
      </ServiceCartProvider>
    </QueryClientProvider>
  );
}

export default App;

