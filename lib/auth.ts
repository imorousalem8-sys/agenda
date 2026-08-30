import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getMemoryUser } from "@/lib/userStore";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://olcvcfselpcebqgrwkly.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "alarm-agenda-auth-secret-key-2026-production-secure-99182371",
  trustHost: true,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = (credentials.email as string).toLowerCase().trim();
        const password = credentials.password as string;

        // 1. Compte Démo instantané
        if (email === "demo@alarmagenda.ai" && password === "Demo1234!") {
          return {
            id: "demo_usr_1",
            email: "demo@alarmagenda.ai",
            name: "Utilisateur Démo",
            plan: "PRO",
            subscriptionStatus: "ACTIVE",
          };
        }

        let user: any = null;

        // 2. Recherche prioritaire dans le store mémoire (utilisateur venant de valider l'OTP)
        const memUser = getMemoryUser(email);
        if (memUser) {
          user = {
            id: memUser.id,
            email: memUser.email,
            name: memUser.name,
            password: memUser.passwordHash,
            plan: memUser.plan,
            subscriptionStatus: memUser.subscriptionStatus,
          };
        }

        // 3. Recherche via Supabase REST API HTTPS (Port 443)
        if (!user && supabaseServiceKey) {
          try {
            const res = await fetch(`${supabaseUrl}/rest/v1/User?email=eq.${encodeURIComponent(email)}&select=*`, {
              headers: {
                "apikey": supabaseServiceKey,
                "Authorization": `Bearer ${supabaseServiceKey}`,
              },
            });
            const users = await res.json().catch(() => []);
            if (Array.isArray(users) && users.length > 0) {
              user = users[0];
            }
          } catch (restErr) {
            console.warn("[Auth] Supabase REST search exception:", restErr);
          }
        }

        // 4. Recherche via Prisma DB
        if (!user) {
          try {
            user = await prisma.user.findUnique({
              where: { email },
            });
          } catch (dbError) {
            console.warn("[Auth] Prisma DB search exception:", dbError);
          }
        }

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id || `usr_${Date.now()}`,
          email: user.email,
          name: user.name || "Utilisateur",
          image: user.image,
          plan: user.plan || "PRO",
          subscriptionStatus: user.subscriptionStatus || "TRIAL",
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.plan = (user as unknown as { plan?: string }).plan || "PRO";
        token.subscriptionStatus = (user as unknown as { subscriptionStatus?: string }).subscriptionStatus || "TRIAL";
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as unknown as { plan?: string }).plan = (token.plan as string) || "PRO";
        (session.user as unknown as { subscriptionStatus?: string }).subscriptionStatus = (token.subscriptionStatus as string) || "TRIAL";
      }
      return session;
    },
  },
});
