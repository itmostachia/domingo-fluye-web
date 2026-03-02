import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Download, Sparkles, LogOut, Clock } from "lucide-react";
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
import heroImg from "@/assets/hero-kitchen.jpg";

const manuales = [
  { id: 1, title: "Manual Marzo 2026", status: "available" as const, image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80" },
  { id: 2, title: "Manual Abril 2026", status: "upcoming" as const, image: "https://images.unsplash.com/photo-1498837167922-41c46b21c620?w=600&q=80" },
  { id: 3, title: "Manual Mayo 2026", status: "upcoming" as const, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80" },
];

const ClubTeaser = () => (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background image */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImg})` }}
    />
    {/* Blur + dark overlay */}
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

        {/* Monthly download card */}
        <ScrollReveal delay={0.1}>
          <div className="flex items-center gap-2 mb-6">
            <Download className="w-5 h-5 text-primary" />
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
              Biblioteca de Manuales
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {manuales.map((manual) => {
              const isAvailable = manual.status === "available";
              return (
                <div
                  key={manual.id}
                  className={`rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all ${
                    !isAvailable ? "opacity-70" : ""
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={manual.image}
                      alt={manual.title}
                      className={`w-full h-full object-cover ${!isAvailable ? "grayscale" : ""}`}
                    />
                    {!isAvailable && (
                      <Badge className="absolute top-3 right-3 bg-muted text-muted-foreground border-border">
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
              );
            })}
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
    </div>
  );
};

const MiClub = () => {
  const { user, isLoading, hasAccess } = useAuth();

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!user || !hasAccess) {
    return (
      <Layout>
        <SEOHead title="Club de los Domingos | Cocina en Flor" description="Accedé al Club para descargar tu manual mensual y desbloquear todas las recetas premium." />
        <ClubTeaser />
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead title="Mi Club | Cocina en Flor" description="Tu espacio exclusivo con el manual del mes y todas las recetas desbloqueadas." />
      <ClubDashboard />
    </Layout>
  );
};

export default MiClub;
