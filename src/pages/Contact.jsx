import { useState } from "react";
import { sitePublicPath } from '../utils';

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    content: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const apiUrl = sitePublicPath + "/api/messages";

      const token = localStorage.getItem("jwtToken");

      const headers = {
        "Content-Type": "application/ld+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const payload = {
        name: form.name,
        email: form.email,
        subject: form.subject,
        content: form.content,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errText = `Erreur ${response.status}`;
        try {
          const data = await response.json();
          if (data?.violations?.length) {
            errText = data.violations.map((v) => v.content).join(", ");
          } else if (data?.detail) {
            errText = data.detail;
          } else if (data?.content) {
            errText = data.content;
          } else {
            errText = JSON.stringify(data);
          }
        } catch (err) {
          try {
            errText = await response.text();
          } catch (e) {
          }
        }
        throw new Error(errText);
      }

      setStatus({
        loading: false,
        success: "Votre demande a bien été envoyée.",
        error: null,
      });
      setForm({ name: "", email: "", subject: "", content: "" });
    } catch (err) {
      console.error("Envoi message:", err);
      setStatus({
        loading: false,
        success: null,
        error: err?.message || "Une erreur est survenue, veuillez réessayer.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="mb-6 text-center text-2xl font-semibold">
        Besoin d’un devis ou d’un renseignement ? Notre équipe vous répond dans les plus brefs délais.
      </h2>

      <div className="grid md:grid-cols-1 gap-6">
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Nom</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Votre nom"
              value={form.name}
              onChange={handleChange}
              className="bg-[var(--mauve-opacity)] w-full p-3 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Adresse e‑mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Votre email"
              value={form.email}
              onChange={handleChange}
              className="bg-[var(--mauve-opacity)] w-full p-3 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="block mb-1 font-medium">Objet</label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Objet"
              value={form.subject}
              onChange={handleChange}
              className="bg-[var(--mauve-opacity)] w-full p-3 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block mb-1 font-medium">Votre message</label>
            <textarea
              id="content"
              name="content"
              placeholder="Votre message"
              value={form.content}
              onChange={handleChange}
              className="bg-[var(--mauve-opacity)] w-full p-3 border rounded"
              rows="6"
              required
            />
          </div>

          {status.error && <div className="text-red-600">{status.error}</div>}
          {status.success && <div className="text-green-700">{status.success}</div>}

          <div className="text-center">
            <button
              type="submit"
              disabled={status.loading}
              className={`bg-[var(--orange)] font-bold text-[var(--mauve)] px-6 py-3 rounded hover:bg-[var(--pink)] transition ${
                status.loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {status.loading ? "Envoi..." : "Envoyer"}
            </button>
          </div>
        </form>

        <iframe
          title="Plan d'accès"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d674925.5328074142!2d2.4607021713113943!3d48.639929534455625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67b0661e1366f%3A0xa546489860cb8273!2zQ0FOT1DDiUVT!5e0!3m2!1sfr!2sfr!4v1761919356543!5m2!1sfr!2sfr"
          width="100%"
          height="300"
          allowFullScreen=""
          loading="lazy"
          className="rounded-lg"
        />
      </div>
    </div>
  );
}