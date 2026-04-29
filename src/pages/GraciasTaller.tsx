import { useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { CheckCircle, Calendar, MessageCircle, Gift, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { trackPurchase } from "@/lib/metaPixel";
import { clearUTMData } from "@/lib/utm";
import { WORKSHOP } from "@/lib/workshopConfig";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const GraciasTaller = () => {
  const hasFired = useRef(false);

  useEffect(() => {
    const alreadyFired = sessionStorage.getItem("cef_taller_purchase_fired");
    if (!hasFired.current && !alreadyFired) {
      hasFired.current = true;
      // Pixel: Purchase con valor real del taller (no del Club)
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Purchase", {
          value: WORKSHOP.price,
          currency: WORKSHOP.currency,
          content_name: `Taller ${WORKSHOP.dateLabelShort}`,
          content_type: "workshop",
        });
      } else {
        trackPurchase(WORKSHOP.price, WORKSHOP.currency);
      }
      sessionStorage.setItem("cef_taller_purchase_fired", "1");
      clearUTMData();
      try {
        localStorage.removeItem("cef_post_payment");
      } catch {
        /* incognito */
      }
    }
  }, []);

  return (
    <Layout>
      <SEOHead
        title="¡Tu lugar está reservado! — Taller Cocina en Flor"
        description="Tu reserva para el taller en vivo está confirmada. Te enviamos el link del Meet por WhatsApp."
        path="/gracias-taller"
      />
      <section className="section-padding pt-24 md:pt-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-soft-peach via-background to-background pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-coral/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-tight text-center relative">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-terracota flex items-center justify-center mx-auto mb-8 shadow-cta"
          >
            <CheckCircle className="w-12 h-12 text-primary-foreground" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4"
          >
            ¡Tu lugar está reservado!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          >
            Nos vemos el <strong className="text-foreground">{WORKSHOP.dateLabel}</strong>. Te vamos a mandar el link del Meet por WhatsApp un rato antes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10"
          >
            {[
              {
                icon: Calendar,
                title: "Agendá la fecha",
                desc: WORKSHOP.dateLabel,
              },
              {
                icon: MessageCircle,
                title: "Llega por WhatsApp",
                desc: "Te enviamos el link del Meet antes del taller",
              },
              {
                icon: Gift,
                title: "Tu mes gratis",
                desc: "El acceso al Club está activo durante mayo",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-accent/40 border border-miel/30 rounded-2xl p-6 max-w-2xl mx-auto mb-10"
          >
            <div className="flex items-start gap-3 text-left">
              <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">¿Y si no podés ese día?</p>
                <p className="text-sm text-muted-foreground">
                  No pasa nada. El taller queda grabado y te lo enviamos para que lo veas las veces que quieras, a tu ritmo.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              to="/mi-club"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-semibold shadow-cta hover:bg-vino transition-colors"
            >
              <Gift size={16} /> Acceder al Club gratis
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-card text-foreground px-7 py-3.5 rounded-xl font-medium border border-border hover:bg-muted/50 transition-colors"
            >
              Volver al inicio
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="text-xs text-muted-foreground mt-8"
          >
            Si tenés alguna duda, escribinos a{" "}
            <a href="mailto:hola@cocinaenflor.com.ar" className="text-primary hover:underline">
              hola@cocinaenflor.com.ar
            </a>
          </motion.p>
        </div>
      </section>
    </Layout>
  );
};

export default GraciasTaller;
