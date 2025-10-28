import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { uploadsPublicPath, sitePublicPath } from '../utils';
import Modal from "../components/Modal";

export default function Tarifs() {
  const [tarifs, setTarifs] = useState([]);
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  const normalizeUrl = (url) => {
    if (!url) return null;
    return /^https?:\/\//i.test(url) ? url : `${uploadsPublicPath}${String(url).replace(/^\//, "")}`;
  };

  useEffect(() => {
    setIsLoading(true);

    fetch(sitePublicPath + "/api/price_lists")
      .then((response) => {
        if (!response.ok) throw new Error(`Erreur réseau: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const items = Array.isArray(data.member) ? data.member : [];
        const mapped = items.map((it) => {
          const title = it.Title || it.title || "Prestations";
          const description = it.Description || it.description || "";
          const price = it.Price || it.price || "";
          const specs = [
            it.Specification1 || it.specification1,
            it.Specification2 || it.specification2,
            it.Specification3 || it.specification3,
          ].filter(Boolean);

          return {
            id: it.id,
            raw: it,
            title,
            description,
            price,
            specifications: specs,
            details: [],
          };
        });

        setTarifs(mapped);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erreur récupération tarifs:", err);
        setError(err.message || "Erreur inconnue");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);

    fetch(sitePublicPath + "/api/sections/?Page_Id=3")
      .then((response) => {
        if (!response.ok) throw new Error(`Erreur réseau: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const items = Array.isArray(data.member) ? data.member : [];
        const formatted = items.map((item) => {
          const rawDetails = item.detailsSectionImages || [];
          const details = rawDetails
            .flatMap((detail) => {
              const imgs = Array.isArray(detail?.Image)
                ? detail.Image
                : detail?.Image
                ? [detail.Image]
                : [];

              return imgs
                .map((img) => {
                  const url = img?.url || (typeof img === "string" ? img : null);
                  const alt = img?.alt || "";
                  return { src: normalizeUrl(url), alt };
                })
                .filter((i) => i.src);
            });

          const mainImage = item.Image_Id
            ? {
                src: normalizeUrl(item.Image_Id.url || item.Image_Id),
                alt: item.Image_Id?.alt || "",
              }
            : null;

          return {
            id: item.id,
            title: item.Title || "",
            text: item.Text || "",
            position: item.Position,
            imgSrc: mainImage?.src || null,
            imgAlt: mainImage?.alt || "",
            details,
          };
        });

        setSections(formatted);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erreur récupération sections:", err);
        setError(err.message || "Erreur sections");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!tarifs.length || !sections.length) return;

    const mapByTitle = new Map();
    for (const s of sections) {
      if (s.title) mapByTitle.set(String(s.title).trim(), s);
    }

    const merged = tarifs.map((t) => {
      const raw = t.raw || {};
      const titreSection = raw.Titre_Section || raw.titre_section || null;

      let details = t.details || [];
      if (titreSection) {
        const s = mapByTitle.get(String(titreSection).trim());
        if (s && Array.isArray(s.details) && s.details.length > 0) {
          details = s.details.map((d) => ({ src: d.src, alt: d.alt || t.title }));
        } else if (s && s.imgSrc) {
          details = [{ src: s.imgSrc, alt: s.imgAlt || t.title }];
        }
      }

      return { ...t, details };
    });

    setTarifs(merged);
  }, [sections, tarifs.length]);

  const openModal = (images) => {
    const prepared = Array.isArray(images)
      ? images
          .map((p) =>
            typeof p === "string"
              ? { src: normalizeUrl(p), alt: "" }
              : { src: normalizeUrl(p?.src), alt: p?.alt || "" }
          )
          .filter((i) => i.src)
      : [];

    setPhotos(prepared);
    setOpen(true);
  };

  if (isLoading) return <div className="text-center py-8">Chargement en cours...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Erreur : {error}</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center">
        Chaque projet est unique, mais voici une estimation pour vous guider
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-fit mx-auto">
        {tarifs.map((t) => (
          <div
            key={t.id}
            className="flex max-w-180 flex-col border items-center text-center rounded-xl p-6 shadow hover:shadow-lg bg-[#E1F0E5]"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold">{t.title}</h3>
            </div>

            <p className="italic mb-2 text-gray-700">{t.description}</p>

            <p className="font-semibold text-[var(--green)] mb-4">{t.price}</p>

            <ul className="space-y-1 mb-6">
              {t.specifications.length > 0 ? (
                t.specifications.map((s, idx) => (
                  <li key={idx} className="text-sm text-gray-700">
                    {s}
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500">Aucune spécification</li>
              )}
            </ul>

            <div className="flex gap-3">
              <button
                onClick={() => openModal(t.details)}
                className="bg-none text-[var(--mauve)] border border-[var(--orange)] py-2 px-4 rounded hover:bg-[var(--pink)] hover:border-[var(--pink)] transition"
              >
                Exemples
              </button>

              <Link
                to="/contact"
                className="text-center bg-[var(--orange)] text-[var(--mauve)] py-2 px-4 rounded hover:bg-[var(--pink)] transition"
              >
                Devis
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} photos={photos} />
    </div>
  );
}
