import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseReal";
import { Loader2, Gift, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "@/components/ScrollReveal";
import { recetariosData, type RecetarioItem } from "@/data/recetariosData";

const RecetariosCarousel = () => {
  const [selected, setSelected] = useState<RecetarioItem | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const resetForm = () => {
    setName("");
    setEmail("");
    setError("");
    setLoading(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelected(null);
      resetForm();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;

    if (!name.trim() || !email.trim()) {
      setError("Completá todos los campos.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Ingresá un email válido.");
      return;
    }

    setLoading(true);
    setError("");

    const source =
      selected.type === "free"
        ? `recetario_gratis_${selected.id}`
        : `checkout_recetario_${selected.id}`;

    const { error: dbError } = await supabase.from("email_leads").insert({
      name: name.trim(),
      email: email.trim(),
      source,
    });

    if (dbError) {
      setError("Hubo un error, intentá de nuevo.");
      setLoading(false);
      return;
    }

    if (selected.type === "free") {
      toast({
        title: "¡Listo!",
        description: "Te enviamos el recetario a tu correo.",
      });
      setSelected(null);
      resetForm();
    } else if (selected.mpLink) {
      window.location.href = selected.mpLink;
    }
  };

  return (
    <section id="recetarios" className="py-20 md:py-28 bg-muted/30">
      <div className="container-wide">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              Bonus exclusivos
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Recetarios Especiales
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Descargá recetarios gratuitos o accedé a ediciones premium con recetas únicas para transformar tu cocina.
            </p>
          </div>
        </ScrollReveal>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {recetariosData.map((r) => (
              <CarouselItem key={r.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <ScrollReveal>
                  <div className="group rounded-2xl overflow-hidden bg-card border border-border/60 shadow-sm hover:shadow-warm transition-all duration-300 h-full flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={r.image}
                        alt={r.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span
                        className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-md ${
                          r.type === "free"
                            ? "bg-green-600 text-white"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {r.type === "free" ? "Gratis" : r.price}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display text-lg text-foreground mb-4 leading-snug flex-1">
                        {r.title}
                      </h3>
                      <Button
                        onClick={() => setSelected(r)}
                        variant={r.type === "free" ? "outline" : "default"}
                        className="w-full gap-2"
                      >
                        {r.type === "free" ? (
                          <>
                            <Gift size={16} />
                            Descargar gratis
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={16} />
                            Comprar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>
      </div>

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
              <label htmlFor="rec-name" className="text-sm font-medium text-foreground mb-1.5 block">
                Nombre
              </label>
              <Input
                id="rec-name"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                maxLength={100}
              />
            </div>
            <div>
              <label htmlFor="rec-email" className="text-sm font-medium text-foreground mb-1.5 block">
                Email
              </label>
              <Input
                id="rec-email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                maxLength={255}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : selected?.type === "free" ? (
                "Descargar Gratis"
              ) : (
                "Continuar al pago"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default RecetariosCarousel;
