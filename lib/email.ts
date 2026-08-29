export interface SendOtpEmailParams {
  to: string;
  name: string;
  code: string;
}

// Resend API key from environment
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

export async function sendOtpEmail({ to, name, code }: SendOtpEmailParams) {
  const recipientEmail = to.toLowerCase().trim();
  const displayName = name || "Utilisateur";

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #f1f5f9; margin: 0; padding: 24px; }
          .container { max-width: 540px; margin: 0 auto; background: #111827; border: 1px solid #1f2937; border-radius: 16px; padding: 36px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .logo { font-size: 22px; font-weight: 900; color: #38bdf8; margin-bottom: 24px; letter-spacing: -0.02em; }
          .title { font-size: 22px; font-weight: 700; color: #ffffff; margin-bottom: 12px; }
          .desc { font-size: 15px; color: #94a3b8; line-height: 1.6; margin-bottom: 28px; }
          .code-box { background: linear-gradient(135deg, rgba(6,182,212,0.1), rgba(99,102,241,0.15)); border: 1px solid rgba(99,102,241,0.3); border-radius: 12px; padding: 22px; text-align: center; margin: 24px 0; }
          .code { font-size: 38px; font-weight: 900; letter-spacing: 0.25em; color: #38bdf8; font-family: 'Courier New', monospace; }
          .warning { font-size: 13px; color: #64748b; line-height: 1.5; margin-top: 24px; border-top: 1px solid #1f2937; padding-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">⚡ AlarmAgenda</div>
          <div class="title">Votre code de sécurité personnel</div>
          <div class="desc">
            Bonjour <strong>${displayName}</strong>,<br><br>
            Voici votre code de confirmation pour accéder à votre espace AlarmAgenda :
          </div>
          <div class="code-box">
            <div class="code">${code}</div>
          </div>
          <div class="desc" style="font-size: 13px; color: #94a3b8; text-align: center;">
            Ce code est strictement confidentiel et expire dans <strong>10 minutes</strong>.
          </div>
          <div class="warning">
            Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email en toute sécurité.
          </div>
        </div>
      </body>
    </html>
  `;

  // 1. Dispatch via Resend API (High-deliverability transactional engine)
  if (RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "AlarmAgenda <onboarding@resend.dev>",
          to: [recipientEmail],
          subject: `${code} est votre code de confirmation AlarmAgenda`,
          html: emailHtml,
        }),
      });

      const resData = await res.json().catch(() => ({}));
      if (res.ok) {
        console.log(`[Email] Resend delivery SUCCESS for ${recipientEmail}:`, resData?.id);
        return { success: true, provider: "resend", id: resData?.id };
      } else {
        console.warn(`[Email] Resend status ${res.status} for ${recipientEmail}:`, resData);
      }
    } catch (e) {
      console.warn("[Email] Resend fetch exception:", e);
    }
  }

  // 2. Dispatch via Brevo API (if configured)
  if (process.env.BREVO_API_KEY) {
    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: { name: "AlarmAgenda", email: process.env.BREVO_SENDER || "contact@alarmagenda.ai" },
          to: [{ email: recipientEmail, name: displayName }],
          subject: `${code} est votre code de confirmation AlarmAgenda`,
          htmlContent: emailHtml,
        }),
      });
      if (res.ok) {
        return { success: true, provider: "brevo" };
      }
    } catch (e) {
      console.warn("[Email] Brevo API exception:", e);
    }
  }

  return { success: false, provider: "none" };
}
