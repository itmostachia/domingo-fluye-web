export interface RecetarioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  type: "free" | "paid";
  price?: string;
  mpLink?: string;
  category: "Congelados" | "Viandas" | "Dulces" | "Meal Prep" | "Express";
}

export const recetariosCategories = ["Todos", "Congelados", "Viandas", "Dulces", "Meal Prep", "Express"] as const;
export type RecetarioCategory = (typeof recetariosCategories)[number];

export const recetariosData: RecetarioItem[] = [
  {
    id: "snacks-saludables",
    title: "Snacks Saludables para toda la Familia",
    description: "20 ideas rápidas y nutritivas para la merienda y el cole. Sin azúcar agregada.",
    image: "/lovable-uploads/8b1153a5-b702-4d7c-9ac1-ff9c93d9c4a1.webp",
    type: "free",
    category: "Express",
  },
  {
    id: "batch-cooking-express",
    title: "Batch Cooking Express: 20 recetas en 60 min",
    description: "Organizá toda la semana cocinando solo 1 hora el domingo. Incluye lista de compras.",
    image: "/lovable-uploads/e9035ab4-cc26-4711-b767-9750ea572112.webp",
    type: "paid",
    price: "$2.990",
    mpLink: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=test1",
    category: "Meal Prep",
  },
  {
    id: "postres-sin-horno",
    title: "Postres Sin Horno para Principiantes",
    description: "15 recetas dulces fáciles que no necesitan horno. Perfectas para hacer con chicos.",
    image: "/lovable-uploads/c489ce18-16b7-4b89-9ad0-3b924a7adf22.webp",
    type: "free",
    category: "Dulces",
  },
  {
    id: "meal-prep-freezer",
    title: "Meal Prep & Freezer: Guía Definitiva",
    description: "Todo lo que necesitás saber para congelar comida casera. 25 recetas aptas freezer.",
    image: "/lovable-uploads/4535cfa5-605f-4a25-9ef6-3803419aca0f.webp",
    type: "paid",
    price: "$3.490",
    mpLink: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=test2",
    category: "Congelados",
  },
  {
    id: "viandas-escolares",
    title: "Viandas Escolares Creativas",
    description: "30 ideas de viandas equilibradas que los chicos realmente comen. Con tips de conservación.",
    image: "/lovable-uploads/1e4c3d8b-3d64-451d-829c-1f0931a6621f.webp",
    type: "free",
    category: "Viandas",
  },
  {
    id: "tortas-faciles",
    title: "Tortas Fáciles para Cumpleaños",
    description: "10 tortas espectaculares que cualquiera puede hacer. Paso a paso con fotos.",
    image: "/lovable-uploads/bbd10e5a-f7eb-4603-8ef3-ee7c81666b3d.jpg",
    type: "paid",
    price: "$1.990",
    mpLink: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=test3",
    category: "Dulces",
  },
];
