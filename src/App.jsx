import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import About from "./pages/About";
import Prestations from "./pages/Prestations";
import Tarifs from "./pages/Tarifs";
import Contact from "./pages/Contact";
import CGU from "./pages/CGU";
import CGV from "./pages/CGV";
import Mentions from "./pages/Mentions";

export default function App() {
  return (
    <Router>
      <Header/>
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/about" element={<About />} />
          <Route path="/prestations" element={<Prestations />} />
          <Route path="/tarifs" element={<Tarifs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cgu" element={<CGU />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/mentions" element={<Mentions />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
