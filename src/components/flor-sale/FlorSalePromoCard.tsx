import { motion } from "framer-motion";
import { Check, ArrowRight, Lock, Gift, Flame, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import {
  type PromoConfig,
  isPromoLaunched,
  priceLabel,
  savingsLabel,
  savingsPercent,
  getTimeUntilPromoLaunch,
} from "@/lib/florSaleConfig";

interface Props {
  promo: PromoConfig;
  onReserve: (promo: PromoConfig) => void;
  /** Si true, muestra como card destacada (más sombra, badge especial) */
  featured?: boolean;
  index: number;
}

const FlorSalePromoCard = ({ promo, onReserve, featured, index }: Props) => {
  const [launched, setLaunched] = useState(() => isPromoLaunched(promo));
  const [launchTime, setLaunchTime] = useState(() => getTimeUntilPromoLaunch(promo));

  useEffect(() => {
    const tick = () => {
      setLaunched(isPromoLaunched(promo));
      setLaunchTime(getTimeUntilPromoLaunch(promo));
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [promo]);

  const accentClasses = {
    coral: {
      border: "border-coral/40",
      borderHover: "hover:border-coral/60",
      bg: "from-coral/8 via-miel/8 to-coral/4",
      stripe: "from-coral via-miel to-terracota",
      badge: "from-coral to-vino",
      btn: "bg-coral hover:bg-coral/90",
      pill: "bg-coral/10 text-coral",
    },
    miel: {
      border: "border-miel/50",
      borderHover: "hover:border-miel/70",
      bg: "from-miel/15 via-coral/5 to-miel/8",
      stripe: "from-miel via-terracota to-coral",
      badge: "from-miel to-terracota",
      btn: "bg-terracota hover:bg-terracota/90 text-white",
      pill: "bg-miel/20 text-deep-brown",
    },
    terracota: {
      border: "border-terracota/40",
      borderHover: "hover:border-terracota/60",
      bg: "from-terracota/10 via-coral/5 to-terracota/5",
      stripe: "from-terracota via-coral to-miel",
      badge: "from-terracota to-vino",
      btn: "bg-terracota hover:bg-terracota/90 text-white",
      pill: "bg-terracota/15 text-terracota",
    },
  }[promo.accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      whileHover={!launched ? {} : { y: -6 }}
      className={`relative bg-card rounded-3xl shadow-warm-lg border-2 ${accentClasses.border} ${accentClasses.borderHover} overflow-hidden transition-all duration-300 ${!launched ? "opacity-90" : ""}`}
    >
      {/* Línea superior gradient warm */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${accentClasses.stripe}`} />

      {/* Decorativo blob warm */}
      <div className={`absolute -top-32 -right-32 w-56 h-56 rounded-full bg-gradient-to-br ${accentClasses.bg} blur-3xl pointer-events-none`} />

      {/* HOT SALE sticker */}
      <motion.div
        initial={{ rotate: -8, scale: 0 }}
        animate={{ rotate: -8, scale: 1 }}
        transition={{ delay: 0.4 + index * 0.12, duration: 0.5, type: "spring" }}
        className={`absolute top-5 right-5 z-10 bg-gradient-to-br ${accentClasses.badge} text-white px-3 py-1.5 rounded-xl shadow-cta`}
      >
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold leading-none">🔥 Hot Sale</p>
        <p className="text-xs font-display leading-none mt-0.5">-{savingsPercent(promo)}%</p>
      </motion.div>

      <div className="relative p-7 md:p-8 flex flex-col h-full">
        {/* Featured badge top */}
        {featured && launched && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-coral to-terracota text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap shadow-lg">
            ⭐ Más elegida
          </span>
        )}

        {/* Title */}
        <div className="mb-4 mt-1">
          <span className={`inline-block text-[10px] font-bold uppercase tracking-[0.22em] ${accentClasses.pill} px-3 py-1 rounded-full mb-3`}>
            Promo {promo.shortName}
          </span>
          <h3 className="font-display text-2xl md:text-[1.7rem] text-foreground leading-tight mb-2">
            {promo.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{promo.pitch}</p>
        </div>

        {/* Items list */}
        <div className="border-y border-border/40 py-4 my-4 space-y-2.5">
          {promo.items.map((item) => (
            <div key={item.name} className="flex items-start gap-2.5 text-sm">
              <span className={`flex-shrink-0 w-5 h-5 rounded-full ${accentClasses.pill} flex items-center justify-center mt-0.5`}>
                <Check size={12} />
              </span>
              <div className="flex-1 flex items-baseline justify-between gap-2 flex-wrap">
                <span className={`leading-snug ${item.highlight ? "font-semibold text-foreground" : "text-foreground/80"}`}>
                  {item.name}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
                  {priceLabel(item.value)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Price block */}
        <div className="mb-5">
          <div className="flex items-baseline gap-3 flex-wrap mb-2">
            <span className="font-display text-5xl md:text-[3.5rem] text-foreground tabular-nums leading-none">
              {priceLabel(promo.price)}
            </span>
            <span className="text-base text-muted-foreground line-through tabular-nums">
              {priceLabel(promo.priceSeparate)}
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-coral/10 text-coral text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
            <Flame size={12} />
            Ahorrás {savingsLabel(promo)}
          </div>
        </div>

        {/* CTA */}
        {launched ? (
          <button
            onClick={() => onReserve(promo)}
            className={`group relative w-full ${accentClasses.btn} text-white py-4 sm:py-5 rounded-xl font-bold text-base shadow-cta hover:shadow-glow active:scale-[0.98] transition-all duration-300 mt-auto`}
          >
            <span className="relative z-10 inline-flex items-center justify-center gap-2">
              Quiero esta promo
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        ) : (
          <div className="mt-auto space-y-2">
            <button
              disabled
              className="w-full bg-muted text-muted-foreground py-4 sm:py-5 rounded-xl font-bold text-base cursor-not-allowed"
            >
              <span className="inline-flex items-center justify-center gap-2">
                <Clock size={16} />
                Disponible en {launchTime.days}d {String(launchTime.hours).padStart(2, "0")}h
              </span>
            </button>
            <p className="text-[11px] text-center text-muted-foreground">
              Lanzamiento: 8 de mayo · post-taller en vivo
            </p>
          </div>
        )}

        {/* Disclaimers */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
          {promo.disclaimers.map((d, i) => (
            <span key={i} className="inline-flex items-center gap-1">
              {i === 0 && <Lock size={11} className="text-green-600" />}
              {i === 1 && <Gift size={11} className="text-coral" />}
              {i === 2 && <Check size={11} className="text-coral" />}
              {d}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FlorSalePromoCard;
