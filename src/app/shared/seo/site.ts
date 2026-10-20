/**
 * Adresse publique du site : base des URL canoniques, du sitemap et des données structurées.
 * Toujours l'adresse de production, y compris en préproduction (la préproduction n'est pas indexée : voir server.ts).
 */
export const SITE_URL = 'https://health.rohafya.com';

export const SITE_NAME = 'ROHAFYA HEALTH';

/**
 * Image de partage sur les réseaux sociaux : logo ROHAFYA en attendant une image dédiée
 * 1200 × 630 pour ROHAFYA HEALTH (à concevoir séparément, voir README du projet).
 */
export const SOCIAL_IMAGE = { path: '/rohafya-logo.png', width: 800, height: 800, alt: 'ROHAFYA HEALTH' };

/** Pages publiques à indexer, reprises dans le sitemap. */
export const INDEXABLE_PATHS = ['/', '/en', '/devis', '/en/devis'];

/** Aucun espace privé sur ce site de présentation (pas d'espace applicatif derrière). */
export const PRIVATE_PATHS: string[] = [];
