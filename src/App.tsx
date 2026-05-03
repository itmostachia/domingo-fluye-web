import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { captureUTMParams } from "@/lib/utm";

// Capturar UTM/fbclid de la URL al iniciar la app (antes del render)
captureUTMParams();
import Index from "./pages/Index";
import ComoFunciona from "./pages/ComoFunciona";
import Planes from "./pages/Planes";
import Muestras from "./pages/Muestras";
import FAQ from "./pages/FAQ";
import Contacto from "./pages/Contacto";
import Gracias from "./pages/Gracias";
import GraciasTaller from "./pages/GraciasTaller";
import GraciasFlorSale from "./pages/GraciasFlorSale";
import Taller from "./pages/Taller";
import FlorSale from "./pages/FlorSale";
import Legal from "./pages/Legal";
import Blog from "./pages/Blog";
import Recetas from "./pages/Recetas";
import Recetarios from "./pages/Recetarios";
import NotFound from "./pages/NotFound";
import CursorTrail from "./components/CursorTrail";

const BlogPost = lazy(() => import("./pages/BlogPost"));
const Login = lazy(() => import("./pages/Login"));
const MiClub = lazy(() => import("./pages/MiClub"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <CursorTrail />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/como-funciona" element={<ComoFunciona />} />
              <Route path="/planes" element={<Planes />} />
              <Route path="/muestras" element={<Muestras />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/gracias" element={<Gracias />} />
              <Route path="/gracias-taller" element={<GraciasTaller />} />
              <Route path="/gracias-flor-sale" element={<GraciasFlorSale />} />
              <Route path="/taller" element={<Taller />} />
              <Route path="/flor-sale" element={<FlorSale />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<Suspense fallback={<div className="min-h-screen" />}><BlogPost /></Suspense>} />
              <Route path="/recetas" element={<Recetas />} />
              <Route path="/recetarios" element={<Recetarios />} />
              <Route path="/login" element={<Suspense fallback={<div className="min-h-screen" />}><Login /></Suspense>} />
              <Route path="/mi-club" element={<Suspense fallback={<div className="min-h-screen" />}><MiClub /></Suspense>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
