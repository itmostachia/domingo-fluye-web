import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
}

const SEOHead = ({ title, description, path = "" }: SEOHeadProps) => {
  const siteUrl = "https://cocinaenflor.com";
  const fullUrl = `${siteUrl}${path}`;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cocina en Flor",
    url: siteUrl,
    description: "Sistema mensual de planificación de comidas para familias argentinas.",
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

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={`${siteUrl}/lovable-uploads/76f52d05-8408-4a9c-9ae7-a23a4bb37168.png`} />
      <meta property="og:locale" content="es_AR" />
      <meta property="og:site_name" content="Cocina en Flor" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}/lovable-uploads/76f52d05-8408-4a9c-9ae7-a23a4bb37168.png`} />
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      {path === "" && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
