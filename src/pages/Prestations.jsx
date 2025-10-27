import { useState } from "react";
import Modal from "../components/Modal";
import CREVPrincipal from "../assets/Conception et réalisation espaces verts/CREV - Visuel principal.png"
import CREV1 from "../assets/conception et réalisation espaces verts/CREV - Visuel 1.png"
import CREV2 from "../assets/conception et réalisation espaces verts/CREV - Visuel 2.png"
import CREV3 from "../assets/conception et réalisation espaces verts/CREV - Visuel 3.png"
import CREV4 from "../assets/conception et réalisation espaces verts/CREV - Visuel 4.png"
import EEVPrincipal from "../assets/Entretien des espaces verts/EEV - Visuel principal.png"
import EEV1 from "../assets/Entretien des espaces verts/EEV - Visuel 1.png"
import EEV2 from "../assets/Entretien des espaces verts/EEV - Visuel 2.png"
import EEV3 from "../assets/Entretien des espaces verts/EEV - Visuel 3.png"
import EEV4 from "../assets/Entretien des espaces verts/EEV - Visuel 4.png"
import THPrincipal from "../assets/Taille des haies/TH - Visuel principal.png"
import TH1 from "../assets/Taille des haies/TH - Visuel 1.png"
import TH2 from "../assets/Taille des haies/TH - Visuel 2.png"
import TH3 from "../assets/Taille des haies/TH - Visuel 3.png"
import TH4 from "../assets/Taille des haies/TH - Visuel 4.png"
import EAAPrincipal from "../assets/Élagage et abatage d’arbres/EAA - Visuel principal.png"
import EAA1 from "../assets/Élagage et abatage d’arbres/EAA - Visuel 1.png"
import EAA2 from "../assets/Élagage et abatage d’arbres/EAA - Visuel 2.png"
import EAA3 from "../assets/Élagage et abatage d’arbres/EAA - Visuel 3.png"
import EAA4 from "../assets/Élagage et abatage d’arbres/EAA - Visuel 4.png"
import VDVPrincipal from "../assets/Valorisation des déchets verts/VDV - Visuel principal.png"
import VDV1 from "../assets/Valorisation des déchets verts/VDV - Visuel 1.png"
import VDV2 from "../assets/Valorisation des déchets verts/VDV - Visuel 2.png"
import VDV3 from "../assets/Valorisation des déchets verts/VDV - Visuel 3.png"
import VDV4 from "../assets/Valorisation des déchets verts/VDV - Visuel 4.png"

const prestations = [
  {
    id: 1,
    titre: "Conception et réalisation d'espaces verts",
    image: CREVPrincipal,
    details: [
      CREV1,
      CREV2,
      CREV3,
      CREV4,
    ],
    paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ligula libero. Aliquam lobortis mi eget diam fermentum, eu maximus quam aliquam. Fusce porta tempus iaculis. Phasellus interdum vel eros vel finibus. Donec efficitur tellus nec nunc egestas aliquam. In vitae velit facilisis, congue ligula eu, ornare massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam at consectetur lorem, nec accumsan dui. Vivamus vel aliquam eros, eget dignissim sapien. Fusce efficitur tincidunt turpis a posuere. Praesent quis tincidunt nunc.",
  },
  {
    id: 2,
    titre: "Entretien des espaces verts",
    image: EEVPrincipal,
    details: [
      EEV1,
      EEV2,
      EEV3,
      EEV4,
    ],
    paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ligula libero. Aliquam lobortis mi eget diam fermentum, eu maximus quam aliquam. Fusce porta tempus iaculis. Phasellus interdum vel eros vel finibus. Donec efficitur tellus nec nunc egestas aliquam. In vitae velit facilisis, congue ligula eu, ornare massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam at consectetur lorem, nec accumsan dui. Vivamus vel aliquam eros, eget dignissim sapien. Fusce efficitur tincidunt turpis a posuere. Praesent quis tincidunt nunc.",
  },
  {
    id: 3,
    titre: "Taille des haies",
    image: THPrincipal,
    details: [
      TH1,
      TH2,
      TH3,
      TH4,
    ],
    paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ligula libero. Aliquam lobortis mi eget diam fermentum, eu maximus quam aliquam. Fusce porta tempus iaculis. Phasellus interdum vel eros vel finibus. Donec efficitur tellus nec nunc egestas aliquam. In vitae velit facilisis, congue ligula eu, ornare massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam at consectetur lorem, nec accumsan dui. Vivamus vel aliquam eros, eget dignissim sapien. Fusce efficitur tincidunt turpis a posuere. Praesent quis tincidunt nunc.",
  },
  {
    id: 4,
    titre: "Élagage et abattage d’arbres",
    image: EAAPrincipal,
    details: [
      EAA1,
      EAA2,
      EAA3,
      EAA4,
    ],
    paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ligula libero. Aliquam lobortis mi eget diam fermentum, eu maximus quam aliquam. Fusce porta tempus iaculis. Phasellus interdum vel eros vel finibus. Donec efficitur tellus nec nunc egestas aliquam. In vitae velit facilisis, congue ligula eu, ornare massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam at consectetur lorem, nec accumsan dui. Vivamus vel aliquam eros, eget dignissim sapien. Fusce efficitur tincidunt turpis a posuere. Praesent quis tincidunt nunc.",
  },
  {
    id: 5,
    titre: "Valorisation des déchets verts",
    image: VDVPrincipal,
    details: [
      VDV1,
      VDV2,
      VDV3,
      VDV4,
    ],
    paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at ligula libero. Aliquam lobortis mi eget diam fermentum, eu maximus quam aliquam. Fusce porta tempus iaculis. Phasellus interdum vel eros vel finibus. Donec efficitur tellus nec nunc egestas aliquam. In vitae velit facilisis, congue ligula eu, ornare massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam at consectetur lorem, nec accumsan dui. Vivamus vel aliquam eros, eget dignissim sapien. Fusce efficitur tincidunt turpis a posuere. Praesent quis tincidunt nunc.",
  },
];

export default function Prestations() {
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  const openModal = (images) => {
    setPhotos(images);
    setOpen(true);
  };

  return (
    <div>
      {prestations.map((p, index) => (
        <section
          key={p.id}
          className="
            flex flex-col items-center text-center
            max-w-150 mx-auto px-5 py-12 box-content
            lg:flex-row lg:text-left lg:justify-between lg:max-w-300 lg:py-26
          "
        >
          {index % 2 === 0 ? (
            <>
              <img
                src={p.image}
                alt={p.titre}
                className="
                  object-contain
                  max-w-88 w-full
                  mx-auto mb-6
                  lg:mb-0 lg:mr-26 lg:max-w-135 lg:w-135 lg:max-h-130 lg:h-130
                "
              />
              <div className="flex flex-col justify-center lg:max-w-135 lg:w-135">
                <h2 className="text-xl font-semibold mb-4">{p.titre}</h2>
                <p>{p.paragraph}</p>
                <button
                  onClick={() => openModal(p.details)}
                  className="inline-block max-w-28 mt-2 bg-[var(--orange)] text-white px-4 py-2 rounded shadow hover:bg-[var(--pink)] transition self-center"
                >
                  Réalisations
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col justify-center order-2 lg:order-0 lg:max-w-135 lg:w-135 text-center lg:text-left">
                <h2 className="text-xl font-semibold mb-4">{p.titre}</h2>
                <p>{p.paragraph}</p>
                <button
                  onClick={() => openModal(p.details)}
                  className="inline-block max-w-28 mt-2 bg-[var(--orange)] text-white px-4 py-2 rounded shadow hover:bg-[var(--pink)] transition self-center"
                >
                  Réalisations
                </button>
              </div>
              <img
                src={p.image}
                alt={p.titre}
                className="
                  object-contain
                  max-w-88 w-full
                  mx-auto mt-6
                  lg:mt-0 lg:ml-26 lg:max-w-135 lg:w-135 lg:max-h-130 lg:h-130
                "
              />
            </>
          )}
        </section>
      ))}

      <Modal open={open} onClose={() => setOpen(false)} photos={photos} />
    </div>
  );
}