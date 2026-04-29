import { motion } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxBlob from "@/components/ParallaxBlob";

const antes = [
  "Llegás a la noche y no sabés qué cocinar",
  "Volvés al super dos o tres veces por semana",
  "Tirás comida que se vence sin usar",
  "Improvisás recetas y todo termina siendo lo mismo",
  "El domingo te sentís culpable por no haber planificado",
  "Cocinar se siente una carga más en tu día",
];

const despues = [
  "Tu menú semanal listo en 15 minutos",
  "Una sola compra inteligente con lo necesario",
  "El freezer trabaja para vos como aliado",
  "Variedad real sin pensarlo cada noche",
  "Domingos liberados para descansar",
  "La comida vuelve a sentirse fácil",
];

interface VsTransformationProps {
  onReserve: () => void;
}

const VsTransformation = ({ onReserve }: VsTransformationProps) => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background sutil cream/peach */}
      <div className="absolute inset-0 bg-gradient-to-b from-soft-peach/30 via-background to-background pointer-events-none" />
      <ParallaxBlob
        className="absolute -top-20 -right-20 w-72 h-72 bg-coral/8 rounded-full blur-[100px] pointer-events-none"
        speed={0.15}
      />
      <ParallaxBlob
        className="absolute bottom-0 -left-20 w-64 h-64 bg-miel/12 rounded-full blur-[100px] pointer-events-none"
        speed={-0.15}
      />

      <div className="container-tight relative">
        <ScrollReveal>
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
              La transformación
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              De improvisar todos los días
              <span className="block text-gradient-coral mt-1">a tener la semana resuelta.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {/* Antes */}
          <ScrollReveal>
            <motion.div
              whileHover={{ y: -2 }}
              className="relative bg-card rounded-2xl p-6 md:p-7 border border-border shadow-card h-full"
            >
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border/60">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <X className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-muted-foreground">
                    Antes del taller
                  </p>
                  <h3 className="font-display text-lg text-foreground">Como estás hoy</h3>
                </div>
              </div>
              <ul className="space-y-3">
                {antes.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                  >
                    <X size={14} className="text-muted-foreground/60 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </ScrollReveal>

          {/* Después — destacado con border coral */}
          <ScrollReveal delay={0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              className="relative bg-card rounded-2xl p-6 md:p-7 border-2 border-coral/30 shadow-warm h-full overflow-hidden"
            >
              {/* Línea superior gradient warm */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-coral via-miel to-terracota" />

              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border/60">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral/15 via-miel/20 to-terracota/15 flex items-center justify-center">
                  <Check className="w-5 h-5 text-coral" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-coral">
                    Después del taller
                  </p>
                  <h3 className="font-display text-lg text-foreground">Cómo te queda la semana</h3>
                </div>
              </div>
              <ul className="space-y-3">
                {despues.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="flex items-start gap-2.5 text-sm text-foreground leading-relaxed"
                  >
                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-coral/15 flex items-center justify-center mt-0.5">
                      <Check size={10} className="text-coral" />
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* CTA debajo de la transformación — refuerzo de decisión */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mt-10">
            <button
              onClick={onReserve}
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-xl font-bold shadow-cta hover:shadow-glow active:scale-95 transition-all duration-300"
            >
              Quiero hacer el cambio
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-muted-foreground mt-3">
              Reservás en menos de 2 minutos · Te llevás 1 mes en el Club gratis
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default VsTransformation;
