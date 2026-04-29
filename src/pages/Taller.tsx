import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  PlayCircle,
  Gift,
  Check,
  ChefHat,
  ListChecks,
  Snowflake,
  HeartHandshake,
  Star,
  Lock,
  ArrowRight,
  Shield,
  Users,
  MessageCircle,
  CalendarCheck,
  Brain,
  Flame,
  Clock,
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
import CountdownTimer from "@/components/taller/CountdownTimer";
import CuposCounter from "@/components/taller/CuposCounter";
import WorkshopCheckoutDialog from "@/components/taller/WorkshopCheckoutDialog";
import { WORKSHOP } from "@/lib/workshopConfig";
import { trackViewContent } from "@/lib/metaPixel";
import { useEffect } from "react";
import tallerImg from "@/assets/taller-flor.jpg";
import creadoraImg from "@/assets/creadora.jpg";

const formatARS = (n: number) => `$${n.toLocaleString("es-AR")}`;

const Taller = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    trackViewContent(`Taller ${WORKSHOP.dateLabelShort}`);
  }, []);

  const handleReserve = () => setOpen(true);

  return (
    <Layout>
      <SEOHead
        title={`${WORKSHOP.name} — En vivo con Flor el ${WORKSHOP.dateLabelShort}`}
        description="Taller virtual con Flor: aprendé a diagramar tu semana, hacer la lista de compras y usar el freezer como aliado. Queda grabado + 1 mes en el Club gratis."
        path="/taller"
      />

      {/* HERO ============================================================ */}
      <section className="relative overflow-hidden pt-6 md:pt-10 pb-12 md:pb-16">
        {/* Base cream */}
        <div className="absolute inset-0 bg-gradient-to-br from-soft-peach via-warm-cream to-background pointer-events-none" />

        {/* Blobs warm difuminados */}
        <motion.div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-coral/12 blur-[120px] pointer-events-none"
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-miel/18 blur-[110px] pointer-events-none"
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-terracota/8 blur-[90px] pointer-events-none" />

        <div className="container-wide relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Foto col 5 — order-1 mobile (arriba), order-2 desktop (derecha) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="order-1 lg:order-2 lg:col-span-5 relative max-w-[280px] sm:max-w-sm lg:max-w-md mx-auto w-full"
            >
              {/* Glow blob warm detras */}
              <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-br from-coral/25 via-miel/20 to-terracota/15 rounded-[3rem] blur-3xl pointer-events-none" />

              {/* Imagen */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-warm-lg border-2 border-card"
              >
                <img
                  src={tallerImg}
                  alt="Flor preparando un taller de cocina"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </motion.div>

              {/* Badge bottom: bonus */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -bottom-4 -left-3 sm:-left-6 bg-card border border-miel/40 px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl shadow-warm-lg max-w-[200px] sm:max-w-[220px]"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Gift size={12} className="text-coral" />
                  <span className="text-[10px] uppercase tracking-wider font-bold text-coral">
                    Bonus incluido
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs font-semibold text-foreground leading-snug">
                  Mes de mayo en el Club gratis
                </p>
              </motion.div>

              {/* Badge top-right: stars */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.5 }}
                className="absolute -top-3 -right-2 sm:-right-4 bg-card border border-border px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl shadow-warm"
              >
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className="fill-miel text-miel" />
                  ))}
                </div>
                <p className="text-[10px] text-foreground font-semibold">
                  +100 familias
                </p>
              </motion.div>
            </motion.div>

            {/* Texto col 7 — order-2 mobile, order-1 desktop */}
            <div className="order-2 lg:order-1 lg:col-span-7">
              {/* Stack de urgencia: live + cupos */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap items-center gap-2 mb-4"
              >
                <span className="inline-flex items-center gap-1.5 bg-card border border-coral/40 px-3 py-1.5 rounded-full shadow-card">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-coral" />
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-coral">
                    En vivo · {WORKSHOP.dateLabelShort}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 bg-miel/20 border border-miel/40 px-3 py-1.5 rounded-full">
                  <Flame size={11} className="text-coral" />
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-deep-brown">
                    Cupos limitados
                  </span>
                </span>
              </motion.div>

              {/* Pre-titulo: nombre del taller */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="text-coral font-bold text-[11px] sm:text-xs uppercase tracking-[0.22em] mb-3"
              >
                Taller virtual con Flor — “¿Qué comemos hoy?”
              </motion.p>

              {/* H1 punchy: promesa concreta */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="font-display text-[2.25rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] text-foreground leading-[1.02] mb-5"
              >
                Resolvé toda tu semana
                <span className="block mt-1 text-gradient-warm">en una hora.</span>
              </motion.h1>

              {/* Sub directa */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-base md:text-lg text-muted-foreground mb-5 max-w-xl leading-relaxed"
              >
                El método que uso todos los días en mi casa: <strong className="text-foreground">diagramar el menú semanal</strong>, lista de compras y el freezer como aliado. Queda grabado.
              </motion.p>

              {/* OFERTA + CHECKOUT CARD — todo lo necesario para decidir + comprar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="relative bg-card border-2 border-miel/40 rounded-2xl mb-5 max-w-xl shadow-warm overflow-hidden"
              >
                {/* Línea superior gradient warm */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-coral via-miel to-terracota" />

                {/* Decorative dot */}
                <span className="absolute -top-2 -right-2 inline-flex w-5 h-5 rounded-full bg-coral border-4 border-card z-10" />

                {/* HEADER: precio + bonus */}
                <div className="p-5 pb-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-coral mb-1.5">
                    Tu inversión hoy
                  </p>
                  <div className="flex items-baseline gap-3 flex-wrap mb-3">
                    <span className="font-display text-[2.25rem] sm:text-[2.5rem] text-foreground tabular-nums leading-none">
                      {WORKSHOP.priceLabel}
                    </span>
                    <span className="text-sm text-muted-foreground line-through tabular-nums">
                      {formatARS(WORKSHOP.price + WORKSHOP.bonusValue)}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-coral/10 text-coral text-[10px] font-bold uppercase tracking-wider">
                      Ahorrás {formatARS(WORKSHOP.bonusValue)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground inline-flex items-start gap-1.5 leading-snug">
                    <Gift size={14} className="text-coral mt-0.5 flex-shrink-0" />
                    <span>
                      + Mes de mayo en el <strong className="text-foreground">Club totalmente gratis</strong>
                    </span>
                  </p>
                </div>

                {/* URGENCIA: countdown destacado + cupos prominent */}
                <div className="px-5 pb-4">
                  <div className="relative bg-gradient-to-br from-coral/8 via-miel/12 to-coral/6 border border-coral/20 rounded-xl p-3 sm:p-4 mb-4 overflow-hidden">
                    {/* Sutiles dots decorativos */}
                    <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-coral/10 blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full bg-miel/15 blur-2xl pointer-events-none" />

                    <div className="relative flex items-center justify-between gap-3 flex-wrap">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-coral mb-1.5 inline-flex items-center gap-1">
                          <Clock size={11} className="text-coral" />
                          Empieza en
                        </p>
                        <CountdownTimer variant="strip" />
                      </div>
                      <CuposCounter variant="prominent" />
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={handleReserve}
                    className="group relative w-full bg-primary text-primary-foreground py-4 sm:py-5 rounded-xl font-bold text-base md:text-lg shadow-cta hover:shadow-glow active:scale-[0.98] transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Reservar mi lugar
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-vino to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>

                {/* Trust footer */}
                <div className="border-t border-border/60 bg-soft-peach/40 px-5 py-2.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Lock size={11} className="text-green-600" />
                    Pago seguro
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <PlayCircle size={11} className="text-coral" />
                    Queda grabado
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Shield size={11} className="text-coral" />
                    Sin permanencia
                  </span>
                </div>
              </motion.div>

              {/* Recordatorio fecha + duracion fuera de la card (info contextual) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-muted-foreground"
              >
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles size={13} className="text-coral" />
                  En vivo por Google Meet
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Shield size={13} className="text-coral" />
                  100% online · sin viajar
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* BONUS STACK ====================================================== */}
      <section className="section-padding relative overflow-hidden">
        <ParallaxBlob
          className="absolute top-10 right-10 w-72 h-72 bg-coral/8 rounded-full blur-[100px] pointer-events-none"
          speed={0.15}
        />

        <div className="container-tight relative">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
                Lo que recibís
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                Un solo pago. <span className="text-gradient-coral">Tres regalos para tu cocina.</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Pagás una entrada y te llevás todo esto. Hicimos las cuentas para que la decisión sea fácil.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: PlayCircle,
                title: "Taller en vivo + grabación",
                value: WORKSHOP.priceLabel,
                desc: "1 a 2 hs con Flor el 7 de mayo a las 20 hs. Si no podés en vivo, lo ves grabado tantas veces como quieras.",
                accent: "primary",
              },
              {
                icon: Gift,
                title: "Mes en el Club del Domingo",
                value: formatARS(WORKSHOP.bonusValue),
                desc: "Acceso completo al Club durante todo mayo: +40 recetas, listas de compras y la comunidad.",
                accent: "miel",
                highlight: true,
              },
              {
                icon: HeartHandshake,
                title: "Soporte por WhatsApp",
                value: "Sin precio",
                desc: "Te mandamos el link del Meet por acá y respondemos las dudas que te queden después del taller.",
                accent: "terracota",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className={`relative card-premium p-7 h-full flex flex-col ${
                    item.highlight ? "ring-2 ring-miel/40 shadow-warm" : ""
                  }`}
                >
                  {item.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-miel to-terracota text-deep-brown px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap shadow-lg">
                      🎁 Tu regalo
                    </span>
                  )}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      item.accent === "miel"
                        ? "bg-miel/20"
                        : item.accent === "terracota"
                          ? "bg-terracota/15"
                          : "bg-primary/10"
                    }`}
                  >
                    <item.icon
                      className={`w-6 h-6 ${
                        item.accent === "miel"
                          ? "text-deep-brown"
                          : item.accent === "terracota"
                            ? "text-terracota"
                            : "text-primary"
                      }`}
                    />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                    {item.desc}
                  </p>
                  <div className="text-xs text-muted-foreground border-t border-border/60 pt-3">
                    Valor:{" "}
                    <span className="font-semibold text-foreground tabular-nums">{item.value}</span>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Anchor de valor */}
          <ScrollReveal delay={0.3}>
            <div className="mt-10 max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-miel/10 rounded-2xl p-6 md:p-8 border border-primary/15">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Taller en vivo + grabación</span>
                    <span className="font-semibold text-foreground tabular-nums">{WORKSHOP.priceLabel}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Mes Club del Domingo</span>
                    <span className="font-semibold text-foreground tabular-nums">
                      {formatARS(WORKSHOP.bonusValue)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">Valor total</span>
                    <span className="font-display text-xl text-muted-foreground line-through tabular-nums">
                      {formatARS(WORKSHOP.price + WORKSHOP.bonusValue)}
                    </span>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-xs uppercase tracking-wider text-primary font-bold mb-1">Pagás solo</p>
                  <p className="font-display text-4xl md:text-5xl text-gradient-coral tabular-nums">
                    {WORKSHOP.priceLabel}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Te ahorrás {formatARS(WORKSHOP.bonusValue)}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="text-center mt-10">
            <button
              onClick={handleReserve}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-cta hover:bg-vino transition-colors"
            >
              Reservar mi lugar ahora
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* QUE VAS A APRENDER =============================================== */}
      <section className="section-padding relative overflow-hidden bg-gradient-section">
        <div className="container-wide relative">
          <ScrollReveal>
            <div className="text-center mb-14 max-w-2xl mx-auto">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
                El método de Flor
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                Lo que te llevás del taller
              </h2>
              <p className="text-muted-foreground text-lg">
                Un sistema concreto, sin teoría innecesaria. Salís del taller con tu próxima semana
                resuelta en papel.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: CalendarCheck,
                title: "Diagramar el menú semanal",
                desc: "Cómo armar tus 7 días sin que cocinar se sienta una carga, balanceando lo que ya tenés.",
                color: "primary",
              },
              {
                icon: ListChecks,
                title: "Lista de compras inteligente",
                desc: "El método para comprar sólo lo necesario, sin desperdicio y sin volver al super dos veces.",
                color: "miel",
              },
              {
                icon: Snowflake,
                title: "El freezer como aliado",
                desc: "Qué se freezera y cómo, para que tengas opciones siempre listas y no improvises a la noche.",
                color: "verde-pizarra",
              },
              {
                icon: Brain,
                title: "El mindset que cambia todo",
                desc: "Por qué cocinar bien no es cuestión de recetas: es cuestión de cómo te organizás antes.",
                color: "terracota",
              },
              {
                icon: ChefHat,
                title: "Tips de cocina real",
                desc: "Trucos que uso todos los días en casa para que la comida deje de ser un problema.",
                color: "primary",
              },
              {
                icon: HeartHandshake,
                title: "Comunidad detrás",
                desc: "Te llevás acceso al grupo del Club por todo mayo: dudas, recetas y otras mamás.",
                color: "miel",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-card rounded-2xl p-6 shadow-card border border-border h-full transition-shadow hover:shadow-warm"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display text-lg text-foreground leading-tight pt-1">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUIEN ES =================================================== */}
      <section className="section-padding relative overflow-hidden">
        <ParallaxBlob
          className="absolute -top-20 -left-20 w-72 h-72 bg-miel/10 rounded-full blur-[120px] pointer-events-none"
          speed={-0.2}
        />

        <div className="container-tight relative">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
                Para vos si...
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                Este taller es para vos si...
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "Llegás a la noche cansada y no sabés qué cocinar.",
              "Sentís que la comida se transformó en una carga más.",
              "Querés ordenar tu cocina sin gastar de más.",
              "Cocinás todos los días y querés un sistema más simple.",
              "Te aburren las recetas sueltas: querés un método.",
              "Te interesa el freezer pero no sabés cómo arrancar.",
            ].map((text, i) => (
              <ScrollReveal key={text} delay={i * 0.05}>
                <div className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-card border border-border">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check size={14} className="text-primary" />
                  </span>
                  <p className="text-foreground text-sm md:text-base leading-snug">{text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE FLOR ===================================================== */}
      <section className="section-padding relative overflow-hidden bg-gradient-section-reverse">
        <ParallaxBlob
          className="absolute top-1/3 -right-16 w-72 h-72 bg-coral/8 rounded-full blur-[100px] pointer-events-none"
          speed={0.15}
        />

        <div className="container-tight relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <ScrollReveal>
              <div className="relative max-w-sm mx-auto">
                <div className="absolute inset-0 bg-miel/20 rounded-[2rem] blur-3xl" />
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-warm-lg">
                  <img
                    src={creadoraImg}
                    alt="Flor, creadora de Cocina en Flor"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-3 -right-3 glass px-3 py-2 rounded-xl shadow-warm-lg"
                >
                  <p className="text-xs font-semibold text-foreground">Hola, soy Flor 👋</p>
                </motion.div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
                Quién te enseña
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                El método que uso todos los días en mi casa
              </h2>
              <div className="text-muted-foreground leading-relaxed text-base space-y-4">
                <p>
                  Soy <strong className="text-foreground">Flor</strong>, mamá y creadora de Cocina en
                  Flor.
                </p>
                <p>
                  Durante años llegaba a la noche cansada, sin saber qué cocinar y sintiendo que la
                  comida era una carga más en mi día. Hasta que entendí que no necesitaba más
                  recetas, sino organización.
                </p>
                <p>
                  En este taller te voy a contar el método exacto que uso todos los días en mi casa:
                  cómo planifico, cómo compro, cómo uso el freezer, y cómo dejé de improvisar la
                  comida.
                </p>
                <p className="font-medium text-foreground">
                  Si te queda una sola idea de la noche, ya valió.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* GARANTIAS ====================================================== */}
      <section className="section-padding relative">
        <div className="container-tight">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                icon: PlayCircle,
                title: "Si no podés en vivo, no pasa nada",
                desc: "El taller queda grabado y te lo enviamos para que lo veas las veces que quieras.",
              },
              {
                icon: MessageCircle,
                title: "Llega por WhatsApp",
                desc: "El link del Meet te lo mandamos al WhatsApp que registres. Sin perder mails ni links.",
              },
              {
                icon: Users,
                title: "Comunidad incluida",
                desc: "Te sumás al grupo privado del Club por todo mayo: dudas, recetas y soporte real.",
              },
            ].map((item) => (
              <ScrollReveal key={item.title}>
                <div className="text-center bg-card rounded-2xl p-6 shadow-card border border-border h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ============================================================ */}
      <section className="section-padding relative overflow-hidden bg-gradient-section">
        <div className="container-tight relative">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
                Dudas frecuentes
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                Lo que más nos preguntan
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Accordion type="single" collapsible className="max-w-2xl mx-auto space-y-3">
              {[
                {
                  q: "¿Necesito experiencia previa cocinando?",
                  a: "No. El taller es teórico/práctico y se enfoca en organización, no en técnicas avanzadas. Si cocinás aunque sea básico, podés aplicarlo el mismo día.",
                },
                {
                  q: "¿Qué pasa si no puedo asistir en vivo?",
                  a: "El taller se graba y te enviamos la grabación para que lo veas tantas veces como quieras, a tu ritmo. No te perdés nada.",
                },
                {
                  q: "¿Cómo me llega el link del Meet?",
                  a: "Al reservar tu lugar nos dejás tu WhatsApp. Te enviamos el link del Meet por ese mismo número un rato antes del taller. También por email.",
                },
                {
                  q: "¿Cómo accedo al mes gratis del Club?",
                  a: "Apenas pagás el taller te activamos el acceso al Club durante todo mayo. Recibís todo lo que reciben los socios: manual mensual, +40 recetas, listas y comunidad.",
                },
                {
                  q: "¿Tiene devolución?",
                  a: "Si después del taller sentís que no te sirvió, escribinos a hola@cocinaenflor.com.ar y resolvemos contigo. Queremos que valga la pena.",
                },
                {
                  q: "¿Qué necesito para conectarme?",
                  a: "Una computadora, tablet o celular con conexión a internet. Lo damos por Google Meet, no necesitás bajar nada.",
                },
              ].map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
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

      {/* CTA FINAL ====================================================== */}
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Base cream */}
        <div className="absolute inset-0 bg-gradient-to-br from-soft-peach via-warm-cream to-background pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-coral/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-miel/12 blur-3xl pointer-events-none" />

        <div className="container-tight relative">
          <ScrollReveal>
            <div className="relative max-w-2xl mx-auto bg-card rounded-3xl p-8 md:p-12 shadow-warm-lg border border-border overflow-hidden">
              {/* Linea superior gradient warm */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-coral via-miel to-terracota" />

              {/* Decorativo interno */}
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-coral/8 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-miel/12 blur-3xl pointer-events-none" />

              <div className="relative text-center">
                <span className="inline-flex items-center gap-2 bg-coral/10 px-4 py-2 rounded-full mb-6 text-[11px] font-bold uppercase tracking-[0.22em] text-coral">
                  <Sparkles size={13} />
                  Cupos limitados
                </span>

                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-3 leading-tight">
                  {WORKSHOP.dateLabelShort}.
                </h2>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-gradient-coral mb-6 leading-tight">
                  ¿Estás adentro?
                </h2>

                <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Reservá ahora, te llevás el taller en vivo, la grabación y el mes gratis en el Club.
                </p>

                <div className="mb-8 max-w-sm mx-auto">
                  <CountdownTimer variant="card" />
                </div>

                <button
                  onClick={handleReserve}
                  className="group relative inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-5 rounded-xl font-bold text-base md:text-lg shadow-cta hover:shadow-glow transition-all duration-300 active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Reservar mi lugar — {WORKSHOP.priceLabel}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-vino to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                <div className="mt-6 flex justify-center">
                  <CuposCounter />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6 pt-6 border-t border-border/60 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Lock size={12} className="text-green-600" /> Pago seguro
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <PlayCircle size={12} className="text-coral" /> Queda grabado
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Gift size={12} className="text-coral" /> + Mes Club gratis
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Sticky bottom mobile CTA específico del taller */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-card/95 backdrop-blur-md border-t border-border px-4 py-3 shadow-warm-lg">
        <button
          onClick={handleReserve}
          className="block w-full bg-primary text-primary-foreground text-center py-3.5 rounded-lg font-semibold text-base shadow-cta active:scale-95 transition-transform"
        >
          Reservar lugar — {WORKSHOP.priceLabel}
        </button>
      </div>

      <WorkshopCheckoutDialog open={open} onOpenChange={setOpen} />
    </Layout>
  );
};

export default Taller;
