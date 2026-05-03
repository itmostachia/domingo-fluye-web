import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Flame } from "lucide-react";
import { useEffect, useState } from "react";
import { isSaleActive, getRecentBuyersCount, getTimeUntilSaleEnd } from "@/lib/florSaleConfig";

const FlorSaleBanner = () => {
  const [active, setActive] = useState(() => isSaleActive());
  const [time, setTime] = useState(() => getTimeUntilSaleEnd());
  const buyers = getRecentBuyersCount();

  useEffect(() => {
    const tick = () => {
      setActive(isSaleActive());
      setTime(getTimeUntilSaleEnd());
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!active) return null;

  return (
    <section className="py-6 md:py-10 relative">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden bg-gradient-to-br from-card via-card to-coral/5 rounded-2xl md:rounded-3xl shadow-warm border-2 border-coral/30 p-5 md:p-7"
        >
          <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-coral/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-miel/15 blur-3xl pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-coral via-miel to-terracota" />

          <Link to="/flor-sale" className="block group relative">
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6">
              <motion.div
                animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-coral/30 via-miel/30 to-terracota/20 flex items-center justify-center shadow-card"
              >
                <Flame className="w-7 h-7 text-coral" />
              </motion.div>

              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-coral bg-coral/10 px-2 py-0.5 rounded-full">
                    🔥 Flor Sale · termina en {time.days}d
                  </span>
                </div>
                <h3 className="font-display text-lg md:text-2xl text-foreground leading-tight mb-1">
                  Hot Sale del Club — Hasta -51% OFF
                </h3>
                <p className="text-sm md:text-base text-muted-foreground inline-flex items-center justify-center md:justify-start gap-1.5 flex-wrap">
                  <Sparkles size={13} className="text-coral" />
                  Combos a $20.990 · {buyers} mamás compraron esta semana
                </p>
              </div>

              <motion.div
                whileHover={{ x: 3 }}
                className="inline-flex items-center gap-2 bg-coral hover:bg-coral/90 text-white px-6 py-3 md:px-7 md:py-3.5 rounded-xl text-sm md:text-base font-bold shadow-cta group-hover:shadow-glow transition-all whitespace-nowrap"
              >
                Ver Flor Sale
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FlorSaleBanner;
