/* eslint-disable prettier/prettier */
import {
  createContext,
  useState,
  useContext,
  ReactNode,
} from "react";

import { BuyNowProduct } from "@/interface/buyNowItem";
interface BuyNowContextType {
  buyNow: BuyNowProduct | null;
  setBuyNow: (buyNow: BuyNowProduct) => void;
  clearBuyNow: () => void;
}

const BuyNowContext = createContext<BuyNowContextType | undefined>(undefined,);

export const BuyNowProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [buyNow, setBuyNow] = useState<BuyNowProduct | null>(null);

  const clearBuyNow = () => {
    setBuyNow(null);
  };

  return (
    <BuyNowContext.Provider value={{ buyNow, setBuyNow, clearBuyNow }}>
      {children}
    </BuyNowContext.Provider>
  );
};

export const useBuyNow = () => {
  const context = useContext(BuyNowContext);

  if (!context) {
    throw new Error("usePurchase debe usarse dentro de un PurchaseProvider");
  }
  
  return context;
};
