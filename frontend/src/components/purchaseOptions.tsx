import { useEffect, useState } from "react";
import { Button, Chip, NumberInput } from "@heroui/react";

interface PurchaseOptionsProps {
  id: number;
  stock: number;
  precio: number;
}

const PurchaseOptions: React.FC<PurchaseOptionsProps> = ({
  id,
  stock,
  precio,
}) => {
  interface CartItem {
    id: number;
    quantity: number;
  }

  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantityValid, setQuantityValid] = useState(false);

  const handleQuantityChange = (e: any) => {
    e.preventDefault();
    const quantity = e.target.value;

    if (quantity < 0 || quantity > stock) {
      setQuantityValid(true);
    } else {
      setQuantityValid(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = () => {
    setCart((prevCart) => [...prevCart, { id, quantity: 1 }]);
  };

  return (
    <>
      <span className="text-2xl font-bold">Bs. {precio}</span>
      {stock > 0 ? (
        <Chip color="success" variant="flat">
          Disponible
        </Chip>
      ) : (
        <Chip color="danger" variant="flat">
          Agotado
        </Chip>
      )}
      <NumberInput
        key={2}
        defaultValue={1}
        errorMessage={"Cantidad no válida"}
        isDisabled={stock === 0}
        isInvalid={quantityValid}
        label="Cantidad"
        labelPlacement={"outside-left"}
        maxValue={stock}
        minValue={1}
        onChange={(value) => handleQuantityChange(value)}
      />
      <Button
        color="warning"
        isDisabled={stock === 0}
        radius="full"
        size="lg"
        onPress={handleAddToCart}
      >
        Agregar al carrito
      </Button>
      <Button color="success" isDisabled={stock === 0} radius="full" size="lg">
        Comprar ahora
      </Button>
    </>
  );
};

export default PurchaseOptions;
