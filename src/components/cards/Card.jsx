import { useLocation } from "react-router-dom";

const Card = () => {
  const language = localStorage.getItem("language") || "es";
  const location = useLocation();
  const {
    title,
    price,
    image,
    description,
    ingredients = [],
  } = location.state || {};

  const rating = 5; // número de estrellas llenas
  const maxRating = 6;

  console.log("Card data:", { title, price, image, description, ingredients });

  return (
    <div className="w-screen h-screen bg-white border border-gray-200 shadow-sm dark:bg-white dark:border-gray-700">
      <img
        className="w-full max-w-md p-8 mx-auto rounded-md rounded-b-md"
        src={image ?? "/public/descarga.jpeg"}
        alt={title}
      />

      <div className="max-w-md px-5 pb-5 mx-auto">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">
          {title}
        </h5>

        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {Array.from({ length: maxRating }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < rating
                    ? "text-yellow-300"
                    : "text-gray-200 dark:text-gray-600"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
            {rating}.0
          </span>
        </div>

        <p className="mb-4 text-sm text-center text-gray-500 truncate dark:text-gray-400">
          {description ?? "Sin descripción"}
        </p>

        {/* Ingredientes */}
       {ingredients.length > 0 && (
  <ul className="mb-4">
    {ingredients.map((ing) => {
      // Tomamos el nombre en español si existe, o el primer idioma disponible
      const name = ing.translations?.[language]?.name || Object.values(ing.translations || {})[0]?.name || "Sin nombre";
      
      return (
        <li key={ing.id} className="mb-2">
          <span className="flex items-center gap-1 px-2 py-1 text-sm text-black bg-red-200 rounded-md dark:bg-gray-200">
            {ing.icon} {name}
          </span>
        </li>
      );
    })}
  </ul>
)}

        <div className="flex items-center justify-end mt-4 text-3xl font-bold text-gray-900 right-0-0 dark:text-black">
          {price}
        </div>
      </div>
    </div>
  );
};

export default Card;
