// Configuracion central del Taller — fuente unica de verdad
// Si cambia algo del taller (fecha/precio/link), modificar SOLO aca

export const WORKSHOP = {
  id: 'taller_7_mayo_2026',
  name: 'Taller "¿Qué comemos hoy?"',
  shortName: 'Taller en vivo',
  // Fecha exacta con offset Argentina (-3) — jueves 7 de mayo 20:00 ART
  date: '2026-05-07T20:00:00-03:00',
  dateLabel: 'Jueves 7 de mayo · 20:00 hs',
  dateLabelShort: '7 de mayo · 20 hs',
  duration: '1 a 2 horas',
  price: 35000,
  priceLabel: '$35.000',
  currency: 'ARS' as const,
  // Link de Mercado Pago directo (ya generado por el cliente)
  mpLink: 'https://mpago.li/1DTP4j5',
  // Cupos simulados (no reales) — initial - decay segun dias transcurridos
  cuposInicial: 25,
  cuposMinimo: 6,
  // Bonus
  bonusValue: 7990,
  bonusLabel: 'Mes de mayo en el Club del Domingo',
  bonusDetail: 'Acceso completo al Club hasta el 31 de mayo',
} as const;

export const WORKSHOP_DATE_MS = new Date(WORKSHOP.date).getTime();

/**
 * Calcula los cupos "disponibles" mostrados.
 * Algoritmo: arranca en cuposInicial, decae sutilmente con los dias hasta el evento.
 * Determinista (mismo numero para todos los visitantes el mismo dia).
 */
export function getCuposDisponibles(now: number = Date.now()): number {
  const msUntilEvent = WORKSHOP_DATE_MS - now;
  if (msUntilEvent <= 0) return WORKSHOP.cuposMinimo;

  const totalCampaign = 14 * 24 * 60 * 60 * 1000; // ventana de 14 dias
  const elapsed = Math.max(0, totalCampaign - msUntilEvent);
  const progress = Math.min(1, elapsed / totalCampaign);
  const range = WORKSHOP.cuposInicial - WORKSHOP.cuposMinimo;
  const cupos = Math.round(WORKSHOP.cuposInicial - range * progress);

  return Math.max(WORKSHOP.cuposMinimo, Math.min(WORKSHOP.cuposInicial, cupos));
}

export function getTimeUntilWorkshop(_now: number = Date.now()) {
  // Taller desactivado en toda la web — siempre retorna hasEnded:true
  return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0, hasEnded: true };
}
