import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Clock, Users, Snowflake, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import florDeTip from "@/assets/flor-de-tip.png";

const Recetas = () => {
  return (
    <Layout>
      <SEOHead
        title="Recetas — Cocina en Flor"
        description="Recetas prácticas para familias. Comida real, simple y riquísima."
        path="/recetas"
      />
      <section className="py-16 px-4 md:px-8 pt-24 md:pt-32 relative">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <h1 className="font-display text-4xl md:text-5xl text-foreground text-center mb-4">
              Recetas del Club
            </h1>
            <img
              src={florDeTip}
              alt="Flor de Tip"
              className="absolute -top-4 -right-4 md:right-[15%] w-20 md:w-24 h-auto opacity-80 pointer-events-none rotate-6"
            />
          </div>
          <p className="text-muted-foreground text-center text-lg mb-8 max-w-xl mx-auto">
            Una muestra de lo que encontrás cada mes. Comida real para familias reales.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

            {/* 1. Milanesas de pollo con puré - GRATIS */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden h-full flex flex-col w-full text-left border border-border">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80" alt="Milanesas de pollo con puré" className="w-full h-full object-cover" />
                <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-primary-foreground border-0 text-xs">🔓 Gratis</Badge>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">Pollo</span>
                <h2 className="font-display text-base text-foreground mb-3 flex-1 leading-snug">Milanesas de pollo con puré</h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12} /> 40 min</span>
                  <span className="flex items-center gap-1"><Users size={12} /> 4</span>
                  <span className="flex items-center gap-1 text-secondary"><Snowflake size={12} /> Freezable</span>
                </div>
              </div>
            </div>

            {/* 2. Tarta de zapallitos y queso - GRATIS */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden h-full flex flex-col w-full text-left border border-border">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=600&q=80" alt="Tarta de zapallitos y queso" className="w-full h-full object-cover" />
                <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-primary-foreground border-0 text-xs">🔓 Gratis</Badge>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">Vegano</span>
                <h2 className="font-display text-base text-foreground mb-3 flex-1 leading-snug">Tarta de zapallitos y queso</h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12} /> 35 min</span>
                  <span className="flex items-center gap-1"><Users size={12} /> 6</span>
                  <span className="flex items-center gap-1 text-secondary"><Snowflake size={12} /> Freezable</span>
                </div>
              </div>
            </div>

            {/* 3. Pollo al horno con papas - GRATIS */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden h-full flex flex-col w-full text-left border border-border">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&q=80" alt="Pollo al horno con papas" className="w-full h-full object-cover" />
                <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-primary-foreground border-0 text-xs">🔓 Gratis</Badge>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">Pollo</span>
                <h2 className="font-display text-base text-foreground mb-3 flex-1 leading-snug">Pollo al horno con papas</h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12} /> 55 min</span>
                  <span className="flex items-center gap-1"><Users size={12} /> 4</span>
                </div>
              </div>
            </div>

            {/* 4. Nuggets caseros de pollo - PREMIUM */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden h-full flex flex-col w-full text-left border border-border">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1619221882220-947b3d3c8861?w=600&q=80" alt="Nuggets caseros de pollo" className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5"><Lock size={14} className="text-muted-foreground" /></div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">Pollo</span>
                <h2 className="font-display text-base text-foreground mb-3 flex-1 leading-snug">Nuggets caseros de pollo</h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12} /> 30 min</span>
                  <span className="flex items-center gap-1"><Users size={12} /> 6</span>
                  <span className="flex items-center gap-1 text-secondary"><Snowflake size={12} /> Freezable</span>
                </div>
              </div>
            </div>

            {/* 5. Estofado de carne con verduras - GRATIS */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden h-full flex flex-col w-full text-left border border-border">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80" alt="Estofado de carne con verduras" className="w-full h-full object-cover" />
                <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-primary-foreground border-0 text-xs">🔓 Gratis</Badge>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">Carne</span>
                <h2 className="font-display text-base text-foreground mb-3 flex-1 leading-snug">Estofado de carne con verduras</h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12} /> 60 min</span>
                  <span className="flex items-center gap-1"><Users size={12} /> 5</span>
                  <span className="flex items-center gap-1 text-secondary"><Snowflake size={12} /> Freezable</span>
                </div>
              </div>
            </div>

            {/* 6. Empanadas de carne al horno - PREMIUM */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden h-full flex flex-col w-full text-left border border-border">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&q=80" alt="Empanadas de carne al horno" className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5"><Lock size={14} className="text-muted-foreground" /></div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">Carne</span>
                <h2 className="font-display text-base text-foreground mb-3 flex-1 leading-snug">Empanadas de carne al horno</h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12} /> 60 min</span>
                  <span className="flex items-center gap-1"><Users size={12} /> 12</span>
                  <span className="flex items-center gap-1 text-secondary"><Snowflake size={12} /> Freezable</span>
                </div>
              </div>
            </div>

            {/* 7. Hamburguesas caseras completas - PREMIUM */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden h-full flex flex-col w-full text-left border border-border">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=80" alt="Hamburguesas caseras completas" className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5"><Lock size={14} className="text-muted-foreground" /></div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">Carne</span>
                <h2 className="font-display text-base text-foreground mb-3 flex-1 leading-snug">Hamburguesas caseras completas</h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12} /> 35 min</span>
                  <span className="flex items-center gap-1"><Users size={12} /> 4</span>
                  <span className="flex items-center gap-1 text-secondary"><Snowflake size={12} /> Freezable</span>
                </div>
              </div>
            </div>

            {/* 8. Estofado de lentejas - PREMIUM */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden h-full flex flex-col w-full text-left border border-border">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&q=80" alt="Estofado de lentejas" className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5"><Lock size={14} className="text-muted-foreground" /></div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">Vegano</span>
                <h2 className="font-display text-base text-foreground mb-3 flex-1 leading-snug">Estofado de lentejas</h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12} /> 50 min</span>
                  <span className="flex items-center gap-1"><Users size={12} /> 6</span>
                  <span className="flex items-center gap-1 text-secondary"><Snowflake size={12} /> Freezable</span>
                </div>
              </div>
            </div>

            {/* 9. Tortilla de papas al horno - GRATIS */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden h-full flex flex-col w-full text-left border border-border">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=600&q=80" alt="Tortilla de papas al horno" className="w-full h-full object-cover" />
                <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-primary-foreground border-0 text-xs">🔓 Gratis</Badge>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">Vegano</span>
                <h2 className="font-display text-base text-foreground mb-3 flex-1 leading-snug">Tortilla de papas al horno</h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12} /> 35 min</span>
                  <span className="flex items-center gap-1"><Users size={12} /> 4</span>
                </div>
              </div>
            </div>

            {/* 10. Pasta con salsa bolognesa - PREMIUM */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden h-full flex flex-col w-full text-left border border-border">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&q=80" alt="Pasta con salsa bolognesa" className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5"><Lock size={14} className="text-muted-foreground" /></div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">Pastas</span>
                <h2 className="font-display text-base text-foreground mb-3 flex-1 leading-snug">Pasta con salsa bolognesa</h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12} /> 45 min</span>
                  <span className="flex items-center gap-1"><Users size={12} /> 4</span>
                  <span className="flex items-center gap-1 text-secondary"><Snowflake size={12} /> Freezable</span>
                </div>
              </div>
            </div>

            {/* 11. Ñoquis de papa caseros - GRATIS */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden h-full flex flex-col w-full text-left border border-border">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1621510456681-2330135e5871?w=600&q=80" alt="Ñoquis de papa caseros" className="w-full h-full object-cover" />
                <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-primary-foreground border-0 text-xs">🔓 Gratis</Badge>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">Pastas</span>
                <h2 className="font-display text-base text-foreground mb-3 flex-1 leading-snug">Ñoquis de papa caseros</h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12} /> 50 min</span>
                  <span className="flex items-center gap-1"><Users size={12} /> 4</span>
                  <span className="flex items-center gap-1 text-secondary"><Snowflake size={12} /> Freezable</span>
                </div>
              </div>
            </div>

            {/* 12. Wrap de pollo express - PREMIUM */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden h-full flex flex-col w-full text-left border border-border">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&q=80" alt="Wrap de pollo express" className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5"><Lock size={14} className="text-muted-foreground" /></div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">Express</span>
                <h2 className="font-display text-base text-foreground mb-3 flex-1 leading-snug">Wrap de pollo express</h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12} /> 15 min</span>
                  <span className="flex items-center gap-1"><Users size={12} /> 2</span>
                </div>
              </div>
            </div>

            {/* 13. Quesadillas rápidas - PREMIUM */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden h-full flex flex-col w-full text-left border border-border">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80" alt="Quesadillas rápidas" className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5"><Lock size={14} className="text-muted-foreground" /></div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">Express</span>
                <h2 className="font-display text-base text-foreground mb-3 flex-1 leading-snug">Quesadillas rápidas</h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12} /> 10 min</span>
                  <span className="flex items-center gap-1"><Users size={12} /> 2</span>
                </div>
              </div>
            </div>

            {/* 14. Tostadas con huevo y palta - PREMIUM */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden h-full flex flex-col w-full text-left border border-border">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&q=80" alt="Tostadas con huevo y palta" className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5"><Lock size={14} className="text-muted-foreground" /></div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">Express</span>
                <h2 className="font-display text-base text-foreground mb-3 flex-1 leading-snug">Tostadas con huevo y palta</h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12} /> 10 min</span>
                  <span className="flex items-center gap-1"><Users size={12} /> 2</span>
                </div>
              </div>
            </div>

            {/* 15. Budín de pan casero - PREMIUM */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden h-full flex flex-col w-full text-left border border-border">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&q=80" alt="Budín de pan casero" className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5"><Lock size={14} className="text-muted-foreground" /></div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">Dulce</span>
                <h2 className="font-display text-base text-foreground mb-3 flex-1 leading-snug">Budín de pan casero</h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12} /> 30 min</span>
                  <span className="flex items-center gap-1"><Users size={12} /> 8</span>
                </div>
              </div>
            </div>

            {/* 16. Galletitas de avena y banana - PREMIUM */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden h-full flex flex-col w-full text-left border border-border">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&q=80" alt="Galletitas de avena y banana" className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5"><Lock size={14} className="text-muted-foreground" /></div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">Dulce</span>
                <h2 className="font-display text-base text-foreground mb-3 flex-1 leading-snug">Galletitas de avena y banana</h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock size={12} /> 25 min</span>
                  <span className="flex items-center gap-1"><Users size={12} /> 20</span>
                  <span className="flex items-center gap-1 text-secondary"><Snowflake size={12} /> Freezable</span>
                </div>
              </div>
            </div>

          </div>

          <p className="text-center text-muted-foreground mt-12 text-sm">
            Cada mes recibís <strong className="text-foreground">40 recetas nuevas</strong> con el Club. Estas son solo un ejemplo.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Recetas;
