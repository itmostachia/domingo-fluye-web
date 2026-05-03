import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  /** Imagen Open Graph (URL absoluta o path relativo) */
  image?: string;
  /** Keywords adicionales para meta keywords */
  keywords?: string;
  /** Schema.org JSON-LD adicional (Product, Offer, Event, etc) */
  schemaJsonLd?: object | object[];
}

const DEFAULT_OG = "/lovable-uploads/76f52d05-8408-4a9c-9ae7-a23a4bb37168.png";

const SEOHead = ({ title, description, path = "", image, keywords, schemaJsonLd }: SEOHeadProps) => {
  const siteUrl = "https://cocinaenflor.com.ar";
  const fullUrl = `${siteUrl}${path}`;
  const ogImage = image
    ? (image.startsWith("http") ? image : `${siteUrl}${image}`)
    : `${siteUrl}${DEFAULT_OG}`;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cocina en Flor",
    url: siteUrl,
    description: "Sistema mensual de planificación de comidas para familias argentinas. Cocinás el domingo en 90 min y resolvés la semana entera.",
    logo: `${siteUrl}/lovable-uploads/76f52d05-8408-4a9c-9ae7-a23a4bb37168.png`,
    sameAs: [
      "https://www.instagram.com/cocina.en.flor",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Es para principiantes en la cocina?",
        acceptedAnswer: { "@type": "Answer", text: "Sí. Las recetas son simples, con ingredientes comunes y pasos claros." },
      },
      {
        "@type": "Question",
        name: "¿Puedo cancelar cuando quiera?",
        acceptedAnswer: { "@type": "Answer", text: "Sí. Cancelás desde tu cuenta, sin preguntas ni trámites." },
      },
      {
        "@type": "Question",
        name: "¿Cuánto tiempo lleva cocinar todo el domingo?",
        acceptedAnswer: { "@type": "Answer", text: "Aproximadamente 90 minutos." },
      },
    ],
  };

  const schemas: object[] = [organizationSchema];
  if (path === "") schemas.push(faqSchema);
  if (schemaJsonLd) {
    if (Array.isArray(schemaJsonLd)) schemas.push(...schemaJsonLd);
    else schemas.push(schemaJsonLd);
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="es_AR" />
      <meta property="og:site_name" content="Cocina en Flor" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
