import { Card, CardFooter, Image, CardBody } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { Product, products } from "../data/products";

import DefaultLayout from "@/layouts/default";

const LandingPage = () => {
  const navigation = useNavigate();

  const handleDetails = (product: Product) => {
    setTimeout(() => {
      navigation(`/product/${product.id}`);
    }, 300);
  };

  return (
    <DefaultLayout>
      <div className="flex gap-4 flex-wrap">
        {products.map((item) => (
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
              <p className="text-default-500">{item.precio}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default LandingPage;
