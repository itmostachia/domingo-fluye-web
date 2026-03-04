import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseReal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Auto-redirect authenticated users to Mi Club
  useEffect(() => {
    if (!isLoading && user) {
      navigate("/mi-club");
    }
  }, [user, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin },
      });

      setLoading(false);

      if (authError) {
        const msg = authError.message || "Error desconocido";
        setError(msg);
        toast.error(`Error de autenticación: ${msg}`);
        console.error("Supabase OTP error:", authError);
      } else {
        setSent(true);
      }
    } catch (err: any) {
      setLoading(false);
      const msg = err?.message || "Error inesperado";
      setError(msg);
      toast.error(`Error inesperado: ${msg}`);
      console.error("Unexpected auth error:", err);
    }
  };

  return (
    <Layout>
      <SEOHead title="Ingresar | Cocina en Flor" description="Accedé al Club Cocina en Flor con tu enlace mágico." />
      <div className="min-h-screen flex items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-card border border-border/60 rounded-2xl shadow-warm p-8 md:p-10 text-center"
        >
          {!sent ? (
            <>
              <div className="mb-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-primary" />
                </div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                  Ingresar al Club 🌸
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Ingresá tu email y te enviaremos un enlace mágico para entrar, sin contraseñas.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-center h-12 rounded-xl"
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full h-12 rounded-xl text-base font-semibold shadow-cta"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Recibir enlace de acceso"
                  )}
                </Button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-display font-bold text-foreground mb-3">
                ✨ ¡Magia enviada!
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Revisá tu bandeja de entrada (y spam) para entrar.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Login;
