---
name: executive-landing-architect
description: Concevoir et livrer des pages d'accueil et des interfaces web de très haute gamme, fidèles aux maquettes de référence, avec composition asymétrique équilibrée, menus centrés au milieu, contrôle visuel par capture d'écran et zéro néon criard. À utiliser systématiquement dès que l'utilisateur demande une landing page, une page d'accueil ou du design front-end d'élite.
---

# EXECUTIVE LANDING ARCHITECT — MÉTHODOLOGIE DE TRÈS HAUTE GAMME

## 1. Origine & Pourquoi les IA Échouent Habituellement
La plupart des assistants IA échouent sur les pages d'accueil parce qu'ils :
1. Empilent des boîtes Tailwind génériques au lieu de concevoir une véritable **composition visuelle**.
2. Écrasent les menus de navigation ou les collent à droite/gauche au lieu de les **classer et centrer au milieu**.
3. Remplissent le hero de gadgets difformes au lieu d'une hiérarchie épurée et prestigieuse.
4. S'arrêtent après le premier écran en laissant un **grand vide blanc** en dessous.
5. **N'ouvrent jamais le navigateur pour regarder leur propre travail**, ignorant les textes tronqués, les boutons déformés et les marges cassées.

Cette compétence consigne le processus exact qui a permis de transformer une page bancale en une landing page de niveau exécutif digne des plus grands SaaS mondiaux.

---

## 2. Les 5 Principes Fondamentaux de la Méthode

### Principe 1 : La Navbar Triadique Parfaite
Toute navigation de haut niveau doit obéir à la structure en 3 pôles :
- **Pôle Gauche (Identité)** : Logo officiel sous forme de squircle haute définition (coins arrondis élégants, pas de cercle déformé) + nom de marque net (ex: `Alama`**jonda**).
- **Pôle Central (Menus Centrés & Classés)** :
  - Liens espacés (`Fonctionnalités`, `Tarifs`, `Solutions`, `Tutoriels`, `FAQ`).
  - Doit être **visible en continu sur desktop** (attention aux `display: none` ou media queries oubliées).
  - Micro-interaction au survol : trait bleu subtil centré.
- **Pôle Droit (Actions Clés)** :
  - Lien discret `Connexion` (texte sobre, fond transparent ou gris très pâle au survol).
  - Bouton d'action principal `Commencer Gratuitement` (Bleu Royal uni `#0d55e0`, coins 8-10px, ombrage doux saphir, zéro déformation).

---

### Principe 2 : La Composition Asymétrique Immersive (Split Hero)
Inspirée des meilleures maquettes de designers (ex: `mockup-reference.jpg`) :
- **À Gauche (L'Accroche Magistrale)** :
  - **Titre sur 2 lignes nettes** (jamais 3 ou 4 lignes éparpillées) :
    `Ne manquez plus aucun`
    `rendez-vous important`
  - **Sous-titre court en 2 lignes précises** (40-45 caractères max par ligne).
  - **Bouton d'appel à l'action** compact et chic : `En savoir plus` ou `Commencer gratuitement`.
- **À Droite (L'Immersion Humaine ou Produit)** :
  - Photo grand format plein champ ultra-nette (bureau lumineux, regard dirigé vers le contenu, ambiance sereine et lumineuse).
  - **La Bulle Flottante Vivante** : composant interactif superposé au visuel (ex: *« Appel Vocal — Programmé à 14h30 »* avec onde sonore active et lecteur audio au clic).
- **Au Premier Plan (Les 3 Cartes Flottantes)** :
  - Disposées sur le bas du bandeau, avec coins arrondis (16 à 20px), fond blanc pur, ombres douces et aérées.
  - 3 fonctionnalités concrètes avec icônes vectorielles nettes dans la couleur de marque.

---

### Principe 3 : Continuité Verticale (Zéro Page Blanche)
Une page d'accueil d'élite ne s'arrête jamais abruptement. Elle guide le visiteur naturellement sans temps mort :
1. **Section 1 : Hero & 3 Cartes** (La promesse immédiate).
2. **Section 2 : Processus en 3 Étapes** (`01 - Synchronisez`, `02 - Configurez`, `03 - Décrochez`).
3. **Section 3 : Tarification Transparente** (2 ou 3 cartes équilibrées : Découverte 0€ et Pro 19€ mise en avant).
4. **Section 4 : FAQ Interactive** (accordéon minimaliste pour lever toutes les objections).
5. **Section 5 : Bannière CTA Finale** (écrin bleu profond enveloppant pour inciter à l'action).
6. **Section 6 : Footer Structuré** (logo, navigation ordonnée, mentions légales, statut système vert).

---

### Principe 4 : Harmonie Chromatique & Zéro Néon
- **Couleur Primaire** : Toujours dérivée du logo fourni (ex: Bleu Royal Saphir `#0d55e0` / `#1a56d6`).
- **Couleur d'Encre / Typographie** : Bleu Nuit Profond (`#0b1736`) pour éviter la fadeur du noir pur et conférer une autorité luxueuse.
- **Surfaces** : Alternance de blanc pur (`#ffffff`) et de perle très doux (`#f4f8fe`).
- **Interdiction formelle** des couleurs néons fluorescentes, des bordures multicolores criardes ou des dégradés arc-en-ciel.

---

### Principe 5 : Le Contrôle Visuel Automatique (Le Juge de Paix)
**Règle d'or** : Ne JAMAIS déclarer une page terminée sans avoir généré une capture d'écran réelle et l'avoir inspectée avec les yeux de l'agent (`view_file`).

Commande standard sous Windows pour capturer sans dépendre d'outils externes :
```powershell
cmd /c "start /wait msedge --headless=new --disable-gpu --window-size=1440,1080 --screenshot=c:\Users\Utilisateur\Desktop\3e_projet\verification_screen.png http://localhost:3000"
```
Ensuite, ouvrir et inspecter `verification_screen.png` via `view_file` :
- Vérifier que les menus sont bien au centre.
- Vérifier qu'aucun texte ne déborde sur 3 lignes.
- Vérifier que les boutons ont des proportions régulières.
- Si le résultat est imparfait, corriger immédiatement avant de livrer à l'utilisateur.

---

## 3. Checklist Avant Livraison
- [ ] Le logo officiel fourni est-il bien intégré dans la Navbar, le Hero, le Footer et les icônes du site ?
- [ ] Les menus sont-ils parfaitement centrés au milieu de l'écran ?
- [ ] La composition asymétrique (texte à gauche, visuel à droite, 3 cartes en bas) est-elle respectée ?
- [ ] Y a-t-il des sections complètes en dessous pour éviter toute page blanche ?
- [ ] La palette est-elle sobre, élégante, sans néon criard ?
- [ ] Une capture d'écran a-t-elle été prise et inspectée visuellement ?
- [ ] Les changements sont-ils commités et pushés sur `main` pour mise à jour Vercel ?
