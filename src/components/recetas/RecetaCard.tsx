import { motion } from "framer-motion";
import { Clock, Users, Snowflake, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Receta } from "@/components/recetas/recetasData";

interface RecetaCardProps {
  receta: Receta;
  onClick: () => void;
}

const RecetaCard = ({ receta, onClick }: RecetaCardProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="bg-card rounded-2xl shadow-card overflow-hidden h-full flex flex-col w-full text-left group cursor-pointer border border-border hover:border-primary/30 transition-colors"
      whileHover={{ y: -6, boxShadow: "var(--shadow-warm)" }}
      transition={{ duration: 0.2 }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={receta.image}
          alt={receta.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
        {/* Badge overlay */}
        {receta.isPremium ? (
          <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5">
            <Lock size={14} className="text-muted-foreground" />
          </div>
        ) : (
          <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-primary-foreground border-0 text-xs">
            🔓 Gratis
          </Badge>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">
          {receta.tag}
        </span>
        <h2 className="font-display text-base text-foreground mb-3 flex-1 leading-snug">
          {receta.title}
        </h2>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {receta.time}
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} /> {receta.servings}
          </span>
          {receta.freezable && (
            <span className="flex items-center gap-1 text-secondary">
              <Snowflake size={12} /> Freezable
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
};

export default RecetaCard;
