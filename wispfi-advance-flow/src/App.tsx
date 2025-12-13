import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MobileOptimizations } from "@/components/wispfi/MobileOptimizations";
import { PerformanceOptimizer } from "@/components/wispfi/PerformanceOptimizer";
import { TouchOptimizations } from "@/components/wispfi/TouchOptimizations";
import { AccessibilityEnhancements } from "@/components/wispfi/AccessibilityEnhancements";
import { ThirdPartyScripts, CookieConsent, ExitIntentPopup } from "./components/integrations/ThirdPartyScripts";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import Industries from "./pages/Industries";
import Why from "./pages/Why";
import Reviews from "./pages/Reviews";
import CaseStudies from "./pages/CaseStudies";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ThankYou from "./pages/ThankYou";
import ThankYouEf from "./pages/ThankYouEf";
import ThankYou2 from "./pages/ThankYou2";
import McaFunding from "./pages/McaFunding";
import EquipmentFinancing from "./pages/EquipmentFinancing";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
// Industry-specific pages
import WispPage from "./pages/industries/WispPage";
import FiberPage from "./pages/industries/FiberPage";
import TelecomPage from "./pages/industries/TelecomPage";
import RestaurantsPage from "./pages/industries/RestaurantsPage";
import RetailPage from "./pages/industries/RetailPage";
import TruckingPage from "./pages/industries/TruckingPage";
import SalonsPage from "./pages/industries/SalonsPage";
import ContractorsPage from "./pages/industries/ContractorsPage";
import { ExitIntentModal } from "@/components/wispfi/ExitIntentModal";
import TawkChat from "@/components/integrations/TawkChat";
import MCAFormTest from "./pages/mca-form-test";

import MobileStickyCTA from "@/components/wispfi/MobileStickyCTA";
import { AdvancedAnalytics } from "@/components/wispfi/AdvancedAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MobileOptimizations />
      <PerformanceOptimizer />
      <TouchOptimizations />
      <AccessibilityEnhancements />
      <ThirdPartyScripts />
      <AdvancedAnalytics />
      <Toaster />
      <Sonner />
      <TawkChat />
      <BrowserRouter>
        <ExitIntentPopup />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/wisp" element={<WispPage />} />
          <Route path="/industries/fiber" element={<FiberPage />} />
          <Route path="/industries/telecom" element={<TelecomPage />} />
          <Route path="/industries/restaurants" element={<RestaurantsPage />} />
          <Route path="/industries/retail" element={<RetailPage />} />
          <Route path="/industries/trucking" element={<TruckingPage />} />
          <Route path="/industries/salons" element={<SalonsPage />} />
          <Route path="/industries/contractors" element={<ContractorsPage />} />
          <Route path="/mca-funding" element={<McaFunding />} />
          <Route path="/equipment-financing" element={<EquipmentFinancing />} />
          <Route path="/why" element={<Why />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/thank-you-ef" element={<ThankYouEf />} />
        <Route path="/thank-youef" element={<ThankYouEf />} /> {/* Redirect old path */}
        <Route path="/thank-you2" element={<ThankYou2 />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/mca-form-test" element={<MCAFormTest />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MobileStickyCTA />
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
