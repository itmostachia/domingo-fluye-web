import { BookOpen, UtensilsCrossed, ShoppingCart, Snowflake, Repeat, CalendarDays, Users, Mail } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxBlob from "@/components/ParallaxBlob";
import florVerde from "@/assets/flor-verde.png";

const features = [
  { icon: BookOpen, title: "Manual mensual completo", desc: "Todo organizado en un solo documento descargable.", color: "text-vino", bgColor: "bg-vino/10" },
  { icon: UtensilsCrossed, title: "40 recetas reales", desc: "Comida de familia, práctica y riquísima.", color: "text-primary", bgColor: "bg-primary/10" },
  { icon: ShoppingCart, title: "Lista de compras inteligente", desc: "Comprás una vez, cocinás toda la semana.", color: "text-terracota", bgColor: "bg-terracota/10" },
  { icon: Snowflake, title: "Sistema freezer paso a paso", desc: "Qué freezar, cómo y cuándo descongelar.", color: "text-secondary", bgColor: "bg-secondary/10" },
  { icon: Repeat, title: "Sustituciones prácticas", desc: "Si no conseguís algo, siempre hay alternativa.", color: "text-primary", bgColor: "bg-primary/10" },
  { icon: CalendarDays, title: "Calendario semanal", desc: "Día por día, sabés qué vas a cocinar.", color: "text-miel", bgColor: "bg-miel/15" },
  { icon: Users, title: "Grupo privado", desc: "Comunidad de familias que cocinan con sistema.", color: "text-secondary", bgColor: "bg-secondary/10" },
  { icon: Mail, title: "Email recordatorio", desc: "Cada semana te avisamos qué preparar.", color: "text-terracota", bgColor: "bg-terracota/10" },
];

const WhatIncludes = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/45 via-miel-light/30 to-soft-peach/50 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-miel/30 to-transparent" />
      <ParallaxBlob className="absolute top-20 right-[5%] w-64 h-64 bg-miel/18 rounded-full blur-[100px] pointer-events-none" speed={-0.18} />
      <ParallaxBlob className="absolute bottom-20 left-[5%] w-56 h-56 bg-coral/10 rounded-full blur-[80px] pointer-events-none" speed={0.15} />
      <img
        src={florVerde}
        alt=""
        className="absolute top-12 left-8 w-14 h-auto opacity-[0.08] pointer-events-none rotate-12"
        loading="lazy"
        decoding="async"
      />

      <div className="container-wide relative">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-4 bg-secondary/5 px-4 py-1.5 rounded-full">
              Todo incluido
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Qué incluye cada mes
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Todo lo que necesitás para que la semana fluya sin caos.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.08}>
              <motion.div
                className="relative bg-card rounded-2xl p-6 shadow-card border border-border group overflow-hidden h-full"
                whileHover={{ y: -6, boxShadow: "var(--shadow-warm-lg)" }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-12 h-12 rounded-xl ${f.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5 text-sm">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIncludes;
