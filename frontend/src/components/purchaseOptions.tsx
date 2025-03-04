import { useEffect, useState } from "react";
import { Button, Chip, NumberInput } from "@heroui/react";
import { useNavigate } from "react-router";

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

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");

    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [quantity, setQuantity] = useState<number>(1);
  const [quantityValid, setQuantityValid] = useState(false);

  const navigate = useNavigate(); // Usamos useNavigate para redirigir

  const handleQuantityChange = (value: number) => {
    // Validación de la cantidad
    if (value < 1 || value > stock) {
      setQuantityValid(true); // Marcamos como inválido si está fuera de rango
    } else {
      setQuantityValid(false); // Restablecemos la validez
    }
    setQuantity(value); // Actualizamos la cantidad
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Actualiza localStorage solo si el carrito no está vacío
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

    setCart(cartItems); // Actualiza el estado para que `useEffect` lo guarde correctamente
  };

  
  const handleBuyNow = () => {
    const buyNowItem = [{ id, quantity }]; // Asegurar formato array
  
    sessionStorage.setItem("buyNow", JSON.stringify(buyNowItem));
    console.log("Guardado en sessionStorage:", buyNowItem); // Debug
    navigate("/checkout"); // Redirigir
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
        value={quantity} // Controlamos el valor
        onValueChange={handleQuantityChange} // Cambia el valor cuando el usuario lo modifica
        errorMessage={"Cantidad no válida"}
        isDisabled={stock === 0} // Deshabilitar si el stock es 0
        isInvalid={quantityValid} // Mostrar error si la cantidad es inválida
        label="Cantidad"
        labelPlacement={"outside-left"}
        maxValue={stock} // Máximo valor que puede tener
        // Eliminamos minValue para que se pueda decrementar libremente hasta llegar a 1
      />
      <Button
        color="warning"
        isDisabled={stock === 0 || quantityValid} // Deshabilitar si no es válido
        radius="full"
        size="lg"
        onPress={handleAddToCart}
      >
        Agregar al carrito
      </Button>
      <Button
        color="success"
        isDisabled={stock === 0 || quantity < 1} // Validar si la cantidad es válida
        radius="full"
        size="lg"
        onPress={handleBuyNow} // Aquí almacenamos y redirigimos
      >
        Comprar ahora
      </Button>
    </>
  );
};

export default PurchaseOptions;
