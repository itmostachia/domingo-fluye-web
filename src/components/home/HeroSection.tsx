import { Link } from "react-router-dom";
import { Check, ArrowRight, Sparkles, Star, Lock, Zap, XCircle } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero-kitchen.jpg";
import manualImage from "@/assets/manual-mockup.jpg";


const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } }
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Parallax background with darker overlay */}
      <motion.div className="absolute inset-0" style={{ y: bgY, z: 0, willChange: "transform" }}>
        <img
          src={heroImage}
          alt="Mesa de cocina con preparaciones del domingo organizadas en tuppers"
          className="w-full h-[120%] object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="sync" />
        
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/70 to-foreground/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/30" />
      </motion.div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-[15%] w-32 h-32 rounded-full bg-miel/15 blur-3xl"
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        
        <motion.div
          className="absolute bottom-32 left-[10%] w-24 h-24 rounded-full bg-coral-light/15 blur-3xl"
          animate={{ y: [0, 15, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
        
      </div>

      <motion.div className="relative container-wide py-24 md:py-36 lg:py-44" style={{ opacity }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Social proof pill */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 glass-dark px-4 py-2 rounded-full mb-6">
              
              <span className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) =>
                <Star key={i} size={13} className="text-miel fill-miel" />
                )}
              </span>
              <span className="text-sm font-medium text-primary-foreground">Más de 100 familias ya recuperaron su tiempo</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-primary-foreground leading-[1.1] mb-6 drop-shadow-lg">
              
              Si el domingo está resuelto,{" "}
              <span className="relative inline-block">
                tu semana también.
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-miel to-coral-light rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }} />
                
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-lg leading-relaxed drop-shadow-sm">
              
              Un sistema mensual para cocinar en 90 minutos y olvidarte del caos el resto de la semana.
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-3 mb-8">
              {[
              "4 domingos planificados por mes",
              "+10 recetas prácticas por semana",
              "Lista inteligente + freezer sin estrés"].
              map((item, i) =>
              <motion.li
                key={item}
                className="flex items-center gap-3 text-primary-foreground/90"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.15, duration: 0.5 }}>
                
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-miel/25 flex items-center justify-center backdrop-blur-sm">
                    <Check size={13} className="text-miel" />
                  </span>
                  <span className="text-base font-medium">{item}</span>
                </motion.li>
              )}
            </motion.ul>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link
                to="/planes"
                className="group relative bg-primary text-primary-foreground px-8 py-4 rounded-xl text-center font-semibold text-lg shadow-cta hover:shadow-glow transition-all duration-300 overflow-hidden">
                
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Quiero ordenar mi semana
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-vino to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                to="/como-funciona"
                className="glass-dark text-primary-foreground px-8 py-4 rounded-xl text-center font-medium hover:bg-primary-foreground/10 transition-all duration-300">
                
                Ver cómo funciona
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 text-sm text-primary-foreground/70">
              
              {[
              { icon: Lock, text: "Pago seguro" },
              { icon: XCircle, text: "Cancelás con 1 clic" },
              { icon: Zap, text: "Acceso inmediato" }].
              map(({ icon: Icon, text }) =>
              <span key={text} className="flex items-center gap-1.5">
                  <Icon size={14} className="text-miel" />
                  {text}
                </span>
              )}
            </motion.div>
          </motion.div>

          {/* Manual mockup */}
          <motion.div
            className="hidden lg:flex justify-center relative"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-coral-light/15 rounded-full blur-3xl" />
            </div>
            <motion.img

              alt="Manual mensual de Cocina en Flor"
              className="relative w-80 rounded-2xl shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} src="/lovable-uploads/1a2327b2-3e42-4d23-aacc-9bdfbd03780a.jpg" />
            
            <motion.div
              className="absolute -bottom-4 -left-4 glass px-4 py-3 rounded-xl shadow-warm-lg"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
              
              <div className="text-xs font-semibold text-foreground">+40 recetas</div>
              <div className="text-[10px] text-muted-foreground">cada mes</div>
            </motion.div>
            <motion.div
              className="absolute -top-4 -right-4 glass px-4 py-3 rounded-xl shadow-warm-lg"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
              
              <div className="text-xs font-semibold text-primary">⏱ 90 min</div>
              <div className="text-[10px] text-muted-foreground">y listo</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>);

};

export default HeroSection;