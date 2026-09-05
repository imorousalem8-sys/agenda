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
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Code de sécurité AlarmAgenda</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #000000; color: #f8fafc; margin: 0; padding: 24px; }
          .container { max-width: 520px; margin: 0 auto; background: #09090b; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 16px; padding: 36px 28px; box-shadow: 0 20px 50px rgba(0,0,0,0.8); }
          .logo { font-size: 20px; font-weight: 800; color: #ffffff; margin-bottom: 20px; letter-spacing: -0.02em; display: flex; align-items: center; gap: 8px; }
          .badge { display: inline-block; font-size: 11px; font-family: monospace; font-weight: 700; background: rgba(52, 211, 153, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); padding: 2px 8px; border-radius: 4px; }
          .title { font-size: 22px; font-weight: 800; color: #ffffff; margin-bottom: 12px; letter-spacing: -0.02em; }
          .desc { font-size: 14px; color: #94a3b8; line-height: 1.6; margin-bottom: 24px; }
          .code-box { background: #000000; border: 1px solid rgba(52, 211, 153, 0.4); border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0; }
          .code { font-size: 38px; font-weight: 900; letter-spacing: 0.25em; color: #34d399; font-family: 'Courier New', Courier, monospace; }
          .subtext { font-size: 12px; color: #64748b; text-align: center; margin-top: 8px; }
          .footer { font-size: 11px; color: #475569; line-height: 1.5; margin-top: 28px; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            ⚡ AlarmAgenda OS <span class="badge">VÉRIFICATION</span>
          </div>
          <div class="title">Votre code de sécurité à 6 chiffres</div>
          <div class="desc">
            Bonjour <strong>${displayName}</strong>,<br><br>
            Voici votre code de validation personnel à saisir dans l'application :
          </div>
          <div class="code-box">
            <div class="code">${code}</div>
            <div class="subtext">Valable pendant 15 minutes • Usage unique</div>
          </div>
          <div class="desc" style="font-size: 13px; color: #94a3b8;">
            Saisissez ce code dans le formulaire pour finaliser immédiatement votre accès.
          </div>
          <div class="footer">
            Cet email a été envoyé automatiquement par le système d'authentification sécurisé AlarmAgenda OS. Ne partagez ce code avec personne.
          </div>
        </div>
      </body>
    </html>
  `;

  // 1. Envoi direct via Resend API
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
