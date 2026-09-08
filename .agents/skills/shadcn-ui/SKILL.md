---
name: shadcn-ui
description: Guide et standards d'utilisation de shadcn/ui avec Tailwind CSS et React pour Alamajonda.
---

# Guide shadcn/ui pour Alamajonda

Cette compétence fournit les directives, composants et bonnes pratiques pour l'intégration de composants d'interface **shadcn/ui** dans le projet Alamajonda.

## 1. Philosophie & Principes
- **Composants possédés (Copy/Paste)** : Les composants résident dans `components/ui/` et sont 100% personnalisables.
- **Accessibilité native** : Basé sur Radix UI / WAI-ARIA.
- **Stylisation Tailwind + CVA** : Utilisation de `cva` (class-variance-authority) et de `cn()` (`lib/utils.ts`).
- **Thème Sapphire & Slate** : Intégration parfaite avec les variables CSS globales (`--bg-surface`, `--accent-primary`, etc.).

## 2. Structure des Alias
- `@/components/ui` : Composants atomiques (Button, Card, Badge, Dialog, Input, etc.).
- `@/lib/utils` : Utilitaire `cn()`.

## 3. Composants Clés Fréquemment Utilisés
- **Button** : Variantes `default`, `secondary`, `outline`, `ghost`, `destructive`.
- **Card** : `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.
- **Badge** : Statuts, catégories, priorités.
- **Dialog & Modal** : Modales d'événements, réglages de voix, confirmation.
- **Input & Textarea** : Champs de formulaires sécurisés.
- **Tabs** : Navigation par onglets.
