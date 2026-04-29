import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
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
    <section className="relative py-6 md:py-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-vino via-primary to-terracota" />
      <div className="absolute inset-0 opacity-30 bg-mesh pointer-events-none" />

      <motion.div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-miel/30 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-coral-light/30 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container-wide relative">
        <Link to="/taller" className="block group">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8"
          >
            <div className="flex items-center gap-3 md:gap-4 text-primary-foreground">
              <motion.div
                animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-miel/30 backdrop-blur-sm flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-miel" />
              </motion.div>
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="inline-flex items-center gap-1 text-[10px] md:text-xs uppercase font-bold tracking-wider bg-primary-foreground/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-miel animate-pulse" />
                    En vivo · {daysLabel}
                  </span>
                </div>
                <p className="font-display text-base md:text-xl leading-tight">
                  Taller en vivo con Flor — {WORKSHOP.dateLabelShort}
                </p>
                <p className="text-xs md:text-sm text-primary-foreground/85 mt-0.5">
                  Tu entrada incluye 1 mes en el Club gratis 🎁
                </p>
              </div>
            </div>

            <motion.div
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-5 py-2.5 md:px-6 md:py-3 rounded-xl text-sm md:text-base font-bold shadow-lg group-hover:shadow-xl transition-shadow whitespace-nowrap"
            >
              Quiero mi lugar
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

export default WorkshopBanner;
