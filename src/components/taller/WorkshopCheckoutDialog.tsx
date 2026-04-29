import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseReal";
import { Loader2, Lock, Zap, Shield, Phone, Mail, User, Check } from "lucide-react";
import { toast } from "sonner";
import { getUTMData } from "@/lib/utm";
import { trackInitiateCheckout, trackLead } from "@/lib/metaPixel";
import { WORKSHOP } from "@/lib/workshopConfig";
import { motion } from "framer-motion";

interface WorkshopCheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Normaliza telefono argentino: quita espacios, guiones, parentesis
// Devuelve digitos (con + opcional al inicio)
function normalizePhone(input: string): string {
  return input.replace(/[\s\-()]/g, "");
}

// Valida que tenga al menos 10 digitos (formato AR minimo)
function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

const WorkshopCheckoutDialog = ({ open, onOpenChange }: WorkshopCheckoutDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) trackInitiateCheckout(WORKSHOP.price, WORKSHOP.currency);
  }, [open]);

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
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const normalizedPhone = normalizePhone(phone);

    if (!trimmedName || !trimmedEmail || !normalizedPhone) {
      setError("Completá todos los campos para reservar tu lugar.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Ingresá un email válido.");
      return;
    }
    if (!isValidPhone(normalizedPhone)) {
      setError("Ingresá tu WhatsApp con código de país (ej: +54 9 11 1234 5678).");
      return;
    }

    setLoading(true);
    setError("");

    const utmData = getUTMData();

    // 1. INSERT en Supabase workshop_leads (UPSERT por email+workshop)
    try {
      const { error: insertError } = await supabase
        .from("workshop_leads")
        .upsert(
          [
            {
              email: trimmedEmail,
              name: trimmedName,
              phone: normalizedPhone,
              workshop: WORKSHOP.id,
              status: "pending_payment",
              amount: WORKSHOP.price,
              user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
              ...utmData,
            },
          ],
          { onConflict: "email,workshop" },
        );

      if (insertError) {
        // Log pero no bloqueamos — el cliente prefiere que pueda pagar
        console.error("workshop_leads upsert error:", insertError);
      }
    } catch (e) {
      console.error("workshop_leads upsert exception:", e);
    }

    // 2. Eventos Meta Pixel
    trackLead(`Taller ${WORKSHOP.dateLabelShort}`);

    // 3. Flag para que /gracias detecte que es taller (no Club)
    try {
      localStorage.setItem("cef_post_payment", "taller");
      localStorage.setItem("cef_taller_email", trimmedEmail);
    } catch {
      /* incognito */
    }

    // 4. Pequeña UX delay para que se sienta solido
    await new Promise((r) => setTimeout(r, 350));

    // 5. Redirect a Mercado Pago
    window.location.href = WORKSHOP.mpLink;
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
            <Check className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="font-display text-2xl text-center">Reservá tu lugar</DialogTitle>
          <DialogDescription className="text-center">
            {WORKSHOP.dateLabel} · {WORKSHOP.priceLabel} ARS · queda grabado
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3.5 mt-2">
          <div>
            <label htmlFor="ws-name" className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
              <User size={13} className="text-muted-foreground" /> Tu nombre
            </label>
            <Input
              id="ws-name"
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
            <label htmlFor="ws-email" className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
              <Mail size={13} className="text-muted-foreground" /> Email
            </label>
            <Input
              id="ws-email"
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
            <label htmlFor="ws-phone" className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5">
              <Phone size={13} className="text-muted-foreground" /> WhatsApp
              <span className="text-xs font-normal text-primary">(te mandamos el link del Meet por acá)</span>
            </label>
            <Input
              id="ws-phone"
              type="tel"
              placeholder="+54 9 11 1234 5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
              maxLength={20}
              autoComplete="tel"
              required
            />
            <p className="text-[11px] text-muted-foreground mt-1">
              Importante: este número lo usamos solo para enviarte el link del Meet.
            </p>
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
            className="w-full py-6 text-base font-semibold rounded-xl shadow-cta hover:shadow-glow active:scale-95 transition-all duration-200"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Reservando lugar...
              </>
            ) : (
              <>Quiero mi lugar — pagar {WORKSHOP.priceLabel}</>
            )}
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 border-t border-border/40">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Lock size={11} className="text-green-600" /> Pago 100% seguro
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Zap size={11} className="text-primary" /> Queda grabado
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Shield size={11} className="text-primary" /> + Mes Club gratis
            </span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WorkshopCheckoutDialog;
