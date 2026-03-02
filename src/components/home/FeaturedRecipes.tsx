import { useState } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import RecetaCard from "@/components/recetas/RecetaCard";
import { Button } from "@/components/ui/button";
import { recetas, type Receta } from "@/components/recetas/recetasData";
import FreeRecipeDialog from "@/components/recetas/FreeRecipeDialog";
import PremiumPaywallDialog from "@/components/recetas/PremiumPaywallDialog";
import { useAuth } from "@/contexts/AuthContext";

const FeaturedRecipes = () => {
  const { hasAccess } = useAuth();
  const featured = recetas.slice(0, 4);
  const [selectedReceta, setSelectedReceta] = useState<Receta | null>(null);
  const [freeOpen, setFreeOpen] = useState(false);
  const [premiumOpen, setPremiumOpen] = useState(false);

  const handleCardClick = (receta: Receta) => {
    setSelectedReceta(receta);
    if (receta.isPremium && !hasAccess) {
      setPremiumOpen(true);
    } else {
      setFreeOpen(true);
    }
  };

  return (
    <section className="section-padding relative">
      <div className="container-wide">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl text-foreground text-center mb-2">
            Un vistazo a tu próxima semana
          </h2>
          <p className="text-muted-foreground text-center text-lg mb-10 max-w-xl mx-auto">
            Comida real, lista en minutos.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {featured.map((r, i) => (
            <ScrollReveal key={r.title} delay={i * 0.08}>
              <RecetaCard receta={r} onClick={() => handleCardClick(r)} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/recetas">Ver todo el recetario →</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>

      <FreeRecipeDialog open={freeOpen} onOpenChange={setFreeOpen} receta={selectedReceta} />
      <PremiumPaywallDialog
        open={premiumOpen}
        onOpenChange={setPremiumOpen}
        recetaTitle={selectedReceta?.title ?? ""}
      />
    </section>
  );
};

export default FeaturedRecipes;
