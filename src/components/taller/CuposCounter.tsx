import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Flame } from "lucide-react";
import { getCuposDisponibles } from "@/lib/workshopConfig";

interface CuposCounterProps {
  variant?: "default" | "inline" | "prominent";
  className?: string;
}

const CuposCounter = ({ variant = "default", className = "" }: CuposCounterProps) => {
  const [cupos, setCupos] = useState(() => getCuposDisponibles());

  useEffect(() => {
    const id = setInterval(() => setCupos(getCuposDisponibles()), 60_000);
    return () => clearInterval(id);
  }, []);

  const isLow = cupos <= 10;

  if (variant === "inline") {
    return (
      <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${isLow ? "text-primary" : "text-foreground"} ${className}`}>
        <Users size={14} />
        Quedan {cupos} lugares
      </span>
    );
  }

  if (variant === "prominent") {
    return (
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className={`inline-flex items-center gap-2.5 bg-gradient-to-br from-coral/10 via-miel/15 to-coral/8 border border-coral/30 px-3.5 py-2 rounded-xl shadow-sm ${className}`}
      >
        <motion.div
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Flame size={18} className="text-coral" />
        </motion.div>
        <div className="leading-tight">
          <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-coral">
            Cupos restantes
          </p>
          <p className="font-display text-lg text-foreground tabular-nums leading-tight">
            <span className="text-coral">{cupos}</span> lugares
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      animate={isLow ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 font-semibold text-sm ${
        isLow
          ? "bg-primary/10 border-primary/40 text-primary"
          : "bg-miel/15 border-miel/40 text-deep-brown"
      } ${className}`}
    >
      {isLow ? <Flame size={16} className="animate-pulse" /> : <Users size={16} />}
      Quedan <span className="tabular-nums font-bold">{cupos}</span> lugares
    </motion.div>
  );
};

export default CuposCounter;
