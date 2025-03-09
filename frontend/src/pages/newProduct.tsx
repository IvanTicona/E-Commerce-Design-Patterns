/* eslint-disable no-console */
import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input } from "@heroui/react";

import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";

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
    const data = new FormData();

    data.append("nombre", formData.nombre);
    data.append("descripcion", formData.descripcion);
    data.append("precio", formData.precio);
    data.append("categoria", formData.categoria);
    data.append("stock", formData.stock);
    data.append("rating", formData.rating);
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
    <DefaultLayout>
      <h2 className={title()}>Crear Producto</h2>

      <Form className="w-96 m-auto" onSubmit={handleSubmit}>
        <Input
          isRequired
          label="Nombre"
          labelPlacement="outside"
          name="nombre"
          placeholder="Nombre del producto"
          type="text"
          value={formData.nombre}
          onChange={handleChange}
        />
        <Input
          isRequired
          label="Descripción"
          labelPlacement="outside"
          name="descripcion"
          placeholder="Descripción del producto"
          type="text"
          value={formData.descripcion}
          onChange={handleChange}
        />
        <Input
          isRequired
          label="Precio"
          labelPlacement="outside"
          name="precio"
          placeholder="0.00"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
          type="number"
          value={formData.precio}
          onChange={handleChange}
        />
        <Input
          isRequired
          label="Categoría"
          labelPlacement="outside"
          name="categoria"
          placeholder="Ej: Tecnología"
          type="text"
          value={formData.categoria}
          onChange={handleChange}
        />
        <Input
          isRequired
          label="Stock"
          labelPlacement="outside"
          name="stock"
          placeholder="0"
          type="number"
          value={formData.stock}
          onChange={handleChange}
        />
        <Input
          isRequired
          label="Rating"
          labelPlacement="outside"
          name="rating"
          placeholder="0.0"
          type="number"
          value={formData.rating}
          onChange={handleChange}
        />
        <Input
          label="Descuento"
          labelPlacement="outside"
          name="offerDiscount"
          placeholder="0.0"
          type="number"
          value={formData.offerDiscount}
          onChange={handleChange}
        />
        <Input
          isRequired
          accept="image/*"
          label="Imagen"
          labelPlacement="outside"
          type="file"
          onChange={handleFileChange}
        />
        <Button color="primary" type="submit">
          Crear Producto
        </Button>
      </Form>
      {responseMessage && (
        <div>
          <h3>Respuesta del servidor:</h3>
          <pre>{responseMessage}</pre>
        </div>
      )}
    </DefaultLayout>
  );
};

export default ProductForm;
