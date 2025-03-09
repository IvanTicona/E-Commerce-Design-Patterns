import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Divider, Image } from "@heroui/react";
import "animate.css";

import { Product } from "../data/products";

import DefaultLayout from "@/layouts/default";
import Rating from "@/components/Rating";
import PurchaseOptions from "@/components/purchaseOptions";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const MONGO_URI = import.meta.env.VITE_REACT_APP_SERVER_URL;
        const response = await fetch(`${MONGO_URI}/products/${id}`);

        if (!response.ok) {
          throw new Error("No se pudo obtener el producto");
        }

        const data = await response.json();

        setProduct(data); // Asigna el producto recibido al estado
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Se ejecuta cada vez que cambia el ID

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <DefaultLayout>
      <div className="animate__animated animate__fadeIn grid grid-cols-7 grid-rows-5 gap-4">
        <div className="col-span-2 row-span-5">
          <Image
            isZoomed
            alt={product?.name}
            className="w-full"
            src={product?.images[0]}
          />
        </div>

        <div className="col-span-3 row-span-5 col-start-3">
          <h3 className="text-3xl font-medium">{product?.name}</h3>
          <p className="text-lg font-light">Categoría: {product?.category}</p>
          <Rating rating={product?.rating ?? 0} />
          <Divider className="my-5" />
          <p className="text-lg font-light">Precio: Bs. {product?.price}</p>
          <p className="text-lg font-light">Rating: {product?.rating}</p>
        </div>

        <div className="flex flex-col gap-5 col-span-2 row-span-5 col-start-6 p-5 rounded-lg border">
          <PurchaseOptions
            descuento={product?.discount ?? 0}
            id={product?._id}
            precio={product?.price ?? 0}
            stock={product?.stock ?? 0}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductPage;