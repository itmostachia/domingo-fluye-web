import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, ArrowRight } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import { WORKSHOP, getCuposDisponibles, getTimeUntilWorkshop } from "@/lib/workshopConfig";

interface StickyTopBarProps {
  onReserve: () => void;
}

const StickyTopBar = ({ onReserve }: StickyTopBarProps) => {
  const [show, setShow] = useState(false);
  const [cupos, setCupos] = useState(() => getCuposDisponibles());
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    // Aparece cuando el usuario scrollea pasado el hero (~600px)
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      setCupos(getCuposDisponibles());
      setHasEnded(getTimeUntilWorkshop().hasEnded);
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (hasEnded) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed top-0 left-0 right-0 z-[60] bg-card/95 backdrop-blur-xl border-b border-miel/30 shadow-card"
        >
          {/* Línea superior gradient warm fina */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-coral via-miel to-terracota" />

          <div className="container-wide relative py-2.5">
            <div className="flex items-center justify-between gap-3">
              {/* Izquierda: countdown + cupos (oculto en mobile pequeño) */}
              <div className="hidden sm:flex items-center gap-4 min-w-0">
                <div className="inline-flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-coral whitespace-nowrap">
                    Empieza en
                  </span>
                  <CountdownTimer variant="numbers" className="text-foreground text-sm" />
                </div>
                <span className="hidden md:inline-block w-px h-4 bg-border" />
                <span className="hidden md:inline-flex items-center gap-1.5 text-[12px] font-bold text-coral">
                  <Flame size={12} className="text-coral animate-pulse" />
                  Quedan {cupos} lugares
                </span>
              </div>

              {/* Mobile: copy compacto */}
              <div className="sm:hidden flex items-center gap-2 min-w-0 flex-1">
                <Flame size={14} className="text-coral animate-pulse flex-shrink-0" />
                <span className="text-xs font-bold text-foreground truncate">
                  Taller {WORKSHOP.dateLabelShort} — {cupos} lugares
                </span>
              </div>

              {/* Derecha: CTA */}
              <button
                onClick={onReserve}
                className="group inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold shadow-cta hover:shadow-glow active:scale-95 transition-all duration-200 whitespace-nowrap flex-shrink-0"
              >
                Reservar — {WORKSHOP.priceLabel}
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyTopBar;
