// Configuración central de Flor Sale — fuente única de verdad
// Si cambia algo (precio, fecha, links MP), modificar SOLO acá

export type PromoId = "flor_sale_recetarios" | "flor_sale_taller";

export interface PromoConfig {
  id: PromoId;
  title: string;
  shortName: string;
  /** Listado de items que incluye, en orden de impacto visual */
  items: { name: string; value: number; highlight?: boolean }[];
  /** Precio final en ARS */
  price: number;
  /** Suma de items por separado (para mostrar tachado y ahorro) */
  priceSeparate: number;
  /** Texto-resumen del beneficio (1 línea para card) */
  pitch: string;
  /** Link Mercado Pago */
  mpLink: string;
  /** Cuándo empieza esta promo (ART) */
  activeFrom: string; // ISO con offset
  /** Disclaimers para mostrar abajo de la card */
  disclaimers: string[];
  /** Color tema de la card (warm palette) */
  accent: "coral" | "miel" | "terracota";
}

export const FLOR_SALE = {
  campaignName: "Flor Sale",
  tagline: "Hot Sale del Club de los Domingos",
  /** Cuándo termina la campaña (fin Club mayo) */
  endDate: "2026-05-31T23:59:59-03:00",
  /** Cuándo empieza */
  startDate: "2026-05-03T00:00:00-03:00",
  currency: "ARS" as const,
} as const;

export const FLOR_SALE_END_MS = new Date(FLOR_SALE.endDate).getTime();
export const FLOR_SALE_START_MS = new Date(FLOR_SALE.startDate).getTime();

export const PROMO_RECETARIOS: PromoConfig = {
  id: "flor_sale_recetarios",
  title: "Combo Recetarios + Club Mayo",
  shortName: "Recetarios + Club",
  pitch:
    "Dos recetarios premium para resolver tu cocina invernal + el manual de mayo del Club, listo para arrancar este domingo.",
  items: [
    { name: "Recetario Otoño Invierno (PDF)", value: 16000 },
    { name: "Recetario Congelados (PDF)", value: 16000 },
    { name: "Manual del Club mes de mayo (PDF)", value: 7999, highlight: true },
  ],
  price: 20990,
  priceSeparate: 39999,
  mpLink:
    "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=272475647-ed62d440-93ef-4cca-9b7e-dc9c39951cbe",
  activeFrom: "2026-05-03T00:00:00-03:00",
  disclaimers: [
    "Acceso inmediato al pagar",
    "Te llega todo por email",
    "Pago único, sin renovación automática",
  ],
  accent: "coral",
};

export const PROMO_TALLER: PromoConfig = {
  id: "flor_sale_taller",
  title: "Combo Taller (grabación) + Club Mayo",
  shortName: "Taller + Club",
  pitch:
    "La grabación completa del taller \"¿Qué comemos hoy?\" + el manual de mayo del Club. Aprendé el método y aplicalo desde el primer domingo.",
  items: [
    { name: "Grabación Taller \"¿Qué comemos hoy?\"", value: 35000 },
    { name: "Manual del Club mes de mayo (PDF)", value: 7999, highlight: true },
  ],
  price: 20990,
  priceSeparate: 42999,
  mpLink:
    "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=272475647-50dbb26e-5c8a-485d-8915-276038af147a",
  activeFrom: "2026-05-08T00:00:00-03:00",
  disclaimers: [
    "Acceso inmediato a la grabación al pagar",
    "Te llega todo por email",
    "Pago único, sin renovación automática",
  ],
  accent: "miel",
};

export const PROMOS = [PROMO_RECETARIOS, PROMO_TALLER] as const;

const formatARS = (n: number) => `$${n.toLocaleString("es-AR")}`;

export function priceLabel(n: number) {
  return formatARS(n);
}

export function savingsLabel(p: PromoConfig) {
  return formatARS(p.priceSeparate - p.price);
}

export function savingsPercent(p: PromoConfig) {
  return Math.round(((p.priceSeparate - p.price) / p.priceSeparate) * 100);
}

export function isPromoActive(p: PromoConfig, now: number = Date.now()): boolean {
  const promoStart = new Date(p.activeFrom).getTime();
  return now >= promoStart && now < FLOR_SALE_END_MS;
}

export function isPromoLaunched(p: PromoConfig, now: number = Date.now()): boolean {
  const promoStart = new Date(p.activeFrom).getTime();
  return now >= promoStart;
}

export function isSaleActive(now: number = Date.now()): boolean {
  return now >= FLOR_SALE_START_MS && now < FLOR_SALE_END_MS;
}

export function getTimeUntilSaleEnd(now: number = Date.now()) {
  const total = Math.max(0, FLOR_SALE_END_MS - now);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { total, days, hours, minutes, seconds, hasEnded: total === 0 };
}

export function getTimeUntilPromoLaunch(p: PromoConfig, now: number = Date.now()) {
  const launchMs = new Date(p.activeFrom).getTime();
  const total = Math.max(0, launchMs - now);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  return { total, days, hours, minutes, hasLaunched: total === 0 };
}

/**
 * Contador determinista de "X compraron en últimas 24hs" para social proof.
 * Determinista por día para que todos vean el mismo número.
 */
export function getRecentBuyersCount(now: number = Date.now()): number {
  const dayMs = 24 * 60 * 60 * 1000;
  const startOfDay = Math.floor(now / dayMs);
  // Pseudo-random determinista entre 38-72
  const seed = (startOfDay * 9301 + 49297) % 233280;
  const rnd = seed / 233280;
  return Math.floor(38 + rnd * 35);
}
