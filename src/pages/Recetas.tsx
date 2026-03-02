import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { Clock, Users, Snowflake, Lock, UtensilsCrossed, Beef, Drumstick, Salad, Zap, Egg, Fish, CakeSlice } from "lucide-react";
import florDeTip from "@/assets/flor-de-tip.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Categoria = "Todas" | "Pollo" | "Carne" | "Vegano" | "Express" | "Pastas" | "Dulce";

interface Receta {
  title: string;
  time: string;
  servings: string;
  freezable: boolean;
  tag: Categoria;
  icon: React.ReactNode;
  bgClass: string;
}

const recetas: Receta[] = [
  { title: "Milanesas de pollo con puré", time: "40 min", servings: "4", freezable: true, tag: "Pollo", icon: <Drumstick size={48} />, bgClass: "bg-miel/20" },
  { title: "Pollo al horno con papas", time: "55 min", servings: "4", freezable: false, tag: "Pollo", icon: <Drumstick size={48} />, bgClass: "bg-coral-light/30" },
  { title: "Nuggets caseros de pollo", time: "30 min", servings: "6", freezable: true, tag: "Pollo", icon: <Drumstick size={48} />, bgClass: "bg-miel-light/40" },
  { title: "Estofado de carne con verduras", time: "60 min", servings: "5", freezable: true, tag: "Carne", icon: <Beef size={48} />, bgClass: "bg-coral-light/20" },
  { title: "Empanadas de carne al horno", time: "60 min", servings: "12", freezable: true, tag: "Carne", icon: <Beef size={48} />, bgClass: "bg-miel/15" },
  { title: "Hamburguesas caseras completas", time: "35 min", servings: "4", freezable: true, tag: "Carne", icon: <Beef size={48} />, bgClass: "bg-verde-pizarra-light/20" },
  { title: "Tarta de zapallitos y queso", time: "35 min", servings: "6", freezable: true, tag: "Vegano", icon: <Salad size={48} />, bgClass: "bg-verde-pizarra-light/30" },
  { title: "Estofado de lentejas", time: "50 min", servings: "6", freezable: true, tag: "Vegano", icon: <Salad size={48} />, bgClass: "bg-miel-light/30" },
  { title: "Tortilla de papas al horno", time: "35 min", servings: "4", freezable: false, tag: "Vegano", icon: <Egg size={48} />, bgClass: "bg-coral-light/15" },
  { title: "Pasta con salsa bolognesa", time: "45 min", servings: "4", freezable: true, tag: "Pastas", icon: <UtensilsCrossed size={48} />, bgClass: "bg-miel/25" },
  { title: "Ñoquis de papa caseros", time: "50 min", servings: "4", freezable: true, tag: "Pastas", icon: <UtensilsCrossed size={48} />, bgClass: "bg-verde-pizarra-light/25" },
  { title: "Wrap de pollo express", time: "15 min", servings: "2", freezable: false, tag: "Express", icon: <Zap size={48} />, bgClass: "bg-miel-light/40" },
  { title: "Quesadillas rápidas", time: "10 min", servings: "2", freezable: false, tag: "Express", icon: <Zap size={48} />, bgClass: "bg-coral-light/25" },
  { title: "Tostadas con huevo y palta", time: "10 min", servings: "2", freezable: false, tag: "Express", icon: <Zap size={48} />, bgClass: "bg-verde-pizarra-light/15" },
  { title: "Budín de pan casero", time: "30 min", servings: "8", freezable: false, tag: "Dulce", icon: <CakeSlice size={48} />, bgClass: "bg-miel/20" },
  { title: "Galletitas de avena y banana", time: "25 min", servings: "20", freezable: true, tag: "Dulce", icon: <CakeSlice size={48} />, bgClass: "bg-coral-light/20" },
];

const categorias: { label: Categoria; icon: React.ReactNode }[] = [
  { label: "Todas", icon: <UtensilsCrossed size={16} /> },
  { label: "Pollo", icon: <Drumstick size={16} /> },
  { label: "Carne", icon: <Beef size={16} /> },
  { label: "Vegano", icon: <Salad size={16} /> },
  { label: "Express", icon: <Zap size={16} /> },
  { label: "Pastas", icon: <UtensilsCrossed size={16} /> },
  { label: "Dulce", icon: <CakeSlice size={16} /> },
];

const Recetas = () => {
  const [filtro, setFiltro] = useState<Categoria>("Todas");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedReceta, setSelectedReceta] = useState<string>("");
  const navigate = useNavigate();

  const recetasFiltradas = filtro === "Todas" ? recetas : recetas.filter((r) => r.tag === filtro);

  const handleCardClick = (title: string) => {
    setSelectedReceta(title);
    setDialogOpen(true);
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
                  {cat.icon}
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
                  <motion.button
                    onClick={() => handleCardClick(r.title)}
                    className="bg-card rounded-2xl shadow-card overflow-hidden h-full flex flex-col w-full text-left group cursor-pointer border border-border hover:border-primary/30 transition-colors"
                    whileHover={{ y: -6, boxShadow: "var(--shadow-warm)" }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Imagen placeholder */}
                    <div className={`relative w-full aspect-[4/3] ${r.bgClass} flex items-center justify-center`}>
                      <span className="text-muted-foreground/40 group-hover:text-primary/50 transition-colors">
                        {r.icon}
                      </span>
                      {/* Candado premium */}
                      <div className="absolute top-3 right-3 bg-foreground/10 backdrop-blur-sm rounded-full p-1.5">
                        <Lock size={14} className="text-foreground/50" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">
                        {r.tag}
                      </span>
                      <h2 className="font-display text-base text-foreground mb-3 flex-1 leading-snug">
                        {r.title}
                      </h2>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {r.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={12} /> {r.servings}
                        </span>
                        {r.freezable && (
                          <span className="flex items-center gap-1 text-secondary">
                            <Snowflake size={12} /> Freezable
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.button>
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

      {/* Paywall Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader className="sm:text-center">
            <DialogTitle className="font-display text-2xl">¡Qué rico! 🤤</DialogTitle>
            <DialogDescription className="text-base mt-2 text-muted-foreground">
              El paso a paso de <span className="font-semibold text-foreground">{selectedReceta}</span>, sus variaciones y cómo freezarla son exclusivos para miembros de Cocina en Flor.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button
              size="lg"
              className="w-full font-semibold text-base"
              onClick={() => navigate("/planes")}
            >
              Quiero unirme al Club
            </Button>
            <Button
              variant="ghost"
              className="text-muted-foreground"
              onClick={() => setDialogOpen(false)}
            >
              Seguir viendo recetas
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Recetas;
