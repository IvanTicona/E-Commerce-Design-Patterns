import { useParams } from "react-router-dom";
import { Divider, Image } from "@heroui/react";
import "animate.css";

import { products } from "../data/products";

import DefaultLayout from "@/layouts/default";
import Rating from "@/components/rating";
import PurchaseOptions from "@/components/purchaseOptions";

const ProductPage = () => {
  const { id } = useParams();
  const index = Number(id) - 1;

  return (
    <DefaultLayout>
      <div className="animate__animated animate__fadeIn grid grid-cols-7 grid-rows-5 gap-4">
        <div className="col-span-2 row-span-5">
          <Image
            isZoomed
            alt={products[index].nombre}
            className="w-full"
            src={products[index].imagen}
          />
        </div>

        <div className="col-span-3 row-span-5 col-start-3">
          <h3 className="text-3xl font-medium">{products[index].nombre}</h3>
          <p className="text-lg font-light">
            Categoría: {products[index].categoria}
          </p>
          <Rating rating={products[index].rating} />
          <Divider className="my-5" />
          <p className="text-lg font-light">
            Precio: Bs. {products[index].precio}
          </p>
          <p className="text-lg font-light">Rating: {products[index].rating}</p>
        </div>

        <div className="flex flex-col gap-5 col-span-2 row-span-5 col-start-6 p-5 rounded-lg border">
          <PurchaseOptions {...products[index]} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductPage;
