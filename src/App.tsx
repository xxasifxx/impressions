
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HairServices from "./pages/HairServices";
import ColorJourney from "./pages/hair-services/ColorJourney";
import CutsStyling from "./pages/hair-services/CutsStyling";
import FamilyCare from "./pages/hair-services/FamilyCare";
import Balayage from "./pages/hair-services/Balayage";
import ColorCorrection from "./pages/hair-services/ColorCorrection";
import Extensions from "./pages/hair-services/Extensions";
import PrecisionCuts from "./pages/hair-services/PrecisionCuts";
import RootTouchUp from "./pages/hair-services/RootTouchUp";
import ChemicalServices from "./pages/hair-services/ChemicalServices";
import SeniorCare from "./pages/hair-services/SeniorCare";
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
          <Route path="/hair-services/color-journey" element={<ColorJourney />} />
          <Route path="/hair-services/cuts-styling" element={<CutsStyling />} />
          <Route path="/hair-services/family-care" element={<FamilyCare />} />
          <Route path="/hair-services/balayage" element={<Balayage />} />
          <Route path="/hair-services/color-correction" element={<ColorCorrection />} />
          <Route path="/hair-services/extensions" element={<Extensions />} />
          <Route path="/hair-services/precision-cuts" element={<PrecisionCuts />} />
          <Route path="/hair-services/root-touch-up" element={<RootTouchUp />} />
          <Route path="/hair-services/chemical-services" element={<ChemicalServices />} />
          <Route path="/hair-services/senior-care" element={<SeniorCare />} />
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
