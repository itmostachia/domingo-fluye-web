import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabaseReal";
import { Loader2, Gift, ShoppingCart, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { recetariosData, recetariosCategories, type RecetarioItem, type RecetarioCategory } from "@/data/recetariosData";

type TypeFilter = "Todos" | "Gratuitos" | "Premium";

const Recetarios = () => {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("Todos");
  const [catFilter, setCatFilter] = useState<RecetarioCategory>("Todos");
  const [selected, setSelected] = useState<RecetarioItem | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const filtered = recetariosData.filter((r) => {
    if (typeFilter === "Gratuitos" && r.type !== "free") return false;
    if (typeFilter === "Premium" && r.type !== "paid") return false;
    if (catFilter !== "Todos" && r.category !== catFilter) return false;
    return true;
  });

  const resetForm = () => { setName(""); setEmail(""); setError(""); setLoading(false); };

  const handleOpenChange = (open: boolean) => {
    if (!open) { setSelected(null); resetForm(); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    if (!name.trim() || !email.trim()) { setError("Completá todos los campos."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Ingresá un email válido."); return; }

    setLoading(true);
    setError("");

    const source = selected.type === "free"
      ? `recetario_gratis_${selected.id}`
      : `checkout_recetario_${selected.id}`;

    const { error: dbError } = await supabase.from("email_leads").insert({
      name: name.trim(),
      email: email.trim(),
      source,
    });

    if (dbError) { setError("Hubo un error, intentá de nuevo."); setLoading(false); return; }

    if (selected.type === "free") {
      toast({ title: "¡Enviado!", description: "Revisá tu correo para descargar tu recetario." });
      setSelected(null);
      resetForm();
    } else if (selected.mpLink) {
      window.location.href = selected.mpLink;
    }
  };

  const typeFilters: TypeFilter[] = ["Todos", "Gratuitos", "Premium"];

  return (
    <Layout>
      <SEOHead
        title="Recetarios Especiales — Cocina en Flor"
        description="Descargá recetarios gratuitos o accedé a ediciones premium. Congelados, viandas, dulces y más."
        path="/recetarios"
      />

      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <BookOpen size={16} />
              Colecciones temáticas
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Recetarios de Cocina en Flor
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Descargá recetarios gratuitos o accedé a ediciones premium con recetas únicas para transformar tu cocina día a día.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-6 px-4">
        <div className="max-w-5xl mx-auto space-y-4">
          <ScrollReveal delay={0.1}>
            {/* Type filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {typeFilters.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                    typeFilter === t
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            {/* Category filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {recetariosCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCatFilter(c)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all border ${
                    catFilter === c
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-transparent text-muted-foreground border-border/60 hover:border-accent/50"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((r) => (
                <motion.div
                  key={r.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="group rounded-2xl overflow-hidden bg-card border border-border/60 shadow-sm hover:shadow-warm transition-all duration-300 h-full flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={r.image}
                        alt={r.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <Badge
                        className={`absolute top-3 right-3 text-xs font-bold shadow-md ${
                          r.type === "free"
                            ? "bg-green-600 text-white hover:bg-green-600"
                            : "bg-primary text-primary-foreground hover:bg-primary"
                        }`}
                      >
                        {r.type === "free" ? "Gratis" : r.price}
                      </Badge>
                      <Badge variant="secondary" className="absolute top-3 left-3 text-xs">
                        {r.category}
                      </Badge>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display text-lg text-foreground mb-1.5 leading-snug">
                        {r.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2">
                        {r.description}
                      </p>
                      <Button
                        onClick={() => setSelected(r)}
                        variant={r.type === "free" ? "outline" : "default"}
                        className="w-full gap-2"
                      >
                        {r.type === "free" ? (
                          <><Gift size={16} /> Descargar gratis</>
                        ) : (
                          <><ShoppingCart size={16} /> Comprar {r.price}</>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16 text-lg">
              No hay recetarios en esta categoría aún. ¡Pronto habrá más!
            </p>
          )}
        </div>
      </section>

      {/* Lead capture dialog */}
      <Dialog open={!!selected} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {selected?.type === "free" ? "Descargar" : "Comprar"} {selected?.title}
            </DialogTitle>
            <DialogDescription>
              Ingresá tus datos para {selected?.type === "free" ? "recibir el recetario en tu correo" : "continuar con el pago"}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div>
              <label htmlFor="rec-name" className="text-sm font-medium text-foreground mb-1.5 block">Nombre</label>
              <Input id="rec-name" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} maxLength={100} />
            </div>
            <div>
              <label htmlFor="rec-email" className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <Input id="rec-email" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} maxLength={255} />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...</>
              ) : selected?.type === "free" ? "Descargar Gratis" : "Continuar al pago"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Recetarios;
