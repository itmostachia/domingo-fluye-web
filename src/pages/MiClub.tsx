import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Download, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import RecetaCard from "@/components/recetas/RecetaCard";
import FreeRecipeDialog from "@/components/recetas/FreeRecipeDialog";
import { recetas, type Receta } from "@/components/recetas/recetasData";
import heroImg from "@/assets/hero-kitchen.jpg";

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
          <div className="bg-primary/10 border-2 border-primary/30 rounded-2xl p-6 md:p-8 mb-12 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Download className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
              Descarga del Mes
            </h2>
            <p className="text-muted-foreground mb-5">
              Manual de Marzo ya disponible
            </p>
            <Button size="lg" className="font-semibold shadow-cta rounded-xl" asChild>
              <a href="#">
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </a>
            </Button>
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

        <FreeRecipeDialog open={dialogOpen} onOpenChange={setDialogOpen} receta={selectedReceta} />
      </div>
    </div>
  );
};

const MiClub = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!user) {
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
