import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Sparkles, ArrowRight, Gift } from "lucide-react";
import { isSaleActive, getTimeUntilSaleEnd, getRecentBuyersCount } from "@/lib/florSaleConfig";
import { WORKSHOP, getTimeUntilWorkshop } from "@/lib/workshopConfig";

/**
 * Banner promocional unificado: muestra Flor Sale + Taller en vivo en un carousel
 * con autoplay 5s, pause-on-hover, dots navigables.
 * Reemplaza FlorSaleBanner + WorkshopBanner para reducir clutter visual.
 */
const HomeOffersCarousel = () => {
  const [saleActive, setSaleActive] = useState(() => isSaleActive());
  const [saleTime, setSaleTime] = useState(() => getTimeUntilSaleEnd());
  const [workshopTime, setWorkshopTime] = useState(() => getTimeUntilWorkshop());
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);

  // Tick countdowns
  useEffect(() => {
    const id = setInterval(() => {
      setSaleActive(isSaleActive());
      setSaleTime(getTimeUntilSaleEnd());
      setWorkshopTime(getTimeUntilWorkshop());
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  // Slides activos
  const slides = useMemo(() => {
    const out: Array<"sale" | "taller"> = [];
    if (saleActive) out.push("sale");
    if (!workshopTime.hasEnded) out.push("taller");
    return out;
  }, [saleActive, workshopTime.hasEnded]);

  // Reset index si cambia la cantidad de slides
  useEffect(() => {
    if (index >= slides.length && slides.length > 0) setIndex(0);
  }, [slides.length, index]);

  // Autoplay
  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5500);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  if (slides.length === 0) return null;

  const current = slides[index];
  const buyers = getRecentBuyersCount();

  const workshopDaysLabel =
    workshopTime.days > 0
      ? `Faltan ${workshopTime.days} día${workshopTime.days === 1 ? "" : "s"}`
      : `Faltan ${workshopTime.hours} hs`;

  return (
    <section className="relative py-6 md:py-10">
      <div className="container-wide">
        {/* Header sutil cuando hay 2+ slides */}
        {slides.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-4"
          >
            <span className="inline-flex items-center gap-2 bg-card border border-coral/30 px-4 py-1.5 rounded-full shadow-card">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-coral" />
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-coral">
                Promos activas ahora
              </span>
            </span>
          </motion.div>
        )}

        <motion.div
          onHoverStart={() => setPaused(true)}
          onHoverEnd={() => setPaused(false)}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {current === "sale" ? (
                <SaleSlide saleTime={saleTime} buyers={buyers} />
              ) : (
                <TallerSlide daysLabel={workshopDaysLabel} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Dots indicators (solo si hay 2+ slides) */}
          {slides.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {slides.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setIndex(i)}
                  aria-label={`Ir a promo ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-coral" : "w-1.5 bg-muted hover:bg-coral/50"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Progress bar autoplay (solo si hay 2+ slides y no está pausado) */}
          {slides.length > 1 && !paused && (
            <motion.div
              key={`progress-${index}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 5.5, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-coral/30 origin-left rounded-full"
              style={{ bottom: "-8px" }}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
};

/* === SLIDE: FLOR SALE === */
interface SaleSlideProps {
  saleTime: { days: number; hours: number; minutes: number };
  buyers: number;
}

const SaleSlide = ({ saleTime, buyers }: SaleSlideProps) => (
  <div className="relative overflow-hidden bg-gradient-to-br from-card via-card to-coral/8 rounded-2xl md:rounded-3xl shadow-warm border-2 border-coral/30">
    <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-coral/20 blur-3xl pointer-events-none" />
    <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-miel/15 blur-3xl pointer-events-none" />
    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-coral via-miel to-terracota" />

    <Link to="/flor-sale" className="block group relative p-5 md:p-7">
      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-coral/40 via-miel/30 to-terracota/20 flex items-center justify-center shadow-card"
        >
          <Flame className="w-7 h-7 text-coral" />
        </motion.div>

        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-coral bg-coral/10 px-2 py-0.5 rounded-full">
              🔥 Flor Sale · termina en {saleTime.days}d
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
  </div>
);

/* === SLIDE: TALLER === */
interface TallerSlideProps {
  daysLabel: string;
}

const TallerSlide = ({ daysLabel }: TallerSlideProps) => (
  <div className="relative overflow-hidden bg-card rounded-2xl md:rounded-3xl shadow-card border border-miel/40">
    <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-miel/15 blur-3xl pointer-events-none" />
    <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-coral/10 blur-3xl pointer-events-none" />
    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-coral via-miel to-terracota" />

    <Link to="/taller" className="block group relative p-5 md:p-7">
      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-miel/40 via-coral/20 to-terracota/15 flex items-center justify-center shadow-card"
        >
          <Sparkles className="w-7 h-7 text-coral" />
        </motion.div>

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

        <motion.div
          whileHover={{ x: 3 }}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 md:px-7 md:py-3.5 rounded-xl text-sm md:text-base font-bold shadow-cta group-hover:shadow-glow transition-shadow whitespace-nowrap"
        >
          Quiero mi lugar
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </motion.div>
      </div>
    </Link>
  </div>
);

export default HomeOffersCarousel;
