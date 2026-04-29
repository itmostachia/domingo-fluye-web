import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Gift } from "lucide-react";
import { WORKSHOP, getTimeUntilWorkshop } from "@/lib/workshopConfig";
import { useEffect, useState } from "react";

const WorkshopBanner = () => {
  const [time, setTime] = useState(() => getTimeUntilWorkshop());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeUntilWorkshop()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (time.hasEnded) return null;

  const daysLabel =
    time.days > 0 ? `Faltan ${time.days} día${time.days === 1 ? "" : "s"}` : `Faltan ${time.hours} hs`;

  return (
    <section className="py-6 md:py-10 relative">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden bg-card rounded-2xl md:rounded-3xl shadow-card border border-miel/30 p-5 md:p-7"
        >
          {/* Sutiles blobs warm de ambiente — coherentes con el resto de la pagina */}
          <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-miel/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-coral/10 blur-3xl pointer-events-none" />

          {/* Linea fina superior con gradient warm */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-coral via-miel to-terracota" />

          <Link to="/taller" className="block group relative">
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6">
              {/* Icono decorativo */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.06, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-miel/40 via-coral/20 to-terracota/15 flex items-center justify-center shadow-card"
              >
                <Sparkles className="w-7 h-7 text-coral" />
              </motion.div>

              {/* Texto */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 mb-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-coral" />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-deep-brown">
                    En vivo · {daysLabel}
                  </span>
                </div>
                <h3 className="font-display text-lg md:text-2xl text-foreground leading-tight mb-1">
                  Taller en vivo con Flor — {WORKSHOP.dateLabelShort}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground inline-flex items-center justify-center md:justify-start gap-1.5 flex-wrap">
                  <Gift size={13} className="text-primary" />
                  Tu entrada incluye 1 mes en el Club totalmente gratis
                </p>
              </div>

              {/* CTA */}
              <motion.div
                whileHover={{ x: 3 }}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 md:px-7 md:py-3.5 rounded-xl text-sm md:text-base font-bold shadow-cta group-hover:shadow-glow transition-shadow whitespace-nowrap"
              >
                Quiero mi lugar
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkshopBanner;
