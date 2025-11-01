import { useState, useCallback } from "react";
import { sitePublicPath } from "../utils";

const emailRegex = /^\S+@\S+\.\S+$/;

export default function Contact() {
  const [form, setForm] = useState({
    type: "devis",
    name: "",
    email: "",
    subject: "",
    content: "",
  });

  const [errors, setErrors] = useState({
    type: null,
    name: null,
    email: null,
    subject: null,
    content: null,
  });

  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  const validateField = useCallback((name, value) => {
    switch (name) {
      case "type":
        if (!["devis", "contact"].includes(value)) return "Type invalide.";
        return null;
      case "name":
        if (!value.trim()) return "Le nom est requis.";
        if (value.trim().length < 2) return "Le nom doit contenir au moins 2 caractères.";
        return null;
      case "email":
        if (!value.trim()) return "L'adresse e-mail est requise.";
        if (!emailRegex.test(value.trim())) return "Format d'e-mail invalide.";
        return null;
      case "subject":
        if (!value.trim()) return "L'objet est requis.";
        if (value.trim().length < 2) return "L'objet doit contenir au moins 2 caractères.";
        return null;
      case "content":
        if (!value.trim()) return "Le message est requis.";
        if (value.trim().length < 10) return "Le message doit contenir au moins 10 caractères.";
        return null;
      default:
        return null;
    }
  }, []);

  const validateForm = useCallback((currentForm) => {
    const nextErrors = {
      type: validateField("type", currentForm.type),
      name: validateField("name", currentForm.name),
      email: validateField("email", currentForm.email),
      subject: validateField("subject", currentForm.subject),
      content: validateField("content", currentForm.content),
    };
    setErrors(nextErrors);
    return Object.values(nextErrors).every((e) => e === null);
  }, [validateField]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const buildPrefixedSubject = (type, subject) => {
    const prefix = type === "devis" ? "[Devis]" : "[Demande de contact]";
    const trimmed = subject.trim();
    if (trimmed.startsWith(prefix)) return trimmed;
    return `${prefix} ${trimmed}`.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    const isValid = validateForm(form);
    if (!isValid) {
      setStatus({ loading: false, success: null, error: "Veuillez corriger les erreurs du formulaire." });
      const firstInvalid = Object.keys(errors).find((k) => errors[k]);
      if (firstInvalid) {
        const el = document.getElementById(firstInvalid);
        if (el) el.focus();
      }
      return;
    }

    try {
      const apiUrl = sitePublicPath + "/api/messages";
      const token = localStorage.getItem("jwtToken");

      const headers = {
        "Content-Type": "application/ld+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const payload = {
        type: form.type,
        name: form.name.trim(),
        email: form.email.trim(),
        subject: buildPrefixedSubject(form.type, form.subject),
        content: form.content.trim(),
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
            const violationMsg = data.violations.map((v) => `${v.propertyPath}: ${v.message}`).join("; ");
            errText = violationMsg || errText;
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
          } catch (e) {}
        }
        throw new Error(errText);
      }

      setStatus({
        loading: false,
        success: "Votre demande a bien été envoyée.",
        error: null,
      });
      setForm({ type: "devis", name: "", email: "", subject: "", content: "" });
      setErrors({ type: null, name: null, email: null, subject: null, content: null });
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
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow" noValidate>
          <div>
            <label htmlFor="type" className="block mb-1 font-medium">Type de demande</label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              className={`bg-[var(--mauve-opacity)] w-full p-3 border rounded ${errors.type ? "border-red-500" : ""}`}
              aria-invalid={errors.type ? "true" : "false"}
              aria-describedby={errors.type ? "type-error" : undefined}
              required
            >
              <option value="devis">Devis</option>
              <option value="contact">Demande de contact</option>
            </select>
            {errors.type && <p id="type-error" className="mt-1 text-sm text-red-600">{errors.type}</p>}
          </div>

          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Nom</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Votre nom"
              value={form.name}
              onChange={handleChange}
              className={`bg-[var(--mauve-opacity)] w-full p-3 border rounded ${errors.name ? "border-red-500" : ""}`}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              required
            />
            {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>}
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
              className={`bg-[var(--mauve-opacity)] w-full p-3 border rounded ${errors.email ? "border-red-500" : ""}`}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              required
            />
            {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
              className={`bg-[var(--mauve-opacity)] w-full p-3 border rounded ${errors.subject ? "border-red-500" : ""}`}
              aria-invalid={errors.subject ? "true" : "false"}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              required
            />
            {errors.subject && <p id="subject-error" className="mt-1 text-sm text-red-600">{errors.subject}</p>}
          </div>

          <div>
            <label htmlFor="content" className="block mb-1 font-medium">Votre message</label>
            <textarea
              id="content"
              name="content"
              placeholder="Votre message"
              value={form.content}
              onChange={handleChange}
              className={`bg-[var(--mauve-opacity)] w-full p-3 border rounded ${errors.content ? "border-red-500" : ""}`}
              rows="6"
              aria-invalid={errors.content ? "true" : "false"}
              aria-describedby={errors.content ? "content-error" : undefined}
              required
            />
            {errors.content && <p id="content-error" className="mt-1 text-sm text-red-600">{errors.content}</p>}
          </div>

          {status.error && <div role="alert" className="text-red-600">{status.error}</div>}
          {status.success && <div role="status" className="text-green-700">{status.success}</div>}

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
