# Charte de Design & Architecture Agence IA — "STYLE A" (Standard SaaS Dashboard)

## 📌 Principe Fondamental du "STYLE A"
Le **"STYLE A"** est l'**ARCHITECTURE VISUELLE ET DISPOSITION EN GRILLE (LAYOUT)** de référence de l'agence, éprouvée sur CreditTrack Pro et déployée sur l'application **Alamajonda**.

⚠️ **REMARQUE MAJEURE SUR LE CONTENU** :
Le contenu des cartes, des menus, des graphiques et des badges **ADAPTE STRICTEMENT LES DONNÉES AU MÉTIER D'ALAMAJONDA** (Agenda synchronisé, Rappels vocaux interactifs, Tâches & Priorités, Copilote IA).
- La structure visuelle (Sidebar + Header + KPIs 1 ligne + Grilles 2 colonnes 65%/35%) reste strictement identique à CreditTrack Pro.
- Les textes, métriques et icônes sont réels et authentiques (aucun faux chiffre ni rendez-vous inventé).

---

## 🎨 Spécifications de la Structure Visuelle "STYLE A"

### 1. Structure à 2 Zones Plein Écran
- **Sidebar Fixe à Gauche (20% de la largeur, 100vh)** :
  - **En haut** : Logo officiel Alamajonda + sous-titre de marque.
  - **Navigation verticale** : Liens d'accès avec icônes. L'élément actif possède un **grand bloc plein coloré avec coins arrondis** (`bg-[#0d55e0] text-white`).
  - **Bloc bas** : Widget de statut / indicateur de quota contextuel.
  - **Pied de page** : Profil utilisateur connecté (Avatar, Nom, Rôle / Compte Pro).
- **Grand Workspace Principal à Droite (75% à 80% de la largeur)** :
  - Arrière-plan propre, lisible et professionnel : fond Obsidian `#030712` avec reflets saphir et cyan électrique (zéro néon criard).
  - Utilise 100% de la largeur disponible bord à bord sans centrage étriqué.

### 2. Header Supérieur Horizontal du Workspace
- S'étire sur toute la largeur restante à droite de la sidebar.
- **Gauche** : Titre dynamique de la page active avec icône associée + statut en temps réel.
- **Droite** : Contrôles contextuels (Bouton d'action principal `+ Nouveau Rendez-vous`, Briefing vocal, Cloche de notifications, Avatar profil).

### 3. Tableau de Bord (Dashboard Grille Pleine Largeur)
- **Rangée 1 : Cartes KPI** sur **UNE SEULE ligne horizontale** :
  - 4 grandes cartes spacieuses adaptées au métier d'Alamajonda : *Tâches du jour*, *Rendez-vous*, *Efficacité IA*, *Temps gagné*.
- **Rangée 2 : Section Principale** en 2 colonnes :
  - **65%** : Grand planning chronologique d'agenda / timeline de la journée aérée.
  - **35%** : Panneau des alarmes et rappels vocaux avec synthèse.
- **Rangée 3 : Section Données & Activité** en 2 colonnes :
  - **65%** : Table / liste complète des priorités du jour avec acquittement instantané.
  - **35%** : Carte d'impact productivité réelle & copilote express.

### 4. Cohérence Totale sur TOUTES les Pages
- Toutes les sous-pages de l'application (`/dashboard`, `/calendar`, `/reminders`, `/tasks`, `/agent`, `/contacts`) conservent exactement la même grille large et le même header sans jamais revenir à une disposition étroite ou comprimée.

### 5. Zéro Néon Criard & Esthétique Saphir / Obsidian
- Bannir les couleurs vertes ou violettes fluorescentes et les bordures néon agressives.
- Utiliser la palette prestigieuse d'Alamajonda : Obsidian `#030712`, Saphir profond `#0D55E0`, Cyan raffiné `#38BDF8`.
