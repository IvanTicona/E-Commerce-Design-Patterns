import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

import { Product } from "@/interface/carItem";

interface CartContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Se inicializa el estado leyendo desde localStorage para que el carrito persista.
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const storedProducts = localStorage.getItem("cart");

      return storedProducts ? JSON.parse(storedProducts) : [];
    } catch (error) {
      console.error("Error leyendo el carrito desde localStorage", error);

      return [];
    }
  });

  // Cada vez que el carrito cambia, se actualiza localStorage.
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts((prev) => {
      // Si el producto ya existe, actualizamos la cantidad.
      const exists = prev.find((p) => p.id === product.id);

      if (exists) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, cantidad: p.cantidad + product.cantidad }
            : p,
        );
      }

      return [...prev, product];
    });
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const updateProduct = (id: string, product: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...product } : item)),
    );
  };

  const clearCart = () => {
    setProducts([]);
  };

  return (
    <CartContext.Provider
      value={{ products, addProduct, removeProduct, updateProduct, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }

  return context;
};
