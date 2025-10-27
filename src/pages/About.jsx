import { useState, useEffect } from "react";
import React from "react";
import Carousel from "../components/Carousel";
import Section from "../components/Sections";
import { backPublicPath } from '../utils';


export default function About() {

  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [carousels, setCarousels] = useState([]);

  useEffect(() => {
    fetch("https://127.0.0.1:8000/api/sections/?Page_Id=2")
      .then((response) => {
        if (!response.ok) throw new Error("Erreur réseau");
        return response.json();
      })
      .then((data) => {
        console.log(data,"data")
        const formattedSections = data.member.map((item) => ({
          id: item.id,
          title: item.Title,
          text: item.Text,
          imgSrc: item.Image_Id?.url,
          imgAlt: item.Image_Id?.alt,
          position: item.Position,
        }));
        console.log(formattedSections, "formattedSections")
        setSections(formattedSections);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setIsLoading(false);
      });
  }, []);
  
  useEffect(() => {
    fetch("https://127.0.0.1:8000/api/carousels/")
      .then((response) => {
        if (!response.ok) throw new Error("Erreur carousels: " + response.status);
        return response.json();
      })
      .then((data) => {
        const members = data?.member ?? [];
        const result = members.map((carousel) => {
          const cid = carousel?.id ?? null;
          const ctitle = carousel?.title ?? "";
          const cpage = carousel?.page?.Name ?? "";
          const imgs = (carousel.images ?? [])
            .slice()
            .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
            .map((carouselitem) => {
              const filename = carouselitem?.image?.url;
              if (!filename) return null;
              return {
                url: backPublicPath + String(filename).replace(/^\//, ""),
                alt: carouselitem?.image?.alt ?? "",
                position: carouselitem?.position ?? null,
              };
            })
            .filter(Boolean);

          return { id: cid, title: ctitle, page: cpage, images: imgs };
        });

        setCarousels(result);
      })
      .catch((err) => {
        console.error("Erreur fetch carousels:", err);
        setCarousels([]);
      });
  }, []);

  const photos = React.useMemo(() => {
    return carousels
      .filter(c => String(c.page).toLowerCase() === 'presentation')
      .flatMap(carouselItem => (carouselItem.images || []).map(img => img.url));
  }, [carousels]);

  if (isLoading) {
    return <div className="text-center py-8">Chargement en cours...</div>;
  }

  const getSectionByPosition = (pos) => sections.find((sectionItem) => sectionItem.position === pos);

return (
    <>
      {/* Section Bob */}
      {getSectionByPosition(1) && (
        <Section
          imgSrc={getSectionByPosition(1).imgSrc}
          imgAlt={getSectionByPosition(1).imgAlt}
          text={getSectionByPosition(1).text}
          imgFirst={false}
        >
          <h2>{getSectionByPosition(1).title}</h2>
        </Section>
      )}

      {/* Section Tom */}
      {getSectionByPosition(2) && (
        <Section
          imgSrc={getSectionByPosition(2).imgSrc}
          imgAlt={getSectionByPosition(2).imgAlt}
          text={getSectionByPosition(2).text}
          imgFirst={false}
        >
          <h2>{getSectionByPosition(2).title}</h2>
        </Section>
      )}

      {/* Section "Notre histoire" */}
      {getSectionByPosition(3) && (
        <Section
          imgSrc={getSectionByPosition(3).imgSrc}
          imgAlt={getSectionByPosition(3).imgAlt}
          text={getSectionByPosition(3).text}
          imgFirst={true}
        >
          <h2>{getSectionByPosition(3).title}</h2>
        </Section>
      )}

      {/* Section "Nos valeurs" */}
      {getSectionByPosition(4) && (
        <Section
          imgSrc={getSectionByPosition(4).imgSrc}
          imgAlt={getSectionByPosition(4).imgAlt}
          text={getSectionByPosition(4).text}
          imgFirst={false}
        >
          <h2>{getSectionByPosition(4).title}</h2>
        </Section>
      )}

      {/* Carousel */}
      <section className="flex-col max-w-300 px-5 mx-auto box-content flex">
        <h2 className="text-center mb-5">
          {carousels.find((item) => item.page === "presentation")?.title}
        </h2>
        <Carousel photos={photos} startIndex={3} />
      </section>

      {/* Section "Notre Vision" */}
      {getSectionByPosition(5) && (
        <Section
          imgSrc={getSectionByPosition(5).imgSrc}
          imgAlt={getSectionByPosition(5).imgAlt}
          text={getSectionByPosition(5).text}
          imgFirst={true}
        >
          <h2>{getSectionByPosition(5).title}</h2>
        </Section>
      )}
    </>
  );
}
