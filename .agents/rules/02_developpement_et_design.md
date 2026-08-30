---
trigger: always_on
---

# Standards de Développement Web & Design

1. **Architecture & Technologies** :
   - Structure de projet claire, modulaire et maintenable.
   - Technologies cibles : HTML5 sémantique, CSS moderne (Vanilla CSS par défaut), JavaScript moderne.
   - Utilisation de frameworks uniquement si demandés explicitement.

2. **Design & Expérience Utilisateur (WOW Effect)** :
   - Interface premium et soignée : typographies Google Fonts, palette de couleurs travaillée, mode sombre/clair harmonieux.
   - Micro-animations, transitions fluides et interactivité vivante.
   - Aucun placeholder statique ou non fonctionnel.

3. **SEO & Bonnes Pratiques** :
   - Balisage SEO complet (title, meta description, balises OpenGraph, hiérarchie H1-H6).
   - Identifiants uniques et sémantiques pour les tests et l'accessibilité.

4. **Déploiement Automatique & Immédiat en Ligne** :
   - À chaque modification validée et testée, l'agent doit systématiquement et immédiatement commiter et pusher les changements sur la branche `main` de GitHub (`git push origin main`) afin que Vercel mette à jour le site en ligne en temps réel sans que l'utilisateur n'ait à le demander.
