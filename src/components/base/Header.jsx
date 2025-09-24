import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { RxHamburgerMenu } from "react-icons/rx";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Navbar from "./Navbar";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) return savedLang;
    const browserLang = navigator.language.slice(0, 2);
    const supportedLangs = ["es", "en", "fr", "de"];
    return supportedLangs.includes(browserLang) ? browserLang : "es";
  });

  const handleChange = (e) => {
    const selected = e.target.value;
    setLanguage(selected);
    localStorage.setItem("language", selected);
  };

  const handleToggle = () => setToggle((prev) => !prev);

  const languages = [
    { code: "es", label: "🇪🇸 Español" },
    { code: "en", label: "🇬🇧 English" },
    { code: "fr", label: "🇫🇷 Français" },
    { code: "de", label: "🇩🇪 Deutsch" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-3 md:px-10">
        {/* Hamburguesa */}
        <button
          onClick={handleToggle}
          className="p-2 transition rounded-md hover:bg-gray-100"
        >
          <RxHamburgerMenu className="text-2xl text-gray-800" />
        </button>

        {/* Logo / Título */}
        <Link>
        <h1 className="text-2xl font-bold tracking-wide text-red-700 md:text-3xl">
          Alternativa 2.0
        </h1>
        </Link>

        <div className="flex items-center space-x-4">
          {/* Botón volver */}
          {/* <button
            onClick={() => navigate(-1)}
            className="p-2 transition rounded-md hover:bg-gray-100"
          >
            <FaLongArrowAltLeft className="text-xl text-gray-800" />
          </button> */}

          {/* Selector de idioma */}
          <select
            value={language}
            onChange={handleChange}
            className="px-3 py-1 text-gray-800 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Navbar Overlay */}
      {toggle && (
        <div className="absolute left-0 w-full bg-white shadow-lg top-full">
          <Navbar onClose={() => setToggle(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;
