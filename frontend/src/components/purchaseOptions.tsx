import { useEffect, useState } from "react";
import { Button, Chip, NumberInput } from "@heroui/react";
import { useNavigate } from "react-router";

// Este es el tipo para un artículo en el carrito
interface CartItem {
  productId: string; // Utilizamos ObjectId de MongoDB
  quantity: number;
}

interface PurchaseOptionsProps {
  id: string;  // Utilizamos string para el ObjectId de MongoDB
  stock: number;
  precio: number;
}

const PurchaseOptions: React.FC<PurchaseOptionsProps> = ({
  id,
  stock,
  precio,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]); // Carrito almacenado en el estado
  const [quantity, setQuantity] = useState<number>(1);
  const [quantityValid, setQuantityValid] = useState(false);

  const navigate = useNavigate();
  const MONGO_URI = import.meta.env.VITE_REACT_APP_SERVER_URL;

  // Manejar el cambio en la cantidad de productos
  const handleQuantityChange = (value: number) => {
    if (value < 1 || value > stock) {
      setQuantityValid(true);
    } else {
      setQuantityValid(false);
    }
    setQuantity(value);
  };

  // Obtener el carrito del usuario desde la base de datos
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${MONGO_URI}/cart`);
        const data = await response.json();

        // Comprobar si `data.items` existe y tiene elementos
        if (Array.isArray(data.items) && data.items.length > 0) {
          setCart(data.items); // Si items es un array no vacío, actualizar el carrito
          console.log("Carrito recibido:", data.items);
        } else {
          // Si no hay items o no es un array, puedes manejarlo de otra manera
          setCart([]); // Configura el carrito como vacío
          console.log("No hay artículos en el carrito.");
        }
        console.log("Carrito recibido:", data.items);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      }
    };

    fetchCart();
  }, []);

  // Función para agregar un producto al carrito
  const handleAddToCart = async () => {
    const existingItem = cart.find((item) => item.productId === id);
    console.log(stock, quantity, precio)
    let updatedCart;

    if (existingItem) {
      // Si el producto ya está en el carrito, actualizamos la cantidad
      updatedCart = cart.map((item) =>
        item.productId === id ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      // Si no está en el carrito, lo agregamos
      updatedCart = [...cart, { productId: id, quantity }];
    }

    // Actualizar el carrito en la base de datos
    try {
      await fetch(`${MONGO_URI}/cart`, {
        method: "PUT", // O POST, dependiendo de tu endpoint
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: updatedCart }),
      });

      setCart(updatedCart); // Actualizamos el carrito en el estado
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
    }
  };

  // Función para comprar ahora
  const handleBuyNow = () => {
    const buyNowItem = [{ productId: id, quantity }];

    sessionStorage.setItem("buyNow", JSON.stringify(buyNowItem));
    navigate("/checkout");
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
        errorMessage={"Cantidad no válida"}
        isDisabled={stock === 0}
        isInvalid={quantityValid}
        label="Cantidad"
        labelPlacement={"outside-left"}
        value={quantity}
        onValueChange={handleQuantityChange}
        maxValue={stock}
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
