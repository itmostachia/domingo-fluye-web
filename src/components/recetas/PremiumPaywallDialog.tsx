import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PremiumPaywallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recetaTitle: string;
}

const PremiumPaywallDialog = ({ open, onOpenChange, recetaTitle }: PremiumPaywallDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader className="sm:text-center">
          <DialogTitle className="font-display text-2xl">Esta receta es exclusiva del Club ✨</DialogTitle>
          <DialogDescription className="text-base mt-2 text-muted-foreground">
            El paso a paso de <span className="font-semibold text-foreground">{recetaTitle}</span>, sus variaciones y cómo freezarla son exclusivos para miembros de Cocina en Flor.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button
            size="lg"
            className="w-full font-semibold text-base"
            onClick={() => navigate("/planes")}
          >
            Quiero unirme
          </Button>
          <Button
            variant="ghost"
            className="text-muted-foreground"
            onClick={() => navigate("/login")}
          >
            Ya soy miembro · Ingresar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumPaywallDialog;
