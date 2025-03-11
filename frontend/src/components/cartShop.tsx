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
import { useEffect, useState } from "react";

import CartIcon from "@/icons/cartIcon";
import { useCart } from "@/context/cartContext";
import { Product } from "@/interface/product";
import { useLocation, useNavigate } from "react-router";

const CartShop = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { products: productsOnCart, clearCart } = useCart();
  const handleOpen = () => {
    onOpen();
  };

  useEffect(() => {
    setCart(productsOnCart.length);
  }, [productsOnCart]);

  const handleCheckoutCart = () => {
    navigate("/address", { state: { productsOnCart } });
    onClose();
  };

  return (
    <>
      <Badge
        color="primary"
        content={cart}
        isInvisible={cart === 0}
        size="md"
        onClick={() => {}}
      >
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
                {products.length === 0 ? (
                  <p className="text-center">No hay productos en el carrito.</p>
                ) : (
                  products.map((product, index) => (
                    <>
                      {index > 0 && <Divider />}
                      <Card
                        key={product.id}
                        className="border-none w-full min-h-32 rounded-none"
                        shadow="none"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            alt={product.nombre}
                            className="w-32 h-32 object-cover"
                            src={product.imagen}
                          />
                          <div className="flex flex-col gap-1 w-64 h-32 justify-between">
                            <p className="text-sm">{product.nombre}</p>
                            <p className="text-sm">Bs. {product.precio}</p>
                            <Button
                              className="font-light border"
                              color="danger"
                              variant="bordered"
                            >
                              Quitar del carrito
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </>
                  ))
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={clearCart}>
                  Vaciar carrito
                </Button>
                <Button color="warning" variant="light" onPress={onClose}>
                  Continuar
                </Button>
                <Button color="primary" onPress={handleCheckoutCart}>
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
