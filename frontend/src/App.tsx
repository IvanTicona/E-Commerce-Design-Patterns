import { Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "animate.css";

import LandingPage from "@/pages/landing";
import CategoryPage from "@/pages/category";
import OffersPage from "@/pages/offers";
import ProductPage from "@/pages/product";
import CheckoutPage from "@/pages/checkout";
import SuccessfulPurchasePage from "@/pages/successful-purchase";
import SearchResults from "@/pages/searchResults"; // Importa el componente SearchResults

function App() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames={{
          enter: "animate__animated animate__fadeIn",
          exit: "animate__animated animate__fadeOut",
        }}
        timeout={500}
      >
        <Routes location={location}>
          <Route element={<LandingPage />} path="/" />
          <Route element={<CategoryPage />} path="/category" />
          <Route element={<OffersPage />} path="/offers" />
          <Route element={<ProductPage />} path="/product/:id" />
          <Route element={<CheckoutPage />} path="/checkout" />
          <Route element={<SuccessfulPurchasePage />} path="/successful-purchase" />
          {/* Nueva ruta para los resultados de búsqueda */}
          <Route element={<SearchResults />} path="/search" />
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
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;