import { PageSeo } from '../shared/seo/seo.service';
import { SITE_URL } from '../shared/seo/site';
import { Lang } from '../shared/lang/lang';

const COPY: Record<Lang, { title: string; description: string }> = {
  fr: {
    title: 'Demander un devis — ROHAFYA HEALTH',
    description:
      'Le tarif de ROHAFYA HEALTH dépend de la taille de l’établissement et des modules activés. Remplissez le formulaire pour recevoir un devis adapté.',
  },
  en: {
    title: 'Request a quote — ROHAFYA HEALTH',
    description: 'ROHAFYA HEALTH pricing depends on facility size and the modules enabled. Fill in the form to receive a tailored quote.',
  },
};

/** Référencement de la page « Demander un devis », dans la langue de la page. */
export function devisSeo(lang: Lang): PageSeo {
  const path = lang === 'en' ? '/en/devis' : '/devis';
  const copy = COPY[lang];
  return {
    title: copy.title,
    description: copy.description,
    path,
    locale: lang === 'en' ? 'en_GB' : 'fr_FR',
    alternates: { fr: '/devis', en: '/en/devis' },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${SITE_URL}${path}`,
      url: `${SITE_URL}${path}`,
      name: copy.title,
      description: copy.description,
      inLanguage: lang,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
  };
}
