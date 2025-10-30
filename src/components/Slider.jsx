import { useState, useEffect } from "react";
import parse from "html-react-parser";
import React from "react";
import { nettoyerTexte, uploadsPublicPath, sitePublicPath } from '../utils';

export default function Slider() {
  const [index, setIndex] = useState(0);
  const [sliders, setSliders] = useState([]);
  const [title, setTitle] = useState("");
  const [texte, setTexte] = useState("");

  useEffect(() => {
    fetch(sitePublicPath + "/api/sliders/")
      .then((response) => {
        if (!response.ok) throw new Error("Erreur sliders: " + response.status);
        return response.json();
      })
      .then((data) => {
        const members = data?.member ?? [];

        const result = members.map((slider) => {
          const sid = slider?.id ?? null;
          const stexte = slider?.text ?? "";
          const stitle = slider?.title ?? "";
          const simgs = (slider.images ?? [])
            .slice()
            .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
            .map((slideritem) => {
              const filename = slideritem?.image?.url;
              if (!filename) return null;
              return {
                url: uploadsPublicPath + String(filename).replace(/^\//, ""),
                alt: slideritem?.image?.alt ?? "",
                position: slideritem?.position ?? null,
              };
            })
            .filter(Boolean);

          return { id: sid, texte: stexte, title: stitle, images: simgs };
        });
        setSliders(result);
        setTitle(nettoyerTexte(result[0].title));
        setTexte(nettoyerTexte(result[0].texte));
      })
      .catch((err) => {
        console.error("Erreur fetch sliders:", err);
        setSliders([]);
      });
  }, []);
  
  const photos = React.useMemo(() => {
      return sliders.flatMap((c) => c.images.map((img) => img.url));
    }, [sliders]);
  const photosAlt = React.useMemo(() => {
      return sliders.flatMap((c) => c.images.map((img) => img.alt));
    }, [sliders]);

  useEffect(() => {
    if (!photos || photos.length === 0) {
      setIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setIndex((previous) => {
        return (previous + 1) % photos.length;
      });
    }, 9000);
    return () => clearInterval(interval);
  }, [photos]);

  return (
      <>
        <div className="lg:order-0 order-1">
          <h2 className="mb-5">{parse(title)}</h2>
          <div className="whitespace-pre-line">
            {parse(texte)}
          </div>
        </div>
        <img
          src={photos[index]}
          alt={photosAlt[index]}
          className="
          object-cover
          max-w-88 w-full 
          mx-auto mt-11
          lg:mt-0 lg:mx-0 lg:mr-26 lg:max-w-135 lg:w-135 lg:max-h-130 lg:h-130
        "
        />
      </>
  );
}