import { useState} from "react";
import { Button, Chip, NumberInput } from "@heroui/react";
import { useNavigate } from "react-router";

import { useCart } from "@/context/cartContext";
import { useBuyNow } from "@/context/buyNowContext";

interface PurchaseOptionsProps {
  id: string;
  stock: number;
  precio: number;
}

const PurchaseOptions: React.FC<PurchaseOptionsProps> = ({
  id,
  stock,
  precio,
}) => {
  const [quantity, setQuantity] = useState<string>("1");
  const [quantityInvalid, setQuantityInvalid] = useState(false);
  const { addProduct, products } = useCart();
  const { setBuyNow } = useBuyNow();

  const navigate = useNavigate();

  const handlerOnChange = (
    valueOrEvent: number | React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (typeof valueOrEvent !== "number") {
      const value = valueOrEvent.target.value;

      setQuantity(value);

      if (value === "") {
        setQuantityInvalid(false);

        return;
      }

      const numericValue = Number(value);

      if (numericValue < 1 || numericValue > stock) {
        setQuantityInvalid(true);
      } else {
        setQuantityInvalid(false);
      }
    } else {
      const numericValue = valueOrEvent;

      setQuantity(numericValue.toString());
      if (numericValue < 1 || numericValue > stock) {
        setQuantityInvalid(true);
      } else {
        setQuantityInvalid(false);
      }
    }
  };

  const handleBlur = () => {
    if (quantity === "" || Number(quantity) < 1) {
      setQuantity("1");
      setQuantityInvalid(false);
    }
  };

  const handleAddProduct = () => {
    const newProduct = {
      id,
      precio,
      cantidad: Number(quantity),
    };

    addProduct(newProduct)
    ;
  };

  const handleBuyNow = () => {
    const newProduct = { id, cantidad: Number(quantity) };

    setBuyNow(newProduct);
    navigate("/address");
  };

  const outOfStock = stock === 0;
  const fullInCart =
    !outOfStock && products.find((p) => p.id === id)?.cantidad === stock;

  return (
    <>
      <span className="text-2xl font-bold">Bs. {precio}</span>
      {outOfStock ? (
        <Chip color="danger" variant="flat">
          Agotado
        </Chip>
      ) : fullInCart ? (
        <Chip color="warning" variant="flat">
          En el carrito
        </Chip>
      ) : (
        <Chip color="success" variant="flat">
          Disponible
        </Chip>
      )}
      <NumberInput
        key={id}
        errorMessage={"Cantidad no válida"}
        isDisabled={outOfStock || fullInCart}
        isInvalid={quantityInvalid}
        label="Cantidad"
        labelPlacement="outside-left"
        maxValue={stock}
        minValue={1}
        value={quantity === "" ? 1 : Number(quantity)}
        onBlur={handleBlur}
        onChange={handlerOnChange}
      />
      <Button
        color="warning"
        isDisabled={outOfStock || fullInCart}
        radius="full"
        size="lg"
        onPress={handleAddProduct}
      >
        Agregar al carrito
      </Button>
      <Button
        color="success"
        isDisabled={outOfStock || fullInCart}
        radius="full"
        size="lg"
        onPress={handleBuyNow}
      >
        Comprar ahora
      </Button>
    </>
  );
};

export default PurchaseOptions;
