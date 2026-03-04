import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseReal";
import { Loader2 } from "lucide-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

type PaymentMethod = "mp" | "paypal";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  method: PaymentMethod | null;
}

const PAYPAL_CLIENT_ID = "Aeqs0puS0M6b2Y3PUDMZ5O9Zacdn1vaxhKkJwVjgLA48uiX-1GyASC2ty1ieJEhK_npsACSzq_gfqluC";
const PAYPAL_PLAN_ID = "P-2BM83687D51615206NGO6R2A";
const MP_URL = "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=7c3bf9efeb3640049ee127b2a006353a";

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

    const { error: dbError } = await supabase.from("email_leads").insert({
      name: name.trim(),
      email: email.trim(),
      source: "checkout",
    });

    if (dbError) {
      setError("Hubo un error, intentá de nuevo.");
      setLoading(false);
      return;
    }

    setLeadSaved(true);
    setLoading(false);

    if (method === "mp") {
      window.location.href = MP_URL;
    }
    // If paypal, stay open to show PayPal button
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Continuar al pago"
              )}
            </Button>
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
