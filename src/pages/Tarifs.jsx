import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import CREV1 from "../assets/conception et réalisation espaces verts/CREV - Visuel 1.png"
import CREV2 from "../assets/conception et réalisation espaces verts/CREV - Visuel 2.png"
import CREV3 from "../assets/conception et réalisation espaces verts/CREV - Visuel 3.png"
import CREV4 from "../assets/conception et réalisation espaces verts/CREV - Visuel 4.png"
import EEV1 from "../assets/Entretien des espaces verts/EEV - Visuel 1.png"
import EEV2 from "../assets/Entretien des espaces verts/EEV - Visuel 2.png"
import EEV3 from "../assets/Entretien des espaces verts/EEV - Visuel 3.png"
import EEV4 from "../assets/Entretien des espaces verts/EEV - Visuel 4.png"
import TH1 from "../assets/Taille des haies/TH - Visuel 1.png"
import TH2 from "../assets/Taille des haies/TH - Visuel 2.png"
import TH3 from "../assets/Taille des haies/TH - Visuel 3.png"
import TH4 from "../assets/Taille des haies/TH - Visuel 4.png"
import EAA1 from "../assets/Élagage et abatage d’arbres/EAA - Visuel 1.png"
import EAA2 from "../assets/Élagage et abatage d’arbres/EAA - Visuel 2.png"
import EAA3 from "../assets/Élagage et abatage d’arbres/EAA - Visuel 3.png"
import EAA4 from "../assets/Élagage et abatage d’arbres/EAA - Visuel 4.png"
import VDV1 from "../assets/Valorisation des déchets verts/VDV - Visuel 1.png"
import VDV2 from "../assets/Valorisation des déchets verts/VDV - Visuel 2.png"
import VDV3 from "../assets/Valorisation des déchets verts/VDV - Visuel 3.png"
import VDV4 from "../assets/Valorisation des déchets verts/VDV - Visuel 4.png"


export default function Tarifs() {
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [tarifs, setTarifs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://127.0.0.1:8000/api/prices")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then((data) => {
        const arrayTarifs = data.member.map((item) => ({
          id: item.id,
          icon: item.image,
          titre: item.name,
          description: item.description,
          price: item.detail_prices,
          features: [item.avantage1, item.avantage2, item.avantage3],
          details: [
            item.name === "Conception et réalisation espaces verts" ? [CREV1, CREV2, CREV3, CREV4] :
            item.name === "Entretien des espaces verts" ? [EEV1, EEV2, EEV3, EEV4] :
            item.name === "Taille des haies" ? [TH1, TH2, TH3, TH4] :
            item.name === "Élagage et abatage d’arbres" ? [EAA1, EAA2, EAA3, EAA4] :
            item.name === "Valorisation des déchets verts" ? [VDV1, VDV2, VDV3, VDV4] :
            []
          ],
        }));
        setTarifs(arrayTarifs);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setIsLoading(false);
      });
  }, []);

  const openModal = (images) => {
    setPhotos(images);
    setOpen(true);
  };

  if (isLoading) {
    return <div className="text-center py-8">Chargement en cours...</div>;
  }

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
            <div className="flex justify-center mb-4">
              <span className="text-4xl mr-3">{t.icon}</span>
              <h2 className="text-xl font-semibold">{t.titre}</h2>
            </div>
            <p className="italic mb-2 text-gray-700">{t.description}</p>
            <p className="font-semibold text-[var(--green)] mb-4">{t.price}</p>

            <ul className="space-y-1 mb-6">
              {t.features.map((feat, idx) => (
                <li key={idx} className="flex items-center justify-center">
                  {feat}
                </li>
              ))}
            </ul>
            <button
              onClick={() => openModal(t.details)}
              className="bg-none text-[var(--mauve)] border-1 border-[var(--orange)] py-2 w-28 mb-5 rounded hover:bg-[var(--pink)] hover:border-[var(--pink)] transition"
            >
              Exemples
            </button>
            <Link
              to="/contact"
              className="text-center bg-[var(--orange)] text-[var(--mauve)] py-2 w-28 rounded hover:bg-[var(--pink)] transition"
            >
              Devis
            </Link>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} photos={photos} />
    </div>
  );
}