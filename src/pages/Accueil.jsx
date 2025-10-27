import { useState, useEffect } from "react";
import parse from "html-react-parser";
import Slider from "../components/Slider";
import Carousel from "../components/Carousel";
import passionCanopees from "../assets/Accueil/passion-canopees.png";
import carousel1 from "../assets/Accueil/carousel/carousel1.png";
import carousel2 from "../assets/Accueil/carousel/carousel2.png";
import carousel3 from "../assets/Accueil/carousel/carousel3.png";
import carousel4 from "../assets/Accueil/carousel/carousel4.png";
import carousel5 from "../assets/Accueil/carousel/carousel5.png";
import carousel6 from "../assets/Accueil/carousel/carousel6.png";
import carousel7 from "../assets/Accueil/carousel/carousel7.png";

const backPublicPath = "http://localhost:8000/uploads/";

export default function Accueil() {
  const photos = [
    carousel1,
    carousel2,
    carousel3,
    carousel4,
    carousel5,
    carousel6,
    carousel7,
  ];

  const [modifications, setModifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://127.0.0.1:8000/api/site_modifications?page=Accueil")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then((data) => {
        const arrayModifications = data.member.map((item) => ({
          id: item.id,
          image: item.image,
          position: item.position,
          texte: item.texte,
        }));
        console.log(data);
        setModifications(arrayModifications);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Chargement en cours...</div>;
  }

  return (
    <>
      <section
        className="
          flex flex-col text-center
          max-w-150 mx-auto px-5 p-5 box-content
          lg:flex-row lg:text-left lg:max-w-300 lg:py-26
        "
      >
        <img
          src={
            backPublicPath.concat(
              "",
              modifications.find((item) => item.position === 1)?.image
            )
          }
          className="
            object-cover
            max-w-88 w-full
            mx-auto mt-11
            lg:mt-0 lg:mx-0 lg:mr-26 lg:max-w-135 lg:w-135 lg:max-h-130 lg:h-130
          "
          alt="part of the canopees team"
        />
        <div
          className="
            mb-0
            lg:mt-0 lg:mx-0 lg:mr-26 lg:max-w-135 lg:w-135 lg:max-h-130 lg:h-130
          "
        >
          <h2 className="mb-5">Canopées, c’est avant tout une équipe de passionnés</h2>
          <div className="whitespace-pre-line">
            {parse(modifications.find((item) => item.position === 1)?.texte)}
          </div>
        </div>
      </section>
      <section
        className="
          flex flex-col text-center
          max-w-300 mx-auto p-5 box-content
          lg:flex-row lg:text-left lg:max-w-300 lg:py-26
        "
      >
        <div className="lg:order-0 order-1">
          <h2 className="mb-5">Particuliers, Professionnels, Collectivitées</h2>
          <div className="whitespace-pre-line">
            {parse(modifications.find((item) => item.position === 2)?.texte)}
          </div>
        </div>
        <Slider />
      </section>
      <section className="flex-col max-w-300 px-5 mx-auto box-content flex">
        <h2 className="text-center mb-5">Exemples de réalisations</h2>
        <Carousel photos={photos} startIndex={3} />
      </section>
    </>
  );
}