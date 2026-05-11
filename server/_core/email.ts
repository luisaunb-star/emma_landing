import { Resend } from "resend";
import { ENV } from "./env";

const EMMA_EMAIL = "contato@emmadigital.care";
const FROM_ADDRESS = "Emma Digital <contato@emmadigital.care>";

function getResend(): Resend {
  if (!ENV.resendApiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  return new Resend(ENV.resendApiKey);
}

export async function sendWaitlistEmail(params: {
  name: string;
  email: string;
  profile: string;
  source: "form" | "chatbot";
}): Promise<boolean> {
  try {
    const resend = getResend();
    const sourceLabel = params.source === "chatbot" ? "Chatbot Emma" : "Formulário da Home";
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: EMMA_EMAIL,
      subject: `Nova inscrição na lista de espera — ${params.name}`,
      html: `
        <h2>Nova inscrição na Lista de Espera</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;font-weight:bold;border:1px solid #eee;">Nome</td><td style="padding:8px;border:1px solid #eee;">${params.name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border:1px solid #eee;">E-mail</td><td style="padding:8px;border:1px solid #eee;">${params.email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border:1px solid #eee;">Perfil</td><td style="padding:8px;border:1px solid #eee;">${params.profile}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border:1px solid #eee;">Origem</td><td style="padding:8px;border:1px solid #eee;">${sourceLabel}</td></tr>
        </table>
      `,
    });
    if (error) {
      console.warn("[Email] Resend error (waitlist):", error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[Email] Failed to send waitlist email:", err);
    return false;
  }
}

export async function sendContactEmail(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: EMMA_EMAIL,
      replyTo: params.email,
      subject: `Contato: ${params.subject} — ${params.name}`,
      html: `
        <h2>Nova mensagem de contato</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;font-weight:bold;border:1px solid #eee;">Nome</td><td style="padding:8px;border:1px solid #eee;">${params.name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border:1px solid #eee;">E-mail</td><td style="padding:8px;border:1px solid #eee;">${params.email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border:1px solid #eee;">Assunto</td><td style="padding:8px;border:1px solid #eee;">${params.subject}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border:1px solid #eee;">Mensagem</td><td style="padding:8px;border:1px solid #eee;">${params.message}</td></tr>
        </table>
      `,
    });
    if (error) {
      console.warn("[Email] Resend error (contact):", error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[Email] Failed to send contact email:", err);
    return false;
  }
}
