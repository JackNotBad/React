import { useState, useEffect } from "react";
import React from "react";
import Slider from "../components/Slider";
import Section from "../components/Sections";
import Carousel from "../components/Carousel";
import { uploadsPublicPath, sitePublicPath } from '../utils';

export default function Accueil() {

  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [carousels, setCarousels] = useState([]);

  useEffect(() => {
    fetch(sitePublicPath + "/api/sections/?Page_Id=1")
      .then((response) => {
        if (!response.ok) throw new Error("Erreur réseau");
        return response.json();
      })
      .then((data) => {
        const formattedSections = data.member.map((item) => ({
          id: item.id,
          title: item.Title,
          text: item.Text,
          imgSrc: item.Image_Id?.url,
          imgAlt: item.Image_Id?.alt,
          position: item.Position,
        }));
        setSections(formattedSections);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(sitePublicPath + "/api/carousels/")
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
                url: uploadsPublicPath + String(filename).replace(/^\//, ""),
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
      .filter(c => String(c.page).toLowerCase() === 'accueil')
      .flatMap(carouselItem => (carouselItem.images || []).map(img => img.url));
  }, [carousels]);

  const getSectionByPosition = (pos) => sections.find((sectionItem) => sectionItem.position === pos);

  if (isLoading) {
    return <div className="text-center py-8">Chargement en cours...</div>;
  }

  return (
    <>
      {/* Section Accueil */}
      {getSectionByPosition(1) && (
        <Section
          imgSrc={getSectionByPosition(1).imgSrc}
          imgAlt={getSectionByPosition(1).imgAlt}
          text={getSectionByPosition(1).text}
          imgFirst={true}
        >
          <h2>{getSectionByPosition(1).title}</h2>
        </Section>
      )}

      {/* Section Slider */}
      <section
        className="
          flex flex-col text-center
          max-w-300 mx-auto p-5 box-content
          lg:flex-row lg:text-left lg:max-w-300 lg:py-26
        "
      >
        <Slider />
      </section>

      {/* Section Carousel */}
      <section className="flex-col max-w-300 px-5 mx-auto box-content flex">
        <h2 className="text-center mb-5">{carousels.find((item) => item.page === 'accueil')?.title}</h2>
        <Carousel photos={photos} startIndex={3} />
      </section>
    </>
  );
}