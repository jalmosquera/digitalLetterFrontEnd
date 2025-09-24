import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = ({ onClose }) => {   // 👈 recibe la función
  const [categories, setCategories] = useState([]);
  const language = localStorage.getItem("language") || "es";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/categories/", {
          headers: { "Accept-Language": language },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [language]);

  return (
    <div
      id="mobileNavbar"
      className="flex flex-col items-center justify-around w-screen h-screen gap-4 text-center text-white bg-brand-black rounded-tl-md rounded-tr-md"
    >
      {categories.map((cat) => {
        const name = cat.translations?.[language]?.name || "Sin nombre";

        return (
          <Link
            key={cat.id}
            to={`/productsList?category=${cat.id}`}
            onClick={onClose}   // 👈 al hacer click, cerramos el menú
            className="w-[90%] py-2 text-center border-b border-gray-300 text-lg font-bold"
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
};

export default Navbar;
