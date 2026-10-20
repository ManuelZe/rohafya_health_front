import { Bilingual } from './lang/lang';

/** Contenu partagé entre les pages (accueil et devis) : en-tête, pied de page, formulaire. */

/** Enum partagé avec l'API (voir Rohafya/saas/trials.py, HEALTH_KINDS). */
export const DEMO_KINDS: { value: string; label: Bilingual }[] = [
  { value: 'clinique_privee', label: { fr: 'Clinique privée', en: 'Private clinic' } },
  { value: 'hopital_prive', label: { fr: 'Hôpital privé', en: 'Private hospital' } },
  { value: 'hopital_public', label: { fr: 'Hôpital public', en: 'Public hospital' } },
  { value: 'ministere_programme', label: { fr: 'Ministère ou programme de santé', en: 'Ministry or health programme' } },
  { value: 'reseau', label: { fr: 'Réseau multi-établissements', en: 'Multi-site network' } },
  { value: 'autre', label: { fr: 'Autre', en: 'Other' } },
];

export const WHATSAPP_NUMBER = '237695995842';
export const WHATSAPP_DISPLAY = '+237 695 995 842';

export const FOOTER = {
  tagline: { fr: 'ROHAFYA HEALTH — la gestion hospitalière, reliée.', en: 'ROHAFYA HEALTH — hospital management, connected.' } as Bilingual,
  privacyNote: {
    fr: 'Les informations transmises via ce formulaire servent uniquement à vous recontacter au sujet de ROHAFYA HEALTH. Elles ne sont ni revendues, ni utilisées à d’autres fins.',
    en: 'Information submitted through this form is only used to contact you about ROHAFYA HEALTH. It is never sold or used for any other purpose.',
  } as Bilingual,
};
