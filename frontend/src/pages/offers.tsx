import { useNavigate } from "react-router-dom";
import {
  Card,
  CardFooter,
  Image,
  CardBody,
  Badge
} from "@heroui/react";

import { Product, products } from "../data/products";
import DefaultLayout from "@/layouts/default";

const OffersPage = () => {
  const navigate = useNavigate();

  // Filtrar productos con descuento
  const filteredProducts = products.filter((product) => product.descuento > 0);

  const handleDetails = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <DefaultLayout>
      <h1 className="text-2xl font-bold mb-6">Ofertas de temporada</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((item) => {
          // Calcular precio con descuento
          const precioConDescuento = (item.precio * (1 - item.descuento)).toFixed(2);
          const porcentajeDescuento = Math.round(item.descuento * 100);

          return (
            <Card
              key={item.id}
              isPressable
              className="w-full shadow-lg overflow-hidden rounded-lg"
              onPress={() => handleDetails(item)}
            >
              <div className="relative w-full flex justify-center items-center bg-white">
                <Image
                  alt={item.nombre}
                  className="object-contain w-full h-40"
                  radius="lg"
                  shadow="sm"
                  src={item.imagen}
                />
              </div>
              
              <CardFooter className="p-4 flex flex-col items-start">
                <b className="text-lg">{item.nombre}</b>
                <div className="flex gap-2 items-center">
                  {/* Precio original tachado */}
                  <p className="text-gray-500 line-through text-sm">Bs. {item.precio.toFixed(2)}</p>
                  {/* Precio con descuento */}
                  <p className="text-red-500 font-bold text-lg">Bs. {precioConDescuento}</p>
                  {/* Porcentaje de descuento */}
                  <Badge color="danger" className="text-xs">{porcentajeDescuento}% OFF</Badge>
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
