// Wrapper tipado para Meta Pixel (fbq)
// Falla silenciosamente si el pixel esta bloqueado por adblocker

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function fbq(...args: unknown[]): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(...args);
  }
}

export function trackInitiateCheckout(value = 7990, currency = 'ARS'): void {
  fbq('track', 'InitiateCheckout', { value, currency });
}

export function trackLead(contentName?: string): void {
  fbq('track', 'Lead', contentName ? { content_name: contentName } : undefined);
}

export function trackPurchase(value = 7990, currency = 'ARS'): void {
  fbq('track', 'Purchase', { value, currency, content_name: 'Club Suscripcion' });
}

export function trackViewContent(contentName: string): void {
  fbq('track', 'ViewContent', { content_name: contentName });
}
