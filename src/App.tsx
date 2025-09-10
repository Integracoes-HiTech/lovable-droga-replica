import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { OrderModal } from "@/components/OrderModal";
import { AdModal } from "@/components/AdModal";
import { useState } from "react";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAdModalOpen, setIsAdModalOpen] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Header onOpenOrderModal={() => setIsOrderModalOpen(true)} />
              <main className="flex-1 pt-40 lg:pt-32">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/catalogo" element={<Catalog />} />
                  <Route path="/produto/:id" element={<ProductDetails />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <WhatsAppButton />
            <OrderModal 
              isOpen={isOrderModalOpen}
              onClose={() => setIsOrderModalOpen(false)}
            />
            <AdModal
              isOpen={isAdModalOpen}
              onClose={() => setIsAdModalOpen(false)}
            />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;
