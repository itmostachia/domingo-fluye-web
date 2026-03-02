import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxBlob from "@/components/ParallaxBlob";
import corazonVerde from "@/assets/corazon-verde.png";

const testimonials = [
  {
    name: "Carolina M.",
    role: "Mamá de 2, Córdoba",
    text: "Antes llegaba al domingo agotada solo de pensar en la semana. Ahora en 90 minutos tengo todo resuelto. Es un alivio enorme.",
    stars: 5,
    initials: "CM",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    name: "Lucía R.",
    role: "Mamá de 3, Buenos Aires",
    text: "Lo que más me cambió fue no tener que decidir todos los días qué cocinar. Esa carga mental desapareció.",
    stars: 5,
    initials: "LR",
    color: "text-terracota",
    bgColor: "bg-terracota/10",
  },
  {
    name: "Valentina G.",
    role: "Trabaja full-time, Rosario",
    text: "No soy gran cocinera pero las recetas son simples y riquísimas. Mi familia ni nota que cocino todo el domingo.",
    stars: 5,
    initials: "VG",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
];

const Testimonials = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/40 via-soft-peach/60 to-accent/30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/25 to-transparent" />
      <ParallaxBlob className="absolute -top-20 right-[10%] w-72 h-72 bg-secondary/8 rounded-full blur-[100px] pointer-events-none" speed={-0.18} />
      <div className="absolute top-10 left-10 opacity-[0.03] pointer-events-none">
        <Quote size={200} />
      </div>
      <img
        src={corazonVerde}
        alt=""
        className="absolute bottom-8 right-8 w-16 h-auto opacity-10 pointer-events-none"
        loading="lazy"
        decoding="async"
      />

      <div className="container-wide relative">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-4 bg-secondary/5 px-4 py-1.5 rounded-full">
              Prueba social
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Lo que dicen las familias del Club
            </h2>
            <p className="text-muted-foreground text-lg">
              Historias reales de mamás que recuperaron su semana.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.15}>
              <motion.div
                className="relative bg-card rounded-2xl p-7 shadow-card border border-border overflow-hidden h-full flex flex-col"
                whileHover={{ y: -4, boxShadow: "var(--shadow-warm-lg)" }}
                transition={{ duration: 0.3 }}
              >
                {/* Quote icon */}
                <div className="mb-4">
                  <Quote size={24} className="text-primary/15" />
                </div>

                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + j * 0.08 }}
                    >
                      <Star size={14} className="fill-miel text-miel" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-foreground/75 mb-6 leading-relaxed text-sm italic flex-1">"{t.text}"</p>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className={`w-10 h-10 rounded-full ${t.bgColor} flex items-center justify-center ${t.color} text-xs font-bold`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
