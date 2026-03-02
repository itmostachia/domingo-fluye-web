import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import RecetaCard from "@/components/recetas/RecetaCard";
import { Button } from "@/components/ui/button";
import { recetas } from "@/components/recetas/recetasData";

const FeaturedRecipes = () => {
  const featured = recetas.slice(0, 4);

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
              <RecetaCard receta={r} onClick={() => {}} />
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
    </section>
  );
};

export default FeaturedRecipes;
