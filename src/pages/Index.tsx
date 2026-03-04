import { lazy, Suspense } from "react";
import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import Marquee from "@/components/Marquee";
import SEOHead from "@/components/SEOHead";

const PainPoints = lazy(() => import("@/components/home/PainPoints"));
const SectionConnector = lazy(() => import("@/components/SectionConnector"));
const BeforeAfter = lazy(() => import("@/components/home/BeforeAfter"));
const RitualSection = lazy(() => import("@/components/home/RitualSection"));
const HowItWorks = lazy(() => import("@/components/home/HowItWorks"));
const WhatIncludes = lazy(() => import("@/components/home/WhatIncludes"));
const FeaturedRecipes = lazy(() => import("@/components/home/FeaturedRecipes"));
const CreatorStory = lazy(() => import("@/components/home/CreatorStory"));
const PriceContrast = lazy(() => import("@/components/home/PriceContrast"));
const PricingSection = lazy(() => import("@/components/home/PricingSection"));
const RecetariosCarousel = lazy(() => import("@/components/home/RecetariosCarousel"));
const WhoIsItFor = lazy(() => import("@/components/home/WhoIsItFor"));
const Testimonials = lazy(() => import("@/components/home/Testimonials"));
const RecentPosts = lazy(() => import("@/components/home/RecentPosts"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));

const SectionFallback = () => (
  <div className="min-h-[40vh]" aria-hidden="true" />
);

const Index = () => {
  return (
    <Layout>
      <SEOHead
        title="Cocina en Flor — Organizá tu semana cocinando en 90 minutos"
        description="Sistema mensual de planificación de comidas para familias. 40 recetas, listas de compras inteligentes, sistema freezer. Cocinás el domingo, resolvés la semana."
      />
      <HeroSection />
      <Marquee />
      <Suspense fallback={<SectionFallback />}>
        <PainPoints />
        <SectionConnector variant="arrow" color="coral" />
        <BeforeAfter />
        <SectionConnector variant="dots" color="miel" />
        <RitualSection />
        <HowItWorks />
        <WhatIncludes />
        <FeaturedRecipes />
        <CreatorStory />
        <PriceContrast />
        <SectionConnector variant="wave" color="terracota" />
        <PricingSection />
        <RecetariosCarousel />
        <WhoIsItFor />
        <Testimonials />
        <RecentPosts />
        <SectionConnector variant="dots" color="verde-pizarra" />
        <FAQSection />
      </Suspense>
    </Layout>
  );
};

export default Index;
