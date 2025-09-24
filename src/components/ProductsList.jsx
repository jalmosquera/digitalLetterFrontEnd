import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const language = localStorage.getItem("language") || "es";

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
    <div className="h-screen p-4 bg-white border border-gray-200 shadow-sm sm:p-8 dark:bg-white dark:border-gray-700">

      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {products.map((product) => {
            // Filtrar por categoría si hay categoryId
            if (categoryId && !product.categories.some(cat => cat.id.toString() === categoryId)) return null;

            const title = product.translations?.[language]?.name || "Sin nombre";
            const description = product.translations?.[language]?.description || "Sin descripción";
            const image = product.image || "/public/descarga.jpeg";

            return (
              <Link
                to="/card"
                state={{
                  title,
                  price: product.price,
                  image,
                  description,
                  ingredients: product.ingredients || [], // 👈 pasar ingredientes
                }}
                key={product.id}
              >
                <li className="py-3 sm:py-4 border-amber-50">
                  <div className="flex items-center">
                    <div className="shrink-0">
                      <img className="w-8 h-8 rounded-full" src={image} alt={title} />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-bold truncate text-black-900 dark:text-black">{title}</p>
                      <p className="text-sm text-black truncate dark:text-black-400">{description}</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-black-900 dark:text-black">
                      {product.price}
                    </div>
                  </div>
                </li>
                <hr className="text-white" />
                <hr />
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProductsList;
