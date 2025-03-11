/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Skeleton,
} from "@heroui/react";
import axios from "axios";

import DefaultLayout from "@/layouts/default";
import { useBuyNow } from "@/context/buyNowContext";
import { useCart } from "@/context/cartContext";
import { Product } from "@/interface/product";
import { PurchaseProduct } from "@/interface/purchaseProduct";

const VerifyPurchasePage = () => {
  const [loading, setLoading] = useState(true);
  const { buyNow, clearBuyNow } = useBuyNow();
  const { products: cartProducts } = useCart();
  const [products, setProducts] = useState<PurchaseProduct[]>([]);
  const addressData = JSON.parse(localStorage.getItem("addressData") || "{}");


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (buyNow) {
          // Si hay buyNow, hacemos el fetch del producto y asignamos la cantidad de buyNow
          const response = await axios.get<Product & { _id: string }>(
            `http://localhost:3000/products/${buyNow.id}`
          );
          const productData = response.data;
          const product: PurchaseProduct = {
            id: productData._id,
            name: productData.nombre,
            description: productData.descripcion,
            price: productData.precio,
            imagen: productData.imagen,
            stock: productData.stock,
            quantity: 1,
          };

          setProducts([product]);
        } else if (cartProducts && cartProducts.length > 0) {
          // Si es del carrito, se itera sobre cada item, se hace fetch por cada id
          const fetchedProducts = await Promise.all(
            cartProducts.map(async (cartProduct) => {
              const response = await axios.get<Product & { _id: string }>(
                `http://localhost:3000/products/${cartProduct.id}`
              );
              const productData = response.data;
              const product: PurchaseProduct = {
                id: productData._id,
                name: productData.nombre,
                description: productData.descripcion,
                price: productData.precio,
                imagen: productData.imagen,
                stock: productData.stock,
                quantity: cartProduct.cantidad,
              };

              return product;
            })
          );

          setProducts(fetchedProducts);
        }
      } catch (error) {
        throw new Error("Error al obtener los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [buyNow, cartProducts, clearBuyNow]);

  // Cálculo de totales (por si deseas mostrar un resumen global)
  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const taxes = (subtotal * 0.15).toFixed(2);
  const total = (subtotal + parseFloat(taxes)).toFixed(2);


  return (
    <DefaultLayout>
        <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 bg-gray-100 p-4 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Verificar Pedido</h2>
          {loading ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            products.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <h3 className="text-lg font-bold">{product.name}</h3>
                </CardHeader>
                <CardBody>
                  <img
                    alt={product.name}
                    className="w-full h-32 object-cover rounded mb-2"
                    src={product.imagen}
                  />
                  <p>{product.description}</p>
                  <p>
                    <strong>Cantidad:</strong> {product.quantity}
                  </p>
                  <p>
                    <strong>Precio Unitario:</strong> ${product.price}
                  </p>
                  <p>
                    <strong>Subtotal:</strong> ${subtotal}
                  </p>
                </CardBody>
              </Card>
            ))
          )}
        </div>

        <div className="md:w-1/2">
            <Skeleton className = "rounded-lg" isLoaded={!loading} >
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-bold">Dirección de Envío</h2>
                </CardHeader>
                <CardBody>
                    {localStorage.getItem("addressData") ? (
                        <div className="mb-4">
                        <p>{addressData.name}</p>
                        <p>{addressData.address1}</p>
                        {addressData.address2 && <p>{addressData.address2}</p>}
                        <p>
                            {addressData.city}, {addressData.zip}
                        </p>
                        <p>{addressData.country}</p>
                        <p>{addressData.phone}</p>
                        <p>{addressData.email}</p>
                        </div>
                    ) : (
                        <p>No se ha proporcionado la dirección</p>
                    )}
                    <Divider className="my-4" />
                    <h3 className="text-lg font-bold mb-2">Resumen del Pedido</h3>
                    <p>
                        <strong>Número de productos:</strong> {products.length}
                    </p>
                    <p>
                        <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
                    </p>
                    <p>
                        <strong>Impuestos (15%):</strong> ${taxes}
                    </p>
                    <p>
                        <strong>Total:</strong> ${total}
                    </p>
                    </CardBody>

                <CardFooter className="flex flex-col items-center">
                    <Button color="primary" size="lg">
                    Ir a método de pago
                    </Button>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                    Al hacer click en &quot;Ir a método de pago&quot; aceptas nuestros términos
                    y condiciones.
                    </p>
                </CardFooter>
            </Card>
            </Skeleton>
        </div>
        </div>

    </DefaultLayout>
    
  );
};

export default VerifyPurchasePage;
