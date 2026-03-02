import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { UtensilsCrossed, Beef, Drumstick, Salad, Zap, CakeSlice } from "lucide-react";
import florDeTip from "@/assets/flor-de-tip.png";
import { useState } from "react";
import { recetas, categorias, type Categoria, type Receta } from "@/components/recetas/recetasData";
import RecetaCard from "@/components/recetas/RecetaCard";
import PremiumPaywallDialog from "@/components/recetas/PremiumPaywallDialog";
import FreeRecipeDialog from "@/components/recetas/FreeRecipeDialog";

const iconMap: Record<string, React.ReactNode> = {
  UtensilsCrossed: <UtensilsCrossed size={16} />,
  Drumstick: <Drumstick size={16} />,
  Beef: <Beef size={16} />,
  Salad: <Salad size={16} />,
  Zap: <Zap size={16} />,
  CakeSlice: <CakeSlice size={16} />,
};

const Recetas = () => {
  const [filtro, setFiltro] = useState<Categoria>("Todas");
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallTitle, setPaywallTitle] = useState("");
  const [freeDialogOpen, setFreeDialogOpen] = useState(false);
  const [selectedReceta, setSelectedReceta] = useState<Receta | null>(null);

  const recetasFiltradas = filtro === "Todas" ? recetas : recetas.filter((r) => r.tag === filtro);

  const handleCardClick = (receta: Receta) => {
    if (receta.isPremium) {
      setPaywallTitle(receta.title);
      setPaywallOpen(true);
    } else {
      setSelectedReceta(receta);
      setFreeDialogOpen(true);
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Recetas — Cocina en Flor"
        description="Recetas prácticas para familias. Comida real, simple y riquísima. Milanesas, tartas, guisos, pastas y más."
        path="/recetas"
      />
      <section className="section-padding pt-24 md:pt-32 relative">
        <div className="container-wide">
          <ScrollReveal>
            <div className="relative">
              <h1 className="font-display text-4xl md:text-5xl text-foreground text-center mb-4">
                Recetas del Club
              </h1>
              <img
                src={florDeTip}
                alt="Flor de Tip"
                className="absolute -top-4 -right-4 md:right-[15%] w-20 md:w-24 h-auto opacity-80 pointer-events-none rotate-6"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="text-muted-foreground text-center text-lg mb-8 max-w-xl mx-auto">
              Una muestra de lo que encontrás cada mes. Comida real para familias reales.
            </p>
          </ScrollReveal>

          {/* Filtros */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categorias.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setFiltro(cat.label)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                    filtro === cat.label
                      ? "bg-primary text-primary-foreground border-primary shadow-warm"
                      : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {iconMap[cat.icon]}
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grilla */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {recetasFiltradas.map((r) => (
                <motion.div
                  key={r.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                >
                  <RecetaCard receta={r} onClick={() => handleCardClick(r)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <ScrollReveal delay={0.3}>
            <p className="text-center text-muted-foreground mt-12 text-sm">
              Cada mes recibís <strong className="text-foreground">40 recetas nuevas</strong> con el Club. Estas son solo un ejemplo.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <PremiumPaywallDialog
        open={paywallOpen}
        onOpenChange={setPaywallOpen}
        recetaTitle={paywallTitle}
      />
      <FreeRecipeDialog
        open={freeDialogOpen}
        onOpenChange={setFreeDialogOpen}
        receta={selectedReceta}
      />
    </Layout>
  );
};

export default Recetas;
