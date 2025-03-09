import { useEffect, useState } from "react";
import {
  Card,
  CardFooter,
  Image,
  CardBody,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { Product } from "../data/products";

import DefaultLayout from "@/layouts/default";

const CategoryPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const MONGO_URI = import.meta.env.VITE_REACT_APP_SERVER_URL; // Revisa si esta URL es correcta
        const response = await fetch(`${MONGO_URI}/products`);

        if (!response.ok) {
          console.error(
            "Error al obtener los productos:",
            response.status,
            response.statusText,
          );
          throw new Error("Error al obtener los productos");
        }

        const data = await response.json();

        if (data && Array.isArray(data)) {
          setProducts(data);
        } else {
          throw new Error("Los datos no son válidos o están vacíos");
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-screen">
          <Spinner size="lg" />
        </div>
      </DefaultLayout>
    ); // Mientras se cargan los productos, mostrar un spinner
  }

  const categories = [
    "Todos",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleDetails = (product: Product) => {
    navigate(`/product/${product._id}`);
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

        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <div className="flex gap-4 flex-wrap">
            {filteredProducts.map((item) => (
              <Card
                key={item._id}
                isPressable
                className="size-80"
                shadow="sm"
                onPress={() => handleDetails(item)}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    alt={item.name}
                    className="w-full object-fill h-[270px]"
                    radius="lg"
                    shadow="sm"
                    src={item.images[0] || "https://via.placeholder.com/150"} // Usa la primera imagen o una por defecto
                    width={384}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{item.name}</b>
                  <p className="text-default-500">
                    Bs. {item.price.toFixed(2)}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default CategoryPage;
