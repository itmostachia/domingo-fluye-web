import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTimeUntilSaleEnd } from "@/lib/florSaleConfig";

interface Props {
  variant?: "card" | "inline" | "compact";
  className?: string;
}

const FlorSaleCountdown = ({ variant = "card", className = "" }: Props) => {
  const [time, setTime] = useState(() => getTimeUntilSaleEnd());

  useEffect(() => {
    const tick = () => setTime(getTimeUntilSaleEnd());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (time.hasEnded) {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-sm font-bold text-coral uppercase tracking-wider">
          ¡La sale terminó!
        </p>
      </div>
    );
  }

  const items = [
    { label: "días", value: time.days },
    { label: "hs", value: time.hours },
    { label: "min", value: time.minutes },
    { label: "seg", value: time.seconds },
  ];

  if (variant === "inline") {
    return (
      <span className={`inline-flex items-baseline gap-1 tabular-nums font-bold ${className}`}>
        <span>{time.days}</span>
        <span className="opacity-60 text-[0.85em]">d</span>
        <span className="ml-0.5">{String(time.hours).padStart(2, "0")}</span>
        <span className="opacity-60 text-[0.85em]">h</span>
        <span className="ml-0.5">{String(time.minutes).padStart(2, "0")}</span>
        <span className="opacity-60 text-[0.85em]">m</span>
        <span className="ml-0.5">{String(time.seconds).padStart(2, "0")}</span>
        <span className="opacity-60 text-[0.85em]">s</span>
      </span>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        {items.map((item, i) => (
          <div key={item.label} className="flex items-center gap-1">
            <motion.span
              animate={item.label === "seg" ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
              className="font-display text-base text-coral tabular-nums leading-none font-bold"
            >
              {String(item.value).padStart(2, "0")}
            </motion.span>
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold">
              {item.label}
            </span>
            {i < items.length - 1 && <span className="text-coral/40 mx-0.5">:</span>}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-4 gap-2 ${className}`}>
      {items.map((item) => (
        <motion.div
          key={item.label}
          animate={item.label === "seg" ? { scale: [1, 1.03, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
          className="bg-card rounded-xl p-3 text-center border-2 border-coral/30 shadow-card"
        >
          <div className="font-display text-2xl md:text-3xl text-coral tabular-nums leading-none">
            {String(item.value).padStart(2, "0")}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1 font-bold">
            {item.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FlorSaleCountdown;
