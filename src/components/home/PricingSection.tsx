import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxBlob from "@/components/ParallaxBlob";
import { Button } from "@/components/ui/button";
import CheckoutDialog from "@/components/planes/CheckoutDialog";

type PaymentMethod = "mp" | "paypal";

const features = [
  "Manual mensual completo",
  "40 recetas + listas de compras",
  "Sistema freezer paso a paso",
  "Calendario semanal",
  "Grupo privado de la comunidad",
  "Cancelás cuando quieras",
];

const PricingSection = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);

  const openCheckout = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setDialogOpen(true);
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-soft-peach/80 via-accent/35 to-soft-peach/60 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      <ParallaxBlob className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-coral/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" speed={-0.1} />
      <ParallaxBlob className="absolute bottom-0 right-0 w-64 h-64 bg-miel/12 rounded-full blur-[80px] pointer-events-none" speed={0.2} />

      <div className="container-tight text-center relative">
        <ScrollReveal>
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
            Planes
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Unirte al Club es simple.
          </h2>
          <p className="text-muted-foreground text-lg mb-14">
            Elegí tu plan y empezá este domingo.
          </p>
        </ScrollReveal>

        <div className="max-w-md mx-auto mt-8">
          <ScrollReveal delay={0.1}>
            <motion.div
              className="relative bg-card rounded-2xl p-8 md:p-10 border-2 border-primary/20 shadow-card flex flex-col"
              whileHover={{ y: -4, boxShadow: "var(--shadow-warm-lg)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-terracota rounded-t-2xl" />

              <motion.div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-terracota text-primary-foreground px-5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg whitespace-nowrap"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles size={12} /> Acceso completo
              </motion.div>

              <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 mt-2">Mensual</div>
              <div className="font-display text-5xl text-foreground mb-1">$7.999</div>
              <div className="text-sm text-muted-foreground mb-8">ARS / mes</div>

              <ul className="space-y-3 text-left mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-foreground/75">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-primary" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                <Button
                  className="w-full py-6 text-sm sm:text-base font-semibold rounded-xl shadow-cta hover:shadow-glow transition-all duration-300"
                  onClick={() => openCheckout("mp")}
                >
                  Suscribirme con Mercado Pago (ARS)
                </Button>
                <Button
                  variant="outline"
                  className="w-full py-6 text-sm sm:text-base font-semibold rounded-xl border-primary/30 hover:bg-primary/5 transition-all duration-300"
                  onClick={() => openCheckout("paypal")}
                >
                  Suscribirme con PayPal (USD)
                </Button>
              </div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-5 mt-10 text-sm text-muted-foreground">
              {["Sin permanencia", "Cancelás cuando quieras", "Acceso inmediato"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                  {t}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <CheckoutDialog open={dialogOpen} onOpenChange={setDialogOpen} method={paymentMethod} />
    </section>
  );
};

export default PricingSection;
