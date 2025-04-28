/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardBody, Image, Button } from "@heroui/react";

import DefaultLayout from "@/layouts/default";
import { Product } from "@/interface/product";
import { title } from "@/components/primitives";
import { useCart } from "@/context/cartContext";
import { useBuyNow } from "@/context/buyNowContext";

const SearchResult = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const { addProduct } = useCart();
  const { setBuyNow } = useBuyNow();

  useEffect(() => {
    if (query.trim() !== "") {
      fetch(
        `https://3.88.197.78/products/search?query=${encodeURIComponent(query)}`,
      )
        .then((res) => res.json())
        .then((data) => {
          const productsData: Product[] = (data as Product[]).map(
            (prod: any) => ({
              ...prod,
              id: prod._id,
            }),
          );

          setProducts(productsData);
        })
        .catch((err) => console.error("Error en la búsqueda:", err));
    }
  }, [query]);

  return (
    <DefaultLayout>
      <h3 className={title()}>Resultados de búsqueda para: {query}</h3>
      <div className="flex flex-col gap-5 justify-between mt-10">
        {products.length > 0 ? (
          products.map((product) => (
            <Card
              key={product.id}
              isBlurred
              className="border-none bg-background/60 dark:bg-default-100/50 max-w-full"
              shadow="sm"
            >
              <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                  <div className="relative col-span-6 md:col-span-4">
                    <Image
                      alt="Imagen"
                      className="object-cover"
                      height={200}
                      shadow="md"
                      src={product.imagen}
                      width="100%"
                    />
                  </div>

                  <div className="flex flex-col col-span-6 md:col-span-8 h-full justify-between">
                    <h3 className="font-semibold text-foreground/90">
                      {product.nombre}
                    </h3>
                    <p className="text-foreground/80">{product.stock}</p>
                    <p className="text-large font-medium mt-2">
                      {product.descripcion}
                    </p>
                    <div className="w-full">
                      <Button
                        className="w-1/2"
                        color="warning"
                        radius="full"
                        onPress={() => {
                          addProduct({
                            id: product.id,
                            precio: product.precio,
                            cantidad: 1,
                          });
                        }}
                      >
                        Agregar al carrito
                      </Button>
                      <Button
                        className="w-1/2"
                        color="success"
                        radius="full"
                        onPress={() => {
                          setBuyNow({
                            id: product.id,
                            cantidad: 1,
                          });
                          navigate("/address");
                        }}
                      >
                        Comprar ahora
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <li>No se encontraron productos.</li>
        )}
      </div>
    </DefaultLayout>
  );
};

export default SearchResult;
