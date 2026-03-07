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
    image: "/lovable-uploads/ba8654ab-7fd7-43a3-b07f-29a9fe1d0dca.jpg",
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
    image: "/lovable-uploads/a43b67f7-7dbd-43ad-b4f1-087a22f01dd2.jpg",
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
    image: "/lovable-uploads/9b02575c-3f9c-4302-8b67-0a31d2122224.jpg",
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
