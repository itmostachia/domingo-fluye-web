import { useState } from "react";
import { z } from "zod";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Download, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseReal";
import { toast } from "sonner";

const emailSchema = z.object({
  name: z.string().trim().min(1, "Ingresá tu nombre").max(100),
  email: z.string().trim().email("Ingresá un email válido").max(255),
});

const Muestras = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = emailSchema.safeParse({ name, email });
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof typeof errors;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("email_leads")
        .insert({ name: result.data.name, email: result.data.email, source: "muestras" });

      if (error) throw error;
      setSuccess(true);
      toast.success("¡Listo! Te enviamos la muestra.");
    } catch {
      toast.error("Hubo un error. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Muestras gratis — Cocina en Flor"
        description="Descargá una muestra gratuita del manual mensual de Cocina en Flor. Probá el sistema antes de suscribirte."
        path="/muestras"
      />
      <section className="section-padding pt-24 md:pt-32">
        <div className="container-tight text-center">
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Probá antes de sumarte
          </h1>
          <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
            Descargá una muestra gratuita con recetas, lista de compras y calendario de una semana.
          </p>

          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-warm max-w-lg mx-auto border border-border">
            {success ? (
              <div className="text-center py-6">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="font-display text-2xl text-foreground mb-2">¡Listo!</h2>
                <p className="text-muted-foreground">
                  Revisá tu email. Te enviamos la muestra gratuita.
                </p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Download className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-display text-2xl text-foreground mb-2">Muestra gratuita</h2>
                <p className="text-muted-foreground mb-6">
                  Una semana del Club: 10 recetas, lista de compras y calendario.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                      Tu nombre
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej: María"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                      Tu email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold shadow-cta hover:bg-vino transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
                    ) : (
                      "Descargar muestra gratis"
                    )}
                  </button>
                </form>
                <p className="text-xs text-muted-foreground mt-3 text-center">Sin compromiso. Sin tarjeta.</p>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Muestras;
