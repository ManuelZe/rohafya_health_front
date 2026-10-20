import { HttpErrorResponse } from '@angular/common/http';
import { Lang } from './lang/lang';

const MESSAGE_KEYS = ['message', 'Message', 'Message ', 'msg', 'detail', 'error'] as const;

const FALLBACK: Record<Lang, string> = {
  fr: "L'envoi a échoué. Réessayez, ou écrivez-nous sur WhatsApp.",
  en: 'Sending failed. Please try again, or write to us on WhatsApp.',
};

const NETWORK: Record<Lang, string> = {
  fr: 'Serveur injoignable. Vérifiez votre connexion internet.',
  en: 'Could not reach the server. Check your internet connection.',
};

const SERVER_ERROR: Record<Lang, string> = {
  fr: 'Le serveur a rencontré une erreur. Réessayez plus tard.',
  en: 'The server ran into an error. Please try again later.',
};

const TOO_MANY: Record<Lang, string> = {
  fr: 'Trop de tentatives. Patientez un instant puis réessayez.',
  en: 'Too many attempts. Please wait a moment and try again.',
};

/** Message lisible contenu dans le corps d'une réponse de l'API, ou null. */
function apiMessage(body: unknown): string | null {
  if (typeof body === 'string') {
    const text = body.trim();
    return text && !text.startsWith('<') && text.length <= 300 ? text : null;
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  const record = body as Record<string, unknown>;
  for (const key of MESSAGE_KEYS) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) return value;
  }
  return null;
}

/** Message à afficher pour une erreur d'appel à l'API (formulaire de demande de démo). */
export function extractErrorMessage(err: unknown, lang: Lang): string {
  if (err instanceof HttpErrorResponse) {
    if (err.status === 0) return NETWORK[lang];
    if (err.status === 429) return TOO_MANY[lang];
    if (err.status >= 500) return SERVER_ERROR[lang];
    return apiMessage(err.error) ?? FALLBACK[lang];
  }
  return FALLBACK[lang];
}
