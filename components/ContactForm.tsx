"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import MagneticButton from "./MagneticButton";

const fieldCls =
  "w-full border-b border-line bg-transparent py-3 font-sans text-[15px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-coral";

const activities = [
  "Équipements informatiques",
  "Logiciels & digital",
  "IA & data",
  "Conseil",
  "Énergie solaire",
  "Autre",
];

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [activity, setActivity] = useState(activities[0]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          activity,
          message: data.get("message"),
        }),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(result.error || "L'envoi a échoué. Réessayez plus tard.");
        return;
      }

      setStatus("success");
      form.reset();
      setActivity(activities[0]);
    } catch {
      setStatus("error");
      setErrorMessage("Impossible de contacter le serveur. Vérifiez votre connexion.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line bg-paper px-6 py-8 text-center">
        <p className="font-display text-[19px] font-extrabold tracking-tight text-ink">Message envoyé ✓</p>
        <p className="mt-2 text-[14px] leading-[1.6] text-muted">
          Merci — l&rsquo;équipe Mundiis revient vers vous rapidement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="f-name" className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          Nom
        </label>
        <input id="f-name" name="name" type="text" placeholder="Votre nom" className={fieldCls} required />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="f-email" className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          Email
        </label>
        <input
          id="f-email"
          name="email"
          type="email"
          placeholder="vous@entreprise.com"
          className={fieldCls}
          required
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          Activité concernée
        </span>
        <div className="flex flex-wrap gap-2">
          {activities.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setActivity(a)}
              aria-pressed={activity === a}
              className={`cursor-hover border px-3 py-1.5 text-[13px] transition-colors ${
                activity === a
                  ? "border-coral bg-coral text-ink"
                  : "border-line text-ink/70 hover:border-coral hover:text-coral"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="f-msg" className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          Votre projet
        </label>
        <textarea
          id="f-msg"
          name="message"
          rows={4}
          placeholder="Décrivez votre besoin en quelques lignes"
          className={`${fieldCls} resize-y`}
          required
        />
      </div>

      <MagneticButton type="submit" variant="primary" className="mt-2 w-fit">
        {status === "loading" ? "Envoi…" : "Envoyer →"}
      </MagneticButton>

      {status === "error" && (
        <p className="text-[12.5px] text-coral">
          {errorMessage} Vous pouvez aussi écrire directement à{" "}
          <a href="mailto:chancel@mundiis.com" className="underline">
            chancel@mundiis.com
          </a>
          .
        </p>
      )}
    </form>
  );
}
