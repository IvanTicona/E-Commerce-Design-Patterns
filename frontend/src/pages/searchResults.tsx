import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardFooter,
  Image,
  Badge,
} from "@heroui/react";
import { products } from "@/data/products";
import DefaultLayout from "@/layouts/default";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook para redirigir
  const query = new URLSearchParams(location.search).get("q") || "";
  const searchTerm = query.toLowerCase();

  // Filtrar productos que coincidan con el término de búsqueda
  const filteredProducts = products.filter(
    (product) =>
      product.nombre.toLowerCase().includes(searchTerm) ||
      product.descripcion.toLowerCase().includes(searchTerm) ||
      product.categoria.toLowerCase().includes(searchTerm)
  );

  // Función para redirigir a la página de detalles del producto
  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <DefaultLayout>
      <h1 className="text-2xl font-bold mb-6">
        Resultados de búsqueda para: "{query}"
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => {
            // Calcular precio con descuento (si aplica)
            const precioConDescuento = item.descuento
              ? (item.precio * (1 - item.descuento)).toFixed(2)
              : null;
            const porcentajeDescuento = item.descuento
              ? Math.round(item.descuento * 100)
              : null;

            return (
              <Card
                key={item.id}
                isPressable
                className="w-full shadow-lg overflow-hidden rounded-lg"
                onPress={() => handleProductClick(item.id)} // Redirigir al hacer clic
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
                    {/* Precio original tachado (si hay descuento) */}
                    {precioConDescuento && (
                      <p className="text-gray-500 line-through text-sm">
                        Bs. {item.precio.toFixed(2)}
                      </p>
                    )}
                    {/* Precio con descuento o precio normal */}
                    <p
                      className={`${
                        precioConDescuento ? "text-red-500" : "text-black"
                      } font-bold text-lg`}
                    >
                      Bs. {precioConDescuento || item.precio.toFixed(2)}
                    </p>
                    {/* Porcentaje de descuento (si hay descuento) */}
                    {porcentajeDescuento && (
                      <Badge color="danger" className="text-xs">
                        {porcentajeDescuento}% OFF
                      </Badge>
                    )}
                  </div>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default SearchResults;