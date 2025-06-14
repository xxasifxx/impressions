
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HairServices from "./pages/HairServices";
import MakeupServices from "./pages/MakeupServices";
import Products from "./pages/Products";
import MedSpa from "./pages/MedSpa";
import Transformations from "./pages/Transformations";
import CulturalCelebrations from "./pages/CulturalCelebrations";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hair-services" element={<HairServices />} />
          <Route path="/makeup-services" element={<MakeupServices />} />
          <Route path="/products" element={<Products />} />
          <Route path="/med-spa" element={<MedSpa />} />
          <Route path="/transformations" element={<Transformations />} />
          <Route path="/cultural-celebrations" element={<CulturalCelebrations />} />
          <Route path="/careers" element={<Careers />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
