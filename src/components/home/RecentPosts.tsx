import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";

const RecentPosts = () => {
  const recent = blogPosts.slice(0, 3);

  return (
    <section className="section-padding relative">
      <div className="container-wide">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl text-foreground text-center mb-2">
            Recursos para una cocina sin estrés
          </h2>
          <p className="text-muted-foreground text-center text-lg mb-10 max-w-xl mx-auto">
            Ideas, tips y guías del blog.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {recent.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.08}>
              <Link to={`/blog/${post.slug}`} className="block h-full group">
                <motion.article
                  className="bg-card rounded-2xl overflow-hidden shadow-card h-full flex flex-col border border-border hover:border-primary/30 transition-colors"
                  whileHover={{ y: -4, boxShadow: "var(--shadow-warm)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-full aspect-[16/9] overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-2">
                      {post.tag}
                    </span>
                    <h3 className="font-display text-base text-foreground mb-2 leading-snug flex-1">
                      {post.title}
                    </h3>
                    <span className="text-sm font-semibold text-primary group-hover:text-vino transition-colors">
                      Leer más →
                    </span>
                  </div>
                </motion.article>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/blog">Leer más artículos →</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default RecentPosts;
