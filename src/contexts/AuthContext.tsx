import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const ADMIN_EMAILS = ['jcbertorello07@gmail.com', 'it@mostachia.com', 'hola@cocinaenflor.com.ar'];

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  hasAccess: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, isLoading: true, hasAccess: false });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const hasAccess = !!user?.email && ADMIN_EMAILS.includes(user.email);

  return (
    <AuthContext.Provider value={{ user, isLoading, hasAccess }}>
      {children}
    </AuthContext.Provider>
  );
};
