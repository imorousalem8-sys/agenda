# Standards d'Authentification, OTP & Gestion de Compte

Ces règles sont strictes et doivent être appliquées dès la conception de tout module d'authentification ou de création de compte :

1. **Option "Mot de passe oublié" OBLIGATOIRE dès le départ** :
   - Tout module d'authentification doit OBLIGATOIREMENT intégrer d'emblée la gestion complète du « Mot de passe oublié » (Forgot Password / Reset Password).
   - Proposer le flux rapide par **Code OTP sécurisé** (Email -> Réception code à 6 chiffres -> Définition du nouveau mot de passe sur l'interface) + support de lien de réinitialisation.

2. **ZÉRO `localhost` codé en dur (URLs de Redirection 100% Dynamiques)** :
   - Ne JAMAIS coder en dur `http://localhost:3000` pour les liens d'emails, redirections ou callbacks OAuth/Supabase.
   - Extraire dynamiquement l'URL de base à partir des en-têtes HTTP de la requête entrante (`req.headers.get("origin")`, `x-forwarded-host`, `x-forwarded-proto`) ou `process.env.NEXT_PUBLIC_APP_URL` / `process.env.VERCEL_URL`.
   - Garantir que l'utilisateur soit redirigé exactement sur le domaine réel de l'application en cours d'utilisation.

3. **Synchronisation Parfaite des Codes OTP (Aucun conflit d'autorités)** :
   - Si un service d'authentification externe (ex: Supabase Auth) envoie le code par email, la vérification du code côté serveur doit interroger la même autorité (`/auth/v1/verify`).
   - Ne jamais déclencher simultanément deux expéditeurs d'OTP avec des codes concurrents différents sans vérification unifiée.

4. **Résilience et Fluidité de Connexion Post-Vérification** :
   - Dès la validation de l'OTP, créer et activer l'utilisateur en base avec fallback HTTPS sécurisé (port 443) pour contourner les éventuels blocages de port direct (ex: 5432).
   - Générer la session et déclencher une navigation explicite (`window.location.href = "/"`) pour éviter tout état bloquant dans l'interface utilisateur.
