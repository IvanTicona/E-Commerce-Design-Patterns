import { useEffect, useState } from "react";
import { Divider, Image, Skeleton } from "@heroui/react";
import "animate.css";
import axios from "axios";

import DefaultLayout from "@/layouts/default";
import Rating from "@/components/rating";
import PurchaseOptions from "@/components/purchaseOptions";
import { Product } from "@/interface/product";

const OffersPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Product[]>("https://3.88.197.78/products")
      .then((response) => {
        const filteredProducts = response.data
          .filter(
            (product) => product.offer?.discount && product.offer.discount > 0,
          )
          .map((product) => ({
            ...product,
            offer: {
              discount:
                product.offer?.discount !== undefined &&
                product.offer.discount < 1
                  ? product.offer.discount * 100
                  : (product.offer?.discount ?? 0),
            },
          }));

        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <DefaultLayout>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 m-10 text-center">
        Ofertas Especiales!
      </h1>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 m-10">
        Tenemos descuentos grandes y no tan grandes para tí 🦆👍
      </h1>
      <div className="animate__animated animate__fadeIn grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              className="rounded-lg w-full h-48"
              isLoaded={!loading}
            />
          ))
        ) : products.length > 0 ? (
          products.map((product) => {
            const discountPrice = (
              product.precio -
              (product.precio * (product.offer?.discount ?? 0)) / 100
            ).toFixed(2);

            return (
              <div
                key={product.id}
                className="p-3 border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
              >
                <Image
                  alt={product.nombre}
                  className="w-full h-36 object-contain"
                  src={product.imagen}
                />
                <h3 className="text-lg font-medium mt-2">{product.nombre}</h3>
                <p className="text-sm text-gray-600">{product.categoria}</p>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-red-600">
                    Bs. {discountPrice}
                  </span>
                  <span className="text-xs text-gray-500 line-through">
                    Bs. {product.precio}
                  </span>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                    -{product.offer?.discount}%
                  </span>
                </div>

                <Rating rating={product.rating} />
                <Divider className="my-2" />

                <div className="flex flex-col gap-2">
                  <PurchaseOptions {...product} />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-xl col-span-4">
            No hay productos en oferta.
          </p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default OffersPage;
