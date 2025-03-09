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
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import React from "react";

import { Product } from "@/data/products";
import CartIcon from "@/icons/cartIcon";

const CartShop = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate(); // Para la navegación

  const [products, setProducts] = useState<Product[]>([]); // Estado para almacenar productos

  console.log(products);

  const getCartFromStorage = () => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  };
  const [cart, setCart] =
    React.useState<{ id: number; quantity: number }[]>(getCartFromStorage);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const MONGO_URI = import.meta.env.VITE_REACT_APP_SERVER_URL;
        const response = await fetch(`${MONGO_URI}/products`);

        if (!response.ok) throw new Error("Error al obtener los productos");

        const data = await response.json();

        setProducts(data);
        console.log("Productos recibidos ccartShop:", products.length);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);

  // Eliminar producto del carrito
  const handleRemoveFromCart = (id: number) => {
    // Obtener el carrito actual
    const updatedCart = getCartFromStorage().filter((item: { id: number }) => item.id !== id);

    // Actualizar carrito en localStorage y en el estado
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    sessionStorage.removeItem("buyNow");
    navigate("/checkout");
  };

  return (
    <>
      <Badge color="primary" content={cart.length} size="md" onClick={onOpen}>
        <Button isIconOnly className="bg-transparent" onPress={onOpen}>
          <CartIcon />
        </Button>
      </Badge>

      <Modal
        classNames={{ body: "max-h-[70vh] overflow-y-auto" }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Carrito de compras
              </ModalHeader>
              <ModalBody>
                {cart.length > 0 ? (
                  cart.map((item) => {
                    console.log("item:" + item);
                    const product = products.find(
                      (prod) => prod._id === item.id?.toString(),
                    );

                    if (!product) {
                      return null;
                    }

                    return (
                      <div key={item.id}>
                        <Card
                          className="border-none w-full min-h-32 rounded-none"
                          shadow="none"
                        >
                          <div className="flex items-center gap-2">
                            {product && (
                              <>
                                <img
                                  alt={product.name}
                                  className="w-32 h-32 object-cover"
                                  src={product.images[0]}
                                />
                                <div className="flex flex-col gap-1 w-64 h-32 justify-between">
                                  <p className="text-sm">{product.name}</p>
                                  <p className="text-sm">Bs. {product.price}</p>
                                  <p className="text-sm">
                                    Cantidad: {item.quantity}
                                  </p>
                                  <Button
                                    className="font-light border"
                                    color="danger"
                                    variant="bordered"
                                    onClick={() =>
                                      handleRemoveFromCart(item.id)
                                    }
                                  >
                                    Quitar del carrito
                                  </Button>
                                </div>
                              </>
                            )}
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
                  isDisabled={!cart.length}
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
