# 🧠 Grand Référentiel des 25 Conditions d'Ingénierie Agentique & Prompt Engineering

Ce document constitue la **matrice d'exécution de référence de l'agence pour Alamajonda**. À chaque requête utilisateur, l'agent identifie, active et combine les conditions correspondantes pour garantir une exécution d'un niveau d'expertise maximal.

---

## 🧭 Sommaire des 25 Conditions d'Exécution

```mermaid
graph LR
    subgraph "Diagnostic & Résilience"
        C1[C1: Root Cause Hunting]
        C2[C2: Abductive Hypotheses]
        C3[C3: Asynchronous Guardrails]
        C4[C4: Error Boundary & UI Isolation]
    end
    subgraph "Architecture & Design"
        C5[C5: STYLE A Strict Layout]
        C6[C6: Zero Orphan Component]
        C7[C7: Rich Visual Aesthetics]
        C8[C8: Micro-Animations & Interactivity]
    end
    subgraph "Mobile & Engineering"
        C9[C9: GPU Layering & Compositing]
        C10[C10: Touch Events & Propagation]
        C11[C11: Offline-First & Service Worker]
        C12[C12: PWA Installability]
    end
    subgraph "Sécurité & Données"
        C13[C13: Dynamic Origin Resolution]
        C14[C14: Defensive Sanitization XSS/SQLi]
        C15[C15: RLS & Secret Isolation]
        C16[C16: Multi-Factor / OTP Resilient Auth]
    end
    subgraph "Code Quality & Refactoring"
        C17[C17: DRY Strict De-duplication]
        C18[C18: Single Source of Truth]
        C19[C19: Strict Typing & Linting]
        C20[C20: Non-Regression & Scope Control]
    end
    subgraph "DevOps & Localisation"
        C21[C21: Build Integrity (0 Error)]
        C22[C22: Cache-Busting & Versioning]
        C23[C23: Canonical URL & SPA Routing]
        C24[C24: Panafrican Multi-Currency & Local MoMo]
        C25[C25: Premium SEO & OpenGraph]
    end
```

---

## 🔍 SECTION I : Diagnostic, Traque de Bugs & Résilience

### Condition C1 : Diagnostic à la Source & Traque de Cause Racine (Root Cause Analysis)
* **Principe** : Ne jamais appliquer de correctif cosmétique qui masque un symptôme sans comprendre l'origine.
* **Protocole** : Poser les 5 "Pourquoi", analyser la pile d'appels (`stack trace`), et inspecter les requêtes réseau (statut HTTP, code d'erreur Supabase / API).

### Condition C2 : Génération d'Hypothèses Abductives Classées
* **Principe** : Établir une liste ordonnée des hypothèses de panne (de la plus probable à la moins probable) :
  1. Changement récent de code / régression de merge.
  2. Problème d'état asynchrone / verrouillage (`navigator.locks`).
  3. Données mal formées / rejet de validation serveur.
  4. Configuration réseau / CSP / CORS / Domaine de redirection.

### Condition C3 : Garde-Fous Asynchrones & Timeouts Systématiques
* **Principe** : Aucune promesse réseau ne doit pouvoir geler l'interface indéfiniment.
* **Protocole** : Toute requête critique (`signIn`, `signUp`, `fetch`, `sync`) doit être encapsulée dans un wrapper avec timeout (ex: `withAuthTimeout(promise, 12000)`), et réinitialiser son état dans un bloc `finally` garanti.

### Condition C4 : Isolation des Erreurs de Rendu UI (Error Boundaries)
* **Principe** : L'échec d'un composant secondaire ou d'un calcul de KPI ne doit jamais bloquer l'accès au tableau de bord ou à l'espace de travail principal.

---

## 🎨 SECTION II : Architecture, Structure & "STYLE A"

### Condition C5 : Respect Strict de la Grille "STYLE A" (Standard SaaS Dashboard)
* **Principe** :
  - **Sidebar Gauche** : 20% de la largeur, fixe sur 100vh, fond sombre épuré (`#060E22` ou `#030712`), logo de marque en haut, navigation avec états actifs en bloc plein, pied de page utilisateur.
  - **Workspace Droite** : 80% de la largeur, fond pro (`#030712` obsidian saphir), en-tête horizontal complet, KPIs en 1 ligne horizontale, grilles de données en 2 colonnes (65% / 35%).

### Condition C6 : Zéro Composant Orphelin & Navigation Intégrée
* **Principe** : Chaque vue ou modale créée doit être enregistrée dans le routeur / sélecteur, disposer de son bouton dans la barre de navigation et synchroniser son titre dans le header supérieur.

### Condition C7 : Esthétique Visuelle "Rich & Modern" (Anti-Generic Design & Zéro Néon Criard)
* **Principe** : Bannir les couleurs néons criardes et les bordures épaisses d'ancienne génération.
* **Protocole** : Utiliser des palettes harmonieuses (Obsidian `#030712`, Saphir `#0D55E0`, Cyan `#38BDF8`), des ombres douces (`box-shadow: 0 4px 25px rgba(0,0,0,0.4)`), des coins arrondis (`border-radius: 12px` à `18px`) et la police Google *Plus Jakarta Sans* ou *Inter*.

### Condition C8 : Micro-Animations, Transitions & États Interactifs
* **Principe** : L'interface doit paraître vivante et réactive au toucher comme à la souris (`transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`, effets de survol `:hover`, états d'activation `:active`, et spinners discrets).

---

## 📱 SECTION III : Ingénierie Mobile, PWA & Tactile

### Condition C9 : Accélération Matérielle & Composition GPU Layering
* **Principe** : Les éléments coulissants mobiles (off-canvas sidebar, modales) doivent utiliser `transform: translate3d(0, 0, 0)` et `will-change: transform` pour un défilement à 60 FPS sans à-coups.

### Condition C10 : Déverrouillage Tactile & Zéro Piège de Composition
* **Principe** :
  - **Interdiction formelle de `backdrop-filter: blur()` sur l'overlay mobile** (provoque la disparition de la sidebar sur iOS Safari / Chrome Android).
  - Synchroniser les 3 déclencheurs tactiles (`.open`, `.active`, `body.mobile-sidebar-open`).
  - Aucun `pointer-events: none` non réinitialisé sur la navigation.

### Condition C11 : Résilience Hors-Ligne & Stratégie Service Worker
* **Principe** : Service Worker moderne avec `updateViaCache: 'none'`, stratégie `Network-First` pour le HTML d'authentification et purge immédiate des anciens caches avec `clients.claim()`.

### Condition C12 : Expérience PWA & Installation Mobile
* **Principe** : Manifeste PWA complet (`manifest.json`), icônes vectorielles / 3D haute résolution (512x512, 192x192), `theme-color: #030712`, et orientation adaptative.

---

## 🛡️ SECTION IV : Sécurité, Authentification & Données Supabase

### Condition C13 : Résolution Dynamique de l'URL d'Origine (`getAppBaseUrl`)
* **Principe** : Ne jamais hardcoder `http://localhost:3000` ou une URL de staging.
* **Protocole** : Détecter dynamiquement `window.location.origin` côté client et les headers `x-forwarded-host` côté serveur pour injecter `emailRedirectTo` dans tous les flux Supabase (`signUp`, `resend`, `resetPasswordForEmail`).

### Condition C14 : Assainissement Défensif des Entrées Utilisateur
* **Principe** : Nettoyer systématiquement toutes les chaînes de texte contre les attaques XSS (`escapeXSS`), normaliser les numéros de téléphone et forcer les e-mails en minuscules sans espaces (`trim().toLowerCase()`).

### Condition C15 : Séparation Étricte des Clés et Protection RLS
* **Principe** :
  - La clé publique (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) est seule autorisée dans le frontend.
  - La clé secrète (`SUPABASE_SERVICE_ROLE_KEY`) reste strictement confinée aux routes d'API serveur.
  - Activer la sécurité au niveau des lignes (*Row Level Security - RLS*) sur toutes les tables PostgreSQL.

### Condition C16 : Double Voie d'Authentification & Code de Secours (OTP)
* **Principe** : Prévoir une alternative de connexion sans mot de passe (*Magic Link / Code OTP à 6 chiffres*) pour pallier les oublis de mot de passe, avec synchronisation infaillible du transport.

---

## ⚡ SECTION V : Qualité du Code, Refactoring & Tests

### Condition C17 : Règle DRY (Don't Repeat Yourself) & Zéro Doublon Factice
* **Principe** : Éliminer sans pitié toute définition concurrente ou mockée qui écrase les fonctions de production selon l'ordre de chargement des scripts.

### Condition C18 : Source Unique de Vérité pour l'État (`AppState`)
* **Principe** : Toutes les données métier (rendez-vous, tâches, alarmes vocales, utilisateur connecté) résident dans une source unique réactive.

### Condition C19 : Typage Strict & Validation Next.js
* **Principe** : Respecter les types TypeScript, les interfaces d'API (`NextResponse`), et éliminer les assertions dangereuses (`!`).

### Condition C20 : Non-Régression & Préservation des Fonctionnalités Existantes
* **Principe** : Toute modification apportée à un composant ou un formulaire ne doit altérer ni les raccourcis clavier (ex: validation `Entrée`), ni les écouteurs d'événements voisins.

---

## 🌍 SECTION VI : DevOps, Localisation Panafricaine & SEO

### Condition C21 : Validation de Build Absolue (0 Erreur)
* **Principe** : Tout livrable doit être compilé avec succès (`npm run build` code de sortie 0) et tester ses routes statiques et dynamiques avant annonce au client.

### Condition C22 : Cache-Busting Strict & Synchronisation de Version
* **Principe** : Mettre à jour `CURRENT_BUILD` et versionner les assets à chaque publication pour forcer le rafraîchissement des navigateurs clients.

### Condition C23 : Domaine Canonique & Déploiement Continu
* **Principe** : Toujours commiter et pusher sur `main` pour mettre à jour la production Vercel en temps réel.

### Condition C24 : Multi-Devises & Gestion Internationale
* **Principe** : Adapter les devises et fuseaux horaires selon la configuration utilisateur.

### Condition C25 : Référencement Naturel (SEO) & Balises Sociales Complètes
* **Principe** : Balises `title`, `meta description`, `openGraph`, `twitter:card`, `theme-color`, favicon et titre d'application iOS complets sur chaque page.

---

*Ce référentiel des 25 conditions est actif et s'applique avec rigueur à toutes les interventions de l'agence pour Alamajonda.*
