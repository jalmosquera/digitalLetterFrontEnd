import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/languageContext.js";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const { language } = useLanguage();

  // Obtenemos la categoría de la URL
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products/", {
          headers: { "Accept-Language": language },
          params: categoryId ? { category: categoryId } : {}, // enviar category si existe
        });

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [language, categoryId]); // Re-fetch si cambia idioma o categoría

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50 dark:bg-gray-950">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
        {categoryId ? "Productos de la categoría" : "Todos los productos"}
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No hay productos disponibles.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            // Filtrar por categoría si hay categoryId
            if (
              categoryId &&
              !product.categories.some(
                (cat) => cat.id.toString() === categoryId
              )
            )
              return null;

            const title =
              product.translations?.[language]?.name || "Sin nombre";
            const description =
              product.translations?.[language]?.description ||
              "Sin descripción";
            const image = product.image || "/public/descarga.jpeg";

            return (
              <Link
                to={`/card/${product.id}`}
                state={{
                  productId: product.id,
                  title,
                  price: product.price,
                  image,
                  description,
                  productTranslations: product.translations,
                  ingredientTranslations: product.ingredients?.map((ing) => ({
                    id: ing.id,
                    icon: ing.icon,
                    translations: ing.translations,
                  })) || [],
                  ingredients: product.ingredients || [],
                }}
                key={product.id}
                className="overflow-hidden transition transform bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 dark:bg-gray-900"
              >
                <img
                  src={image}
                  alt={title}
                  className="object-cover w-full h-40"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 truncate dark:text-gray-100">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2 dark:text-gray-300">
                    {description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-brand-red">
                      {product.price}
                    </span>
                    <span className="px-3 py-1 text-xs font-semibold text-white bg-red-900 rounded-full">
                      Ver más
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
