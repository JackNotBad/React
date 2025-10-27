import { Link } from "react-router-dom";
import hamburger from "./assets/hamburger.png";

export default function Navbar({ toggleMenu }) {
  return (
    <nav className="absolute top-20 lg:right-45 right-5 flex justify-center p-4 z-40">
      <ul className="hidden lg:flex lg:space-x-6">
            <li>
                <Link to="/" className="inline-block py-2 text-lg lg:py-0">Accueil</Link>
            </li>
            <li>
                <Link to="/about" className="inline-block py-2 text-lg lg:py-0">Présentation</Link>
            </li>
            <li>
                <Link to="/prestations" className="inline-block py-2 text-lg lg:py-0">Prestations</Link>
            </li>
            <li>
                <Link to="/tarifs" className="inline-block py-2 text-lg lg:py-0">Tarifs</Link>
            </li>
            <li>
                <Link to="/contact" className="inline-block py-2 text-lg lg:py-0">Contact</Link>
            </li>
      </ul>
      <button onClick={toggleMenu} className="ml-auto lg:hidden">
        <img src={hamburger} alt="Ouvrir le menu" className="cursor-pointer" />
      </button>
    </nav>
  );
}