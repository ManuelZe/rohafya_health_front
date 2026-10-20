import { PageSeo } from '../shared/seo/seo.service';
import { SITE_NAME, SITE_URL } from '../shared/seo/site';
import { Lang } from '../shared/lang/lang';
import { FAQ } from './home.content';

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

const COPY: Record<Lang, { title: string; description: string; slogan: string }> = {
  fr: {
    title: 'ROHAFYA HEALTH — Progiciel de gestion hospitalière',
    description:
      "Dossier patient, plateau technique, pharmacie, facturation et pilotage multi-établissements réunis dans un seul système. Demandez une démonstration.",
    slogan: 'La gestion hospitalière, reliée.',
  },
  en: {
    title: 'ROHAFYA HEALTH — Hospital management software',
    description:
      'Patient records, lab and imaging, pharmacy, billing and multi-site oversight brought together in one system. Request a demo.',
    slogan: 'Hospital management, connected.',
  },
};

/** Référencement de la page d'accueil, dans la langue de la page (/ en français, /en en anglais). */
export function homeSeo(lang: Lang): PageSeo {
  const path = lang === 'en' ? '/en' : '/';
  const copy = COPY[lang];
  return {
    title: copy.title,
    description: copy.description,
    path,
    locale: lang === 'en' ? 'en_GB' : 'fr_FR',
    alternates: { fr: '/', en: '/en' },
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': ORGANIZATION_ID,
          name: SITE_NAME,
          url: SITE_URL,
          logo: `${SITE_URL}/rohafya-logo.png`,
          slogan: copy.slogan,
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
          inLanguage: ['fr', 'en'],
          publisher: { '@id': ORGANIZATION_ID },
        },
        {
          '@type': 'FAQPage',
          '@id': `${SITE_URL}${path}#faq`,
          inLanguage: lang,
          mainEntity: FAQ.map((item) => ({
            '@type': 'Question',
            name: item.question[lang],
            acceptedAnswer: { '@type': 'Answer', text: item.answer[lang] },
          })),
        },
      ],
    },
  };
}
