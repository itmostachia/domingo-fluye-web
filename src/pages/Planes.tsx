import { useState } from "react";
import { Check, Sparkles, Shield, Clock, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import CheckoutDialog from "@/components/planes/CheckoutDialog";

const features = [
  "Manual mensual completo",
  "40 recetas + listas de compras",
  "Sistema freezer paso a paso",
  "Calendario semanal",
  "Grupo privado de la comunidad",
  "Email recordatorio semanal",
];

const guarantees = [
  { icon: Shield, text: "Sin permanencia", desc: "Cancelás cuando quieras, sin preguntas." },
  { icon: Clock, text: "Acceso inmediato", desc: "Empezás a usar el sistema hoy mismo." },
  { icon: Heart, text: "Satisfacción garantizada", desc: "Si no te sirve, te devolvemos el dinero." },
];

type PaymentMethod = "mp" | "paypal";

const Planes = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);

  const openCheckout = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setDialogOpen(true);
  };

  return (
    <Layout>
      <SEOHead
        title="Planes — Cocina en Flor"
        description="Suscribite para organizar tu cocina semanal. $7.999 ARS/mes. Sin permanencia, cancelás cuando quieras."
        path="/planes"
      />

      {/* Hero + Pricing unified */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-soft-peach via-background to-background pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-coral/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

        <div className="container-tight text-center relative">
          <ScrollReveal>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
              Planes
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 leading-tight">
              Unirte al Club es simple.
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Elegí tu plan y empezá este domingo.
            </p>
          </ScrollReveal>

          <div className="max-w-md mx-auto mt-14">
            <ScrollReveal delay={0.1}>
              <motion.div
                className="relative bg-card rounded-2xl p-8 md:p-10 border-2 border-primary/30 shadow-card flex flex-col"
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

                <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 mt-2">Mensual</div>
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
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="pb-20 md:pb-28 relative">
        <div className="container-tight">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guarantees.map((g, i) => (
              <ScrollReveal key={g.text} delay={i * 0.1}>
                <div className="text-center bg-card rounded-2xl p-6 shadow-card border border-border">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <g.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-1">{g.text}</h3>
                  <p className="text-sm text-muted-foreground">{g.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CheckoutDialog open={dialogOpen} onOpenChange={setDialogOpen} method={paymentMethod} />
    </Layout>
  );
};

export default Planes;
