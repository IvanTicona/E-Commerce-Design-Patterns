import { useNavigate } from "react-router-dom";
import { Card, CardFooter, Image, Badge, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";

import { Product } from "../data/products";

import DefaultLayout from "@/layouts/default";

const OffersPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]); // Estado para productos
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga

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
          console.log("Productos recibidos:", data);
          setProducts(data); // Guardar los productos en el estado
        } else {
          throw new Error("Los datos no son válidos o están vacíos");
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false); // Termina la carga
      }
    };

    fetchProducts();
  }, []);

  // Filtrar productos con descuento
  const filteredProducts = products.filter((product) => product.discount > 0);

  const handleDetails = (product: Product) => {
    navigate(`/product/${product._id}`);
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
      <h1 className="text-2xl font-bold mb-6">Ofertas de temporada</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((item) => {
          // Calcular precio con descuento
          const precioConDescuento = (item.price * (1 - item.discount)).toFixed(
            2,
          );
          const porcentajeDescuento = Math.round(item.discount * 100);

          return (
            <Card
              key={item._id}
              isPressable
              className="w-full shadow-lg overflow-hidden rounded-lg"
              onPress={() => handleDetails(item)}
            >
              <div className="relative w-full flex justify-center items-center bg-white">
                <Image
                  alt={item.name}
                  className="object-contain w-full h-40"
                  radius="lg"
                  shadow="sm"
                  src={item.images[0]}
                />
              </div>

              <CardFooter className="p-4 flex flex-col items-start">
                <b className="text-lg">{item.name}</b>
                <div className="flex gap-2 items-center">
                  {/* Precio original tachado */}
                  <p className="text-gray-500 line-through text-sm">
                    Bs. {item.price.toFixed(2)}
                  </p>
                  {/* Precio con descuento */}
                  <p className="text-red-500 font-bold text-lg">
                    Bs. {precioConDescuento}
                  </p>
                  {/* Porcentaje de descuento */}
                  <Badge className="text-xs" color="danger">
                    {porcentajeDescuento}% OFF
                  </Badge>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </DefaultLayout>
  );
};

export default OffersPage;
