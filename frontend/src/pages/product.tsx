import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Divider, Image } from "@heroui/react";
import "animate.css";

import { Product } from "../data/products";

import DefaultLayout from "@/layouts/default";
import Rating from "@/components/Rating";
import PurchaseOptions from "@/components/purchaseOptions";

const ProductPage = () => {
  // Obtener el parámetro 'id' de la URL
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Calcular el precio con descuento si el producto tiene un descuento
  const precioConDescuento = product
    ? (product.price * (1 - product.discount)).toFixed(2)
    : "0.00";

  // Verificar si el producto tiene descuento
  const tieneDescuento = (product?.discount ?? 0) > 0;

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
        {/* Imagen del producto */}
        <div className="col-span-2 row-span-5">
          <Image
            isZoomed
            alt={product.name}
            className="w-full"
            src={product.images[0]}
          />
        </div>

        {/* Información del producto */}
        <div className="col-span-3 row-span-5 col-start-3">
          <h3 className="text-3xl font-medium">{product.name}</h3>
          <p className="text-lg font-light">Categoría: {product.category}</p>
          <Rating rating={product.rating} />
          <Divider className="my-5" />

          {/* Mostrar precio correctamente según si tiene descuento o no */}
          <div className="flex items-center gap-2">
            {tieneDescuento ? (
              // Si el producto tiene descuento, mostrar precio original tachado y precio en rojo
              <>
                <p className="text-gray-500 line-through text-lg">
                  Bs. {product.price.toFixed(2)}
                </p>
                <p className="text-red-500 font-bold text-2xl">
                  Bs. {precioConDescuento}
                </p>
              </>
            ) : (
              // Si NO tiene descuento, mostrar solo el precio normal en negro
              <p className="text-black text-2xl font-bold">
                Bs. {product.price.toFixed(2)}
              </p>
            )}
          </div>

          {/* Mostrar porcentaje de descuento solo si el producto tiene descuento */}
          {tieneDescuento && (
            <p className="text-green-600 font-semibold">
              {Math.round(product.discount * 100)}% OFF
            </p>
          )}

          {/* Mostrar rating del producto */}
          <p className="text-lg font-light">Rating: {product.rating}</p>
        </div>

        {/* Opciones de compra */}
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
