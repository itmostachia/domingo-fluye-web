import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Flame, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxBlob from "@/components/ParallaxBlob";
import { isSaleActive } from "@/lib/florSaleConfig";

const baseFaqs = [
  { q: "¿Es para principiantes en la cocina?", a: "¡Sí! Las recetas son simples, con ingredientes comunes y pasos claros. No necesitás experiencia previa." },
  { q: "¿Necesito un freezer grande?", a: "No. Con el freezer de una heladera común alcanza. El sistema está pensado para espacios reales." },
  { q: "¿Puedo adaptar las recetas si alguien no come algo?", a: "Sí. Cada receta incluye sustituciones para los ingredientes más comunes." },
  { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Cancelás desde tu cuenta, sin preguntas ni trámites. Sin permanencia." },
  { q: "¿Cuánto tiempo lleva cocinar todo el domingo?", a: "Aproximadamente 90 minutos. El sistema está diseñado para ser eficiente y no ocuparte toda la mañana." },
  { q: "¿La comida es apta para chicos?", a: "Totalmente. Son recetas de comida de familia real: milanesas, guisos, pastas, tartas, estofados. Comida que les gusta." },
];

const florSaleFaq = {
  q: "¿Qué es Flor Sale y cómo funciona?",
  a: "Es nuestra Hot Sale del Club: 2 combos especiales a $20.990 (47-51% off) por tiempo limitado. Promo 1 = Recetario Otoño Invierno + Recetario Congelados + Manual del Club mayo. Promo 2 = Grabación del taller \"¿Qué comemos hoy?\" + Manual del Club mayo. Pago único, sin renovación, te llega todo por email al instante. Termina el 31 de mayo.",
};

const FAQSection = () => {
  const [saleActive, setSaleActive] = useState(() => isSaleActive());

  useEffect(() => {
    const tick = () => setSaleActive(isSaleActive());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const faqs = saleActive ? [florSaleFaq, ...baseFaqs] : baseFaqs;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-soft-peach/60 via-accent/35 to-soft-peach/50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <ParallaxBlob className="absolute top-1/3 -left-20 w-64 h-64 bg-primary/6 rounded-full blur-[80px] pointer-events-none" speed={-0.15} />
      {/* Decorative icon */}
      <div className="absolute top-20 right-[8%] opacity-[0.03] pointer-events-none">
        <HelpCircle size={180} />
      </div>

      <div className="container-tight relative">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
              FAQ
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Preguntas frecuentes
            </h2>
            <p className="text-muted-foreground text-lg">
              Todo lo que necesitás saber antes de sumarte.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="max-w-2xl mx-auto bg-card rounded-2xl shadow-card p-2 border border-border">
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-border/50 last:border-b-0"
                >
                  <AccordionTrigger className="text-left text-base font-medium text-foreground hover:text-primary px-4 py-4 transition-colors [&[data-state=open]]:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed px-4 pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollReveal>

        {saleActive && (
          <ScrollReveal delay={0.25}>
            <div className="max-w-2xl mx-auto mt-8 text-center">
              <Link
                to="/flor-sale"
                className="inline-flex items-center gap-2 text-coral hover:text-coral/80 font-semibold text-sm group"
              >
                <Flame size={16} />
                Ver los combos de Flor Sale
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
