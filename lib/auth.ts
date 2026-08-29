import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
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

        // Auto-seed Demo account if demo credentials are used
        if (email === "demo@alarmagenda.ai" && password === "Demo1234!") {
          try {
            const hashedPassword = await bcrypt.hash("Demo1234!", 10);
            const demoUser = await prisma.user.upsert({
              where: { email: "demo@alarmagenda.ai" },
              update: {
                name: "Utilisateur Démo",
                password: hashedPassword,
                plan: "PRO",
                subscriptionStatus: "ACTIVE",
              },
              create: {
                email: "demo@alarmagenda.ai",
                name: "Utilisateur Démo",
                password: hashedPassword,
                plan: "PRO",
                subscriptionStatus: "ACTIVE",
              },
            });

            return {
              id: demoUser.id,
              email: demoUser.email,
              name: demoUser.name,
              plan: "PRO",
              subscriptionStatus: "ACTIVE",
            };
          } catch {
            return {
              id: "demo_usr_1",
              email: "demo@alarmagenda.ai",
              name: "Utilisateur Démo",
              plan: "PRO",
              subscriptionStatus: "ACTIVE",
            };
          }
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) return null;

          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            plan: user.plan || "FREE",
            subscriptionStatus: user.subscriptionStatus || "INACTIVE",
          };
        } catch (dbError) {
          console.error("Authorize error:", dbError);
          return null;
        }
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
        token.plan = (user as unknown as { plan?: string }).plan || "FREE";
        token.subscriptionStatus = (user as unknown as { subscriptionStatus?: string }).subscriptionStatus || "INACTIVE";
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as unknown as { plan?: string }).plan = (token.plan as string) || "FREE";
        (session.user as unknown as { subscriptionStatus?: string }).subscriptionStatus = (token.subscriptionStatus as string) || "INACTIVE";
      }
      return session;
    },
  },
});
