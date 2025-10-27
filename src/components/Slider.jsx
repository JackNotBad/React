import { useState, useEffect } from "react";
import slide1 from "../assets/slider/slide1.png"
import slide2 from "../assets/slider/slide2.png"
import slide3 from "../assets/slider/slide3.png"
import slide4 from "../assets/slider/slide4.png"
import slide5 from "../assets/slider/slide5.png"

const images = [
  slide1,
  slide2,
  slide3,
  slide4,
  slide5,
];

export default function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
      <>
        <img
          src={images[index]}
          alt="mutiple pictures of gardens"
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