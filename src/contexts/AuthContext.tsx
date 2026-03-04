import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const ADMIN_EMAILS = ['jcbertorello07@gmail.com', 'it@mostachia.com', 'hola@cocinaenflor.com.ar'];

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  hasAccess: boolean;
  status: string | null;
}

const AuthContext = createContext<AuthContextType>({ user: null, isLoading: true, hasAccess: false, status: null });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL ? "Configurada ✅" : "⚠️ Falta configuración");
  console.log("Supabase Key:", import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ? "Configurada ✅" : "⚠️ Falta configuración");
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("status")
      .eq("id", userId)
      .maybeSingle();
    setStatus(data?.status ?? null);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        await fetchProfile(currentUser.id);
      } else {
        setStatus(null);
      }
      setIsLoading(false);
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        await fetchProfile(currentUser.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isAdmin = !!user?.email && ADMIN_EMAILS.includes(user.email);
  const hasAccess = !!user && (status === 'active' || isAdmin);

  return (
    <AuthContext.Provider value={{ user, isLoading, hasAccess, status }}>
      {children}
    </AuthContext.Provider>
  );
};
