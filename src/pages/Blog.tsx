import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  return (
    <Layout>
      <SEOHead
        title="Blog — Cocina en Flor"
        description="Tips, guías y consejos para organizar tu cocina semanal y reducir la carga mental. Meal prep, freezer, planificación."
        path="/blog"
      />
      <section className="section-padding pt-24 md:pt-32">
        <div className="container-wide">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl text-foreground text-center mb-4">
              Blog
            </h1>
            <p className="text-muted-foreground text-center text-lg mb-12 max-w-xl mx-auto">
              Ideas, tips y guías para que tu semana fluya sin caos.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {blogPosts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.1}>
                <Link to={`/blog/${post.slug}`} className="block h-full">
                  <motion.article
                    className="bg-card rounded-2xl overflow-hidden shadow-card h-full flex flex-col border border-border hover:border-primary/30 transition-colors"
                    whileHover={{ y: -4, boxShadow: "var(--shadow-warm)" }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Cover placeholder */}
                    <div className={`w-full h-36 ${post.coverColor}`} />

                    <div className="p-7 flex flex-col flex-1">
                      <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">{post.tag}</span>
                      <h2 className="font-display text-xl text-foreground mb-2">{post.title}</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                        <span className="text-sm font-semibold text-primary hover:text-vino transition-colors">
                          Leer más →
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
