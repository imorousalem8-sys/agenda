import { PrismaClient } from "@prisma/client";

const RESILIENT_POOLER_URL =
  "postgresql://postgres.olcvcfselpcebqgrwkly:Ag3nda_Supab4se_9Xk2vL7mQp1R@aws-0-ca-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require&connection_limit=1";

function getCleanDatabaseUrl(): string {
  let url = process.env.DATABASE_URL || "";
  
  // Si DATABASE_URL pointe vers le port direct 5432 (bloqué en IPv4/serverless) ou est vide, utiliser le pooler 6543
  if (!url || url.includes("db.olcvcfselpcebqgrwkly.supabase.co") || (url.includes(":5432") && url.includes("supabase.co"))) {
    return RESILIENT_POOLER_URL;
  }
  
  return url;
}

const activeDbUrl = getCleanDatabaseUrl();

if (typeof process !== "undefined" && process.env) {
  process.env.DATABASE_URL = activeDbUrl;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: activeDbUrl,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
