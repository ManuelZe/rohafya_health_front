import { Bilingual } from '../shared/lang/lang';

/**
 * Textes du site de présentation de ROHAFYA HEALTH, en français et en anglais.
 * Discours volontairement mesuré : on décrit ce que fait la solution, pas de chiffres inventés
 * ni de promesses (certification, conformité légale précise...) qui ne sont pas vérifiées.
 */

export const NAV_LINKS: { id: string; label: Bilingual }[] = [
  { id: 'solution', label: { fr: 'La solution', en: 'The solution' } },
  { id: 'fonctionnalites', label: { fr: 'Fonctionnalités', en: 'Features' } },
  { id: 'securite', label: { fr: 'Sécurité', en: 'Security' } },
  { id: 'mise-en-oeuvre', label: { fr: 'Mise en œuvre', en: 'Getting started' } },
  { id: 'questions', label: { fr: 'Questions', en: 'FAQ' } },
];

export const DEMO_ANCHOR = 'demo';

export const HERO = {
  kicker: { fr: 'Progiciel de gestion hospitalière', en: 'Hospital management software' } as Bilingual,
  title: {
    fr: 'Un seul système pour piloter tout le parcours de soins',
    en: 'One system to run the whole care pathway',
  } as Bilingual,
  subtitle: {
    fr: "Admissions, consultations, plateau technique, pharmacie et facturation : ROHAFYA HEALTH relie chaque service autour d'un dossier patient unique, avec une vue en temps réel sur l'activité de l'établissement.",
    en: 'Admissions, consultations, lab and imaging, pharmacy and billing: ROHAFYA HEALTH connects every department around a single patient record, with a real-time view of the facility’s activity.',
  } as Bilingual,
  ctaPrimary: { fr: 'Demander une démonstration', en: 'Request a demo' } as Bilingual,
  ctaSecondary: { fr: 'Découvrir la solution', en: 'Explore the solution' } as Bilingual,
  highlights: [
    { fr: 'Dossier patient unique et partagé', en: 'A single, shared patient record' },
    { fr: 'Laboratoire, imagerie, pharmacie et facturation reliés', en: 'Lab, imaging, pharmacy and billing connected' },
    { fr: 'Déploiement progressif, service par service', en: 'Gradual rollout, department by department' },
  ] as Bilingual[],
};

export interface Audience {
  icon: string;
  title: Bilingual;
  description: Bilingual;
}

export const AUDIENCES: Audience[] = [
  {
    icon: 'building',
    title: { fr: 'Cliniques et hôpitaux privés', en: 'Private clinics & hospitals' },
    description: {
      fr: 'Standardisez le dossier patient et la facturation pour gagner en fluidité, sans alourdir le travail de vos équipes.',
      en: 'Standardise patient records and billing to run more smoothly, without adding work for your teams.',
    },
  },
  {
    icon: 'sitemap',
    title: { fr: 'Hôpitaux publics et programmes de santé', en: 'Public hospitals & health programmes' },
    description: {
      fr: 'Fiabilisez le suivi des patients et la remontée d’indicateurs, y compris pour la surveillance épidémiologique.',
      en: 'Make patient follow-up and indicator reporting reliable, including for epidemiological surveillance.',
    },
  },
  {
    icon: 'share-alt',
    title: { fr: 'Réseaux multi-établissements', en: 'Multi-site networks' },
    description: {
      fr: 'Donnez à votre direction une vue consolidée sur tous vos sites, sans retirer son autonomie à chaque établissement.',
      en: 'Give your management a consolidated view across every site, without taking away each facility’s autonomy.',
    },
  },
];

export interface Pillar {
  icon: string;
  title: Bilingual;
  points: Bilingual[];
}

export const PILLARS: Pillar[] = [
  {
    icon: 'id-card',
    title: { fr: 'Dossier patient & parcours de soins', en: 'Patient record & care pathway' },
    points: [
      { fr: 'Dossier médical unique, partagé par tous les services autorisés', en: 'A single medical record, shared by every authorised department' },
      { fr: 'Admissions, hospitalisation et sortie suivies de bout en bout', en: 'Admissions, inpatient stay and discharge tracked end to end' },
      { fr: 'Consultations, urgences et soins intensifs', en: 'Outpatient consultations, emergency and intensive care' },
      { fr: 'Planification et suivi des interventions chirurgicales', en: 'Surgical scheduling and follow-up' },
      {
        fr: 'Services spécialisés : pédiatrie (courbes de croissance), gynéco-obstétrique, dentisterie, ophtalmologie, soins infirmiers',
        en: 'Specialty care: paediatrics (growth tracking), obstetrics & gynaecology, dentistry, ophthalmology, nursing care',
      },
    ],
  },
  {
    icon: 'filter',
    title: { fr: 'Plateau technique : laboratoire & imagerie', en: 'Lab & imaging' },
    points: [
      { fr: 'Prescription et suivi des analyses de laboratoire', en: 'Lab test ordering and tracking' },
      { fr: 'Résultats rattachés directement au dossier du patient', en: 'Results attached directly to the patient record' },
      { fr: 'Intégration des examens d’imagerie médicale et de leurs comptes rendus', en: 'Medical imaging and reporting integration' },
      { fr: 'Listes de travail pour organiser la charge du plateau technique', en: 'Worklists to organise the technical platform’s workload' },
    ],
  },
  {
    icon: 'box',
    title: { fr: 'Pharmacie, stocks & facturation', en: 'Pharmacy, stock & billing' },
    points: [
      { fr: 'Gestion des stocks de médicaments et de consommables par service', en: 'Medicine and consumables stock management by department' },
      { fr: 'Suivi des mouvements, des lots et des dates de validité', en: 'Tracking of movements, batches and expiry dates' },
      { fr: 'Facturation des actes et des séjours, avec gestion de l’assurance', en: 'Billing for procedures and stays, with insurance handling' },
      { fr: 'Paiement mobile et autres moyens de règlement courants dans la région', en: 'Mobile money and other payment methods common in the region' },
    ],
  },
  {
    icon: 'shield',
    title: { fr: 'Pilotage, sécurité & multi-établissements', en: 'Oversight, security & multi-site' },
    points: [
      { fr: 'Tableaux de bord d’activité et statistiques pour chaque service', en: 'Activity dashboards and statistics for every department' },
      { fr: 'Données de santé chiffrées, accès contrôlés par rôle, journal d’audit', en: 'Encrypted health data, role-based access, audit trail' },
      { fr: 'Vue consolidée pour les réseaux et groupes d’établissements', en: 'Consolidated view for networks and groups of facilities' },
      { fr: 'Indicateurs utiles aux programmes de santé publique et à la surveillance épidémiologique', en: 'Indicators useful to public-health programmes and epidemiological surveillance' },
    ],
  },
];

export interface BeforeAfter {
  before: Bilingual;
  after: Bilingual;
}

export const COMPARE_ROWS: BeforeAfter[] = [
  {
    before: { fr: 'Dossiers papier ou dispersés entre plusieurs postes', en: 'Paper files or records scattered across several computers' },
    after: { fr: 'Un dossier patient unique, accessible à chaque service autorisé', en: 'One patient record, accessible to every authorised department' },
  },
  {
    before: { fr: 'Facturation et suivi des stocks faits à part, à la main', en: 'Billing and stock tracking handled separately, by hand' },
    after: { fr: 'Facturation et pharmacie reliées directement aux soins dispensés', en: 'Billing and pharmacy linked directly to the care provided' },
  },
  {
    before: { fr: 'Aucune vue d’ensemble tant que les rapports ne sont pas compilés', en: 'No overview for management until reports are compiled' },
    after: { fr: 'Tableaux de bord d’activité consultables à tout moment', en: 'Activity dashboards available at any time' },
  },
  {
    before: { fr: 'Chaque établissement d’un réseau travaille isolément', en: 'Each facility in a network works in isolation' },
    after: { fr: 'Vue consolidée multi-établissements, sans perdre l’autonomie locale', en: 'Consolidated multi-site view, without losing local autonomy' },
  },
  {
    before: { fr: 'Accès aux dossiers difficile à contrôler et à tracer', en: 'Hard to control or trace who accessed which record' },
    after: { fr: 'Accès par rôle et journal d’audit sur les données de santé', en: 'Role-based access and an audit trail on health data' },
  },
];

export interface Step {
  title: Bilingual;
  description: Bilingual;
}

export const ONBOARDING: Step[] = [
  {
    title: { fr: 'Échange de cadrage', en: 'Discovery call' },
    description: {
      fr: 'Un premier échange pour comprendre vos services, vos volumes et vos priorités.',
      en: 'A first conversation to understand your departments, volumes and priorities.',
    },
  },
  {
    title: { fr: 'Configuration', en: 'Configuration' },
    description: {
      fr: 'La solution est paramétrée selon l’organisation réelle de votre établissement : services, actes, tarifs.',
      en: 'The solution is configured to match your facility’s actual organisation: departments, procedures, pricing.',
    },
  },
  {
    title: { fr: 'Migration & formation', en: 'Migration & training' },
    description: {
      fr: 'Reprise des données utiles et formation des équipes, service par service.',
      en: 'Migration of the useful data and training for your teams, department by department.',
    },
  },
  {
    title: { fr: 'Mise en service', en: 'Go-live' },
    description: {
      fr: 'Démarrage accompagné, avec un suivi renforcé pendant les premières semaines.',
      en: 'Supported go-live, with closer follow-up during the first weeks.',
    },
  },
  {
    title: { fr: 'Support continu', en: 'Ongoing support' },
    description: {
      fr: 'Assistance et évolutions une fois la solution en production.',
      en: 'Support and improvements once the solution is in production.',
    },
  },
];

export const TRUST_POINTS: { icon: string; text: Bilingual }[] = [
  {
    icon: 'lock',
    text: { fr: 'Données de santé chiffrées, au repos comme en transit.', en: 'Health data encrypted, at rest and in transit.' },
  },
  {
    icon: 'users',
    text: {
      fr: 'Accès aux dossiers limité par rôle : chaque profil ne voit que ce dont il a besoin.',
      en: 'Record access limited by role: each profile sees only what it needs.',
    },
  },
  {
    icon: 'history',
    text: { fr: 'Journal d’audit sur les actions sensibles.', en: 'Audit trail on sensitive actions.' },
  },
  {
    icon: 'server',
    text: {
      fr: 'Hébergement au choix : sur vos serveurs ou dans un environnement dédié.',
      en: 'Choice of hosting: on your own servers or in a dedicated environment.',
    },
  },
];

export interface FaqItem {
  question: Bilingual;
  answer: Bilingual;
}

export const FAQ: FaqItem[] = [
  {
    question: { fr: 'Nous utilisons encore le papier ou des tableurs, est-ce un problème ?', en: 'We still use paper or spreadsheets — is that a problem?' },
    answer: {
      fr: 'Non. La mise en service prévoit la reprise des données utiles et un accompagnement service par service, sans interruption des soins.',
      en: 'No. Go-live includes migrating the useful data and supporting each department through the switch, without interrupting care.',
    },
  },
  {
    question: { fr: 'Peut-on continuer à fonctionner en cas de coupure internet ?', en: 'Can we keep working if the internet goes down?' },
    answer: {
      fr: 'Le choix d’hébergement (sur site ou dédié) est discuté selon vos contraintes de connectivité et de continuité de service.',
      en: 'The hosting choice (on-premise or dedicated) is discussed according to your connectivity and continuity constraints.',
    },
  },
  {
    question: { fr: 'La solution gère-t-elle l’assurance et le paiement mobile ?', en: 'Does the solution handle insurance and mobile payment?' },
    answer: {
      fr: 'Oui : la facturation des actes et des séjours, la gestion de l’assurance et le paiement mobile font partie de la solution.',
      en: 'Yes: billing for procedures and stays, insurance handling and mobile payment are part of the solution.',
    },
  },
  {
    question: { fr: 'Qui peut accéder aux dossiers patients ?', en: 'Who can access patient records?' },
    answer: {
      fr: 'L’accès est défini par rôle : un profil ne voit que les informations utiles à sa fonction, et chaque accès sensible est tracé.',
      en: 'Access is defined by role: each profile only sees what its function needs, and every sensitive access is logged.',
    },
  },
  {
    question: { fr: 'La solution convient-elle à un réseau de plusieurs établissements ?', en: 'Is the solution suited to a network of several facilities?' },
    answer: {
      fr: 'Oui : chaque établissement garde son fonctionnement propre, avec une vue consolidée pour la direction du réseau.',
      en: 'Yes: each facility keeps its own operation, with a consolidated view for the network’s management.',
    },
  },
  {
    question: { fr: 'Peut-on démarrer avec un seul service avant de généraliser ?', en: 'Can we start with a single department before rolling out further?' },
    answer: {
      fr: 'Oui, c’est l’approche recommandée : un service pilote, puis une extension progressive aux autres.',
      en: 'Yes, that’s the recommended approach: a pilot department, then a gradual extension to the rest.',
    },
  },
  {
    question: { fr: 'Qu’en est-il des données utiles aux programmes de santé publique ?', en: 'What about data needed for public-health programmes?' },
    answer: {
      fr: 'Les indicateurs utiles à la surveillance épidémiologique et aux programmes de santé publique peuvent être remontés depuis la solution.',
      en: 'Indicators needed for epidemiological surveillance and public-health programmes can be reported from the solution.',
    },
  },
  {
    question: { fr: 'Combien coûte ROHAFYA HEALTH ?', en: 'How much does ROHAFYA HEALTH cost?' },
    answer: {
      fr: 'Le tarif dépend de la taille de l’établissement et des modules activés : il est établi après un premier échange, sur devis.',
      en: 'Pricing depends on the facility’s size and the modules enabled: it is set after an initial conversation, by quote.',
    },
  },
];
