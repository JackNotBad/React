import { useEffect, useState } from "react";
import Section from "../components/Sections";
import Modal from "../components/Modal";
import { backPublicPath } from "../utils";

export default function Prestations() {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://127.0.0.1:8000/api/sections/?Page_Id=3")
      .then((response) => {
        if (!response.ok) throw new Error("Erreur réseau");
        return response.json();
      })
      .then((data) => {
        const formattedSections = data.member.map((item) => {
          const rawDetails = item.detailsSectionImages || [];

          const details = rawDetails
            .flatMap((detail) => {
              const imgs = Array.isArray(detail?.Image) ? detail.Image
                        : detail?.Image ? [detail.Image]
                        : [];

              return imgs.map((img) => img?.url).filter(Boolean);
            })
            .map((url) => String(url))
            .map((url) =>
              /^https?:\/\//i.test(url)
                ? url
                : `${backPublicPath}${url.replace(/^\//, "")}`
            );

          return {
            id: item.id,
            title: item.Title,
            text: item.Text,
            imgSrc: item.Image_Id?.url || item.Image_Id || null,
            imgAlt: item.Image_Id?.alt || "",
            position: item.Position,
            details,
          };
        });

        setSections(formattedSections);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erreur:", err);
        setError(err.message || "Erreur");
        setIsLoading(false);
      });
  }, []);

  const openModal = (images) => {
    setPhotos(images || []);
    setOpen(true);
  };

  if (isLoading) return <div className="py-12 text-center">Chargement...</div>;
  if (error) return <div className="py-12 text-center text-red-600">Erreur : {error}</div>;

  return (
    <div>
      {sections.map((s, index) => (
        <section key={s.id ?? index}>
          <Section
            title={<h2>{s.title}</h2>}
            text={s.text}
            imgSrc={s.imgSrc}
            imgAlt={s.imgAlt}
            imgFirst={index % 2 === 0}
            containerClass=""
            imgClass=""
            textClass=""
            details={s.details}
            onOpenDetails={() => openModal(s.details)}
          />
        </section>
      ))}

      <Modal open={open} onClose={() => setOpen(false)} photos={photos} />
    </div>
  );
}