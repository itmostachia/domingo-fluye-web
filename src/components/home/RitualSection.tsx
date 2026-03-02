import { Clock, CalendarCheck, Utensils } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxBlob from "@/components/ParallaxBlob";
import AnimatedCounter from "@/components/AnimatedCounter";
import ritualImg from "@/assets/ritual-cooking.jpg";

const ritualItems = [
{
  icon: Clock,
  number: 90,
  unit: "minutos",
  desc: "Una sola sesión de cocina.",
  gradient: "from-coral to-terracota",
  bg: "bg-primary/5"
},
{
  icon: CalendarCheck,
  number: 1,
  unit: "vez por semana",
  desc: "Cocinás una vez y listo.",
  gradient: "from-miel to-terracota",
  bg: "bg-miel/5"
},
{
  icon: Utensils,
  number: 5,
  unit: "días resueltos",
  desc: "Sin pensar, sin estrés.",
  gradient: "from-verde-pizarra to-secondary",
  bg: "bg-secondary/5"
}];


const RitualSection = () => {
  return (
    <section className="section-padding relative overflow-hidden my-0 pl-0">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/50 via-miel-light/40 to-soft-peach/60 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-miel/30 to-transparent" />
      <ParallaxBlob className="absolute -top-32 -right-32 w-80 h-80 bg-miel/20 rounded-full blur-[100px] pointer-events-none" speed={-0.2} />
      <ParallaxBlob className="absolute -bottom-20 -left-20 w-64 h-64 bg-coral/10 rounded-full blur-[80px] pointer-events-none" speed={0.18} />

      <div className="container-tight text-center relative">
        <ScrollReveal>
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-4 bg-secondary/5 px-4 py-1.5 rounded-full">
            Tu nuevo ritual
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            El ritual que cambia tu semana
          </h2>
          <p className="text-muted-foreground text-lg mb-14 max-w-2xl mx-auto">
            El domingo deja de ser caos y pasa a ser tu mejor estrategia.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mb-10 overflow-hidden shadow-card max-w-2xl mx-auto rounded-2xl px-0 py-0 my-0 border-secondary border-2">
            <img alt="Sesión de cocina dominical con ingredientes frescos" className="w-full h-48 md:h-64 object-cover border-secondary" loading="lazy" decoding="async" src="/lovable-uploads/84cc578b-028e-4487-8a99-cc6cb4c4941c.png" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ritualItems.map((item, i) =>
          <ScrollReveal key={item.number} delay={i * 0.15}>
              <motion.div
              className="relative bg-card rounded-2xl p-8 shadow-card border border-border overflow-hidden group"
              whileHover={{ y: -6, boxShadow: "var(--shadow-warm-lg)" }}
              transition={{ duration: 0.3 }}>
              
                {/* Top gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`} />

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>

                <div className="font-display text-5xl md:text-6xl text-foreground mb-2">
                  <AnimatedCounter target={item.number} />
                </div>
                <div className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-medium">{item.unit}</div>
                <p className="text-foreground/65 text-sm">{item.desc}</p>
              </motion.div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>);

};

export default RitualSection;