#!/usr/bin/env bash
# =============================================================================
#  Installe les workflows GitHub Actions de ROHAFYA HEALTH.
#  GitHub n'exécute que les fichiers placés dans .github/workflows/ : ce script y copie
#  les modèles maintenus dans deploy/ci/github-actions/ (source de vérité).
#  Usage : bash deploy/scripts/installer-ci.sh   puis commit + push.
# =============================================================================
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib-commun.sh"
cd "$ROHAFYA_ROOT"

etape "Copie des workflows"
mkdir -p .github/workflows
for f in deploy/ci/github-actions/*.yml; do
  cp "$f" ".github/workflows/$(basename "$f")"
  ok ".github/workflows/$(basename "$f")"
done

etape "Étapes suivantes"
info "git add .github/workflows && git commit -m \"ci: ajouter les workflows CI et release\" && git push"
info "Puis configurer le dépôt GitHub : voir deploy/VERSIONNAGE_ET_DEPLOIEMENT.md"
info "(sections « Configuration du dépôt GitHub » et « Déploiement automatique »)."
