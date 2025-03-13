/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Alert,
  Image,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import DefaultLayout from "@/layouts/default";
import { useNavigate } from "react-router-dom";
import PaymentForm from "@/components/paymentForm";
import axios from "axios";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showProcessingAlert, setShowProcessingAlert] = useState(true);
  const [modalType, setModalType] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("");

  const handleOpenModal = (type: string) => {
    setModalType(type);
    onOpen();
  };

  const handlePaymentConfirmation = async (paymentData: any) => {
    try {
      const response = await axios.post('http://localhost:3000/payments', {
        method: paymentData.method,
        amount: 100,
        currency: "USD",
        details: paymentData.info
      });

      const responseData = response.data as { success: boolean };
      if (responseData.success) {
        navigate("/package");
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert("Error al procesar el pago");
    }
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4 flex flex-col gap-6">
        {showProcessingAlert && (
          <Alert className="mb-4" color="danger">
            Estamos procesando el pago, por favor no cierre la página.
          </Alert>
        )}

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Método de Pago</h2>
          </CardHeader>
          <CardBody>
            <p>Selecciona el método de pago que deseas utilizar:</p>
            <Divider className="my-4" />
            <div className="flex flex-col gap-4">
              <Button
                className="flex items-center justify-center gap-2"
                color="warning"
                size="lg"
                onPress={() => handleOpenModal("paypal")}
              >
                <Image
                  alt="PayPal"
                  className="w-6 h-6"
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                />
                Pagar con PayPal
              </Button>

              <Button
                className="flex items-center justify-center gap-2"
                color="secondary"
                size="lg"
                onPress={() => handleOpenModal("crypto")}
              >
                <Image
                  alt="Criptomoneda"
                  className="w-6 h-6"
                  src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
                />
                Pagar con Criptomoneda
              </Button>

              <Button
                className="flex items-center justify-center gap-2"
                color="primary"
                size="lg"
                onPress={() => handleOpenModal("creditcard")}
              >
                <Image
                  alt="Tarjeta de Crédito"
                  className="w-6 h-6"
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Credit_card_font_awesome.svg"
                />
                Pagar con Tarjeta de Crédito
              </Button>
            </div>
          </CardBody>
          <CardFooter className="flex flex-col items-center">
            <p className="text-sm text-gray-500 mt-2 text-center">
              Al hacer clic en alguno de estos métodos, aceptas nuestros términos y condiciones.
            </p>
          </CardFooter>
        </Card>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalHeader>
            {modalType === "paypal" && "Pago con PayPal"}
            {modalType === "crypto" && "Pago con Criptomoneda"}
            {modalType === "creditcard" && "Pago con Tarjeta de Crédito"}
          </ModalHeader>
          <ModalBody>
            {modalType === "paypal" && (
              <div className="space-y-4">
                <Input
                  required
                  label="Email de PayPal"
                  placeholder="Email"
                  type="email"
                />
                <Input
                  required
                  label="Contraseña"
                  placeholder="Contraseña"
                  type="password"
                />
                <Button 
                  color="warning" 
                  onPress={() => handlePaymentConfirmation({ 
                    method: "paypal", 
                    info: "Datos de PayPal" 
                  })}
                >
                  Confirmar Pago
                </Button>
              </div>
            )}

            {modalType === "crypto" && (
              <div className="space-y-4">
                <Select
                  label="Seleccionar Criptomoneda"
                  selectedKeys={[selectedCrypto]}
                  onSelectionChange={(keys) => setSelectedCrypto(Array.from(keys)[0] as string)}
                >
                  <SelectItem key="bitcoin">Bitcoin</SelectItem>
                  <SelectItem key="ethereum">Ethereum</SelectItem>
                </Select>
                <Input
                  required
                  label="Wallet Address"
                  placeholder="Dirección de Wallet"
                />
                <Button 
                  color="secondary"
                  onPress={() => handlePaymentConfirmation({
                    method: "crypto",
                    info: `Moneda: ${selectedCrypto}`
                  })}
                >
                  Confirmar Pago
                </Button>
              </div>
            )}

            {modalType === "creditcard" && (
              <PaymentForm 
                onSuccess={(data) => handlePaymentConfirmation({
                  method: "creditcard",
                  info: data
                })}
              />
            )}
          </ModalBody>
        </Modal>
      </div>
    </DefaultLayout>
  );
};

export default PaymentPage;