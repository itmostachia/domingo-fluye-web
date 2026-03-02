import { Clock, Users, Snowflake } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Receta } from "./recetasData";

interface FreeRecipeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receta: Receta | null;
  isMemberView?: boolean;
}

const FreeRecipeDialog = ({ open, onOpenChange, receta, isMemberView }: FreeRecipeDialogProps) => {
  const navigate = useNavigate();

  if (!receta) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0">
        {/* Hero image */}
        <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-t-lg flex-shrink-0">
          <img
            src={receta.image}
            alt={receta.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="p-6 pt-4 space-y-5">
          <DialogHeader className="sm:text-left">
            <DialogTitle className="font-display text-2xl leading-tight">
              {receta.title}
            </DialogTitle>
          </DialogHeader>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {receta.time}
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={14} /> {receta.servings} porciones
            </span>
            {receta.freezable && (
              <span className="flex items-center gap-1.5 text-secondary">
                <Snowflake size={14} /> Freezable
              </span>
            )}
          </div>

          {/* Ingredients */}
          {receta.ingredients && (
            <div>
              <h3 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wide">
                Ingredientes
              </h3>
              <ul className="space-y-1.5">
                {receta.ingredients.map((ing, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Steps */}
          {receta.steps && (
            <div>
              <h3 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wide">
                Paso a paso
              </h3>
              <ol className="space-y-3">
                {receta.steps.map((step, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* CRO Upsell Banner - hidden for members */}
          {!(isMemberView ?? false) && (
            <div className="bg-muted/50 border border-border rounded-xl p-4 text-center space-y-2 mt-4">
              <p className="text-sm text-foreground font-medium">
                ¿Te gustó esta receta? 🌸
              </p>
              <p className="text-xs text-muted-foreground">
                En el Club recibís <strong className="text-foreground">40 recetas como esta cada mes</strong>, listas para el freezer.
              </p>
              <Button
                size="sm"
                className="mt-1"
                onClick={() => {
                  onOpenChange(false);
                  navigate("/planes");
                }}
              >
                Ver Planes
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FreeRecipeDialog;
