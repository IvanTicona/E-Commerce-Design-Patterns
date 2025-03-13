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
  Image,
} from "@heroui/react";
import axios from "axios";
import { useNavigate } from "react-router";

import DefaultLayout from "@/layouts/default";
import { useBuyNow } from "@/context/buyNowContext";
import { useCart } from "@/context/cartContext";
import { Product } from "@/interface/product";
import { PurchaseProduct } from "@/interface/purchaseProduct";

const VerifyPurchasePage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const { buyNow, clearBuyNow } = useBuyNow();
  const { products: cartProducts } = useCart();
  const [products, setProducts] = useState<PurchaseProduct[]>([]);
  const addressData = JSON.parse(localStorage.getItem("addressData") || "{}");


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (buyNow) {
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
  }, []);

  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const taxes = (subtotal * 0.15).toFixed(2);
  const total = (subtotal + parseFloat(taxes)).toFixed(2);


  return (
    <DefaultLayout>
      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6 ">
        <div className="bg-gray-100 p-4 rounded shadow max-w-2xl mx-auto dark:bg-neutral-900">
          <h2 className="text-2xl font-bold mb-4 dark:bg-neutral-900">Verificar Pedido</h2>
          {loading ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className={`border p-4 rounded-lg shadow-md transition-colors duration-300 border-gray-800`}
                >
                  <div className="flex justify-end">
                    <Button size="sm" onPress={() => navigate(`/product/${product.id}`)}>
                      Revisar pedido
                    </Button>
                  </div>
                  <div className="mt-4 flex">
                    <Image
                      alt={product.name}
                      className="w-36 h-36 object-cover rounded"
                      src={product.imagen}
                    />
                    <div className="ml-6 flex flex-col space-y-1">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-gray-600">{product.description}</p>
                      <p className="text-gray-600">Cantidad: {product.quantity}</p>
                      <p className="text-gray-600">Precio Unitario: Bs.{product.price}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="md:w-1/2">
          <Skeleton className="rounded-lg" isLoaded={!loading} >
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
                  <strong>Subtotal:</strong> Bs.{subtotal.toFixed(2)}
                </p>
                <p>
                  <strong>Impuestos (15%):</strong> Bs.{taxes}
                </p>
                <p>
                  <strong>Total:</strong> Bs.{total}
                </p>
              </CardBody>

              <CardFooter className="flex flex-col items-center">
                <Button color="primary" size="lg" onPress={() => navigate("/payment")}>
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
