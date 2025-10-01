
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import EMICalculator from "./pages/EMICalculator";
import BusinessLoan from "./pages/BusinessLoan";
import HomeLoan from "./pages/HomeLoan";
import Contact from "./pages/Contact";
import DocumentSubmission from "./pages/DocumentSubmission";
import ConfirmationPage from "./pages/ConfirmationPage";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Delete_Account from "./pages/Delete_Account";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/emi-calculator" element={<EMICalculator />} />
            <Route path="/business-loan" element={<BusinessLoan />} />
            <Route path="/home-loan" element={<HomeLoan />} />
            <Route path="/personal-loan" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/document-submission" element={<DocumentSubmission />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/delete-account" element={<Delete_Account />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
