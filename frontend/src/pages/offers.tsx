import { useState } from "react";
import {
  Card,
  CardFooter,
  Image,
  CardBody,
  Select,
  SelectItem,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { Product, products } from "../data/products";

import DefaultLayout from "@/layouts/default";

const OffersPage = () => {
  const navigate = useNavigate();

  const filteredProducts = products.filter((product) => product.descuento > 0);

  const handleDetails = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <DefaultLayout>
      <h1 className="text-2xl font-bold mb-4">Ofertas de temporada</h1>

      <div className="flex gap-4 flex-wrap">

        {filteredProducts.map((item) => (
          <Card
            key={item.id}
            isPressable
            className="size-80"
            shadow="sm"
            onPress={() => handleDetails(item)}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                alt={item.nombre}
                className="w-full object-fill h-[270px]"
                radius="lg"
                shadow="sm"
                src={item.imagen}
                width={384}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.nombre}</b>
              <p className="text-default-500">Bs. {item.precio}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default OffersPage;
