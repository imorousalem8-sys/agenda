# Règle : Déploiement Vercel & Stabilité Production

1. **Zéro Crash au Build Time** :
   - Tout SDK externe (Stripe, Resend, etc.) doit impérativement avoir une clé de repli de build (`const key = process.env.KEY || "placeholder"`) pour ne jamais faire crasher `next build` sur Vercel lorsque la variable n'est pas encore injectée au build time.

2. **Supabase Pooler Obligatoire** :
   - Ne jamais utiliser le port `5432` direct de Supabase. Toujours pointer vers le port `6543` du pooler (`aws-0-ca-central-1.pooler.supabase.com:6543`) avec `pgbouncer=true` et `connection_limit=1`.
   - Synchroniser `.env.local` et `.env` systématiquement.

3. **Validation Réelle du Déploiement Vercel** :
   - Après chaque `git push origin main`, vérifier obligatoirement le statut de déploiement réel sur Vercel (via API ou contrôle HTTP) avant de déclarer la tâche terminée.
   - Ne jamais considérer un déploiement réussi sur la simple base du git push sans avoir validé le statut de build de Vercel.

4. **Agence IA Robuste** :
   - API Gemini en format REST JSON strict (`functionDeclarations` en camelCase).
   - Transmission intégrale des actions (`directAction`) et émission des événements UI (`task-updated`, `reminder-updated`, `event-updated`) pour affichage instantané.
