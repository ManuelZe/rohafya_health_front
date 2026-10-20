import { Service, signal } from '@angular/core';

export type Lang = 'fr' | 'en';

/** Texte dans les deux langues du site ; `| bi` affiche celui de la langue courante. */
export interface Bilingual {
  fr: string;
  en: string;
}

/**
 * Langue de la page, fixée par l'adresse (/ en français, /en en anglais — voir lang.resolver.ts).
 * Pas de préférence mémorisée : chaque page est servie pré-rendue dans sa propre langue.
 */
@Service()
export class LangService {
  readonly current = signal<Lang>('fr');

  set(lang: Lang): void {
    this.current.set(lang);
  }
}
