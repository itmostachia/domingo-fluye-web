import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Flame,
  Sparkles,
  Shield,
  Clock,
  Lock,
  Gift,
  Check,
  ArrowRight,
  Heart,
  Users,
  Star,
} from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxBlob from "@/components/ParallaxBlob";
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
import florSaleHero from "@/assets/flor-sale-cover-hero.jpg";
import florSaleHeroWebp from "@/assets/flor-sale-cover-hero.webp";
import florSaleHeroMobileWebp from "@/assets/flor-sale-cover-hero-mobile.webp";
import FlorSaleCountdown from "@/components/flor-sale/FlorSaleCountdown";
import FlorSalePromoCard from "@/components/flor-sale/FlorSalePromoCard";
import FlorSaleCheckoutDialog from "@/components/flor-sale/FlorSaleCheckoutDialog";
import FlorSaleStickyTopBar from "@/components/flor-sale/FlorSaleStickyTopBar";
import FlorSaleSocialProof from "@/components/flor-sale/FlorSaleSocialProof";

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
        description="🔥 Flor Sale: combos exclusivos a $20.990 (-51%). Recetario Otoño Invierno + Recetario Congelados + Manual del Club mayo, o Grabación del Taller + Manual del Club. Pago único. Acceso inmediato. Solo durante mayo."
        path="/flor-sale"
        image="/og-flor-sale.jpg"
        keywords="hot sale cocina, recetario congelados, recetario otoño, club cocina, manual recetas, planificación comidas, mayo 2026, oferta cocina, cocina en flor, taller que comemos hoy"
        schemaJsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Flor Sale — Combo Recetarios + Club Mayo",
            description: "Combo Hot Sale de mayo. Incluye Recetario Otoño Invierno + Recetario Congelados + Manual del Club mes de mayo.",
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
            description: "Combo Hot Sale de mayo. Incluye Grabación del Taller \"¿Qué comemos hoy?\" + Manual del Club mes de mayo.",
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

      {/* HERO ============================================================== */}
      <section className="relative overflow-hidden pt-6 md:pt-10 pb-10 md:pb-14">
        <div className="absolute inset-0 bg-gradient-to-br from-soft-peach via-warm-cream to-background pointer-events-none" />

        <motion.div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-coral/15 blur-[120px] pointer-events-none"
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.85, 0.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-miel/20 blur-[110px] pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="container-wide relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 items-center">
            {/* Columna izquierda: contenido */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-card border border-coral/40 px-4 py-2 rounded-full shadow-card mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-coral" />
                </span>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-coral inline-flex items-center gap-1.5">
                  <Flame size={12} />
                  Flor Sale en vivo · solo en mayo
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="font-display text-[2rem] sm:text-5xl lg:text-[3.5rem] xl:text-6xl text-foreground leading-[1.02] mb-5"
              >
                Cocinás un domingo,
                <span className="block mt-2 text-gradient-warm">resolvés todo mayo.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-base md:text-lg text-muted-foreground max-w-xl lg:max-w-none leading-relaxed mb-7 mx-auto lg:mx-0"
              >
                <strong className="text-foreground">Hasta -51% OFF</strong> en dos combos diseñados
                para que <strong className="text-foreground">arranques mayo con un plan que funciona</strong>: recetarios premium,
                grabación del taller y el manual del Club. Todo a <strong className="text-foreground">$20.990</strong>, pago único,
                te llega al mail.
              </motion.p>

              {/* Trust pills inline */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-7"
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

              {/* CTA principal */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-7"
              >
                <button
                  onClick={handleHeroReserve}
                  className="group inline-flex items-center gap-2 bg-coral hover:bg-coral/90 text-white px-7 py-4 rounded-xl font-bold text-base shadow-cta hover:shadow-glow active:scale-95 transition-all"
                >
                  Quiero la promo $20.990
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#promos"
                  className="inline-flex items-center gap-2 text-coral hover:text-coral/80 font-semibold text-sm group"
                >
                  Ver qué incluye
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </motion.div>

              {/* Countdown + social */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="bg-card border-2 border-coral/30 rounded-2xl p-4 md:p-5 shadow-warm max-w-md mx-auto lg:mx-0"
              >
                <p className="text-[10px] uppercase tracking-[0.22em] font-bold text-coral mb-2.5">
                  Termina la sale en
                </p>
                <FlorSaleCountdown variant="card" />
                <div className="mt-3 pt-3 border-t border-border/40 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1.5 text-[11px] text-muted-foreground">
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

            {/* Columna derecha: imagen hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 bg-coral/15 rounded-full blur-3xl" />
              </div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-[520px] aspect-[4/5] rounded-3xl overflow-hidden shadow-warm-lg ring-1 ring-coral/15"
              >
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${florSaleHeroMobileWebp} 800w, ${florSaleHeroWebp} 1400w`}
                    sizes="(max-width: 1024px) 800px, 520px"
                  />
                  <img
                    src={florSaleHero}
                    alt="Flor Sale: recetarios premium + manual del Club"
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    width={1400}
                    height={781}
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent pointer-events-none" />

                {/* Floating badges */}
                <motion.div
                  className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-warm-lg flex items-center gap-2"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <Flame size={14} className="text-coral" />
                  <div>
                    <div className="text-[10px] font-bold text-coral uppercase tracking-wider leading-none">Hasta -51%</div>
                    <div className="text-[9px] text-muted-foreground leading-none mt-0.5">por mayo</div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-warm-lg"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground leading-none">Combo desde</div>
                  <div className="font-display text-xl text-coral leading-tight mt-0.5">$20.990</div>
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -left-3 -translate-y-1/2 bg-coral text-white px-3 py-1.5 rounded-r-xl shadow-cta text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Gift size={11} />
                  Pago único
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROMO CARDS ====================================================== */}
      <section id="promos" className="section-padding relative overflow-hidden bg-gradient-section">
        <ParallaxBlob
          className="absolute -top-20 right-10 w-72 h-72 bg-coral/8 rounded-full blur-[120px] pointer-events-none"
          speed={0.15}
        />

        <div className="container-wide relative">
          <ScrollReveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-coral mb-3 bg-coral/10 px-4 py-1.5 rounded-full">
                Las dos promos
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
                Elegí tu combo y arrancás hoy
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Ambas promos incluyen el manual de mayo del Club. Pago único. Sin renovación
                automática.
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
        </div>
      </section>

      {/* COMPARATIVA ====================================================== */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-tight relative">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 bg-primary/5 px-4 py-1.5 rounded-full">
                La cuenta simple
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
                Mirá lo que ahorrás
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Si comprás cada cosa por separado, te sale el doble. Hicimos las cuentas para que la
                decisión sea fácil.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-card rounded-3xl border-2 border-coral/20 shadow-warm-lg overflow-hidden max-w-3xl mx-auto">
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
                  Te ahorrás hasta $22.009 · -51% OFF
                </span>
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

      {/* MAYO ANTES / DESPUÉS ============================================ */}
      <section className="section-padding relative overflow-hidden bg-gradient-section">
        <div className="container-tight relative">
          <ScrollReveal>
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-coral mb-3 bg-coral/10 px-4 py-1.5 rounded-full">
                Tu mayo — antes vs después
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
                Cómo se siente cocinar con un sistema
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                No es magia. Es un plan que ya organizó la semana de +100 familias.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <ScrollReveal delay={0.05}>
              <div className="bg-card rounded-2xl p-7 border-2 border-border/60 h-full relative">
                <div className="absolute top-5 right-5 text-[10px] uppercase tracking-wider font-bold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                  Sin Flor Sale
                </div>
                <h3 className="font-display text-xl text-foreground/85 mb-4 pr-24">
                  Mayo en piloto automático
                </h3>
                <ul className="space-y-3">
                  {[
                    "Domingo a la noche pensando \"qué cocino mañana\".",
                    "Comprás dos veces por semana porque no tenés lista.",
                    "Pedís delivery 3 veces y desblanqueas el presupuesto.",
                    "El freezer es un misterio: lo abrís y no sabés qué hay.",
                    "El lunes te despertás con esa angustia de siempre.",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-muted flex items-center justify-center mt-0.5">
                        <span className="text-muted-foreground">·</span>
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="relative bg-gradient-to-br from-card via-card to-coral/5 rounded-2xl p-7 border-2 border-coral/40 shadow-warm h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-coral via-miel to-terracota rounded-t-2xl" />
                <div className="absolute top-5 right-5 text-[10px] uppercase tracking-wider font-bold text-coral bg-coral/10 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                  <Flame size={10} /> Con Flor Sale
                </div>
                <h3 className="font-display text-xl text-foreground mb-4 pr-28">
                  Mayo resuelto desde el primer domingo
                </h3>
                <ul className="space-y-3">
                  {[
                    "Sabés qué cocinás cada semana antes de empezar.",
                    "Una sola compra grande con la lista lista del manual.",
                    "Ahorrás $30k+ del mes en comida pedida.",
                    "Abrís el freezer y todo está rotulado y a mano.",
                    "Llegás al lunes sin esa pregunta tóxica de las 8pm.",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-coral/15 flex items-center justify-center mt-0.5">
                        <Check size={10} className="text-coral" />
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* WHY NOW ========================================================== */}
      <section className="section-padding relative overflow-hidden bg-gradient-section">
        <div className="container-tight relative">
          <ScrollReveal>
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 bg-primary/5 px-4 py-1.5 rounded-full">
                Por qué ahora
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
                Estamos en mes de Hot Sale
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                Aprovechamos mayo para abrir el Club a precio simbólico durante un mes y regalarte
                contenido que normalmente venimos vendiendo aparte.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                icon: Clock,
                title: "Solo en mayo",
                desc: "Las dos promos están disponibles únicamente durante este mes. Después vuelven a precios normales.",
              },
              {
                icon: Heart,
                title: "Pago único",
                desc: "Pagás una sola vez. No hay renovación automática. Si después querés seguir, te suscribís cuando vos decidas.",
              },
              {
                icon: Shield,
                title: "Garantía 7 días",
                desc: "Si después de 7 días sentís que no era para vos, te devolvemos el dinero. Sin preguntas.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-card rounded-2xl p-7 shadow-card border border-border h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-coral" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS ====================================================== */}
      <section className="section-padding relative overflow-hidden">
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
                quote: "Antes el lunes me agarraba con la cabeza vacía. Ahora cocino el domingo y la semana se resuelve sola. El manual del Club es lo más práctico que probé.",
                stars: 5,
              },
              {
                name: "Mariel P.",
                role: "Trabaja full-time, Bs As",
                quote: "Compré la promo el año pasado en una sale parecida y no me arrepiento ni un poco. Las recetas son fáciles, los chicos las comen, y me ahorro pedir delivery.",
                stars: 5,
              },
              {
                name: "Ximena R.",
                role: "Familia de 5, Rosario",
                quote: "Lo que más me sirvió: la lista de compras del manual. Una sola vuelta al super y resuelvo la semana. Los recetarios suman ideas para no aburrirme.",
                stars: 5,
              },
            ].map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="bg-card rounded-2xl p-6 shadow-card border border-border h-full flex flex-col"
                >
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(t.stars)].map((_, j) => (
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

      {/* GARANTÍA SELLO =================================================== */}
      <section className="relative overflow-hidden py-10 md:py-14">
        <div className="container-tight relative">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-card via-card to-coral/5 rounded-3xl p-8 md:p-10 border-2 border-coral/30 shadow-warm-lg">
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center">
                <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto md:mx-0 flex-shrink-0">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-coral via-miel to-terracota"
                  />
                  <div className="absolute inset-1.5 rounded-full bg-card flex items-center justify-center">
                    <div className="text-center">
                      <Shield size={26} className="text-coral mx-auto" />
                      <div className="text-[9px] uppercase tracking-wider font-bold text-coral leading-tight mt-1">7 días</div>
                      <div className="text-[8px] text-muted-foreground leading-tight">garantía</div>
                    </div>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2 leading-tight">
                    Si no era para vos, te devolvemos el dinero
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Tenés <strong className="text-foreground">7 días desde la compra</strong> para probarlo en serio.
                    Si en esa semana sentís que no te sirvió, escribís a{" "}
                    <a href="mailto:hola@cocinaenflor.com.ar" className="text-coral font-semibold hover:underline">
                      hola@cocinaenflor.com.ar
                    </a>
                    {" "}y te devolvemos el 100%. Sin trámites, sin preguntas raras.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ ============================================================== */}
      <section className="section-padding relative overflow-hidden">
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

      {/* CTA FINAL ======================================================== */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-soft-peach via-warm-cream to-background pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-coral/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-miel/15 blur-3xl pointer-events-none" />

        <div className="container-tight relative">
          <ScrollReveal>
            <div className="relative max-w-2xl mx-auto bg-card rounded-3xl p-8 md:p-12 shadow-warm-lg border-2 border-coral/30 overflow-hidden text-center">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-coral via-miel to-terracota" />
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-coral/15 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-miel/15 blur-3xl pointer-events-none" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 bg-coral/10 px-4 py-2 rounded-full mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-coral">
                  <Flame size={13} />
                  No te lo pierdas
                </span>

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
