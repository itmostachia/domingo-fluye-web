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
    price: "$16.000 ARS",
    mpLink: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=272475647-63294f4d-7f02-4c78-834d-9545717a0dce",
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
    price: "$16.000 ARS",
    mpLink: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=272475647-3c4cab40-51d1-4432-a31f-ece75a7a930d",
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
    type: "paid",
    price: "$4.990 ARS",
    mpLink: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=272475647-e3244c14-6ed9-447c-91dc-5e820cf846a6",
    category: "Estacional",
    downloads: 1580,
    rating: 4.8,
    reviews: 203,
    sourceId: "recetarioprimavera",
  },
  {
    id: "recetarioverano",
    title: "Recetario Verano",
    description: "Sabores vibrantes y refrescantes para los días de sol. Sin horno, sin complicaciones.",
    image: "/lovable-uploads/f9b92b86-7c53-4cef-84c6-37a438766e1e.png",
    type: "paid",
    price: "$4.990 ARS",
    mpLink: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=272475647-ff9bb11f-548d-4241-8227-4f8054c0a2a9",
    category: "Estacional",
    downloads: 1240,
    rating: 4.8,
    reviews: 89,
    sourceId: "recetarioverano",
  },
];
