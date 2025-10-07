import { useLocation, useParams } from "react-router-dom";
import { useLanguage } from "../../context/languageContext.js";
import { useEffect, useState } from "react";
import axios from "axios";

const Card = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const params = useParams();

  const {
    productId,
    title: initialTitle,
    price: initialPrice,
    image: initialImage,
    description: initialDescription,
    productTranslations,
    ingredientTranslations = [],
    ingredients: initialIngredients = [],
  } = location.state || {};

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchById = async () => {
      const id = productId || params.id;
      if (!id) return;
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${id}/`, {
          headers: { "Accept-Language": language },
        });
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product by id:", error);
      }
    };
    fetchById();
  }, [productId, params.id, language]);

  const effectiveTranslations = product?.translations || productTranslations;
  const effectiveIngredients = product?.ingredients || initialIngredients;
  const title = effectiveTranslations?.[language]?.name || initialTitle || "Sin nombre";
  const description = effectiveTranslations?.[language]?.description || initialDescription || "Sin descripción";
  const image = product?.image || initialImage;
  const price = product?.price ?? initialPrice;
  const rating = 5; // estrellas llenas
  const maxRating = 6;

  return (
    <div className="flex flex-col px-4 items-center min-h-screen py-10 bg-gray-50 dark:bg-gray-950">
      {/* Card Container */}
      <div className="w-full max-w-3xl overflow-hidden bg-white shadow-lg dark:bg-gray-900 rounded-2xl">
        {/* Imagen */}
        <img
          className="object-cover w-full h-64"
          src={image ?? "/public/descarga.jpeg"}
          alt={title}
        />

        {/* Contenido */}
        <div className="p-6">
          {/* Título */}
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            {Array.from({ length: maxRating }).map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < rating
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            <span className="ml-2 font-medium text-gray-600 dark:text-gray-300">
              {rating}.0
            </span>
          </div>

          {/* Descripción */}
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            {description ?? "Sin descripción"}
          </p>

          {/* Ingredientes */}
          {effectiveIngredients.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                Ingredientes:
              </h2>
              <ul className="space-y-2">
                {effectiveIngredients.map((ing) => {
                  const effectiveTranslations = ing.translations ||
                    ingredientTranslations.find((i) => i.id === ing.id)?.translations ||
                    {};
                  const name =
                    effectiveTranslations?.[language]?.name ||
                    Object.values(effectiveTranslations || {})[0]?.name ||
                    "Sin nombre";

                  return (
                    <li key={ing.id}>
                      <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-red-800 bg-red-100 rounded-full dark:bg-red-900 dark:text-red-200">
                        {ing.icon} {name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Precio */}
          <div className="flex justify-end text-3xl font-bold text-gray-900 dark:text-white">
            {price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
