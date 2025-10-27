import { useRef, useState, useEffect } from "react";

export default function CarouselInstagram({ photos, startIndex = 0  }) {
  const carouselRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(startIndex);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };
  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);
  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleScroll = () => {
    const scrollPosition = carouselRef.current.scrollLeft;
    const scrollWidth =
      carouselRef.current.scrollWidth - carouselRef.current.offsetWidth;

    const ratio = scrollWidth === 0 ? 0 : scrollPosition / scrollWidth;
    const index = Math.round(ratio * (photos.length - 1));
    setActiveIndex(index);
  };

  const goToIndex = (index) => {
    const scrollWidth =
      carouselRef.current.scrollWidth - carouselRef.current.offsetWidth;

    carouselRef.current.scrollTo({
      left: (scrollWidth / (photos.length - 1)) * index,
      behavior: "smooth",
    });
  };

   useEffect(() => {
    if (carouselRef.current && photos.length > 0) {
      const scrollWidth =
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: (scrollWidth / (photos.length - 1)) * startIndex,
        behavior: "auto",
      });
    }
  }, [startIndex, photos.length]);

  useEffect(() => {
    const carrouselEl = carouselRef.current;
    if (carrouselEl) {
      carrouselEl.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (carrouselEl) {
        carrouselEl.removeEventListener("scroll", handleScroll);
      }
    };
  }, [photos.length]);

  return (
    <div className="lg:h-[1024px] h-[440px]">
      <div
        ref={carouselRef}
        className="flex overflow-x-scroll snap-x snap-mandatory select-none cursor-grab scroll-smooth px-[7.5%]"
        style={{ msOverflowStyle: "none" }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {photos.map((photo, i) => (
          <div
            key={i}
            className="flex-shrink-0 snap-center relative px-2 min-w-[65%]"
          >
            <img
              src={photo}
              alt={`photo ${i}`}
              draggable={false}
              className="w-[880px] lg:h-[880px] h-[440px] object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => goToIndex(i)}
            className={`w-8 h-8 rounded-full transition-all ${
              activeIndex === i
                ? "bg-[var(--blue)] scale-125"
                : "bg-[var(--mauve)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
