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

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const navigate = useNavigate();

  const categories = [
    "Todos",
    ...new Set(products.map((product) => product.categoria)),
  ];

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((product) => product.categoria === selectedCategory);

  const handleDetails = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-4">
        <Select
          label="Filtrar por categoría"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <SelectItem key={category} data-value={category}>
              {category}
            </SelectItem>
          ))}
        </Select>

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
      </div>
    </DefaultLayout>
  );
};

export default CategoryPage;
