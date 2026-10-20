import { Bilingual } from '../shared/lang/lang';

/** Textes de la page « Demander un devis » (/devis, /en/devis). */

export const DEVIS_HERO = {
  kicker: { fr: 'Tarif ROHAFYA HEALTH', en: 'ROHAFYA HEALTH pricing' } as Bilingual,
  title: { fr: 'Obtenir un devis pour votre établissement', en: 'Get a quote for your facility' } as Bilingual,
  intro: {
    fr: 'Il n’y a pas de grille tarifaire unique : le prix dépend de la taille de votre établissement et des modules dont vous avez besoin. Remplissez le formulaire ci-dessous, nous revenons vers vous avec un chiffrage adapté.',
    en: 'There is no one-size-fits-all price list: cost depends on your facility’s size and the modules you need. Fill in the form below and we will get back to you with a tailored quote.',
  } as Bilingual,
};

export interface PricingFactor {
  icon: string;
  title: Bilingual;
  description: Bilingual;
}

export const PRICING_FACTORS: PricingFactor[] = [
  {
    icon: 'building',
    title: { fr: 'Taille de l’établissement', en: 'Facility size' },
    description: {
      fr: 'Nombre de lits et de services pour un établissement, ou de sites pour un réseau.',
      en: 'Number of beds and departments for a facility, or number of sites for a network.',
    },
  },
  {
    icon: 'th-large',
    title: { fr: 'Modules activés', en: 'Modules enabled' },
    description: {
      fr: 'Dossier patient, plateau technique, pharmacie et facturation, pilotage — selon ce dont vous avez besoin.',
      en: 'Patient record, lab & imaging, pharmacy and billing, oversight — based on what you actually need.',
    },
  },
  {
    icon: 'server',
    title: { fr: 'Hébergement', en: 'Hosting' },
    description: {
      fr: 'Sur vos propres serveurs ou dans un environnement dédié : le choix influe sur le devis.',
      en: 'On your own servers or in a dedicated environment: the choice affects the quote.',
    },
  },
  {
    icon: 'users',
    title: { fr: 'Accompagnement', en: 'Support & rollout' },
    description: {
      fr: 'Migration des données, formation des équipes, nombre de services à mettre en service.',
      en: 'Data migration, staff training, and the number of departments to roll out.',
    },
  },
];

export const DEVIS_NOTE: Bilingual = {
  fr: 'Le devis est établi après un premier échange : il n’y a pas de montant chiffré sans avoir compris votre établissement.',
  en: 'The quote is set after an initial conversation: we do not give a figure without first understanding your facility.',
};
