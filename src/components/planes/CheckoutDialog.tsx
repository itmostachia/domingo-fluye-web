import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseReal";
import { Loader2, Lock, Zap, Shield } from "lucide-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";

type PaymentMethod = "mp" | "paypal";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  method: PaymentMethod | null;
}

const PAYPAL_CLIENT_ID = "Aeqs0puS0M6b2Y3PUDMZ5O9Zacdn1vaxhKkJwVjgLA48uiX-1GyASC2ty1ieJEhK_npsACSzq_gfqluC";
const PAYPAL_PLAN_ID = "P-2BM83687D51615206NGO6R2A";
const N8N_WEBHOOK_URL = "https://n8n.srv945661.hstgr.cloud/webhook/crear-suscripcion";

const CheckoutDialog = ({ open, onOpenChange, method }: CheckoutDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [leadSaved, setLeadSaved] = useState(false);

  const resetState = () => {
    setName("");
    setEmail("");
    setLoading(false);
    setError("");
    setLeadSaved(false);
  };

  const handleOpenChange = (val: boolean) => {
    if (!val) resetState();
    onOpenChange(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Completá todos los campos.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Ingresá un email válido.");
      return;
    }

    setLoading(true);
    setError("");

    const trimmedEmail = email.trim();
    const trimmedName = name.trim();

    // 1. Upsert en profiles como lead (Solo Suscripción al Club)
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert([{ email: trimmedEmail, status: "lead" }], { onConflict: "email" });

    if (profileError) {
      console.error("Profile upsert error:", profileError);
      // Error registrado pero NO bloqueamos el flujo de pago
    }

    // 2. Flujo de Mercado Pago
    if (method === "mp") {
      try {
        const response = await fetch(N8N_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmedEmail, name: trimmedName }),
        });

        const data = await response.json();

        if (data.success && data.init_point) {
          window.location.href = data.init_point;
        } else {
          toast.error("No pudimos generar tu link de pago. Intentá de nuevo.");
          setLoading(false);
        }
      } catch {
        toast.error("Error de conexión. Intentá de nuevo en unos segundos.");
        setLoading(false);
      }
      return;
    }

    // 3. Flujo de PayPal
    setLeadSaved(true);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {leadSaved && method === "paypal" ? "Completá tu suscripción" : "Un paso más antes de suscribirte"}
          </DialogTitle>
          <DialogDescription>
            {leadSaved && method === "paypal"
              ? "Hacé clic en el botón de PayPal para finalizar."
              : "Ingresá tus datos para continuar con el pago."}
          </DialogDescription>
        </DialogHeader>

        {!leadSaved ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div>
              <label htmlFor="checkout-name" className="text-sm font-medium text-foreground mb-1.5 block">
                Nombre
              </label>
              <Input
                id="checkout-name"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                maxLength={100}
              />
            </div>
            <div>
              <label htmlFor="checkout-email" className="text-sm font-medium text-foreground mb-1.5 block">
                Email
              </label>
              <Input
                id="checkout-email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                maxLength={255}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full active:scale-95 transition-all duration-200" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Continuar al pago"
              )}
            </Button>
            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3 border-t border-border/40">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lock size={13} className="text-green-600" />
                Pago 100% seguro
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Zap size={13} className="text-primary" />
                Acceso inmediato
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Shield size={13} className="text-primary" />
                Garantía total
              </span>
            </div>
          </form>
        ) : method === "paypal" ? (
          <div className="mt-4">
            <PayPalScriptProvider
              options={{
                clientId: PAYPAL_CLIENT_ID,
                vault: true,
                intent: "subscription",
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical", label: "subscribe", shape: "pill" }}
                createSubscription={(_data, actions) => {
                  return actions.subscription.create({
                    plan_id: PAYPAL_PLAN_ID,
                  });
                }}
                onApprove={async () => {
                  window.location.href = "/gracias";
                }}
              />
            </PayPalScriptProvider>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
