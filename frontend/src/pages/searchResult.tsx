/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
import { Product } from "@/interface/product";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim() !== "") {
      fetch(
        `http://localhost:3000/products/search?query=${encodeURIComponent(query)}`,
      )
        .then((res) => res.json())
        .then((data) => {
          const productsData: Product[] = (data as Product[]).map(
            (prod: any) => ({
              ...prod,
              id: prod._id,
            }),
          );

          setProducts(productsData);
        })
        .catch((err) => console.error("Error en la búsqueda:", err));
    }
  }, [query]);

  return (
    <DefaultLayout>
      <h1 className="text-xl font-bold">
        Resultados de búsqueda para: {query}
      </h1>
      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id} className="py-2 border-b">
              {product.nombre}
            </li>
          ))
        ) : (
          <li>No se encontraron productos.</li>
        )}
      </ul>
    </DefaultLayout>
  );
};

export default SearchResult;
