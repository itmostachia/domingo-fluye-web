import { useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Mail, Gift, Clock, Sparkles, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { trackPurchase } from "@/lib/metaPixel";
import { clearUTMData } from "@/lib/utm";
import { PROMOS, type PromoConfig } from "@/lib/florSaleConfig";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const GraciasFlorSale = () => {
  const hasFired = useRef(false);
  const [searchParams] = useSearchParams();

  // Resolver qué promo compró: query param o localStorage
  let promoId = searchParams.get("promo") || "";
  try {
    if (!promoId) {
      promoId = localStorage.getItem("cef_flor_sale_promo") || "flor_sale_recetarios";
    }
  } catch {
    /* incognito */
  }

  const promo: PromoConfig =
    PROMOS.find((p) => p.id === promoId) || PROMOS[0];

  useEffect(() => {
    const alreadyFired = sessionStorage.getItem("cef_flor_sale_purchase_fired");
    if (!hasFired.current && !alreadyFired) {
      hasFired.current = true;
      // Pixel: Purchase con valor real
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Purchase", {
          value: promo.price,
          currency: "ARS",
          content_name: `Flor Sale ${promo.shortName}`,
          content_type: promo.id,
        });
      } else {
        trackPurchase(promo.price, "ARS");
      }
      sessionStorage.setItem("cef_flor_sale_purchase_fired", "1");
      clearUTMData();
      try {
        localStorage.removeItem("cef_post_payment");
        localStorage.removeItem("cef_flor_sale_promo");
      } catch {
        /* incognito */
      }
    }
  }, [promo]);

  return (
    <Layout>
      <SEOHead
        title="¡Gracias por sumarte al Flor Sale! — Cocina en Flor"
        description="Tu compra está confirmada. Te enviamos todo a tu email."
        path="/gracias-flor-sale"
      />
      <section className="section-padding pt-24 md:pt-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-soft-peach via-background to-background pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-coral/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container-tight text-center relative">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-coral to-terracota flex items-center justify-center mx-auto mb-8 shadow-cta"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-coral/10 text-coral text-[11px] font-bold uppercase tracking-[0.22em] px-3 py-1.5 rounded-full mb-4"
          >
            <Sparkles size={12} />
            Flor Sale · {promo.shortName}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4"
          >
            ¡Gracias por sumarte!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          >
            Tu pago se confirmó. Te llega <strong className="text-foreground">en los próximos minutos</strong> un email con todo lo que incluye tu promo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10"
          >
            {[
              {
                icon: Mail,
                title: "Revisá tu email",
                desc: "Te llega todo en los próximos minutos. Si no aparece, fijate en spam.",
              },
              {
                icon: Gift,
                title: "Acceso inmediato",
                desc: "Cada PDF y link funciona desde ya. Descargás y arrancás.",
              },
              {
                icon: Heart,
                title: "Te acompañamos",
                desc: "Cualquier duda, escribinos a hola@cocinaenflor.com.ar y respondemos.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-coral" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="bg-accent/40 border border-miel/30 rounded-2xl p-6 max-w-2xl mx-auto mb-10"
          >
            <div className="flex items-start gap-3 text-left">
              <Clock className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">¿No te llegó el email?</p>
                <p className="text-sm text-muted-foreground">
                  Suele tardar 1-3 minutos. Revisá la carpeta de spam o promociones. Si en 10 minutos
                  no aparece, escribinos a{" "}
                  <a href="mailto:hola@cocinaenflor.com.ar" className="text-coral underline">
                    hola@cocinaenflor.com.ar
                  </a>{" "}
                  con tu nombre y resolvemos al toque.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-card text-foreground px-7 py-3.5 rounded-xl font-medium border border-border hover:bg-muted/50 transition-colors"
            >
              Volver al inicio
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default GraciasFlorSale;
