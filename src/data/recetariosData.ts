export interface RecetarioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  type: "free" | "paid";
  price?: string;
  mpLink?: string;
  category: RecetarioCategory;
  downloads: number;
  rating: number;
  reviews: number;
  featured?: boolean;
  sourceId: string;
}

export const recetariosCategories = ["Todos", "Congelados", "Estacional"] as const;
export type RecetarioCategory = (typeof recetariosCategories)[number] | "Todos";

export const recetariosData: RecetarioItem[] = [
  {
    id: "recetariootonio",
    title: "Recetario Otoño Invierno",
    description: "Recetas reconfortantes y nutritivas para los meses fríos. Guisos, sopas y platos de cuchara.",
    image: "/lovable-uploads/8b1153a5-b702-4d7c-9ac1-ff9c93d9c4a1.webp",
    type: "paid",
    price: "$4.990 ARS",
    mpLink: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=272475647-15924c6b-a845-467b-8227-9c17ff041350",
    category: "Estacional",
    downloads: 870,
    rating: 4.9,
    reviews: 156,
    featured: true,
    sourceId: "recetariootonio",
  },
  {
    id: "recetariocongelados",
    title: "Recetario Congelado",
    description: "Todo lo que necesitás saber para congelar comida casera. 25 recetas aptas freezer.",
    image: "/lovable-uploads/4535cfa5-605f-4a25-9ef6-3803419aca0f.webp",
    type: "paid",
    price: "$8.550 ARS",
    mpLink: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=272475647-fd6d480e-9abb-4983-8954-ceb5ff740a9b",
    category: "Congelados",
    downloads: 650,
    rating: 4.9,
    reviews: 134,
    sourceId: "recetariocongelados",
  },
  {
    id: "recetarioprimavera",
    title: "Recetario Primavera",
    description: "Recetas frescas y ligeras para disfrutar de la nueva estación. Ensaladas, wraps y más.",
    image: "/lovable-uploads/e9035ab4-cc26-4711-b767-9750ea572112.webp",
    type: "free",
    category: "Estacional",
    downloads: 1580,
    rating: 4.8,
    reviews: 203,
    sourceId: "recetario_gratis_primavera",
  },
  {
    id: "recetarioverano",
    title: "Recetario Verano",
    description: "Sabores vibrantes y refrescantes para los días de sol. Sin horno, sin complicaciones.",
    image: "/lovable-uploads/c489ce18-16b7-4b89-9ad0-3b924a7adf22.webp",
    type: "free",
    category: "Estacional",
    downloads: 1240,
    rating: 4.8,
    reviews: 89,
    sourceId: "recetario_gratis_verano",
  },
];
