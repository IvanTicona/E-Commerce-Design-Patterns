/* eslint-disable no-console */
import { Card, CardFooter, Image, CardBody, Skeleton } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import DefaultLayout from "@/layouts/default";
import { Product } from "@/interface/product";

const LandingPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();

  const handleDetails = (product: Product) => {
    setTimeout(() => {
      navigation(`/product/${product.id}`);
    }, 300);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        const productsData: Product[] = (response.data as Product[]).map(
          (prod: any) => ({
            ...prod,
            id: prod._id,
          }),
        );

        setProducts(productsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <DefaultLayout>
      <div className="flex gap-4 flex-wrap">
        {products.map((item) => (
          <Skeleton key={item.id} className="rounded-lg" isLoaded={!loading}>
            <Card
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
          </Skeleton>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default LandingPage;
