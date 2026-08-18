import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "chancel@mundiis.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Mundiis <onboarding@resend.dev>";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: string;
  email?: string;
  activity?: string;
  message?: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquante — voir README pour la configuration.");
    return NextResponse.json(
      { error: "Le service d'envoi n'est pas configuré. Contactez-nous directement par email." },
      { status: 500 },
    );
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const activity = body.activity?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Nom, email et message sont requis." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Nouveau contact — ${name}${activity ? ` (${activity})` : ""}`,
      text: [
        `Nom: ${name}`,
        `Email: ${email}`,
        `Activité concernée: ${activity || "—"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "L'envoi a échoué. Réessayez plus tard." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form send error:", error);
    return NextResponse.json({ error: "L'envoi a échoué. Réessayez plus tard." }, { status: 502 });
  }
}
