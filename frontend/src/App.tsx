import { Route, Routes } from "react-router-dom";
import "animate.css";

import { CartProvider } from "./context/cartContext";
import ProductForm from "./pages/newProduct";

import LandingPage from "@/pages/landing";
import CategoryPage from "@/pages/category";
import OffersPage from "@/pages/offers";
import ProductPage from "@/pages/product";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<CategoryPage />} path="/category" />
        <Route element={<OffersPage />} path="/offers" />
        <Route element={<ProductPage />} path="/product/:id" />
        <Route element={<ProductForm />} path="/new-product" />
        {/* ListadoProductos */}
        {/* DetalleProducto */}
        {/* CategoriasProducto */}
        {/* ResultadosBusqueda */}
        {/* ResumenCarrito */}
        {/* CheckoutCarrito */}
        {/* MetodoDePago */}
        {/* DatosDePag */}
        {/* ConfirmacionDePago */}
        {/* Notificaciones */}
      </Routes>
    </CartProvider>
  );
}

export default App;
