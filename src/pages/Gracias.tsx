import { useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link, Navigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { trackPurchase } from "@/lib/metaPixel";
import { clearUTMData } from "@/lib/utm";

const Gracias = () => {
  const hasFired = useRef(false);

  // Si el flow viene del Taller, redirigir a /gracias-taller (Pixel value distinto)
  let isTallerFlow = false;
  try {
    isTallerFlow =
      typeof window !== "undefined" &&
      localStorage.getItem("cef_post_payment") === "taller";
  } catch {
    /* incognito */
  }

  useEffect(() => {
    if (isTallerFlow) return; // el evento Purchase lo dispara /gracias-taller
    // Doble guard: useRef para StrictMode, sessionStorage para refresh
    const alreadyFired = sessionStorage.getItem('cef_purchase_fired');
    if (!hasFired.current && !alreadyFired) {
      hasFired.current = true;
      trackPurchase(7990, 'ARS');
      sessionStorage.setItem('cef_purchase_fired', '1');
      clearUTMData();
    }
  }, [isTallerFlow]);

  if (isTallerFlow) {
    return <Navigate to="/gracias-taller" replace />;
  }

  return (
    <Layout>
      <SEOHead
        title="¡Bienvenida al Club! — Cocina en Flor"
        description="Tu suscripción está activa. Descargá tu primer manual y empezá este domingo."
        path="/gracias"
      />
      <section className="section-padding pt-24 md:pt-32">
        <div className="container-tight text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            ¡Bienvenida al Club!
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Tu suscripción está activa. En breve vas a recibir un email con tu primer manual mensual.
          </p>
          <Link
            to="/"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-cta hover:bg-vino transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Gracias;
