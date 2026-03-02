import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Download, Sparkles, LogOut, Clock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ScrollReveal from "@/components/ScrollReveal";
import RecetaCard from "@/components/recetas/RecetaCard";
import FreeRecipeDialog from "@/components/recetas/FreeRecipeDialog";
import { recetas, type Receta } from "@/components/recetas/recetasData";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import heroImg from "@/assets/hero-kitchen.jpg";
import manualMarzo from "@/assets/manual-marzo.png";
import manualAbril from "@/assets/manual-abril.jpeg";
import manualMayo from "@/assets/manual-mayo.jpg";
import manualJunio from "@/assets/manual-junio.jpg";
import manualJulio from "@/assets/manual-julio.jpg";

const isDev = import.meta.env.DEV;

const manuales = [
  { id: 1, title: "Manual Marzo 2026", status: "available" as const, image: manualMarzo },
  { id: 2, title: "Manual Abril 2026", status: "upcoming" as const, image: manualAbril },
  { id: 3, title: "Manual Mayo 2026", status: "upcoming" as const, image: manualMayo },
  { id: 4, title: "Manual Junio 2026", status: "upcoming" as const, image: manualJunio },
  { id: 5, title: "Manual Julio 2026", status: "upcoming" as const, image: manualJulio },
  { id: 6, title: "Manual Agosto 2026", status: "upcoming" as const, image: manualMarzo },
  { id: 7, title: "Manual Septiembre 2026", status: "upcoming" as const, image: manualAbril },
  { id: 8, title: "Manual Octubre 2026", status: "upcoming" as const, image: manualMayo },
  { id: 9, title: "Manual Noviembre 2026", status: "upcoming" as const, image: manualJunio },
  { id: 10, title: "Manual Diciembre 2026", status: "upcoming" as const, image: manualJulio },
];

const ClubTeaser = () => (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImg})` }}
    />
    <div className="absolute inset-0 backdrop-blur-md bg-black/50" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 w-full max-w-lg mx-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10 text-center shadow-2xl"
    >
      <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-6">
        <Lock className="w-8 h-8 text-white/90" />
      </div>

      <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
        El Club de los Domingos
      </h1>
      <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8">
        Estás a un paso de desbloquear tu paz mental. Unite al Club para acceder al manual de este mes y a la biblioteca de recetas premium.
      </p>

      <div className="flex flex-col gap-3">
        <Button asChild size="lg" className="w-full text-base font-semibold shadow-cta h-13 rounded-xl">
          <Link to="/planes">Quiero unirme por $7.999/mes</Link>
        </Button>
        <Button asChild variant="ghost" className="w-full text-white/80 hover:text-white hover:bg-white/10">
          <Link to="/login">Ya soy miembro · Ingresar</Link>
        </Button>
      </div>
    </motion.div>
  </div>
);

const ClubDashboard = () => {
  const [selectedReceta, setSelectedReceta] = useState<Receta | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCardClick = (receta: Receta) => {
    setSelectedReceta(receta);
    setDialogOpen(true);
  };

  return (
    <div className="section-padding pt-28">
      <div className="container-tight">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8 text-center">
            Bienvenida a tu Club 🌸
          </h1>
        </ScrollReveal>

        {/* Biblioteca de Manuales - Carousel */}
        <ScrollReveal delay={0.1}>
          <div className="flex items-center gap-2 mb-6">
            <Download className="w-5 h-5 text-primary" />
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
              Biblioteca de Manuales
            </h2>
          </div>

          <div className="mb-12 px-10">
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent className="-ml-4">
                {manuales.map((manual) => {
                  const isAvailable = manual.status === "available";
                  return (
                    <CarouselItem key={manual.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <div
                        className={`rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all ${
                          isAvailable
                            ? "hover:-translate-y-1 hover:shadow-md cursor-pointer"
                            : "opacity-80 cursor-default"
                        }`}
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={manual.image}
                            alt={manual.title}
                            className={`w-full h-full object-cover ${!isAvailable ? "grayscale-[50%]" : ""}`}
                          />
                          {!isAvailable && (
                            <Badge className="absolute top-3 right-3 bg-muted/80 backdrop-blur text-muted-foreground border-border">
                              <Clock className="w-3 h-3 mr-1" />
                              Próximamente
                            </Badge>
                          )}
                        </div>
                        <div className="p-4 text-center space-y-3">
                          <h3 className="font-display font-bold text-foreground">{manual.title}</h3>
                          {isAvailable ? (
                            <Button size="sm" className="font-semibold rounded-xl" asChild>
                              <a href="https://drive.google.com/file/d/PLACEHOLDER/view" target="_blank" rel="noopener noreferrer">
                                <Download className="w-4 h-4 mr-2" />
                                Descargar PDF
                              </a>
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" disabled className="rounded-xl">
                              Disponible el próximo mes
                            </Button>
                          )}
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </ScrollReveal>

        {/* Full recipe grid - all unlocked */}
        <ScrollReveal delay={0.15}>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
              Recetario Desbloqueado
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recetas.map((r, i) => (
            <ScrollReveal key={r.title} delay={i * 0.04}>
              <RecetaCard
                receta={{ ...r, isPremium: false }}
                onClick={() => handleCardClick(r)}
              />
            </ScrollReveal>
          ))}
        </div>

        <FreeRecipeDialog open={dialogOpen} onOpenChange={setDialogOpen} receta={selectedReceta} isMemberView={true} />

        {/* Logout */}
        <div className="mt-16 text-center">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => supabase.auth.signOut()}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar sesión
          </Button>
        </div>
      </div>

      {/* Dev mode indicator */}
      {isDev && (
        <div className="fixed bottom-4 left-4 z-50 bg-foreground/90 text-background text-xs font-mono px-3 py-2 rounded-lg shadow-lg backdrop-blur">
          🛠️ Modo Edición (Solo visible en Lovable)
        </div>
      )}
    </div>
  );
};

const MiClub = () => {
  const { user, isLoading, hasAccess } = useAuth();

  if (isLoading && !isDev) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </Layout>
    );
  }

  // In dev mode OR admin → always show dashboard
  if (isDev || (user && hasAccess)) {
    return (
      <Layout>
        <SEOHead title="Mi Club | Cocina en Flor" description="Tu espacio exclusivo con el manual del mes y todas las recetas desbloqueadas." />
        <ClubDashboard />
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead title="Club de los Domingos | Cocina en Flor" description="Accedé al Club para descargar tu manual mensual y desbloquear todas las recetas premium." />
      <ClubTeaser />
    </Layout>
  );
};

export default MiClub;
