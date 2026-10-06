# AlarmAgenda — Guide de démarrage

## Prérequis
- Node.js 18+
- npm 9+

---

## 1. Installer les dépendances

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
npm install
```

> Si vous avez des erreurs de peer deps : `npm install --legacy-peer-deps`

---

## 2. Configurer les variables d'environnement

Le fichier `.env.local` est déjà créé. Vérifiez qu'il contient au minimum :

```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="votre-secret-aleatoire-min-32-caracteres"
AUTH_URL="http://localhost:3000"
```

Pour générer un `AUTH_SECRET` sécurisé :
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 3. Initialiser la base de données

```bash
npx prisma generate
npx prisma db push
```

---

## 4. (Optionnel) Générer les clés VAPID pour les notifications push

```bash
npx web-push generate-vapid-keys
```

Copiez les clés dans `.env.local` :
```env
NEXT_PUBLIC_VAPID_PUBLIC_KEY="votre-cle-publique"
VAPID_PRIVATE_KEY="votre-cle-privee"
```

---

## 5. Lancer l'application

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

---

## Commandes utiles

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run db:studio` | Interface Prisma Studio (BDD) |
| `npm run db:push` | Synchroniser le schéma |

---

## Architecture des fichiers

```
app/
├── (dashboard)/          # Pages protégées (dashboard, calendrier, tâches...)
│   ├── layout.tsx        # Layout avec sidebar
│   ├── page.tsx          # Dashboard
│   ├── calendar/         # Calendrier mensuel
│   ├── reminders/        # Gestion rappels
│   ├── tasks/            # Tâches et listes
│   └── contacts/         # Contacts
├── login/                # Page de connexion
├── register/             # Page d'inscription
├── api/                  # API Routes
│   ├── auth/             # Auth.js
│   ├── events/           # CRUD événements
│   ├── reminders/        # CRUD rappels + /check + /dismiss + /snooze
│   ├── tasks/            # CRUD tâches
│   ├── contacts/         # CRUD contacts
│   └── notifications/    # Push subscriptions
├── globals.css           # Design system complet
└── layout.tsx            # Root layout + SEO

components/
├── forms/
│   └── EventFormModal.tsx  # Formulaire événement (création/édition)
└── reminders/
    ├── AlarmOverlay.tsx    # Overlay d'alarme plein écran
    └── NotificationManager.tsx  # SW + permissions push

lib/
├── prisma.ts        # Client Prisma singleton
├── auth.ts          # Config Auth.js
├── utils.ts         # Utilitaires (format dates, couleurs...)
└── validations.ts   # Schémas Zod

prisma/
└── schema.prisma    # Schéma DB (User, Event, Reminder, Task, Contact, PushSubscription)

public/
├── sw.js            # Service Worker (cache + push notifications)
└── manifest.json    # PWA manifest
```

---

## Fonctionnement du système d'alarme

### App ouverte
- `AlarmOverlay.tsx` interroge `/api/reminders/check` toutes les **30 secondes**
- Si un rappel est dû → overlay plein écran + son + vibration
- L'utilisateur peut "J'ai compris" (dismiss) ou "Reporter 10 min" (snooze)

### App en arrière-plan / fermée
- Le **Service Worker** (`/sw.js`) intercepte les **notifications push** envoyées via Web Push
- Les notifications restent jusqu'à interaction de l'utilisateur (`requireInteraction: true`)
- Actions directement dans la notification : "J'ai compris" ou "Reporter 10 min"

### iOS Safari (limitation connue)
- Les push notifications nécessitent **iOS 16.4+** et l'app **ajoutée à l'écran d'accueil**
- Cette limitation est documentée dans l'interface utilisateur

---

## Tests recommandés

1. **Créer un rappel dans 2 minutes** → vérifier l'overlay d'alarme
2. **Mettre l'app en arrière-plan** → vérifier la notification push
3. **Fermer le navigateur** → vérifier notification système (si SW actif)
4. **Créer un événement demain** avec rappel la veille → vérifier J-1
5. **Modifier un événement** → vérifier les rappels recréés
6. **Supprimer un événement** → vérifier cascade (rappels supprimés)
7. **Mode particulier vs professionnel** → vérifier les libellés
8. **Tâche avec liste de courses** → ajouter items, cocher, supprimer
