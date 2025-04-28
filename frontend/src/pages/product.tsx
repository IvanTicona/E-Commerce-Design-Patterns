/* eslint-disable prettier/prettier */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Divider, Image, Skeleton } from "@heroui/react";
import "animate.css";
import axios from "axios";

import DefaultLayout from "@/layouts/default";
import Rating from "@/components/rating";
import PurchaseOptions from "@/components/purchaseOptions";
import { Product } from "@/interface/product";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Product & { id: string }>(`https://3.88.197.78/products/${id}`)
      .then((response) => {
        const productData: Product = {
          ...response.data,
        };

        setProduct(productData);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <DefaultLayout>
      <div className="animate__animated animate__fadeIn grid grid-cols-7 grid-rows-5 gap-4">
        <div className="col-span-2 row-span-5">
          <Skeleton className="rounded-lg" isLoaded={!loading}>
            <Image
              isZoomed
              alt={product?.nombre || ""}
              className="w-full"
              src={product?.imagen || ""}
            />
          </Skeleton>
        </div>

        <div className="col-span-3 row-span-5 col-start-3">
          <Skeleton className="rounded-lg" isLoaded={!loading}>
            <h3 className="text-3xl font-medium">{product?.nombre || ""}</h3>
            <p className="text-lg font-light">
              Categoría: {product?.categoria || ""}
            </p>
            {product && <Rating rating={product.rating} />}
          </Skeleton>
          <Divider className="my-5" />
          <Skeleton className="rounded-lg" isLoaded={!loading}>
            <p className="text-lg font-light">
              Precio: Bs. {product?.precio || 0}
            </p>
            <p className="text-lg font-light">{product?.descripcion}</p>
          </Skeleton>
        </div>

        <div className="flex flex-col gap-5 col-span-2 row-span-5 col-start-6 p-5 rounded-lg border dark:border-gray-800 dark:bg-gray-800">
          {product && <PurchaseOptions {...product} />}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductPage;
