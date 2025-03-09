import { useEffect, useState } from "react";
import { Button, Chip, NumberInput } from "@heroui/react";
import { useNavigate } from "react-router";

interface PurchaseOptionsProps {
  id: string;
  stock: number;
  precio: number;
  descuento: number; // 🔹 Agregamos el descuento como una nueva prop
}

const PurchaseOptions: React.FC<PurchaseOptionsProps> = ({
  id,
  stock,
  precio,
  descuento, // 🔹 Recibimos el descuento como parámetro
}) => {
  interface CartItem {
    id: string;
    quantity: number;
  }

  // 🔹 Calculamos si el producto tiene descuento
  const tieneDescuento = descuento > 0;

  // 🔹 Si el producto tiene descuento, calculamos el nuevo precio con el descuento aplicado
  const precioConDescuento = (precio * (1 - descuento)).toFixed(2);


  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });


  const [quantity, setQuantity] = useState<number>(1);
  const [quantityValid, setQuantityValid] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (value: number) => {
    // Validación de la cantidad
    if (value < 1 || value > stock) {
      setQuantityValid(true);
    } else {
      setQuantityValid(false);
    }
    setQuantity(value);
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const handleAddToCart = () => {
    const storedCart = localStorage.getItem("cart");
    const cartItems = storedCart ? JSON.parse(storedCart) : [];

    const existingItem = cartItems.find((item: CartItem) => item.id === id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ id, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    setCart(cartItems);
  };

  const handleBuyNow = () => {
    const buyNowItem = [{ id, quantity }];

    localStorage.setItem("isQuickBuy", "true");
    sessionStorage.setItem("buyNow", JSON.stringify(buyNowItem));
    navigate("/checkout");
  };

  return (
    <>
      {}
      <div className="flex flex-col items-start">
        {tieneDescuento ? (
          <>
            {/* Si el producto tiene descuento, mostramos el precio original tachado */}
            <span className="text-gray-500 line-through text-lg">
              Bs. {precio.toFixed(2)}
            </span>

            {/* Mostramos el precio con descuento en rojo */}
            <span className="text-red-500 font-bold text-2xl">
              Bs. {precioConDescuento}
            </span>

            {/*  Mostramos el porcentaje de descuento en verde */}
            <span className="text-green-600 font-semibold">
              {Math.round(descuento * 100)}% OFF
            </span>
          </>
        ) : (
          // Si el producto NO tiene descuento, simplemente mostramos su precio normal
          <span className="text-2xl font-bold">Bs. {precio.toFixed(2)}</span>
        )}
      </div>

      {/* Estado del stock */}
      {}
      <div className="flex flex-col items-start">
        {tieneDescuento ? (
          <>
            {/* Si el producto tiene descuento, mostramos el precio original tachado */}
            <span className="text-gray-500 line-through text-lg">
              Bs. {precio.toFixed(2)}
            </span>

            {/* Mostramos el precio con descuento en rojo */}
            <span className="text-red-500 font-bold text-2xl">
              Bs. {precioConDescuento}
            </span>

            {/*  Mostramos el porcentaje de descuento en verde */}
            <span className="text-green-600 font-semibold">
              {Math.round(descuento * 100)}% OFF
            </span>
          </>
        ) : (
          // Si el producto NO tiene descuento, simplemente mostramos su precio normal
          <span className="text-2xl font-bold">Bs. {precio.toFixed(2)}</span>
        )}
      </div>

      {/* Estado del stock */}
      {stock > 0 ? (
        <Chip color="success" variant="flat">Disponible</Chip>
      ) : (
        <Chip color="danger" variant="flat">Agotado</Chip>
      )}

      {/* Selector de cantidad */}

      {/* Selector de cantidad */}
      <NumberInput
        errorMessage={"Cantidad no válida"}
        isDisabled={stock === 0}
        isInvalid={quantityValid}
        label="Cantidad"
        labelPlacement={"outside-left"}
        maxValue={stock}
        value={quantity}
        onValueChange={handleQuantityChange}
      />

      {/* Botón para agregar al carrito */}

      {/* Botón para agregar al carrito */}
      <Button
        color="warning"
        isDisabled={stock === 0 || quantityValid}
        radius="full"
        size="lg"
        onPress={handleAddToCart}
      >
        Agregar al carrito
      </Button>

      {/* Botón para comprar ahora */}

      {/* Botón para comprar ahora */}
      <Button
        color="success"
        isDisabled={stock === 0 || quantity < 1}
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
