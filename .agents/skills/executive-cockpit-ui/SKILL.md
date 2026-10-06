---
name: executive-cockpit-ui
description: >-
  Standard d'architecture d'interface et de design cockpit prestige 2026 pour Alamajonda.
  Définit les règles impératives de structuration : zéro éparpillement, affichage 100% plein écran
  sans sidebar fixe permanente, tiroir de navigation escamotable pour sortir/changer de section,
  ruban horizontal de commandes en ordre précis vers le haut, dimensions confortables sans texte
  tronqué, canvas conversationnel zen et dock vocal flottant avec orbe glowing.
---

# Standard Executive Cockpit UI — Alamajonda 2026

Ce skill définit la doctrine officielle d'architecture d'interface, de design spatial et d'ergonomie pour l'ensemble des pages de l'application Alamajonda.

---

## 1. Philosophie Fondatrice : "Plein Écran Total, Ordre Précis & Zéro Éparpillement"

L'erreur majeure à proscrire est de disperser les fonctionnalités sous forme de multiples petites fenêtres ou cartes flottantes éparpillées, ou d'écraser l'espace avec une barre latérale fixe permanente qui vole 20% de l'écran.

### Les 5 Lois d'Or :
1. **Plein écran bord à bord (100% Full Width)** :
   - Chaque section s'ouvre en **véritable plein écran immersif** sans menu panel gauche fixe encombrant.
   - L'espace de travail dispose de 100% de la largeur pour respirer.
2. **Sortir & Changer de section en 1 clic (Drawer Prestige)** :
   - Un bouton d'action `[Changer de Section]` ou `[Menu]` est systématiquement présent dans le header.
   - Au clic, un tiroir de navigation sombre et flouté (Backdrop Glassmorphism) se déploie par-dessus l'écran pour permettre à l'utilisateur de basculer vers une autre section (Agenda, Tâches, Alarmes, Copilote, Contacts, Paramètres), puis se referme instantanément pour restaurer le plein écran.
3. **Unité et non dispersion** :
   - Les actions principales doivent être rassemblées dans un **ruban de commande continu et unifié**, jamais dispersées en blocs désordonnés.
4. **Ordre précis vers le haut** :
   - Les commandes prioritaires se situent horizontalement dans la partie haute, directement sous l'en-tête, ordonnées selon la logique métier de l'utilisateur.
5. **Dimensions confortables, agrandies & Double hiérarchie (Zéro troncature)** :
   - Interdiction absolue de tronquer les textes ou de créer des boutons plats étriqués. Chaque capsule dispose d'une hauteur noble (`h-14`, 56px), d'une largeur généreuse (`min-w-[225px]`), d'un padding respirant (`px-4.5 py-2.5`), d'un biseau de lumière interne et d'une double hiérarchie (Titre en gras + sous-titre descriptif en slate-400).

---

## 2. Palette de Couleurs "Obsidian Prestige" (Zéro Néon, Zéro Violet)

- **Fond d'Espace (Background)** : `#050811` (Obsidian abyssal pur).
- **Fond des Conteneurs (Glass Containers)** : `#070d1e` / `#0a1329` avec bordure `border-white/[0.08]` et flou backdrop-blur-2xl.
- **Bleu Saphir Électrique (Primaire)** : `#0d55e0` à `#2563eb` (dégradés nobles, touches d'accentuation).
- **Cyan Aérien (Lumière & Focus)** : `#38bdf8` (lueurs, bordures actives, reflets).
- **Émeraude Tactique (Succès & Synchronisation)** : `#10b981` (badge live "Moteur En Ligne & Synchronisé").
- **Ambre Chaleureux (Alarmes & Alertes)** : `#f59e0b` (alarmes vocales).
- **Interdictions formelles** : Zéro violet/pourpre (`#6366f1`, `#8b5cf6`), zéro néon strident.

---

## 3. Structure Canonique de Chaque Section

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  HEADER : Copilote IA  ● Moteur En Ligne & Synchronisé     [Changer de Section] [Voix] │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  RUBAN DE COMMANDES : [ 📅 RDV ▾ ] [ ⏰ Alarme ▾ ] [ 🗹 Tâche ▾ ] [ 🗓 Agenda ▾ ] [ 🧭 Opt ▾ ] │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│                               CANVAS CENTRAL SPACIEUX                                  │
│                                                                                        │
│        [ Orbe IA ]  "Bonjour ! Que souhaitez-vous planifier aujourd'hui ?"            │
│                                                                                        │
│                                      "Prends rendez-vous demain à 14h"  [ Utilisateur ]│
│                                                                                        │
│        [ Carte d'Exécution Structurée : Rendez-vous planifié ✓ ]                       │
│                                                                                        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                DOCK FLOTTANT :  [  Écrivez votre consigne...   (🎤)  ➢  ]              │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Checklist de Conformité Avant Validation

- [ ] L'écran s'ouvre-t-il à 100% sans sidebar gauche fixe ?
- [ ] Le bouton `Changer de Section` permet-il d'ouvrir le tiroir de navigation et de basculer vers n'importe quelle autre page ?
- [ ] Le ruban de commandes en haut est-il ordonné, continu et sans aucun texte tronqué ?
- [ ] L'espace central est-il recentré et d'un calme visuel absolu ?
- [ ] Le dock vocal inférieur possède-t-il son orbe micro lumineuse cyan ?
- [ ] Zéro couleur violette ou néon criard détectée ?
