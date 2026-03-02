import { X, Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxBlob from "@/components/ParallaxBlob";
import beforeAfterImg from "@/assets/before-after.jpg";

const before = [
"Estrés diario por las comidas",
"Improvisación constante",
"Gasto extra en delivery y compras",
"Cansancio mental acumulado"];


const after = [
"Semana organizada de entrada",
"Cocina sin caos ni sorpresas",
"Más tiempo para lo que importa",
"Más calma, menos decisiones"];


const BeforeAfter = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-soft-peach/70 via-accent/25 to-soft-peach/50 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terracota/20 to-transparent" />
      <ParallaxBlob className="absolute top-1/2 -left-24 w-72 h-72 bg-terracota/8 rounded-full blur-[100px] pointer-events-none" speed={-0.2} />
      <ParallaxBlob className="absolute -bottom-20 right-0 w-64 h-64 bg-primary/8 rounded-full blur-[80px] pointer-events-none" speed={0.15} />
      <div className="container-tight relative">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
              Transformación
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-2">
              El cambio que sentís
            </h2>
            <p className="font-display text-3xl md:text-4xl lg:text-5xl text-gradient-coral">
              desde la primera semana
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mb-10 rounded-2xl overflow-hidden shadow-card border border-border max-w-3xl mx-auto">
            <img alt="Antes y después: cocina caótica vs organizada" className="w-full h-64 md:h-80 lg:h-96 object-cover" loading="lazy" decoding="async" src="/lovable-uploads/76f52d05-8408-4a9c-9ae7-a23a4bb37168.png" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* Center arrow (desktop) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-terracota flex items-center justify-center shadow-lg border-4 border-background"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}>
              
              <ArrowRight size={18} className="text-primary-foreground" />
            </motion.div>
          </div>

          {/* Before */}
          <ScrollReveal delay={0.1}>
            <div className="bg-card rounded-2xl p-8 border border-border shadow-card relative overflow-hidden h-full">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-destructive/40 to-destructive/10" />
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-destructive/60 mb-6">Sin el Club</div>
              <ul className="space-y-4">
                {before.map((item, i) =>
                <motion.li
                  key={item}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}>
                  
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-destructive/8 flex items-center justify-center">
                      <X size={14} className="text-destructive/60" />
                    </span>
                    <span className="text-foreground/60 text-sm">{item}</span>
                  </motion.li>
                )}
              </ul>
            </div>
          </ScrollReveal>

          {/* After */}
          <ScrollReveal delay={0.25}>
            <motion.div
              className="bg-card rounded-2xl p-8 border-2 border-primary/20 shadow-card relative overflow-hidden h-full"
              whileHover={{ borderColor: "hsl(352 79% 65% / 0.4)" }}
              transition={{ duration: 0.3 }}>
              
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-miel" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6 relative">Con el Club ✨</div>
              <ul className="space-y-4 relative">
                {after.map((item, i) =>
                <motion.li
                  key={item}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}>
                  
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check size={14} className="text-primary" />
                    </span>
                    <span className="text-foreground font-medium text-sm">{item}</span>
                  </motion.li>
                )}
              </ul>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>);

};

export default BeforeAfter;