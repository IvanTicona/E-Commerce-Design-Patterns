/* eslint-disable prettier/prettier */
import { Route, Routes } from "react-router-dom";
import "animate.css";

import { CartProvider } from "./context/cartContext";
import ProductForm from "./pages/newProduct";
import { PurchaseProductProvider } from "./context/purchaseProductContext";
import { BuyNowProvider } from "./context/buyNowContext";
import AddressPage from "./pages/address";
import VerifyPurchasePage from "./pages/verifyPurchase";

import LandingPage from "@/pages/landing";
import CategoryPage from "@/pages/category";
import OffersPage from "@/pages/offers";
import ProductPage from "@/pages/product";
import PackageState from "@/pages/packageState";
import SearchResult from "@/pages/searchResult";
import PaymentPage from "@/pages/payment";

function App() {
  return (
    <CartProvider>
      <BuyNowProvider>
        <PurchaseProductProvider>
          <Routes>
            <Route element={<LandingPage />} path="/" />
            <Route element={<CategoryPage />} path="/category" />
            <Route element={<OffersPage />} path="/offers" />
            <Route element={<ProductPage />} path="/product/:id" />
            <Route element={<ProductForm />} path="/new-product" />
            <Route element={<AddressPage />} path="/address" />
            <Route element={<VerifyPurchasePage />} path="/verify-purchase" />
            <Route element={<PackageState />} path="/package" />
            <Route element={<SearchResult />} path="/search" />
            <Route element={<PaymentPage />} path="/payment" />
          </Routes>
        </PurchaseProductProvider>
      </BuyNowProvider>
    </CartProvider>
  );
}

export default App;
