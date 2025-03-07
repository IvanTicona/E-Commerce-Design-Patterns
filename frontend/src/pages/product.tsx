import { useParams } from "react-router-dom";
import { Divider, Image } from "@heroui/react";
import "animate.css";

import { products } from "../data/products";

import DefaultLayout from "@/layouts/default";
import Rating from "@/components/Rating";
import PurchaseOptions from "@/components/purchaseOptions";

const ProductPage = () => {
  // Obtener el parámetro 'id' de la URL
  const { id } = useParams();

  // Buscar el producto en la lista de productos
  const index = products.findIndex((product) => product.id === Number(id));

  // Si el producto no existe, mostrar un mensaje de error
  if (index === -1) {
    return (
      <DefaultLayout>
        <h2 className="text-center text-2xl font-bold">Producto no encontrado</h2>
      </DefaultLayout>
    );
  }

  // Obtener el producto actual
  const product = products[index];

  // Calcular el precio con descuento si el producto tiene un descuento
  const precioConDescuento = (product.precio * (1 - product.descuento)).toFixed(2);

  // Verificar si el producto tiene descuento
  const tieneDescuento = product.descuento > 0;

  return (
    <DefaultLayout>
      <div className="animate__animated animate__fadeIn grid grid-cols-7 grid-rows-5 gap-4">
        {/* Imagen del producto */}
        <div className="col-span-2 row-span-5">
          <Image
            isZoomed
            alt={product.nombre}
            className="w-full"
            src={product.imagen}
          />
        </div>

        {/* Información del producto */}
        <div className="col-span-3 row-span-5 col-start-3">
          <h3 className="text-3xl font-medium">{product.nombre}</h3>
          <p className="text-lg font-light">Categoría: {product.categoria}</p>
          <Rating rating={product.rating} />
          <Divider className="my-5" />

          {/* Mostrar precio correctamente según si tiene descuento o no */}
          <div className="flex items-center gap-2">
            {tieneDescuento ? (
              // Si el producto tiene descuento, mostrar precio original tachado y precio en rojo
              <>
                <p className="text-gray-500 line-through text-lg">
                  Bs. {product.precio.toFixed(2)}
                </p>
                <p className="text-red-500 font-bold text-2xl">
                  Bs. {precioConDescuento}
                </p>
              </>
            ) : (
              // Si NO tiene descuento, mostrar solo el precio normal en negro
              <p className="text-black text-2xl font-bold">
                Bs. {product.precio.toFixed(2)}
              </p>
            )}
          </div>

          {/* Mostrar porcentaje de descuento solo si el producto tiene descuento */}
          {tieneDescuento && (
            <p className="text-green-600 font-semibold">
              {Math.round(product.descuento * 100)}% OFF
            </p>
          )}

          {/* Mostrar rating del producto */}
          <p className="text-lg font-light">Rating: {product.rating}</p>
        </div>

        {/* Opciones de compra */}
        <div className="flex flex-col gap-5 col-span-2 row-span-5 col-start-6 p-5 rounded-lg border">
          <PurchaseOptions {...product} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductPage;
