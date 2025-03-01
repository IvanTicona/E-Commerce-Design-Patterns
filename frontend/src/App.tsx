import { Route, Routes } from "react-router-dom";

import LandingPage from "@/pages/landing";
import CategoryPage from "@/pages/category";
import OffersPage from "@/pages/offers";

function App() {
  return (
    <Routes>
      <Route element={<LandingPage />} path="/" />
      <Route element={<CategoryPage />} path="/category" />
      <Route element={<OffersPage />} path="/offers" />
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
  );
}

export default App;
