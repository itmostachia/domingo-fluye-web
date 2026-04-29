import { lazy, Suspense } from "react";
import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import Marquee from "@/components/Marquee";
import SEOHead from "@/components/SEOHead";
import WorkshopBanner from "@/components/taller/WorkshopBanner";

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
        title="Cocina en Flor | El Club de los Domingos - Resolvé tu semana en 90 min"
        description="Un sistema mensual para cocinar en 90 minutos y olvidarte del caos de la semana. +40 recetas por mes, lista de compras y soporte."
      />
      <HeroSection />
      <WorkshopBanner />
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
