import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const reservas = [
  { nombre: "Carolina", ciudad: "Mendoza", promo: "Recetarios + Club", hace: "hace 6 minutos" },
  { nombre: "Lucía", ciudad: "Buenos Aires", promo: "Recetarios + Club", hace: "hace 14 minutos" },
  { nombre: "Sofía", ciudad: "Córdoba", promo: "Recetarios + Club", hace: "hace 21 minutos" },
  { nombre: "Camila", ciudad: "Rosario", promo: "Recetarios + Club", hace: "hace 38 minutos" },
  { nombre: "Ana", ciudad: "La Plata", promo: "Recetarios + Club", hace: "hace 52 minutos" },
  { nombre: "Paula", ciudad: "Tucumán", promo: "Recetarios + Club", hace: "hace 1 hora" },
  { nombre: "Florencia", ciudad: "Salta", promo: "Recetarios + Club", hace: "hace 2 horas" },
  { nombre: "Marina", ciudad: "Mar del Plata", promo: "Recetarios + Club", hace: "hace 2 horas" },
  { nombre: "Valentina", ciudad: "San Juan", promo: "Recetarios + Club", hace: "hace 3 horas" },
  { nombre: "Julia", ciudad: "Neuquén", promo: "Recetarios + Club", hace: "hace 4 horas" },
  { nombre: "Belén", ciudad: "Bariloche", promo: "Recetarios + Club", hace: "hace 5 horas" },
  { nombre: "Agustina", ciudad: "Santa Fe", promo: "Recetarios + Club", hace: "hace 6 horas" },
];

interface Props {
  initialDelay?: number;
  interval?: number;
  showDuration?: number;
}

const FlorSaleSocialProof = ({
  initialDelay = 14_000,
  interval = 24_000,
  showDuration = 6_000,
}: Props) => {
  const [current, setCurrent] = useState<(typeof reservas)[number] | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    let hideTimer: ReturnType<typeof setTimeout>;
    let cycleTimer: ReturnType<typeof setTimeout>;

    const showNext = () => {
      if (!mounted) return;
      setCurrent(reservas[index % reservas.length]);
      setIndex((i) => (i + 1) % reservas.length);
      hideTimer = setTimeout(() => {
        if (mounted) setCurrent(null);
      }, showDuration);
    };

    const startCycle = () => {
      showNext();
      cycleTimer = setTimeout(startCycle, interval);
    };

    const initial = setTimeout(startCycle, initialDelay);

    return () => {
      mounted = false;
      clearTimeout(initial);
      clearTimeout(hideTimer);
      clearTimeout(cycleTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 sm:left-6 z-40 pointer-events-none">
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95, transition: { duration: 0.25 } }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-card border border-coral/30 rounded-2xl shadow-warm-lg px-3.5 py-3 max-w-[300px] sm:max-w-xs flex items-center gap-3 pointer-events-auto"
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-coral/30 via-miel/15 to-terracota/15 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-coral" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] text-foreground leading-snug">
                <strong className="text-foreground">{current.nombre} de {current.ciudad}</strong>
                <span className="text-muted-foreground"> compró el combo</span>
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{current.hace}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlorSaleSocialProof;
