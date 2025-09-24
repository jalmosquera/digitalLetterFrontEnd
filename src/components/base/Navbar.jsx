import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = ({ onClose }) => {
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
    <div className="fixed top-0 left-0 z-50 flex flex-col justify-between w-screen h-screen p-6 text-white bg-black/85 backdrop-blur-md">
      {/* Parte superior */}
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold">Categorías</h2>
        <div className="flex flex-col items-center w-full gap-4">
          {categories.map((cat) => {
            const name = cat.translations?.[language]?.name || "Sin nombre";

            return (
              <Link
                key={cat.id}
                to={`/productsList?category=${cat.id}`}
                onClick={onClose}
                className="w-[90%] py-3 text-center text-lg font-semibold rounded-md hover:bg-gray-800 transition"
              >
                {name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Parte inferior: botón cerrar */}
      <div className="flex justify-center">
        <button
          onClick={onClose}
          className="px-6 py-2 font-bold transition bg-red-600 rounded-md hover:bg-red-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Navbar;
