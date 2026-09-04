---
name: vercel-resilience-and-deploy
description: Directives et diagnostics avancés pour le déploiement continu Vercel, la persistance Supabase via pooler et l'Agence IA.
---

# Guide & Skill : Déploiement Vercel, Résilience Supabase & Agence IA

Ce skill répertorie les causes de pannes critiques identifiées et les procédures systématiques pour garantir un déploiement 100% réussi sans blocage.

---

## 1. Diagnostics & Causes Racines Connues

### 🛑 Cause A : SDK Stripe crashant au Build Time
- **Problème** : `new Stripe(process.env.STRIPE_SECRET_KEY || "")` jette une exception bloquante (`Neither apiKey nor config.authenticator provided`) si `STRIPE_SECRET_KEY` n'est pas injecté pendant l'évaluation statique des pages Next.js sur Vercel.
- **Solution Impérative** : Toujours initialiser avec un fallback de build :
  ```ts
  const apiKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_for_build_mode";
  export const stripe = new Stripe(apiKey, { ... });
  ```

### 🛑 Cause B : Incompatibilité REST API Gemini (Google AI Studio)
- **Problème** : `function_declarations` (snake_case) fonctionne en Python SDK mais produit un rejet `400 Bad Request: Unknown field` sur l'API REST JSON.
- **Solution Impérative** : Utiliser impérativement `functionDeclarations` (camelCase) et les modèles stables (`gemini-2.0-flash`, `gemini-1.5-flash`).

### 🛑 Cause C : Pooler Supabase vs Port Direct
- **Problème** : Le port direct `5432` de Supabase (`db.xxx.supabase.co:5432`) est bloqué sur plusieurs réseaux ou en environnement Windows.
- **Solution Impérative** : Toujours utiliser le pooler officiel port `6543` avec `pgbouncer=true` et `connection_limit=1` :
  `postgresql://postgres.xxx:PASSWORD@aws-0-ca-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require&connection_limit=1`

### 🛑 Cause D : Conflit `.env.local` vs `.env`
- **Problème** : Next.js donne la priorité absolue à `.env.local` sur `.env`. Si `.env.local` contient une ancienne URL cassée, le serveur local et le build l'utiliseront.
- **Solution Impérative** : Toujours vérifier et synchroniser `.env.local` en même temps que `.env`.

### 🛑 Cause E : Rechargements Intempestifs
- **Problème** : Les Service Workers ou scripts `AutoUpdater` contenant `window.location.reload()` réinitialisent les formulaires utilisateur et vident les requêtes IA.
- **Solution Impérative** : Mises à jour de cache uniquement en arrière-plan silencieux sans `window.location.reload()`.

---

## 2. Procédure de Vérification Post-Déploiement

À chaque push sur GitHub `main`, l'agent doit :
1. Vérifier les statuts de déploiement Vercel via l'API GitHub (`/repos/{owner}/{repo}/deployments`).
2. S'assurer que le statut est `state: 'success'` ou que le domaine officiel répond avec HTTP `200` ou `307 Redirect`.
3. En cas de statut `failure`, inspecter immédiatement les événements d'erreur (`/v2/deployments/{id}/events`) pour corriger la source en 1 passe.
