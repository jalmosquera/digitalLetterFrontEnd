import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { RxHamburgerMenu } from "react-icons/rx";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Navbar from "./Navbar"; // 👈 importa tu componente Navbar

const Header = () => {
  const [Toggel, setToggel] = useState(false);
  const navigate = useNavigate();

  const [language, setLanguage] = useState(() => {
    // Revisa localStorage primero
    const savedLang = localStorage.getItem("language");
    if (savedLang) return savedLang;

    // Si no hay, detecta idioma del navegador
    const browserLang = navigator.language.slice(0, 2); // ej: "es", "en"
    const supportedLangs = ["es", "en", "fr", "de"];
    return supportedLangs.includes(browserLang) ? browserLang : "es";
  });

  const handleChange = (e) => {
    const selected = e.target.value;
    setLanguage(selected);
    localStorage.setItem("language", selected);
  };

  const handelToggel = () => {
    setToggel((state) => !state);
  };

  const languages = [
    { code: "es", label: "🇪🇸 Español" },
    { code: "en", label: "🇬🇧 English" },
    { code: "fr", label: "🇫🇷 Français" },
    { code: "de", label: "🇩🇪 Deutsch" },
  ];

  return (
    <div className="sticky top-0 flex items-center justify-around w-screen h-16 bg-brand-black rounded-bl-md rounded-br-md">
      {/* Botón hamburguesa que despliega el Navbar */}
      <button onClick={handelToggel}>
        <RxHamburgerMenu className="text-2xl text-brand-red" />
      </button>

      <div className="flex items-center justify-center h-16 text-3xl text-brand-red ">
        <h1 className="text-4xl font-dawning">Alternativa 2.0</h1>
      </div>

      <FaLongArrowAltLeft
        className="text-2xl cursor-pointer text-brand-red"
        onClick={() => navigate(-1)} // 👈 esto te lleva a la página anterior
      />

      {/* Select de idiomas */}
      <select
        value={language}
        onChange={handleChange}
        className="px-2 py-1 text-white bg-black rounded appearance-none focus:outline-none"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>

      {/* Renderiza el Navbar como overlay */}
      {Toggel && (
  <div className="absolute left-0 z-50 w-full top-16">
    <Navbar onClose={() => setToggel(false)} /> {/* 👈 aquí */}
  </div>
)}

    </div>
  );
};

export default Header;
