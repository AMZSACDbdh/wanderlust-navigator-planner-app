
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ItineraryProvider } from "./hooks/useItineraryContext";

// Pages
import Home from "./pages/Home";
import CreateItinerary from "./pages/CreateItinerary";
import ItineraryList from "./pages/ItineraryList";
import ItineraryDetails from "./pages/ItineraryDetails";
import NotFound from "./pages/NotFound";

// Components
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ItineraryProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreateItinerary />} />
                <Route path="/itineraries" element={<ItineraryList />} />
                <Route path="/itineraries/:id" element={<ItineraryDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ItineraryProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
