/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import axios from "axios";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    stock: "",
    rating: "",
    offerDiscount: "",
  });
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>("");

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagenFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Creamos un FormData para enviar los datos como multipart/form-data
    const data = new FormData();

    data.append("nombre", formData.nombre);
    data.append("descripcion", formData.descripcion);
    data.append("precio", formData.precio);
    data.append("categoria", formData.categoria);
    data.append("stock", formData.stock);
    data.append("rating", formData.rating);
    // Si se define descuento, lo agregamos en formato anidado (ej: offer.discount)
    if (formData.offerDiscount) {
      data.append("offer.discount", formData.offerDiscount);
    }
    if (imagenFile) {
      data.append("imagen", imagenFile);
    }

    try {
      const res = await axios.post("http://localhost:3000/products", data);

      setResponseMessage(JSON.stringify(res.data, null, 2));
    } catch (error) {
      console.error("Error al crear producto:", error);
      setResponseMessage("Error al crear producto");
    }
  };

  return (
    <div>
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            required
            name="nombre"
            type="text"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            name="descripcion"
            type="text"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            required
            name="precio"
            type="number"
            value={formData.precio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Categoría:</label>
          <input
            required
            name="categoria"
            type="text"
            value={formData.categoria}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            required
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            required
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Oferta (Descuento):</label>
          <input
            name="offerDiscount"
            type="number"
            value={formData.offerDiscount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Imagen:</label>
          <input accept="image/*" type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Crear Producto</button>
      </form>
      {responseMessage && (
        <div>
          <h3>Respuesta del servidor:</h3>
          <pre>{responseMessage}</pre>
        </div>
      )}
    </div>
  );
};

export default ProductForm;
