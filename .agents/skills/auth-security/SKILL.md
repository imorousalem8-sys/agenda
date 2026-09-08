---
name: auth-security
description: Construire automatiquement une authentification et une autorisation professionnelles et sécurisées pour les applications avec utilisateurs, incluant inscription, connexion, sessions, récupération de compte, rôles, permissions, protection des routes et sécurité des données.
---

# AUTH SECURITY ENGINEER

## Mission

Dès qu'une application possède des utilisateurs ou des données privées, tu dois analyser automatiquement les besoins d'identité et de contrôle d'accès.

## AUTHENTIFICATION

Selon le projet, implémenter :

* inscription ;
* connexion ;
* déconnexion ;
* session ;
* récupération de compte ;
* changement de mot de passe ;
* vérification email ;
* gestion du profil.

Utiliser les mécanismes de sécurité adaptés au framework utilisé.

Ne jamais inventer un système cryptographique.

Privilégier les bibliothèques reconnues et maintenues.

## MOTS DE PASSE

Ne jamais stocker les mots de passe en clair.

Utiliser un mécanisme de hash sécurisé et adapté à l'écosystème du projet.

Ne jamais retourner un hash de mot de passe au frontend.

## AUTORISATION

Distinguer :

AUTHENTICATION = qui est l'utilisateur ?

AUTHORIZATION = que peut-il faire ?

Toutes les opérations sensibles doivent vérifier les deux lorsque nécessaire.

## MULTI-UTILISATEURS

Un utilisateur ne doit jamais pouvoir :

* lire les données privées d'un autre utilisateur ;
* modifier les données d'un autre utilisateur ;
* supprimer les données d'un autre utilisateur ;
* modifier son propre rôle pour devenir administrateur ;
* contourner les permissions via une requête directe.

## RÔLES

Si le projet nécessite des rôles, créer un système clair :

* utilisateur ;
* administrateur ;
* propriétaire ;
* opérateur ;
* ou autres rôles réellement nécessaires.

Ne pas créer des rôles inutiles.

## ROUTES

Les routes protégées doivent être protégées côté serveur.

Une simple vérification frontend n'est jamais considérée comme une protection suffisante.

## SESSIONS

Choisir le mécanisme adapté au framework.

Gérer correctement :

* expiration ;
* renouvellement ;
* révocation lorsque nécessaire ;
* cookies ;
* tokens ;
* stockage sécurisé.

## API

Chaque endpoint privé doit vérifier l'identité et les permissions appropriées.

## SECRETS

Les secrets doivent rester côté serveur.

Ne jamais :

* hardcoder une clé secrète ;
* afficher une clé dans les logs ;
* envoyer une clé privée au navigateur ;
* committer des secrets dans Git.

## AUDIT

Avant de déclarer l'authentification terminée, rechercher :

* routes non protégées ;
* contrôles frontend uniquement ;
* IDOR ;
* privilèges excessifs ;
* fuite de données ;
* gestion incorrecte des sessions ;
* secrets exposés.

## DEFINITION OF DONE

L'authentification doit être :

* fonctionnelle ;
* sécurisée ;
* testée ;
* intégrée au backend ;
* intégrée aux permissions ;
* compatible avec les données utilisateurs.
