import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Divider, Image } from "@heroui/react";
import "animate.css";
import axios from "axios";

import DefaultLayout from "@/layouts/default";
import Rating from "@/components/rating";
import PurchaseOptions from "@/components/purchaseOptions";
import { Product } from "@/interface/product";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Product & { _id: string }>(`http://localhost:3000/products/${id}`)
      .then((response) => {
        const productData: Product = {
          ...response.data,
          id: response.data._id,
        };

        setProduct(productData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError("Error fetching product");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Cargando producto...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Producto no encontrado</div>;

  return (
    <DefaultLayout>
      <div className="animate__animated animate__fadeIn grid grid-cols-7 grid-rows-5 gap-4">
        <div className="col-span-2 row-span-5">
          <Image
            isZoomed
            alt={product.nombre}
            className="w-full"
            src={product.imagen}
          />
        </div>

        <div className="col-span-3 row-span-5 col-start-3">
          <h3 className="text-3xl font-medium">{product.nombre}</h3>
          <p className="text-lg font-light">
            Categoría: {product.categoria}
          </p>
          <Rating rating={product.rating} />
          <Divider className="my-5" />
          <p className="text-lg font-light">
            Precio: Bs. {product.precio}
          </p>
          <p className="text-lg font-light">Rating: {product.rating}</p>
        </div>

        <div className="flex flex-col gap-5 col-span-2 row-span-5 col-start-6 p-5 rounded-lg border">
          <PurchaseOptions {...product} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductPage;
