# ROHAFYA HEALTH — site de présentation

Site de présentation de **ROHAFYA HEALTH**, la solution de gestion hospitalière, destiné à
`health.rohafya.com`. Application Angular 22 avec rendu serveur (SSR), PrimeNG et Tailwind —
même palette de marque que [`rohafya_front`](../rohafya_front) (vert `#10b981` / marine `#0c4562`).

Ce dépôt ne contient **que** le site de présentation (une page, `/` en français et `/en` en
anglais) : pas d'espace applicatif, pas de compte utilisateur. La demande de démonstration est
le seul point d'interaction ; elle appelle l'API Flask existante (`Rohafya/saas/public/trial-requests`,
avec `product: "rohafya_health"` pour se distinguer des demandes de ROHAFYA).

## Développement local

```bash
npm ci
ng serve                      # http://localhost:4300 (port dédié, différent de rohafya_front)
```

Rendu serveur, comme en production :

```bash
ng build
node dist/rohafya_health_front/server/server.mjs   # http://localhost:4100
```

L'URL de l'API vient de `src/environments/environment.development.ts` avec `ng serve`. En
production, elle vient de la variable `API_URL` du conteneur, transmise au navigateur par
`/env.js` (`window.__ROHAFYA_HEALTH_ENV__`).

## Contenu

Les textes (français et anglais) sont dans `src/app/home/home.content.ts`, sous forme
d'objets `{ fr, en }` consommés par le pipe `| bi`. Pas de système de clés de traduction à
tenir synchronisé : chaque texte porte directement ses deux versions.

## Déploiement

Dockerfile et stack Portainer CE dans `deploy/` (voir `deploy/portainer/rohafya-health-stack.yml`
et son modèle de variables `rohafya-health-stack.env.example`), sur le même schéma que
`rohafya_front/Documentation/portainer/rohafya-stack.yml` : conteneur `rohafya-health`,
port interne 4100, réseau Docker `proxy` partagé avec Nginx Proxy Manager.

## À faire avant mise en ligne

- **Licence communautaire PrimeNG** : non configurée (voir `src/app/app.config.ts`, TODO).
  Tant qu'elle ne l'est pas, un bandeau « Invalid PrimeUI License » s'affiche en bas à droite
  de chaque page. Voir https://primeng.org/license.
- **Image de partage (Open Graph)** : `public/rohafya-logo.png` est utilisé en attendant une
  image dédiée 1200×630 pour ROHAFYA HEALTH (voir `src/app/shared/seo/site.ts`).
- **CORS API** : `https://health.rohafya.com` a été ajouté aux origines autorisées côté API
  (`Rohafya/Rohafya/saas/constants.py`, `DEFAULT_FRONT_ORIGINS`) — à vérifier en production si
  `ROHAFYA_FRONT_ORIGINS` y est défini par variable d'environnement (elle écrase la liste par
  défaut au lieu de s'y ajouter).
