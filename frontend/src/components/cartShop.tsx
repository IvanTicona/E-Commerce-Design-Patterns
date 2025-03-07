import {
  Badge,
  Button,
  Card,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { useNavigate } from "react-router"; // Para usar navigate

import CartIcon from "@/icons/cartIcon";
import { products } from "@/data/products";
import React from "react";

const CartShop = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate(); // Usamos useNavigate para redirigir

  const handleOpen = () => {
    onOpen();
  };

  const handleCheckout = () => {
    sessionStorage.removeItem("buyNow");
    navigate("/checkout"); // Redirige a la página de checkout
  };

  // Obtener carrito de localStorage
  const getCartFromStorage = () => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  };

  // Actualizar carrito en localStorage
  const updateCartInStorage = (updatedCart: { id: number; quantity: number }[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Eliminar producto del carrito
  const handleRemoveFromCart = (id: number) => {
    // Obtener el carrito actual
    const updatedCart = getCartFromStorage().filter((item: { id: number; quantity: number }) => item.id !== id);

    // Actualizar carrito en localStorage y en el estado
    updateCartInStorage(updatedCart);
    // Re-renderizamos el carrito después de la eliminación
    setCart(updatedCart);
  };

  // Inicializamos el carrito desde localStorage
  const [cart, setCart] = React.useState<{ id: number; quantity: number }[]>(getCartFromStorage);

  const isCartEmpty = !localStorage.getItem("cart") || JSON.parse(localStorage.getItem("cart") || "[]").length === 0;

  return (
    <>
      <Badge color="primary" content={cart.length} size="md" onClick={handleOpen}>
        <Button isIconOnly className="bg-transparent" onPress={handleOpen}>
          <CartIcon />
        </Button>
      </Badge>
      <Modal
        classNames={{
          body: "max-h-[70vh] overflow-y-auto",
        }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Carrito de compras
              </ModalHeader>
              <ModalBody>
                {cart.length > 0 ? (
                  cart.map((item: { id: number; quantity: number }) => {
                    const product = products.find((prod) => prod.id === item.id);

                    return (
                      <div key={item.id}>
                        <Card
                          className="border-none w-full min-h-32 rounded-none"
                          shadow="none"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              alt={product?.nombre}
                              className="w-32 h-32 object-cover"
                              src={product?.imagen}
                            />
                            <div className="flex flex-col gap-1 w-64 h-32 justify-between">
                              <p className="text-sm">{product?.nombre}</p>
                              <p className="text-sm">Bs. {product?.precio}</p>
                              <p className="text-sm">
                                Cantidad: {item.quantity}
                              </p>
                              <Button
                                className="font-light border"
                                color="danger"
                                variant="bordered"
                                onClick={() => handleRemoveFromCart(item.id)} // Elimina el producto
                              >
                                Quitar del carrito
                              </Button>
                            </div>
                          </div>
                        </Card>
                        <Divider />
                      </div>
                    );
                  })
                ) : (
                  <p>No hay productos en el carrito</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="warning" variant="light" onPress={onClose}>
                  Continuar
                </Button>
                <Button
                  color="primary"
                  isDisabled={isCartEmpty}
                  onPress={handleCheckout}
                >
                  Checkout
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CartShop;
