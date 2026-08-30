import { NextRequest } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://olcvcfselpcebqgrwkly.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

/**
 * Extrait l'URL de base dynamique à partir d'une requête HTTP (ZÉRO localhost en dur)
 */
export function getDynamicBaseUrl(req?: NextRequest | Request): string {
  if (req) {
    const origin = req.headers.get("origin");
    if (origin && !origin.includes("undefined") && !origin.includes("null") && !origin.includes("localhost")) {
      return origin;
    }

    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    const proto = req.headers.get("x-forwarded-proto") || "https";
    if (host && !host.includes("localhost")) {
      return `${proto}://${host}`;
    }

    const referer = req.headers.get("referer");
    if (referer) {
      try {
        const parsed = new URL(referer);
        if (!parsed.origin.includes("localhost")) {
          return parsed.origin;
        }
      } catch {}
    }
  }

  if (process.env.NEXT_PUBLIC_APP_URL && !process.env.NEXT_PUBLIC_APP_URL.includes("localhost")) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  // URL de production en ligne garantie (Zéro port local 3000)
  return "https://agenda-iota-six.vercel.app";
}

/**
 * Envoie un code OTP à 6 chiffres via Supabase Auth
 * avec URL de redirection dynamique en ligne (Zéro localhost)
 */
export async function sendSupabaseOtp(email: string, redirectTo?: string) {
  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseAnonKey,
        "Authorization": `Bearer ${supabaseServiceKey || supabaseAnonKey}`,
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        create_user: true,
        options: redirectTo ? { emailRedirectTo: redirectTo } : undefined,
        data: redirectTo ? { redirect_to: redirectTo } : undefined,
      }),
    });

    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    console.warn("Supabase OTP send warning:", err);
    return { ok: false, error: err };
  }
}

/**
 * Vérifie un code OTP auprès de Supabase Auth
 */
export async function verifySupabaseOtp(email: string, token: string): Promise<{ ok: boolean; user?: any; error?: string }> {
  const normalizedEmail = email.toLowerCase().trim();
  const cleanToken = token.trim();

  // Essayer les types de vérification Supabase : "email", "signup", "recovery"
  const typesToTry = ["email", "signup", "recovery"];

  for (const type of typesToTry) {
    try {
      const res = await fetch(`${supabaseUrl}/auth/v1/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseAnonKey,
          "Authorization": `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          type,
          email: normalizedEmail,
          token: cleanToken,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return { ok: true, user: data.user || data };
      }
    } catch (e) {
      console.warn(`Supabase verify type=${type} warning:`, e);
    }
  }

  return { ok: false, error: "Code OTP non reconnu par Supabase" };
}

/**
 * Envoie un email de réinitialisation de mot de passe via Supabase Auth
 * avec URL de redirection dynamique (zéro localhost en dur)
 */
export async function sendSupabasePasswordReset(email: string, redirectTo: string) {
  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/recover`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseAnonKey,
        "Authorization": `Bearer ${supabaseServiceKey || supabaseAnonKey}`,
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        redirect_to: redirectTo,
      }),
    });

    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    console.warn("Supabase recover warning:", err);
    return { ok: false, error: err };
  }
}

/**
 * Insère ou met à jour un utilisateur via l'API REST HTTPS Supabase (Port 443)
 * Résistant aux restrictions de pare-feu sur le port 5432
 */
export async function upsertSupabaseUserViaRest(userData: {
  email: string;
  name?: string;
  password?: string;
  plan?: string;
  subscriptionStatus?: string;
}) {
  try {
    const normalizedEmail = userData.email.toLowerCase().trim();
    
    // Vérifier si l'utilisateur existe déjà
    const getRes = await fetch(`${supabaseUrl}/rest/v1/User?email=eq.${encodeURIComponent(normalizedEmail)}&select=*`, {
      headers: {
        "apikey": supabaseServiceKey,
        "Authorization": `Bearer ${supabaseServiceKey}`,
      },
    });

    const existingUsers = await getRes.json().catch(() => []);

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      // Update
      const updateRes = await fetch(`${supabaseUrl}/rest/v1/User?email=eq.${encodeURIComponent(normalizedEmail)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseServiceKey,
          "Authorization": `Bearer ${supabaseServiceKey}`,
          "Prefer": "return=representation",
        },
        body: JSON.stringify({
          name: userData.name || existingUsers[0].name,
          ...(userData.password ? { password: userData.password } : {}),
          updatedAt: new Date().toISOString(),
        }),
      });
      const updated = await updateRes.json().catch(() => []);
      return { ok: updateRes.ok, user: Array.isArray(updated) ? updated[0] : existingUsers[0] };
    } else {
      // Insert
      const newId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const insertRes = await fetch(`${supabaseUrl}/rest/v1/User`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseServiceKey,
          "Authorization": `Bearer ${supabaseServiceKey}`,
          "Prefer": "return=representation",
        },
        body: JSON.stringify({
          id: newId,
          email: normalizedEmail,
          name: userData.name || "Utilisateur",
          password: userData.password || "",
          mode: "PERSONAL",
          timezone: "Europe/Paris",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      });
      const inserted = await insertRes.json().catch(() => []);
      console.log(`[Supabase REST] User ${normalizedEmail} inserted successfully:`, insertRes.status);
      return { ok: insertRes.ok, user: Array.isArray(inserted) ? inserted[0] : { id: newId, email: normalizedEmail } };
    }
  } catch (e) {
    console.warn("Supabase REST upsert exception:", e);
    return { ok: false, error: e };
  }
}
