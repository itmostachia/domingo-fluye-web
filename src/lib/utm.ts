// Captura y persistencia de parametros UTM para atribucion de campanas

const STORAGE_KEY = 'cef_utm';

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'] as const;

type UTMData = Partial<Record<typeof UTM_PARAMS[number], string>>;

/**
 * Lee UTM params de la URL y los guarda en localStorage (last-touch attribution).
 * Llamar una vez al iniciar la app.
 */
export function captureUTMParams(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const utm: UTMData = {};
    let hasAny = false;

    for (const key of UTM_PARAMS) {
      const val = params.get(key);
      if (val) {
        utm[key] = val;
        hasAny = true;
      }
    }

    // Solo sobreescribir si hay al menos un param (last-touch)
    if (hasAny) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
    }
  } catch {
    // localStorage no disponible (incognito, etc.) — silencioso
  }
}

/**
 * Retorna los UTM guardados o un objeto vacio.
 * Seguro para spread en objetos de upsert/webhook.
 */
export function getUTMData(): UTMData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UTMData;
  } catch {
    return {};
  }
}

/**
 * Limpia los UTM guardados. Llamar despues de Purchase para evitar atribucion stale.
 */
export function clearUTMData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // silencioso
  }
}
