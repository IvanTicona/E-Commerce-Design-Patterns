/* eslint-disable prettier/prettier */
import {
  createContext,
  useState,
  useContext,
  ReactNode,
} from "react";

import { PurchaseProduct } from "@/interface/purchaseProduct";
interface PurchaseProductContextType {
  purchaseProduct: PurchaseProduct | null;
  setPurchaseProduct: (purchaseProduct: PurchaseProduct) => void;
  clearPurchaseProduct: () => void;
}

const PurchaseProductContext = createContext<PurchaseProductContextType | undefined>(undefined,);

export const PurchaseProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [purchaseProduct, setPurchaseProduct] = useState<PurchaseProduct | null>(null);

  const clearPurchaseProduct = () => {
    setPurchaseProduct(null);
  };

  return (
    <PurchaseProductContext.Provider value={{ purchaseProduct, setPurchaseProduct, clearPurchaseProduct }}>
      {children}
    </PurchaseProductContext.Provider>
  );
};

export const usePurchaseProduct = () => {
  const context = useContext(PurchaseProductContext);

  if (!context) {
    throw new Error("usePurchase debe usarse dentro de un PurchaseProvider");
  }
  
  return context;
};
