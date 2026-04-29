import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

// Pool de social proof — patrones realistas de reservas (nombres + ciudades AR comunes)
const reservas = [
  { nombre: "Carolina", ciudad: "Mendoza", hace: "hace 4 minutos" },
  { nombre: "Lucía", ciudad: "Buenos Aires", hace: "hace 11 minutos" },
  { nombre: "Sofía", ciudad: "Córdoba", hace: "hace 18 minutos" },
  { nombre: "Camila", ciudad: "Rosario", hace: "hace 27 minutos" },
  { nombre: "Ana", ciudad: "La Plata", hace: "hace 42 minutos" },
  { nombre: "Paula", ciudad: "Tucumán", hace: "hace 1 hora" },
  { nombre: "Florencia", ciudad: "Salta", hace: "hace 1 hora" },
  { nombre: "Marina", ciudad: "Mar del Plata", hace: "hace 2 horas" },
  { nombre: "Valentina", ciudad: "San Juan", hace: "hace 2 horas" },
  { nombre: "Julia", ciudad: "Neuquén", hace: "hace 3 horas" },
  { nombre: "Belén", ciudad: "Bariloche", hace: "hace 4 horas" },
  { nombre: "Agustina", ciudad: "Santa Fe", hace: "hace 5 horas" },
];

interface SocialProofToastProps {
  /** Delay inicial antes del primer toast (ms). Default 12s */
  initialDelay?: number;
  /** Intervalo entre toasts (ms). Default 22s */
  interval?: number;
  /** Cuánto dura visible cada toast (ms). Default 5s */
  showDuration?: number;
}

const SocialProofToast = ({
  initialDelay = 12_000,
  interval = 22_000,
  showDuration = 5_500,
}: SocialProofToastProps) => {
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
            className="bg-card border border-miel/40 rounded-2xl shadow-warm-lg px-3.5 py-3 max-w-[280px] sm:max-w-xs flex items-center gap-3 pointer-events-auto"
          >
            {/* Icon en circle warm */}
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-miel/30 via-coral/15 to-terracota/15 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-coral" />
            </div>

            <div className="min-w-0">
              <p className="text-[13px] text-foreground leading-snug">
                <strong className="text-foreground">{current.nombre} de {current.ciudad}</strong>
                <span className="text-muted-foreground"> reservó su lugar</span>
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{current.hace}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialProofToast;
