import ScrollReveal from "@/components/ScrollReveal";
import ParallaxBlob from "@/components/ParallaxBlob";
import creadoraImg from "@/assets/creadora.jpg";

const CreatorStory = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-background to-soft-peach/40 pointer-events-none" />
      <ParallaxBlob className="absolute -top-20 -right-20 w-72 h-72 bg-miel/10 rounded-full blur-[100px] pointer-events-none" speed={-0.15} />
      <ParallaxBlob className="absolute bottom-0 -left-16 w-56 h-56 bg-coral/8 rounded-full blur-[80px] pointer-events-none" speed={0.2} />

      <div className="container-tight relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Photo placeholder */}
          <ScrollReveal>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-card">
                <img
                  src={creadoraImg}
                  alt="Creadora de Cocina en Flor"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-full bg-miel/20 blur-2xl" />
              <div className="absolute -top-3 -left-3 w-16 h-16 rounded-full bg-primary/15 blur-2xl" />
            </div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal delay={0.15}>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
              La historia
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Conocé a la creadora
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base">
              Soy <strong className="text-foreground">[Tu Nombre]</strong>, mamá y creadora de Cocina en Flor.
              Hace unos años estaba colapsada, gastando fortuna en delivery a las 9 PM porque no sabía
              qué cocinar. Diseñé este sistema para sobrevivir al caos, y hoy ayuda a cientos de familias
              a recuperar su paz mental y su tiempo.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default CreatorStory;
