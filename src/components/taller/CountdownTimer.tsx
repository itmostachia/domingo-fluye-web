import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTimeUntilWorkshop } from "@/lib/workshopConfig";

interface CountdownTimerProps {
  variant?: "hero" | "compact" | "card";
  className?: string;
}

const CountdownTimer = ({ variant = "hero", className = "" }: CountdownTimerProps) => {
  const [time, setTime] = useState(() => getTimeUntilWorkshop());

  useEffect(() => {
    const tick = () => setTime(getTimeUntilWorkshop());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (time.hasEnded) {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-sm font-semibold text-primary-foreground/90 uppercase tracking-wider">
          ¡El taller ya está sucediendo!
        </p>
      </div>
    );
  }

  const items = [
    { label: "días", value: time.days },
    { label: "horas", value: time.hours },
    { label: "min", value: time.minutes },
    { label: "seg", value: time.seconds },
  ];

  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-1.5 text-sm font-semibold ${className}`}>
        <span className="opacity-80">Empieza en</span>
        <span className="tabular-nums">
          {time.days}d {String(time.hours).padStart(2, "0")}h {String(time.minutes).padStart(2, "0")}m
        </span>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={`grid grid-cols-4 gap-2 ${className}`}>
        {items.map((item) => (
          <div key={item.label} className="bg-card rounded-xl p-3 text-center border border-border shadow-card">
            <div className="font-display text-2xl md:text-3xl text-primary tabular-nums leading-none">
              {String(item.value).padStart(2, "0")}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    );
  }

  // hero variant — glass dark sobre fondo coral
  return (
    <div className={`grid grid-cols-4 gap-2 sm:gap-3 ${className}`}>
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="glass-dark rounded-xl px-2 py-3 sm:px-4 sm:py-4 text-center"
        >
          <div className="font-display text-2xl sm:text-4xl md:text-5xl text-primary-foreground tabular-nums leading-none drop-shadow-sm">
            {String(item.value).padStart(2, "0")}
          </div>
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-primary-foreground/75 mt-1.5 font-semibold">
            {item.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CountdownTimer;
