# ROHAFYA HEALTH — Versionnage Git et déploiement

Même chaîne que `rohafya_front` (voir `rohafya_front/Documentation/01_VERSIONNAGE_GIT.txt` pour
les explications détaillées) : **un tag Git `vX.Y.Z` = une image Docker `rohafya-health:X.Y.Z` =
une valeur de `ROHAFYA_HEALTH_VERSION` dans la stack Portainer.**

```
git commit (Conventional Commits) ──> release.sh ──> tag vX.Y.Z poussé
   ──> GitHub Actions (release.yml) : tests, build, image ghcr.io/…/rohafya-health:X.Y.Z, Release GitHub
   ──> deployer-portainer.sh X.Y.Z (ou déploiement automatique approuvé) ──> verifier-deploiement.sh
```

## Contenu de `deploy/`

| Chemin | Rôle |
|---|---|
| `docker/Dockerfile` | Image de production (Angular SSR, port 4100) |
| `portainer/rohafya-health-stack.yml` (+ `.env.example`) | Stack Portainer CE |
| `ci/github-actions/ci.yml`, `release.yml` | Modèles des workflows (source de vérité), copiés dans `.github/workflows/` |
| `git/hooks/commit-msg`, `git/gitmessage.txt` | Convention des messages de commit |
| `scripts/installer-outils-git.sh` | Branche les hooks et réglages Git sur un poste (une fois) |
| `scripts/installer-ci.sh` | Recopie les workflows dans `.github/workflows/` |
| `scripts/release.sh` | Crée une version : CHANGELOG, package.json, commit, tag, push |
| `scripts/build-push.sh` | Construit et publie l'image **sans** CI (secours) |
| `scripts/deployer-portainer.sh` | Déploie une version via l'API Portainer (`--statut` : version en place) |
| `scripts/rollback.sh` | Revient à la version précédente (ou à une version donnée) |
| `scripts/verifier-deploiement.sh` | Tests de fumée en production (HTTPS, /healthz, pages, SEO, CORS) |
| `scripts/deploiement.conf.example` | Modèle de configuration des scripts (copie locale **non versionnée**) |

## 1. Mise en place initiale (une seule fois)

```bash
cd rohafya_health_front
git init -b main
bash deploy/scripts/installer-outils-git.sh
git status            # vérifier qu'AUCUN secret n'apparaît (clé SSH, deploiement.conf, .env)
git add .
git commit -m "chore: état initial du site ROHAFYA HEALTH"
```

Créer le dépôt **vide** sur GitHub (ex. `ManuelZe/rohafya_health_front`, privé), puis :

```bash
git remote add origin https://github.com/ManuelZe/rohafya_health_front.git
git push -u origin main
```

Sur un autre poste : `git clone …` puis `bash deploy/scripts/installer-outils-git.sh`.

## 2. Messages de commit

Format imposé par le hook `commit-msg` : `<type>(<portée>): <description>`.

- Types : `feat`, `fix`, `perf`, `refactor`, `style`, `docs`, `test`, `build`, `ci`, `chore`, `revert`
- Portées usuelles : `accueil`, `devis`, `demo`, `seo`, `ui`, `api`, `deploiement`
- `feat!:` ou un pied `BREAKING CHANGE:` pour un changement incompatible

```
feat(devis): ajouter le choix du nombre de lits
fix(demo): afficher l’erreur quand l’API est injoignable
docs: compléter la procédure de déploiement
```

Le CHANGELOG est généré à partir de ces messages : `feat` → Nouvelles fonctionnalités,
`fix` → Corrections, etc.

## 3. Numérotation (SemVer)

| Commande | Exemple | Quand |
|---|---|---|
| `release.sh patch` | 1.0.0 → 1.0.1 | corrections |
| `release.sh minor` | 1.0.1 → 1.1.0 | nouvelles fonctionnalités |
| `release.sh major` | 1.1.0 → 2.0.0 | changement incompatible |
| `release.sh 1.0.0` | — | première version |

## 4. Créer une version

```bash
git checkout main && git pull
bash deploy/scripts/release.sh minor --dry-run   # aperçu des notes, ne modifie rien
bash deploy/scripts/release.sh minor
```

Le script vérifie la branche et l'arbre de travail, lance tests et build, met à jour
`package.json` et `CHANGELOG.md`, crée le commit `chore(release): vX.Y.Z` et le tag annoté, puis
pousse. Le push du tag déclenche `release.yml` : l'image
`ghcr.io/<propriétaire du dépôt en minuscules>/rohafya-health:X.Y.Z` est publiée (+ `X.Y`, `X`),
testée (`/healthz`), et une Release GitHub est créée.

> **Nom de l'image** : la CI publie sous le **propriétaire du dépôt GitHub**. Dépôt
> `ManuelZe/rohafya_health_front` → `ghcr.io/manuelze/rohafya-health`. `ROHAFYA_HEALTH_IMAGE`
> (stack Portainer et `deploiement.conf`) doit porter exactement ce nom.

## 5. Configuration du dépôt GitHub (une fois)

1. **Protéger `main`** — Settings > Branches : Pull Request obligatoire, statut
   « Tests unitaires + build de production » requis, force-push interdit. Ajouter le responsable
   des releases à la *bypass list* (release.sh pousse le commit de release sur `main`).
2. **Protéger les tags** — Settings > Rules > Rulesets > New tag ruleset, cible `v*` :
   création/modification/suppression restreintes.
3. **Actions** — Settings > Actions > General : actions autorisées ; *Workflow permissions* :
   « Read repository contents and packages ».
4. **Image** — après la 1re release : Packages > rohafya-health > Package settings : laisser
   « Private » et lier le paquet au dépôt. Portainer y accède via le registre `ghcr.io`
   déclaré dans Registries (jeton `read:packages`).

### Déploiement automatique (facultatif)

- Settings > Environments > `production` : *Required reviewers* = responsable du déploiement ;
  *Deployment branches and tags* : tag `v*`.
- Secrets de l'environnement : `PORTAINER_URL`, `PORTAINER_API_KEY`, `PORTAINER_STACK_NAME`
  (`rohafya-health-production`).
- Variables du dépôt : `DEPLOY_AUTO=true`, `ROHAFYA_HEALTH_PUBLIC_URL=https://health.rohafya.com`.

Portainer doit alors être joignable depuis Internet par GitHub Actions. Sinon, laisser
`DEPLOY_AUTO` absent et déployer depuis un poste (section 6) via un tunnel SSH.

## 6. Déployer, vérifier, revenir en arrière (depuis un poste)

```bash
cp deploy/scripts/deploiement.conf.example deploy/scripts/deploiement.conf
chmod 600 deploy/scripts/deploiement.conf      # puis compléter (jeton Portainer, URL…)

ssh -N -L 9443:127.0.0.1:9443 deploy@IP_DU_SERVEUR    # dans un autre terminal

bash deploy/scripts/deployer-portainer.sh --statut    # version en place
bash deploy/scripts/deployer-portainer.sh 1.1.0       # déployer
bash deploy/scripts/verifier-deploiement.sh "" 1.1.0  # contrôler la production
bash deploy/scripts/rollback.sh                       # revenir à la version précédente
```

`deployer-portainer.sh` ne modifie que `ROHAFYA_HEALTH_VERSION` dans la stack et force le
téléchargement de l'image ; chaque opération est consignée dans
`deploy/scripts/historique-deploiements.log` (non versionné).

**Sans GitHub Actions** : après `release.sh`, lancer `bash deploy/scripts/build-push.sh`
(construit l'image du tag courant, la teste, la publie), puis `deployer-portainer.sh`.

## 7. Correctif urgent (hotfix)

```bash
git checkout main && git pull
# corriger, puis
git commit -m "fix(demo): …"
git push
bash deploy/scripts/release.sh patch
bash deploy/scripts/deployer-portainer.sh X.Y.Z
```
