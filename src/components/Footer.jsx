import { Link } from "react-router-dom";
import facebook from "../assets/Footer/facebook.svg";
import twitter from "../assets/Footer/twitter.svg";
import linkedin from "../assets/Footer/linkedin.svg";
import tiktok from "../assets/Footer/tiktok.svg";

export default function Footer() {
  return (
    <footer className="bg-[var(--blue)] text-[var(--orange)] p-4 mt-10">
      <div
        className="
      mx-auto 
      grid gap-x-4
      grid-cols-2 grid-rows-5
      items-center
      lg:grid-cols-8 lg:grid-rows-1
      lg:max-w-5xl
      justify-self-center
      "
      >
        <h2 className="text-[var(--orange)!important]
        row-start-1 col-start-1 col-end-3 justify-self-center
        
        ">
          canopées
        </h2>

        <Link to="/" className="
        row-start-2 col-start-1 py-2 text-lg
        lg:row-start-1 lg:col-start-3 lg:py-0
        ">
          Accueil
        </Link>

        <Link to="/about" className="
        row-start-2 col-start-2 py-2 text-lg 
        lg:row-start-1 lg:col-start-4 
        ">
          Présentation
        </Link>

        <Link to="/prestations" className="
        row-start-3 col-start-1 py-2 text-lg
        lg:row-start-1 lg:col-start-5 lg:py-0
        ">
          Prestations
        </Link>

        <Link to="/tarifs" className="
        row-start-3 col-start-2 py-2 text-lg 
        lg:row-start-1 lg:col-start-6 lg:py-0
        ">
          Tarifs
        </Link>

        <Link to="/contact" className="
        row-start-4 col-start-1 col-end-3 py-2 text-lg 
        lg:row-start-1 lg:col-start-7 lg:col-end-8 lg:py-0
        ">
          Contact
        </Link>
        
        <div
          className="
        row-start-5 col-start-1 col-end-3 
        lg:row-start-1 lg:col-start-8 lg:col-end-9
        "
        >
          <p className="text-[var(--orange)!important] ml-0 text-center">Social Media</p>
          <ul className="flex text-nowrap justify-self-center">
            <li className="w-6 mx-1">
              <img src={facebook} alt="Lien vers la page facebook" />
            </li>
            <li className="w-6 mx-1">
              <img src={twitter} alt="Lien vers la page twitter" />
            </li>
            <li className="w-6 mx-1">
              <img src={linkedin} alt="Lien vers la page linkedin" />
            </li>
            <li className="w-6 mx-1">
              <img src={tiktok} alt="Lien vers la page tiktok" />
            </li>
          </ul>
        </div>
      </div>

      <div
        className="
      w-auto mx-45
      border-b-2 border-solid color-[var(--orange)] self-center mt-5"
      ></div>

      <div className="lg:mx-45 my-5 text-center">

        <div className="
        grid gap-1 justify-self-center
        grid-cols-2 grid-rows-5
        lg:grid-cols-3 lg:grid-rows-3
        ">
          <p className="text-[var(--orange)!important]
          row-start-1 col-start-1 col-end-3
          lg:row-start-1 lg:col-start-1 lg:col-end-2 lg:justify-self-end
          ">
            Canopées
          </p>
          <p className="text-[var(--orange)!important]
          row-start-2 col-start-1 col-end-3 
          lg:row-start-1 lg:col-start-2 lg:col-end-3
          ">60, impasse de Valention</p>
          <p className="text-[var(--orange)!important]
          row-start-3 col-start-1 col-end-3 
          lg:row-start-1 lg:col-start-3 lg:col-end-4 lg:justify-self-start
          ">28100 Barondan</p>
          <p className="text-[var(--orange)!important]
          row-start-4 col-start-1 col-end-3 
          lg:row-start-2 lg:col-start-2 lg:col-end-3
          ">Tél: 0901313891</p>
          <p className="text-[var(--orange)!important]
          row-start-5 col-start-1 col-end-3 
          lg:row-start-3 lg:col-start-1 lg:col-end-4
          ">
            © 2025 Canopées - Tous droits réservés
          </p>
        </div>
        <div className="flex flex-col lg:flex-row font-[Montserrat] underline space-x-2 mt-2 justify-center">
          <Link to="/cgu">Conditions Générales d'Utilisation</Link>
          <Link to="/cgv">Conditions Générales de Ventes</Link>
          <Link to="/mentions">Mentions légales</Link>
        </div>
      </div>
    </footer>
  );
}
