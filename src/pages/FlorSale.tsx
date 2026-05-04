import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Flame,
  Sparkles,
  Shield,
  Lock,
  ArrowRight,
  Users,
  Star,
  Quote,
  Eye,
} from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  PROMOS,
  FLOR_SALE,
  isSaleActive,
  getRecentBuyersCount,
  type PromoConfig,
} from "@/lib/florSaleConfig";
import { trackViewContent } from "@/lib/metaPixel";
import FlorSaleCountdown from "@/components/flor-sale/FlorSaleCountdown";
import FlorSalePromoCard from "@/components/flor-sale/FlorSalePromoCard";
import FlorSaleCheckoutDialog from "@/components/flor-sale/FlorSaleCheckoutDialog";
import FlorSaleStickyTopBar from "@/components/flor-sale/FlorSaleStickyTopBar";
import FlorSaleSocialProof from "@/components/flor-sale/FlorSaleSocialProof";
import FlorSaleMarquee from "@/components/flor-sale/FlorSaleMarquee";

// Assets nuevos
import florFoto1 from "@/assets/flor-foto-1.webp";
import florFoto1Mobile from "@/assets/flor-foto-1-mobile.webp";
import florFoto2 from "@/assets/flor-foto-2.webp";
import florFoto2Mobile from "@/assets/flor-foto-2-mobile.webp";
import florFoto4 from "@/assets/flor-foto-4.webp";
import sticker47 from "@/assets/flor-sale-sticker-47.webp";
import ribbonMayo from "@/assets/flor-sale-ribbon-mayo.webp";
import logoHot from "@/assets/flor-sale-logo-hot.webp";

const FlorSale = () => {
  const [open, setOpen] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState<PromoConfig | null>(null);
  const [active, setActive] = useState(() => isSaleActive());
  const buyers = getRecentBuyersCount();

  useEffect(() => {
    trackViewContent("Flor Sale Mayo 2026");
    const tick = () => setActive(isSaleActive());
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const handleReserve = (promo: PromoConfig) => {
    setSelectedPromo(promo);
    setOpen(true);
  };

  const handleHeroReserve = () => {
    setSelectedPromo(PROMOS[0]);
    setOpen(true);
  };

  if (!active) {
    return (
      <Layout>
        <SEOHead title="Flor Sale — Cocina en Flor" path="/flor-sale" />
        <section className="section-padding pt-24 md:pt-32">
          <div className="container-tight text-center">
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Flor Sale terminó
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              La promo de mayo cerró el 31. Sumate al Club al precio de siempre.
            </p>
            <a
              href="/planes"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-xl font-semibold shadow-cta hover:bg-vino transition-colors"
            >
              Ver planes del Club
              <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title={`Flor Sale — Hot Sale del Club | Recetarios + Manual mayo $20.990`}
        description="🔥 Flor Sale: combos exclusivos a $20.990 (-47%). Recetario Otoño Invierno + Recetario Congelados + Manual del Club mayo, o Grabación del Taller + Manual del Club. Pago único. Acceso inmediato. Solo durante mayo."
        path="/flor-sale"
        image="/og-flor-sale.jpg"
        keywords="hot sale cocina, recetario congelados, recetario otoño, club cocina, manual recetas, planificación comidas, mayo 2026, oferta cocina, cocina en flor, taller que comemos hoy"
        schemaJsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Flor Sale — Combo Recetarios + Club Mayo",
            description:
              "Combo Hot Sale de mayo. Incluye Recetario Otoño Invierno + Recetario Congelados + Manual del Club mes de mayo.",
            brand: { "@type": "Brand", name: "Cocina en Flor" },
            image: "https://cocinaenflor.com.ar/og-flor-sale.jpg",
            offers: {
              "@type": "Offer",
              url: "https://cocinaenflor.com.ar/flor-sale",
              priceCurrency: "ARS",
              price: 20990,
              priceValidUntil: "2026-05-31",
              availability: "https://schema.org/InStock",
              seller: { "@type": "Organization", name: "Cocina en Flor" },
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Flor Sale — Combo Taller + Club Mayo",
            description:
              "Combo Hot Sale de mayo. Incluye Grabación del Taller \"¿Qué comemos hoy?\" + Manual del Club mes de mayo.",
            brand: { "@type": "Brand", name: "Cocina en Flor" },
            image: "https://cocinaenflor.com.ar/og-flor-sale.jpg",
            offers: {
              "@type": "Offer",
              url: "https://cocinaenflor.com.ar/flor-sale",
              priceCurrency: "ARS",
              price: 20990,
              priceValidUntil: "2026-05-31",
              availability: "https://schema.org/InStock",
              seller: { "@type": "Organization", name: "Cocina en Flor" },
            },
          },
        ]}
      />

      {/* MARQUEE URGENCY ================================================== */}
      <FlorSaleMarquee />

      {/* HERO ASIMÉTRICO =================================================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-soft-peach via-warm-cream to-background pointer-events-none" />
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-coral/15 blur-[140px] pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 -left-40 w-[480px] h-[480px] rounded-full bg-miel/20 blur-[120px] pointer-events-none"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-0 lg:gap-0 min-h-[88vh] lg:min-h-[90vh]">
          {/* IZQUIERDA: foto Flor full-bleed */}
          <div className="relative h-[55vh] sm:h-[60vh] lg:h-auto lg:min-h-[88vh] overflow-hidden">
            <picture>
              <source
                type="image/webp"
                srcSet={`${florFoto2Mobile} 700w, ${florFoto2} 1200w`}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <img
                src={florFoto2}
                alt="Flor sonriendo en su cocina"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                /* @ts-expect-error fetchpriority lowercase for React DOM */
                fetchpriority="high"
                decoding="async"
              />
            </picture>
            {/* Overlay coral suave + bottom oscurecedor para legibilidad de quote */}
            <div className="absolute inset-0 bg-gradient-to-tr from-coral/15 via-transparent to-miel/10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-foreground/40 via-foreground/10 to-transparent pointer-events-none" />

            {/* Sticker -47% bajado para no chocar con navbar fixed (h-16) */}
            <motion.img
              src={sticker47}
              alt="-47% OFF"
              loading="eager"
              decoding="async"
              className="absolute top-24 sm:top-28 left-5 sm:left-6 w-24 sm:w-28 md:w-32 h-auto drop-shadow-2xl select-none pointer-events-none z-10"
              animate={{ rotate: [-8, -2, -8], scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 8px 20px rgba(239, 123, 108, 0.4))" }}
            />

            {/* Quote flotante: SOLO desktop, posición optimizada para no overlap mesa */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hidden lg:flex absolute bottom-8 left-6 right-12 bg-card/95 backdrop-blur-xl rounded-2xl px-5 py-4 border border-coral/30 shadow-warm-lg max-w-[440px] items-start gap-3"
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-coral/30 to-miel/30 flex items-center justify-center">
                <Quote size={14} className="text-coral" />
              </div>
              <div>
                <p className="text-sm text-foreground italic leading-snug font-display">
                  "El sistema que armé para mi familia, ahora a 47% off."
                </p>
                <p className="text-xs text-muted-foreground mt-1.5 font-medium">— Flor, creadora del Club</p>
              </div>
            </motion.div>
          </div>

          {/* DERECHA: contenido */}
          <div className="relative flex items-center px-6 sm:px-10 md:px-14 lg:px-16 py-12 lg:py-0">
            <div className="w-full max-w-xl">
              {/* Ribbon HOT SALE MAYO */}
              <motion.img
                src={ribbonMayo}
                alt="Hot Sale Mayo"
                className="w-44 sm:w-52 md:w-60 h-auto mb-5 select-none"
                initial={{ rotate: -4, scale: 0, opacity: 0 }}
                animate={{ rotate: -4, scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
                loading="eager"
                decoding="async"
              />

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="font-display text-[2.2rem] sm:text-5xl lg:text-[3.6rem] xl:text-[4rem] text-foreground leading-[1.02] mb-5"
              >
                Cocinás un domingo,
                <span className="block mt-1 text-gradient-warm">resolvés todo mayo.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base md:text-lg text-muted-foreground leading-relaxed mb-7"
              >
                Dos combos pensados para que <strong className="text-foreground">arranques mayo con un plan que funciona</strong>:
                recetarios premium, grabación del taller y el manual del Club. Todo a{" "}
                <strong className="text-foreground">$20.990</strong> · pago único · te llega al mail.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6"
              >
                <button
                  onClick={handleHeroReserve}
                  className="group inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral/90 text-white px-7 py-4 rounded-xl font-bold text-base shadow-cta hover:shadow-glow active:scale-95 transition-all"
                >
                  Quiero la promo $20.990
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#promos"
                  className="inline-flex items-center justify-center gap-2 text-coral hover:text-coral/80 font-semibold text-sm group px-3 py-2"
                >
                  Ver qué incluye
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </motion.div>

              {/* Trust pills */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-2 mb-7"
              >
                {[
                  { icon: Lock, text: "Pago seguro" },
                  { icon: Sparkles, text: "Acceso inmediato" },
                  { icon: Shield, text: "Garantía 7 días" },
                ].map(({ icon: Icon, text }) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 rounded-full text-xs text-muted-foreground"
                  >
                    <Icon size={12} className="text-coral" />
                    {text}
                  </span>
                ))}
              </motion.div>

              {/* Countdown */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-card border-2 border-coral/30 rounded-2xl p-4 md:p-5 shadow-warm"
              >
                <p className="text-[10px] uppercase tracking-[0.22em] font-bold text-coral mb-2.5">
                  Termina la sale en
                </p>
                <FlorSaleCountdown variant="card" />
                <div className="mt-3 pt-3 border-t border-border/40 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Users size={12} className="text-coral" />
                    <strong className="text-foreground">{buyers}</strong> compraron esta semana
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Star size={12} className="fill-miel text-miel" />
                    +100 mamás en el Club
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SCARCITY BAR ===================================================== */}
      <section className="relative bg-foreground text-primary-foreground py-3.5 overflow-hidden">
        <div className="container-wide flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium">
            <Eye size={14} className="text-coral animate-pulse" />
            <span className="opacity-80">37 personas viendo esta página ahora</span>
          </span>
          <span className="hidden sm:inline opacity-30">·</span>
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium">
            <Flame size={14} className="text-coral" />
            <span className="opacity-80">Lucía de Buenos Aires compró hace 6 minutos</span>
          </span>
        </div>
      </section>

      {/* PROMO CARDS ====================================================== */}
      <section id="promos" className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-warm-cream/40 to-background pointer-events-none" />

        {/* Decorativo blob coral en lugar de foto */}
        <motion.div
          className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-coral/10 blur-[120px] pointer-events-none"
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full bg-miel/15 blur-[110px] pointer-events-none"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        <div className="container-wide relative">
          <ScrollReveal>
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-coral mb-3 bg-coral/10 px-4 py-1.5 rounded-full">
                ⚡ Las dos promos
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
                Elegí tu combo y arrancás hoy
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Ambas incluyen el manual de mayo del Club. Pago único. Sin renovación.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7 max-w-5xl mx-auto">
            {PROMOS.map((promo, i) => (
              <FlorSalePromoCard
                key={promo.id}
                promo={promo}
                onReserve={handleReserve}
                featured={i === 0}
                index={i}
              />
            ))}
          </div>

          {/* 3 simple steps */}
          <ScrollReveal delay={0.2}>
            <div className="max-w-3xl mx-auto mt-14">
              <div className="grid grid-cols-3 gap-3 md:gap-6">
                {[
                  { n: "1", t: "Elegís combo", d: "Recetarios o Taller" },
                  { n: "2", t: "Pagás $20.990", d: "Mercado Pago seguro" },
                  { n: "3", t: "Recibís al mail", d: "Acceso inmediato" },
                ].map((s, i) => (
                  <div key={s.n} className="relative">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-coral to-terracota text-white font-display text-xl flex items-center justify-center shadow-cta mb-3">
                        {s.n}
                      </div>
                      <p className="font-semibold text-foreground text-sm md:text-base">{s.t}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.d}</p>
                    </div>
                    {i < 2 && (
                      <div className="hidden md:block absolute top-6 -right-3 w-6 h-px bg-coral/30">
                        <ArrowRight size={11} className="text-coral/50 absolute -top-[5px] right-0" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* COMPARATIVA PRECIO (anclar valor justo después de promos) ======== */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-warm-cream/50 pointer-events-none" />

        <div className="container-tight relative">
          <ScrollReveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 bg-primary/5 px-4 py-1.5 rounded-full">
                💰 La cuenta simple
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
                Por separado: $39.999
                <span className="block text-gradient-warm">En la promo: $20.990</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Hicimos las cuentas para que la decisión sea fácil.
              </p>
            </div>
          </ScrollReveal>

          {/* Wrapper extra con padding para el sticker absoluto que sale del card */}
          <ScrollReveal delay={0.1}>
            <div className="relative max-w-3xl mx-auto pt-8 pr-6">
              {/* Sticker flotante FUERA del card con overflow */}
              <motion.img
                src={sticker47}
                alt="-47% OFF"
                className="absolute top-0 right-0 w-20 sm:w-24 h-auto z-10 select-none pointer-events-none drop-shadow-xl"
                animate={{ rotate: [-12, -4, -12] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative bg-card rounded-3xl border-2 border-coral/20 shadow-warm-lg overflow-hidden">
              <div className="bg-gradient-to-r from-coral/8 via-miel/12 to-coral/6 px-6 py-4 border-b border-border/40">
                <div className="grid grid-cols-3 text-[11px] uppercase tracking-[0.18em] font-bold">
                  <span className="text-muted-foreground">Producto</span>
                  <span className="text-muted-foreground text-center">Suelto</span>
                  <span className="text-coral text-right">Flor Sale</span>
                </div>
              </div>
              <div className="divide-y divide-border/40">
                <div className="grid grid-cols-3 px-6 py-3.5 text-sm items-center">
                  <span className="text-foreground/80">Recetario Otoño Invierno</span>
                  <span className="text-muted-foreground tabular-nums text-center">$16.000</span>
                  <span className="text-foreground tabular-nums text-right font-semibold">incluido</span>
                </div>
                <div className="grid grid-cols-3 px-6 py-3.5 text-sm items-center">
                  <span className="text-foreground/80">Recetario Congelados</span>
                  <span className="text-muted-foreground tabular-nums text-center">$16.000</span>
                  <span className="text-foreground tabular-nums text-right font-semibold">incluido</span>
                </div>
                <div className="grid grid-cols-3 px-6 py-3.5 text-sm items-center">
                  <span className="text-foreground/80">Taller (grabación)</span>
                  <span className="text-muted-foreground tabular-nums text-center">$35.000</span>
                  <span className="text-foreground tabular-nums text-right font-semibold">opc. promo 2</span>
                </div>
                <div className="grid grid-cols-3 px-6 py-3.5 text-sm items-center bg-miel/8">
                  <span className="text-foreground font-semibold">Manual Club mayo</span>
                  <span className="text-muted-foreground tabular-nums text-center">$7.999</span>
                  <span className="text-foreground tabular-nums text-right font-semibold">incluido</span>
                </div>
                <div className="grid grid-cols-3 px-6 py-4 text-base items-center bg-coral/5">
                  <span className="text-foreground font-display">Total</span>
                  <span className="text-muted-foreground tabular-nums text-center line-through font-display">
                    $39.999+
                  </span>
                  <span className="text-coral tabular-nums text-right font-display text-2xl">
                    $20.990
                  </span>
                </div>
              </div>
              <div className="bg-coral/8 px-6 py-3 text-center">
                <span className="text-xs uppercase tracking-wider font-bold text-coral">
                  Te ahorrás hasta $22.009 · -47% OFF
                </span>
              </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="text-center mt-8">
              <button
                onClick={handleHeroReserve}
                className="inline-flex items-center gap-2 bg-coral hover:bg-coral/90 text-white px-7 py-4 rounded-xl font-bold shadow-cta hover:shadow-glow active:scale-95 transition-all"
              >
                Quiero aprovechar la promo
                <ArrowRight size={16} />
              </button>
              <p className="text-xs text-muted-foreground mt-3">
                Pagás en menos de 2 minutos · Te llega todo por email
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CONOCÉ A FLOR (Founder Mode) — después de comparativa para trust ===== */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-soft-peach/40 via-warm-cream to-soft-peach/30">
        <div className="container-wide relative">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-center">
            {/* Texto izquierda */}
            <ScrollReveal>
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.22em] text-coral mb-4 bg-coral/10 px-4 py-1.5 rounded-full">
                Conocé a Flor
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-5">
                "Esto no es un sistema más.
                <br />
                <span className="text-gradient-warm">Es el que uso con mi familia."</span>
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed mb-7">
                <p>
                  Soy Flor, mamá, cocinera y creadora de <strong className="text-foreground">Cocina en Flor</strong>.
                  Hace años que armo el menú de mi semana en 90 minutos del domingo.
                </p>
                <p>
                  Cuando mis amigas empezaron a pedirme <em>"el sistema"</em>, lo escribí. Hoy más
                  de <strong className="text-foreground">100 mamás</strong> lo siguen cada mes.
                </p>
                <p className="text-foreground font-medium">
                  Esta es la primera vez que abrimos los recetarios + manual a este precio. Solo en mayo.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleHeroReserve}
                  className="group inline-flex items-center gap-2 bg-foreground hover:bg-foreground/90 text-primary-foreground px-7 py-4 rounded-xl font-bold text-base shadow-cta hover:shadow-glow active:scale-95 transition-all"
                >
                  Empezar mi mayo
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
                  <Lock size={11} className="text-green-600" />
                  Sin permanencia · Pago único
                </span>
              </div>
            </ScrollReveal>

            {/* Foto Flor derecha — wrapper con padding para logo flotante que sale */}
            <ScrollReveal delay={0.15}>
              <div className="relative max-w-[480px] mx-auto lg:max-w-none pb-8 sm:pb-12 pr-4 sm:pr-12">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-warm-lg ring-1 ring-coral/15"
                >
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${florFoto1Mobile} 700w, ${florFoto1} 1200w`}
                      sizes="(max-width: 1024px) 480px, 50vw"
                    />
                    <img
                      src={florFoto1}
                      alt="Flor cocinando en su casa"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
                </motion.div>

                {/* Logo CEF + Hot Sale flotante (ahora cabe gracias al padding del wrapper) */}
                <motion.img
                  src={logoHot}
                  alt="Cocina en Flor Hot Sale"
                  className="absolute bottom-0 right-0 w-32 sm:w-40 md:w-44 h-auto drop-shadow-2xl select-none pointer-events-none"
                  initial={{ rotate: -8, scale: 0 }}
                  whileInView={{ rotate: -8, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, type: "spring", delay: 0.4 }}
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS ====================================================== */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="container-tight relative">
          <ScrollReveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 bg-primary/5 px-4 py-1.5 rounded-full">
                Lo que cuentan en el Club
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
                Más de 100 familias ya cocinan así
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                El sistema funciona porque está pensado desde la cocina real, no la de Instagram.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                name: "Caro G.",
                role: "Mamá de 2, Córdoba",
                quote:
                  "Antes el lunes me agarraba con la cabeza vacía. Ahora cocino el domingo y la semana se resuelve sola. El manual del Club es lo más práctico que probé.",
              },
              {
                name: "Mariel P.",
                role: "Trabaja full-time, Bs As",
                quote:
                  "Compré la promo el año pasado en una sale parecida y no me arrepiento ni un poco. Las recetas son fáciles, los chicos las comen, y me ahorro pedir delivery.",
              },
              {
                name: "Ximena R.",
                role: "Familia de 5, Rosario",
                quote:
                  "Lo que más me sirvió: la lista de compras del manual. Una sola vuelta al super y resuelvo la semana. Los recetarios suman ideas para no aburrirme.",
              },
            ].map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="bg-card rounded-2xl p-6 shadow-card border border-border h-full flex flex-col"
                >
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="fill-miel text-miel" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/85 leading-relaxed mb-5 flex-1">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral/30 to-miel/30 flex items-center justify-center font-display text-coral font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground leading-tight">{t.name}</p>
                      <p className="text-[11px] text-muted-foreground leading-tight">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ============================================================== */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="container-tight relative">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 bg-primary/5 px-4 py-1.5 rounded-full">
                Dudas frecuentes
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
                Lo que más nos preguntan
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Accordion type="single" collapsible className="max-w-2xl mx-auto space-y-3">
              {[
                {
                  q: "¿Cómo recibo todo lo que incluye la promo?",
                  a: "Apenas pagás te llega un email con los links de descarga de cada PDF (recetarios + manual de mayo del Club) o el link a la grabación del taller, según la promo que elegiste. Acceso inmediato.",
                },
                {
                  q: "¿La suscripción al Club se renueva automáticamente?",
                  a: "No. Esta promo es un pago único. El acceso al manual de mayo es por todo el mes. Si después querés seguir suscripta, te avisamos antes del 31 con el link para suscribirte. Sin sorpresas.",
                },
                {
                  q: "¿Cuál es la diferencia entre la Promo 1 y la Promo 2?",
                  a: "La Promo 1 incluye los dos recetarios premium (Otoño Invierno + Congelados) más el manual de mayo del Club. La Promo 2 incluye la grabación completa del taller \"¿Qué comemos hoy?\" más el manual de mayo del Club. Las dos cuestan lo mismo: $20.990. Elegí la que más te sirva.",
                },
                {
                  q: "¿Y si pago la Promo 2 antes del 8 de mayo?",
                  a: "La Promo 2 se activa el 8 de mayo (post-taller en vivo). Antes de esa fecha está bloqueada para asegurar que la grabación esté lista. Si querés esa promo, dejás tu mail y te avisamos cuando salga.",
                },
                {
                  q: "¿Puedo comprar las dos promos?",
                  a: "Sí. Cada promo es un pago independiente de $20.990. Si te interesan los recetarios y la grabación del taller, podés sumar las dos.",
                },
                {
                  q: "¿Y si después siento que no era para mí?",
                  a: "Tenés garantía 7 días: si en esa semana sentís que no te sirvió, te devolvemos el 100% del dinero. Escribís a hola@cocinaenflor.com.ar y resolvemos. Sin trámites.",
                },
                {
                  q: "¿Hasta cuándo está la Flor Sale?",
                  a: "Hasta el 31 de mayo a las 23:59 ART. Después las promos vuelven a precio normal: cada recetario sale $16.000 y el taller $35.000.",
                },
              ].map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`fs-item-${i}`}
                  className="bg-card border border-border rounded-xl px-5 shadow-card data-[state=open]:shadow-warm transition-shadow"
                >
                  <AccordionTrigger className="text-left font-display text-base md:text-lg text-foreground hover:no-underline py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA FINAL con foto Flor + ribbon ================================= */}
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Foto-4 Flor sonriendo background */}
        <div className="absolute inset-0">
          <picture>
            <source type="image/webp" srcSet={florFoto4} />
            <img
              src={florFoto4}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/70 to-foreground/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
        </div>
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-coral/20 blur-3xl pointer-events-none" />

        <div className="container-tight relative">
          <ScrollReveal>
            <div className="relative max-w-2xl mx-auto bg-card/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-warm-lg border-2 border-coral/30 overflow-hidden text-center">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-coral via-miel to-terracota" />
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-coral/15 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-miel/15 blur-3xl pointer-events-none" />

              {/* Sticker -47 flotante en CTA */}
              <motion.img
                src={sticker47}
                alt="-47% OFF"
                className="absolute -top-8 -left-6 w-20 sm:w-24 h-auto z-10 select-none pointer-events-none drop-shadow-2xl"
                animate={{ rotate: [-15, -5, -15] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative">
                <img
                  src={ribbonMayo}
                  alt="Hot Sale Mayo"
                  className="w-44 sm:w-52 md:w-60 h-auto mx-auto mb-5 select-none"
                />

                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-3 leading-tight">
                  Mayo se va a pasar volando.
                </h2>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-gradient-coral mb-6 leading-tight">
                  ¿Aprovechás la promo?
                </h2>

                <div className="mb-8 max-w-sm mx-auto">
                  <FlorSaleCountdown variant="card" />
                </div>

                <button
                  onClick={handleHeroReserve}
                  className="group relative inline-flex items-center gap-2 bg-coral hover:bg-coral/90 text-white px-10 py-5 rounded-xl font-bold text-base md:text-lg shadow-cta hover:shadow-glow transition-all duration-300 active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Reservar mi promo — $20.990
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6 pt-6 border-t border-border/40 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Lock size={12} className="text-green-600" /> Pago seguro
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles size={12} className="text-coral" /> Acceso inmediato
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Shield size={12} className="text-coral" /> Garantía 7 días
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Sticky bottom mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-card/95 backdrop-blur-md border-t border-coral/30 px-4 py-3 shadow-warm-lg">
        <button
          onClick={handleHeroReserve}
          className="block w-full bg-coral hover:bg-coral/90 text-white text-center py-3.5 rounded-lg font-bold text-base shadow-cta active:scale-95 transition-transform"
        >
          🔥 Aprovechar promo — $20.990
        </button>
      </div>

      <FlorSaleCheckoutDialog open={open} onOpenChange={setOpen} promo={selectedPromo} />
      <FlorSaleStickyTopBar onReserve={handleHeroReserve} />
      <FlorSaleSocialProof />
    </Layout>
  );
};

export default FlorSale;
