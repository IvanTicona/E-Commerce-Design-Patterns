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

import CartIcon from "@/icons/cartIcon";
import { products } from "@/data/products";

const CartShop = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  return (
    <>
      <Badge color="primary" content={30} size="md" onClick={() => {}}>
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
                {products.map((product, index) => (
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
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="warning" variant="light" onPress={onClose}>
                  Continuar
                </Button>
                <Button color="primary" onPress={onClose}>
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
