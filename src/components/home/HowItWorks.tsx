import { Link } from "react-router-dom";
import { UserPlus, Download, ChefHat, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxBlob from "@/components/ParallaxBlob";

const clubDomingosImg = "/lovable-uploads/club-domingos.png";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Te unís al Club",
    desc: "Elegís tu plan, te suscribís y accedés al instante.",
    color: "text-vino",
    bgColor: "bg-primary/10",
  },
  {
    icon: Download,
    step: "02",
    title: "Descargás el manual del mes",
    desc: "40 recetas, listas de compras, calendario y sistema freezer.",
    color: "text-terracota",
    bgColor: "bg-terracota/10",
  },
  {
    icon: ChefHat,
    step: "03",
    title: "Cocinás el domingo",
    desc: "90 minutos y tu semana queda resuelta.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
];

const HowItWorks = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-soft-peach/70 via-accent/30 to-soft-peach/50 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <ParallaxBlob className="absolute top-1/3 -right-20 w-72 h-72 bg-primary/8 rounded-full blur-[100px] pointer-events-none" speed={-0.15} />
      <ParallaxBlob className="absolute bottom-0 -left-16 w-56 h-56 bg-terracota/8 rounded-full blur-[80px] pointer-events-none" speed={0.2} />
      <div className="container-tight relative">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
              Paso a paso
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Cómo funciona
            </h2>
            <p className="text-muted-foreground text-lg">
              Tres pasos. Sin vueltas.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6 max-w-5xl mx-auto items-stretch">
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-primary/20 via-miel/20 to-secondary/20" />

            <div className="space-y-6">
              {steps.map((s, i) => (
                <ScrollReveal key={s.step} delay={i * 0.2}>
                  <motion.div
                    className="flex gap-6 items-start relative"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl ${s.bgColor} flex items-center justify-center shadow-card border border-border relative z-10`}>
                      <s.icon className={`w-7 h-7 ${s.color}`} />
                    </div>
                    <div className="bg-card rounded-2xl p-6 flex-1 shadow-card border border-border hover:border-primary/20 transition-colors">
                      <span className="text-xs font-bold uppercase tracking-widest text-primary/60">Paso {s.step}</span>
                      <h3 className="font-display text-xl text-foreground mb-1.5 mt-1">{s.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ScrollReveal delay={0.3}>
            <div className="hidden md:block rounded-2xl overflow-hidden shadow-card border border-border h-full">
              <img src={clubDomingosImg} alt="Club de los Domingos - Cocina en Flor" className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.6}>
          <div className="text-center mt-12">
            <Link
              to="/planes"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-cta hover:shadow-glow transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Quiero empezar ahora
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-vino to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HowItWorks;
