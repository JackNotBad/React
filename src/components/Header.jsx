import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Logo from "../assets/Accueil/logo-canopees.png";
import close from "../assets/close.png";

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const titles = {
    "/": "Donnez vie à vos espaces verts",
    "/about": "Qui sommes-nous",
    "/prestations": "Nos prestations",
    "/tarifs": "Nos tarifs",
    "/contact": "Contactez-nous",
    "/cgu": "Conditions d'utilisation",
    "/cgv": "Conditions générales de vente",
    "/mentions": "Mentions légales",
  };
  const title = titles[location.pathname] || "Canopées";

  return (
    <header className="relative w-full h-125 text-[var(--light-white)]">
      {!menuOpen && (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-black/40 pointer-events-none z-10"></div>
          <div
            className="
              w-full h-full z-0
              bg-[url(./assets/Accueil/hero-bg.jpg)]
              bg-no-repeat bg-cover bg-fixed
              lg:bg-position-[center_bottom_6rem]
              bg-position-[center_bottom_10rem]
              absolute inset-0
            "
          />
          <div className="relative z-20 h-full">
            <Navbar toggleMenu={() => setMenuOpen(true)} />
            <h1
              className="absolute lg:right-45 right-20 flex text-center p-4
            lg:top-30
            top-10
            "
            >
              {title}
            </h1>
            <div className="absolute z-1 bottom-5 right-[15%]">
              <img
                src={Logo}
                alt="Logo de Canopées"
                className="w-auto lg:h-22 h-15"
              />
            </div>
            <div
              className="
                absolute bottom-0 left-0 w-[90%] h-[25%]
                bg-gradient-to-r from-[var(--green)] to-[var(--orange)]
                [clip-path:polygon(0%_0%,90%_0%,100%_100%,0%_100%)]
                z-0
              "
            />
          </div>
        </div>
      )}

      {menuOpen && (
        <hero-section 
          className="
            absolute inset-0 h-125
            bg-gradient-to-r from-[var(--green)] to-[var(--orange)]
            flex flex-col items-end justify-center
            z-30
          "
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-20 lg:right-45 right-5 p-4 z-40"
          >
            <img src={close} alt="Fermer le menu" className="cursor-pointer" />
          </button>
          <ul className="absolute space-y-6 mt-16 text-[var(--blue)] text-2xl font-semibold right-35">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                Présentation
              </Link>
            </li>
            <li>
              <Link to="/prestations" onClick={() => setMenuOpen(false)}>
                Prestations
              </Link>
            </li>
            <li>
              <Link to="/tarifs" onClick={() => setMenuOpen(false)}>
                Tarifs
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </hero-section >
      )}
    </header>
  );
}
