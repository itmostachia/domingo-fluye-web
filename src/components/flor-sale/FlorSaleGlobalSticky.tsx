import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, ArrowRight } from "lucide-react";
import FlorSaleCountdown from "./FlorSaleCountdown";
import { isSaleActive } from "@/lib/florSaleConfig";

/**
 * Sticky bar que aparece en TODA la web cuando la sale está activa.
 * Excepción: en /flor-sale ya hay uno propio con onReserve callback,
 * y en /gracias-flor-sale no debe aparecer.
 */
const FlorSaleGlobalSticky = () => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(() => isSaleActive());
  const location = useLocation();

  // Excluir rutas que tienen su propio sticky o donde no aplica
  const exclude =
    location.pathname === "/flor-sale" ||
    location.pathname === "/gracias-flor-sale" ||
    location.pathname === "/gracias" ||
    location.pathname === "/gracias-taller";

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => setActive(isSaleActive());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!active || exclude) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed top-0 left-0 right-0 z-[60] bg-card/95 backdrop-blur-xl border-b border-coral/40 shadow-card"
          role="banner"
          aria-label="Flor Sale promo activa"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-coral via-miel to-terracota" />

          <div className="container-wide relative py-2.5">
            <div className="flex items-center justify-between gap-3">
              <div className="hidden sm:flex items-center gap-3 min-w-0">
                <span className="inline-flex items-center gap-1.5 bg-coral/10 text-coral text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-1 rounded-full">
                  🔥 Flor Sale
                </span>
                <span className="hidden md:inline-block w-px h-4 bg-border" />
                <span className="hidden md:inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
                  Termina en
                </span>
                <FlorSaleCountdown variant="compact" className="text-foreground" />
                <span className="hidden lg:inline-flex items-center gap-1.5 text-xs text-coral font-semibold">
                  · -47% OFF · combo desde $20.990
                </span>
              </div>

              <div className="sm:hidden flex items-center gap-2 min-w-0 flex-1">
                <Flame size={14} className="text-coral animate-pulse flex-shrink-0" />
                <span className="text-xs font-bold text-foreground truncate">
                  Flor Sale termina en <FlorSaleCountdown variant="inline" className="text-coral" />
                </span>
              </div>

              <Link
                to="/flor-sale"
                className="group inline-flex items-center gap-1.5 bg-coral hover:bg-coral/90 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold shadow-cta hover:shadow-glow active:scale-95 transition-all duration-200 whitespace-nowrap flex-shrink-0"
              >
                Ver promo
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FlorSaleGlobalSticky;
