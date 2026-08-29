import tls from "tls";

export interface SendOtpEmailParams {
  to: string;
  name: string;
  code: string;
}

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
          .logo { font-size: 20px; font-weight: 800; color: #38bdf8; margin-bottom: 24px; letter-spacing: -0.02em; }
          .title { font-size: 22px; font-weight: 700; color: #ffffff; margin-bottom: 12px; }
          .desc { font-size: 15px; color: #94a3b8; line-height: 1.6; margin-bottom: 28px; }
          .code-box { background: linear-gradient(135deg, rgba(6,182,212,0.1), rgba(99,102,241,0.15)); border: 1px solid rgba(99,102,241,0.3); border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0; }
          .code { font-size: 36px; font-weight: 900; letter-spacing: 0.25em; color: #38bdf8; font-family: 'Courier New', monospace; }
          .warning { font-size: 13px; color: #64748b; line-height: 1.5; margin-top: 24px; border-top: 1px solid #1f2937; padding-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">⚡ AlarmAgenda</div>
          <div class="title">Vérification de votre adresse email</div>
          <div class="desc">
            Bonjour <strong>${displayName}</strong>,<br><br>
            Merci de créer votre compte sur AlarmAgenda. Pour confirmer votre adresse email et finaliser votre inscription, voici votre code de sécurité :
          </div>
          <div class="code-box">
            <div class="code">${code}</div>
          </div>
          <div class="desc" style="font-size: 13px; color: #94a3b8; text-align: center;">
            Ce code est strictement personnel et expire dans <strong>10 minutes</strong>.
          </div>
          <div class="warning">
            Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email en toute sécurité.
          </div>
        </div>
      </body>
    </html>
  `;

  // 1. Resend API Integration (if RESEND_API_KEY is provided)
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "AlarmAgenda <onboarding@resend.dev>",
          to: [recipientEmail],
          subject: `${code} est votre code de confirmation AlarmAgenda`,
          html: emailHtml,
        }),
      });
      if (res.ok) {
        return { success: true, provider: "resend" };
      }
    } catch (e) {
      console.warn("Resend API warning:", e);
    }
  }

  // 2. Brevo API Integration (if BREVO_API_KEY is provided)
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
      console.warn("Brevo API warning:", e);
    }
  }

  // 3. Direct SSL/TLS SMTP Socket Dispatcher (supports Gmail SMTP, Brevo SMTP, etc.)
  const smtpHost = process.env.SMTP_HOST || (process.env.GMAIL_USER ? "smtp.gmail.com" : "");
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || "";
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_PASS || "";
  const smtpPort = Number(process.env.SMTP_PORT) || 465;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const sent = await sendRawTlsSmtp({
        host: smtpHost,
        port: smtpPort,
        user: smtpUser,
        pass: smtpPass,
        to: recipientEmail,
        subject: `${code} est votre code de confirmation AlarmAgenda`,
        html: emailHtml,
      });
      if (sent) return { success: true, provider: "smtp" };
    } catch (smtpErr) {
      console.warn("Native SMTP dispatch warning:", smtpErr);
    }
  }

  return { success: false, provider: "none" };
}

interface RawSmtpOptions {
  host: string;
  port: number;
  user: string;
  pass: string;
  to: string;
  subject: string;
  html: string;
}

function sendRawTlsSmtp(opts: RawSmtpOptions): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const socket = tls.connect(
        {
          host: opts.host,
          port: opts.port,
          rejectUnauthorized: false,
        },
        () => {
          let step = 0;

          socket.on("data", (data) => {
            const msg = data.toString();

            if (step === 0 && msg.startsWith("220")) {
              socket.write(`EHLO localhost\r\n`);
              step = 1;
            } else if (step === 1 && msg.includes("250")) {
              socket.write(`AUTH LOGIN\r\n`);
              step = 2;
            } else if (step === 2 && msg.startsWith("334")) {
              socket.write(`${Buffer.from(opts.user).toString("base64")}\r\n`);
              step = 3;
            } else if (step === 3 && msg.startsWith("334")) {
              socket.write(`${Buffer.from(opts.pass).toString("base64")}\r\n`);
              step = 4;
            } else if (step === 4 && msg.startsWith("235")) {
              socket.write(`MAIL FROM:<${opts.user}>\r\n`);
              step = 5;
            } else if (step === 5 && msg.startsWith("250")) {
              socket.write(`RCPT TO:<${opts.to}>\r\n`);
              step = 6;
            } else if (step === 6 && msg.startsWith("250")) {
              socket.write(`DATA\r\n`);
              step = 7;
            } else if (step === 7 && msg.startsWith("354")) {
              const emailPayload = [
                `From: "AlarmAgenda" <${opts.user}>`,
                `To: <${opts.to}>`,
                `Subject: ${opts.subject}`,
                `MIME-Version: 1.0`,
                `Content-Type: text/html; charset=UTF-8`,
                ``,
                opts.html,
                `.`,
                ``,
              ].join("\r\n");

              socket.write(emailPayload);
              step = 8;
            } else if (step === 8 && msg.startsWith("250")) {
              socket.write(`QUIT\r\n`);
              socket.end();
              resolve(true);
            } else if (msg.startsWith("4") || msg.startsWith("5")) {
              socket.end();
              resolve(false);
            }
          });
        }
      );

      socket.setTimeout(8000, () => {
        socket.destroy();
        resolve(false);
      });

      socket.on("error", () => resolve(false));
    } catch {
      resolve(false);
    }
  });
}
