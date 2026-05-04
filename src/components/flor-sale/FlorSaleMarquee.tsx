import { motion } from "framer-motion";
import { Flame } from "lucide-react";

const ITEMS = [
  "🔥 HOT SALE MAYO",
  "-47% OFF",
  "PAGO ÚNICO · SIN RENOVACIÓN",
  "ACCESO INMEDIATO",
  "GARANTÍA 7 DÍAS",
  "HASTA EL 31 DE MAYO",
];

const FlorSaleMarquee = () => {
  // Duplicamos para loop perfecto
  const loop = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-coral via-terracota to-coral text-white py-2 select-none">
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-coral to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-coral to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((text, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em]"
          >
            <Flame size={12} className="fill-white/40" />
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default FlorSaleMarquee;
