import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import RecetaCard from "@/components/recetas/RecetaCard";
import FreeRecipeDialog from "@/components/recetas/FreeRecipeDialog";
import PremiumPaywallDialog from "@/components/recetas/PremiumPaywallDialog";
import { recetas, categorias, type Categoria, type Receta } from "@/components/recetas/recetasData";
import { useAuth } from "@/contexts/AuthContext";
import florDeTip from "@/assets/flor-de-tip.png";

const Recetas = () => {
  const { hasAccess } = useAuth();
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria>("Todas");
  const [selectedReceta, setSelectedReceta] = useState<Receta | null>(null);
  const [showFreeDialog, setShowFreeDialog] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  const recetasFiltradas =
    categoriaActiva === "Todas"
      ? recetas
      : recetas.filter((r) => r.tag === categoriaActiva);

  const handleCardClick = (receta: Receta) => {
    setSelectedReceta(receta);
    if (receta.isPremium && !hasAccess) {
      setShowPaywall(true);
    } else {
      setShowFreeDialog(true);
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Recetas — Cocina en Flor"
        description="Recetas prácticas para familias. Comida real, simple y riquísima."
        path="/recetas"
      />

      <section className="py-16 px-4 md:px-8 pt-24 md:pt-32 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <ScrollReveal>
            <div className="relative">
              <h1 className="font-display text-4xl md:text-5xl text-foreground text-center mb-4">
                Recetas del Club
              </h1>
              <img
                src={florDeTip}
                alt="Flor de Tip"
                className="absolute -top-4 -right-4 md:right-[15%] w-20 md:w-24 h-auto opacity-80 pointer-events-none rotate-6"
              />
            </div>
            <p className="text-muted-foreground text-center text-lg mb-8 max-w-xl mx-auto">
              Una muestra de lo que encontrás cada mes. Comida real para familias reales.
            </p>
          </ScrollReveal>

          {/* Category filters */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categorias.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setCategoriaActiva(cat.label)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                    categoriaActiva === cat.label
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:border-primary/30"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {recetasFiltradas.map((receta) => (
                <motion.div
                  key={receta.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <RecetaCard receta={receta} onClick={() => handleCardClick(receta)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <p className="text-center text-muted-foreground mt-12 text-sm">
            Cada mes recibís <strong className="text-foreground">40 recetas nuevas</strong> con el Club. Estas son solo un ejemplo.
          </p>
        </div>
      </section>

      {/* Dialogs */}
      <FreeRecipeDialog
        open={showFreeDialog}
        onOpenChange={setShowFreeDialog}
        receta={selectedReceta}
      />
      <PremiumPaywallDialog
        open={showPaywall}
        onOpenChange={setShowPaywall}
        recetaTitle={selectedReceta?.title ?? ""}
      />
    </Layout>
  );
};

export default Recetas;
