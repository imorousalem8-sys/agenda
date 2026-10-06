-- =========================================================
-- Schéma SQL pour Supabase (PostgreSQL) - Application Agenda
-- Exécutez ce script dans l'éditeur SQL de Supabase (SQL Editor)
-- =========================================================

-- 1. Table Utilisateurs (User)
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" TEXT,
    "email" TEXT UNIQUE NOT NULL,
    "emailVerified" TIMESTAMP WITH TIME ZONE,
    "password" TEXT,
    "image" TEXT,
    "mode" TEXT NOT NULL DEFAULT 'PERSONAL',
    "timezone" TEXT NOT NULL DEFAULT 'Europe/Paris',
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 2. Table Comptes Authentification (Account)
CREATE TABLE IF NOT EXISTS "Account" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_provider_providerAccountId_key" UNIQUE ("provider", "providerAccountId")
);

-- 3. Table Sessions (Session)
CREATE TABLE IF NOT EXISTS "Session" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "sessionToken" TEXT UNIQUE NOT NULL,
    "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "expires" TIMESTAMP WITH TIME ZONE NOT NULL
);

-- 4. Table Tokens de vérification (VerificationToken)
CREATE TABLE IF NOT EXISTS "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT UNIQUE NOT NULL,
    "expires" TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT "VerificationToken_identifier_token_key" UNIQUE ("identifier", "token")
);

-- 5. Table Contacts (Contact)
CREATE TABLE IF NOT EXISTS "Contact" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "company" TEXT,
    "address" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 6. Table Événements & Rendez-vous (Event)
CREATE TABLE IF NOT EXISTS "Event" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "notes" TEXT,
    "startAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "endAt" TIMESTAMP WITH TIME ZONE,
    "location" TEXT,
    "category" TEXT NOT NULL DEFAULT 'OTHER',
    "priority" TEXT NOT NULL DEFAULT 'NORMAL',
    "mode" TEXT NOT NULL DEFAULT 'PERSONAL',
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "recurrence" TEXT,
    "contactId" TEXT REFERENCES "Contact"("id") ON DELETE SET NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 7. Table Tâches (Task)
CREATE TABLE IF NOT EXISTS "Task" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "title" TEXT NOT NULL,
    "notes" TEXT,
    "dueAt" TIMESTAMP WITH TIME ZONE,
    "priority" TEXT NOT NULL DEFAULT 'NORMAL',
    "mode" TEXT NOT NULL DEFAULT 'PERSONAL',
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "items" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 8. Table Rappels & Alarmes (Reminder)
CREATE TABLE IF NOT EXISTS "Reminder" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "eventId" TEXT REFERENCES "Event"("id") ON DELETE CASCADE,
    "taskId" TEXT REFERENCES "Task"("id") ON DELETE CASCADE,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "fireAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "snoozedTo" TIMESTAMP WITH TIME ZONE,
    "method" TEXT NOT NULL DEFAULT 'NOTIFICATION',
    "isVeille" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 9. Table Notifications Push (PushSubscription)
CREATE TABLE IF NOT EXISTS "PushSubscription" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "endpoint" TEXT UNIQUE NOT NULL,
    "p256dh" TEXT NOT NULL,
    "auth" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Index pour des performances optimales
CREATE INDEX IF NOT EXISTS "Event_userId_startAt_idx" ON "Event"("userId", "startAt");
CREATE INDEX IF NOT EXISTS "Reminder_userId_fireAt_idx" ON "Reminder"("userId", "fireAt");
CREATE INDEX IF NOT EXISTS "Task_userId_dueAt_idx" ON "Task"("userId", "dueAt");
CREATE INDEX IF NOT EXISTS "Contact_userId_idx" ON "Contact"("userId");
