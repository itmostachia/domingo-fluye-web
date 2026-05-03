import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseReal";
import { Loader2, Lock, Zap, Shield, Phone, Mail, User, Check } from "lucide-react";
import { toast } from "sonner";
import { getUTMData } from "@/lib/utm";
import { trackInitiateCheckout, trackLead } from "@/lib/metaPixel";
import { motion } from "framer-motion";
import type { PromoConfig } from "@/lib/florSaleConfig";
import { priceLabel } from "@/lib/florSaleConfig";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promo: PromoConfig | null;
}

function normalizePhone(input: string): string {
  return input.replace(/[\s\-()]/g, "");
}

function isValidPhone(phone: string): boolean {
  // Phone es opcional. Si vacío → válido. Si tiene algo, mínimo 10 dígitos.
  if (!phone) return true;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

const FlorSaleCheckoutDialog = ({ open, onOpenChange, promo }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && promo) trackInitiateCheckout(promo.price, "ARS");
  }, [open, promo]);

  const resetState = () => {
    setName("");
    setEmail("");
    setPhone("");
    setLoading(false);
    setError("");
  };

  const handleOpenChange = (val: boolean) => {
    if (!val) resetState();
    onOpenChange(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promo) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const normalizedPhone = normalizePhone(phone);

    if (!trimmedName || !trimmedEmail) {
      setError("Completá nombre y email para reservar.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Ingresá un email válido.");
      return;
    }
    if (!isValidPhone(normalizedPhone)) {
      setError("Si ponés WhatsApp, incluí el código de país (ej: +54 9 11 1234 5678).");
      return;
    }

    setLoading(true);
    setError("");

    const utmData = getUTMData();

    // 1. UPSERT en Supabase promo_orders (key: email + promo_id)
    try {
      const { error: insertError } = await supabase
        .from("promo_orders")
        .upsert(
          [
            {
              email: trimmedEmail,
              name: trimmedName,
              phone: normalizedPhone || null,
              promo_id: promo.id,
              status: "pending_payment",
              amount: promo.price,
              user_agent:
                typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
              ...utmData,
            },
          ],
          { onConflict: "email,promo_id" },
        );

      if (insertError) {
        // No bloqueamos el pago — seguimos a MP igual
        console.error("promo_orders upsert error:", insertError);
      }
    } catch (e) {
      console.error("promo_orders upsert exception:", e);
    }

    // 2. Pixel Lead
    trackLead(`Flor Sale ${promo.shortName}`);

    // 3. Flag para que /gracias detecte que es Flor Sale (no Club ni Taller)
    try {
      localStorage.setItem("cef_post_payment", "flor_sale");
      localStorage.setItem("cef_flor_sale_promo", promo.id);
      localStorage.setItem("cef_flor_sale_email", trimmedEmail);
    } catch {
      /* incognito */
    }

    // 4. UX delay para que se sienta sólido
    await new Promise((r) => setTimeout(r, 350));

    // 5. Redirect a Mercado Pago
    window.location.href = promo.mpLink;
  };

  if (!promo) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-2xl bg-coral/10 flex items-center justify-center mb-2">
            <Check className="w-6 h-6 text-coral" />
          </div>
          <DialogTitle className="font-display text-2xl text-center">
            Sumate al Flor Sale
          </DialogTitle>
          <DialogDescription className="text-center">
            {promo.title} · {priceLabel(promo.price)} ARS
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3.5 mt-2">
          <div>
            <label htmlFor="fs-name" className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
              <User size={13} className="text-muted-foreground" /> Tu nombre
            </label>
            <Input
              id="fs-name"
              placeholder="Florencia"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              maxLength={100}
              autoComplete="name"
              required
            />
          </div>

          <div>
            <label htmlFor="fs-email" className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
              <Mail size={13} className="text-muted-foreground" /> Email
              <span className="text-xs font-normal text-coral">(te llega todo acá)</span>
            </label>
            <Input
              id="fs-email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              maxLength={255}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="fs-phone" className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
              <Phone size={13} className="text-muted-foreground" /> WhatsApp
              <span className="text-xs font-normal text-muted-foreground">(opcional)</span>
            </label>
            <Input
              id="fs-phone"
              type="tel"
              placeholder="+54 9 11 1234 5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
              maxLength={20}
              autoComplete="tel"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive bg-destructive/5 px-3 py-2 rounded-lg"
            >
              {error}
            </motion.p>
          )}

          <Button
            type="submit"
            className="w-full py-6 text-base font-semibold rounded-xl shadow-cta hover:shadow-glow active:scale-95 transition-all duration-200 bg-coral hover:bg-coral/90 text-white"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Llevándote al pago...
              </>
            ) : (
              <>Quiero la promo — {priceLabel(promo.price)}</>
            )}
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 border-t border-border/40">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Lock size={11} className="text-green-600" /> Pago 100% seguro
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Zap size={11} className="text-coral" /> Acceso inmediato
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Shield size={11} className="text-coral" /> Garantía 7 días
            </span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FlorSaleCheckoutDialog;
