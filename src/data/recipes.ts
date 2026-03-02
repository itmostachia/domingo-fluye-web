export type Categoria = "Todas" | "Pollo" | "Carne" | "Vegano" | "Express" | "Pastas" | "Dulce";

export interface Receta {
  title: string;
  time: string;
  servings: string;
  freezable: boolean;
  tag: Categoria;
  image: string;
  isPremium: boolean;
  ingredients?: string[];
  steps?: string[];
}

export { recetas, categorias } from "@/components/recetas/recetasData";
