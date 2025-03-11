/* eslint-disable prettier/prettier */
import React from "react";
import { useLocation } from "react-router";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@heroui/react";
import DefaultLayout from "@/layouts/default";

const VerifyPurchasePage = () => {
  const location = useLocation();
  const { formData, buyNow, product } = location.state || {};

  //const qty = Number(quantity) || 0;
  //const price = Number(productPrice) || 0;
  //const subtotal = price * qty;
  //const taxes = subtotal * 0.15;
  //const total = subtotal + taxes;

  return (
    <DefaultLayout>
        <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 bg-gray-100 p-4 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Detalles del Producto</h2>
            <p>
            <strong>ID del Producto:</strong> {"N/D"}
            </p>
            <p>
            <strong>Cantidad:</strong> {1}
            </p>
        </div>

        <div className="md:w-1/2">
            <Card>
            <CardHeader>
                <h2 className="text-xl font-bold">Dirección de Envío</h2>
            </CardHeader>
            <CardBody>
                {formData ? (
                <div className="mb-4">
                    <p>{formData.name}</p>
                    <p>{formData.address1}</p>
                    {formData.address2 && <p>{formData.address2}</p>}
                    <p>
                    {formData.city}, {formData.zip}
                    </p>
                    <p>{formData.country}</p>
                    <p>{formData.phone}</p>
                    <p>{formData.email}</p>
                </div>
                ) : (
                <p>No se ha proporcionado la dirección</p>
                )}
                <Divider className="my-4" />
                <h3 className="text-lg font-bold mb-2">Resumen del Pedido</h3>
                <p>
                <strong>Número de productos:</strong> {1}
                </p>
                <p>
                <strong>Subtotal:</strong> ${1}
                </p>
                <p>
                <strong>Impuestos (15%):</strong> ${1}
                </p>
                <p>
                <strong>Total:</strong> ${1}
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
        </div>
        </div>

    </DefaultLayout>
    
  );
};

export default VerifyPurchasePage;
