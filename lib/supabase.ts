const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://olcvcfselpcebqgrwkly.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

export async function sendSupabaseOtp(email: string) {
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
      }),
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.warn("Supabase OTP direct fetch warning:", err);
    return { ok: false, error: err };
  }
}
