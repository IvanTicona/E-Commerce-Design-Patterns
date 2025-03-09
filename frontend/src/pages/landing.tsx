import { useEffect, useState } from "react";
import { Card, CardFooter, Image, CardBody, Spinner } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
import { Product } from "@/data/products";

const LandingPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]); // Estado para almacenar productos
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const MONGO_URI = import.meta.env.VITE_REACT_APP_SERVER_URL;
        const response = await fetch(`${MONGO_URI}/products`);

        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }

        const data: Product[] = await response.json(); // Aseguramos que data sea un array de Product

        setProducts(data); // Guardamos los productos en el estado
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDetails = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-screen">
          <Spinner size="lg" />
        </div>
      </DefaultLayout>
    ); // Mientras se cargan los productos, mostrar un spinner
  }

  return (
    <DefaultLayout>
      <div className="flex gap-4 flex-wrap">
        {products.length > 0 ? (
          products.map((item) => (
            <Card
              key={item._id}
              isPressable
              className="size-80"
              shadow="sm"
              onPress={() => handleDetails(item._id)} // Usa el ID real de MongoDB
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  alt={item.name}
                  className="w-full object-fill h-[270px]"
                  radius="lg"
                  shadow="sm"
                  src={item.images?.[0] || "/placeholder.png"} // Imagen por defecto si no hay
                  width={384}
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.name}</b>
                <p className="text-default-500">
                  Bs. {item.price.toFixed(2)}
                </p>{" "}
                {/* Formatea precio */}
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default LandingPage;
