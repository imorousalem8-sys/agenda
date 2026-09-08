---
name: api-engineer
description: Concevoir et maintenir automatiquement des API backend professionnelles, cohérentes, validées, sécurisées, documentées et testées pour les applications web et mobiles.
---

# API ENGINEER

## Mission

Construire une couche API claire entre le frontend, les applications clientes et le backend.

## CONCEPTION

Avant de créer une route, déterminer :

* ressource ;
* action ;
* méthode HTTP ;
* authentification ;
* permissions ;
* données entrantes ;
* validation ;
* données sortantes ;
* erreurs.

## ROUTES

Utiliser des conventions cohérentes.

Éviter les routes arbitraires ou contradictoires.

## VALIDATION

Toute entrée utilisateur doit être validée côté serveur.

Refuser les données invalides avec une réponse appropriée.

## RESPONSES

Les réponses doivent être cohérentes.

Ne pas retourner accidentellement :

* mots de passe ;
* tokens privés ;
* secrets ;
* données internes ;
* informations appartenant à un autre utilisateur.

## ERREURS

Utiliser des codes HTTP appropriés.

Les messages destinés au client doivent être compréhensibles sans exposer l'architecture interne.

## AUTHORIZATION

Chaque route privée doit vérifier les permissions nécessaires.

Ne jamais considérer qu'une URL contenant un ID signifie que l'utilisateur possède cette ressource.

## RATE LIMITING

Lorsque nécessaire, appliquer des limites sur :

* authentification ;
* récupération de compte ;
* endpoints coûteux ;
* actions sensibles ;
* endpoints publics.

## DOCUMENTATION

Lorsque le projet utilise une documentation API, maintenir celle-ci à jour avec le code.

## TESTS

Tester au minimum :

* succès ;
* validation invalide ;
* non authentifié ;
* non autorisé ;
* ressource inexistante ;
* erreur serveur ;
* cas limites.

## COMPATIBILITÉ

Lorsqu'une API existante est utilisée par plusieurs clients, éviter de casser les contrats existants sans stratégie de migration.

## DEFINITION OF DONE

Une API est terminée lorsqu'elle est :

* cohérente ;
* validée ;
* sécurisée ;
* documentée si nécessaire ;
* testée ;
* intégrée au backend et au frontend.
