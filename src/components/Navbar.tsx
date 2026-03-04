import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, LogIn, LogOut, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo-cocina-en-flor.png";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseReal";

const navItems = [
  { label: "Cómo funciona", href: "/como-funciona" },
  { label: "Planes", href: "/planes" },
  { label: "Recetarios", href: "/recetarios" },
  { label: "Recetas", href: "/recetas" },
  { label: "Mi Club ✨", href: "/mi-club" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contacto", href: "/contacto" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/80 backdrop-blur-xl shadow-warm border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="container-wide flex items-center justify-between py-3.5">
        <Link to="/" className="group flex items-center gap-2">
          <img src={logoImg} alt="Cocina en Flor" className="h-9 md:h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === item.href
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {!isLoading && (
            user ? (
              <button
                onClick={async () => { await supabase.auth.signOut(); window.location.href = '/'; }}
                className="ml-2 text-sm font-medium px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors flex items-center gap-1.5"
              >
                <LogOut size={14} />
                Cerrar sesión
              </button>
            ) : (
              <>
                <Link
                  to={user ? "/mi-club" : "/login"}
                  className={`ml-2 text-sm font-medium px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                    user
                      ? "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {user ? (
                    <>
                      <Sparkles size={14} />
                      Ir a Mi Club
                    </>
                  ) : (
                    <>
                      <LogIn size={14} />
                      Ingresar
                    </>
                  )}
                </Link>
                {!user && (
                  <Link
                    to="/planes"
                    className="group ml-3 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-vino transition-all duration-300 shadow-cta hover:shadow-glow flex items-center gap-1.5"
                  >
                    Quiero unirme
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                )}
              </>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground rounded-lg hover:bg-muted/50 transition-colors"
          aria-label="Menú"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-card/95 backdrop-blur-xl border-t border-border/50 overflow-hidden"
          >
            <div className="container-wide py-4 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.href}
                    className={`block py-2.5 px-3 rounded-lg text-base font-medium transition-colors ${
                      location.pathname === item.href
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
               <motion.div
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: navItems.length * 0.05 }}
               >
               {!isLoading && (
                   user ? (
                     <button
                       onClick={async () => { await supabase.auth.signOut(); window.location.href = '/'; }}
                       className="block w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                     >
                       Cerrar sesión
                     </button>
                   ) : (
                     <Link
                       to="/login"
                       className="block py-2.5 px-3 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground"
                     >
                       Ingresar
                     </Link>
                   )
                 )}
               </motion.div>
              {!user && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navItems.length + 1) * 0.05 }}
                >
                  <Link
                    to="/planes"
                    className="mt-2 block bg-primary text-primary-foreground px-5 py-3.5 rounded-xl text-center font-semibold shadow-cta"
                  >
                    Quiero unirme
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
