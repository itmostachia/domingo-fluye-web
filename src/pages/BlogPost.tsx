import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { useParams, useNavigate, Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Layout>
        <SEOHead title="Artículo no encontrado — Cocina en Flor" description="" path={`/blog/${slug}`} />
        <section className="section-padding pt-24 md:pt-32 text-center">
          <div className="container-wide max-w-2xl mx-auto">
            <h1 className="font-display text-3xl text-foreground mb-4">Artículo no encontrado 😕</h1>
            <p className="text-muted-foreground mb-8">No pudimos encontrar el artículo que buscás.</p>
            <Button onClick={() => navigate("/blog")}>Volver al Blog</Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title={`${post.title} — Cocina en Flor`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
      />

      {/* Hero with full-width image */}
      <div className="relative w-full h-[40vh] min-h-[360px] max-h-[500px] overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Content over image */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 md:pb-12">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-foreground/70 hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft size={14} /> Volver al Blog
            </Link>
            <span className="block text-xs font-bold uppercase tracking-[0.15em] text-primary mb-3">
              {post.tag}
            </span>
            <h1 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-3">
              {post.title}
            </h1>
            <p className="text-muted-foreground text-sm">{post.date}</p>
          </div>
        </div>
      </div>

      {/* Article content */}
      <section className="py-12 md:py-16">
        <div
          className="prose prose-lg md:prose-xl max-w-3xl mx-auto px-4
            prose-headings:font-display prose-headings:text-foreground prose-headings:mt-10 prose-headings:mb-4
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-strong:text-foreground
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:not-italic prose-blockquote:font-medium
            prose-figcaption:text-center prose-figcaption:text-xs prose-figcaption:text-muted-foreground
            prose-img:rounded-xl prose-img:shadow-card
            prose-li:text-muted-foreground
            prose-ol:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CRO Upsell Banner */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-3xl mx-auto px-4 mt-16">
            <div className="rounded-2xl border-2 border-primary/20 bg-card shadow-warm-lg p-8 md:p-10 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                <Sparkles size={24} className="text-primary" />
              </div>
              <h3 className="font-display text-xl md:text-2xl text-foreground">
                ¿Te sirvió este consejo?
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                Imaginate tener <strong className="text-foreground">toda tu semana resuelta</strong>. Recetas, listas de compras y guías paso a paso, listas para vos.
              </p>
              <Button
                size="lg"
                className="font-semibold text-base mt-2"
                onClick={() => navigate("/planes")}
              >
                Quiero unirme al Club 🌸
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </Layout>
  );
};

export default BlogPost;
