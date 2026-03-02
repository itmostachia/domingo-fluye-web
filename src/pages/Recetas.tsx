import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { Clock, Users, Snowflake } from "lucide-react";
import florDeTip from "@/assets/flor-de-tip.png";

const recetas = [
  { title: "Milanesas de pollo con puré", time: "40 min", servings: "4", freezable: true, tag: "Clásico" },
  { title: "Tarta de zapallitos y queso", time: "35 min", servings: "6", freezable: true, tag: "Vegetariano" },
  { title: "Estofado de lentejas", time: "50 min", servings: "6", freezable: true, tag: "Legumbres" },
  { title: "Pasta con salsa bolognesa casera", time: "45 min", servings: "4", freezable: true, tag: "Pastas" },
  { title: "Empanadas de carne al horno", time: "60 min", servings: "12", freezable: true, tag: "Clásico" },
  { title: "Budín de pan casero", time: "30 min", servings: "8", freezable: false, tag: "Dulce" },
  { title: "Guiso de arroz con pollo", time: "45 min", servings: "5", freezable: true, tag: "Guisos" },
  { title: "Tortilla de papas al horno", time: "35 min", servings: "4", freezable: false, tag: "Rápido" },
];

const Recetas = () => {
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
            <p className="text-muted-foreground text-center text-lg mb-12 max-w-xl mx-auto">
              Una muestra de lo que encontrás cada mes. Comida real para familias reales.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recetas.map((r, i) => (
              <ScrollReveal key={r.title} delay={i * 0.08}>
                <motion.div
                  className="bg-card rounded-2xl p-6 shadow-card h-full flex flex-col"
                  whileHover={{ y: -4, boxShadow: "var(--shadow-warm)" }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">{r.tag}</span>
                  <h2 className="font-display text-lg text-foreground mb-4 flex-1">{r.title}</h2>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock size={12} /> {r.time}</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {r.servings}</span>
                    {r.freezable && <span className="flex items-center gap-1 text-secondary"><Snowflake size={12} /> Freezable</span>}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <p className="text-center text-muted-foreground mt-12 text-sm">
              Cada mes recibís 40 recetas nuevas con el Club. Estas son solo un ejemplo.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Recetas;
