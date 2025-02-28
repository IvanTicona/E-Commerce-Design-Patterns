import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
      {/* <Route element={<LandingPage />} path="/landing" /> */}
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
