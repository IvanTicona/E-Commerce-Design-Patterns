import DefaultLayout from "@/layouts/default";
import { Card, CardFooter, Image, Skeleton, CardBody, SelectItem, Select } from "@heroui/react";
import axios from "axios";
import { Product } from "@/interface/product";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

const CategoryPage = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [category, setCategory] = useState("");
  const [opcionesCategorias, setOpcionesCategorias] = useState<Set<string>>(new Set());
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [hasOriginals, setHasOriginals] = useState(false)
  const [loading, setLoading] = useState(true);

  const handleDetails = (product: Product) => {
    setTimeout(() => {
      navigation(`/product/${product.id}`);
    }, 300);
  };

  // Detectar si hay una categoría en location.state y asignarla
  useEffect(() => {
    if (location.state && (location.state as any).category) {
      setCategory((location.state as any).category);
      console.log(category);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/products");
        const productsData: Product[] = (response.data as Product[]).map((prod: any) => ({
          ...prod,
          id: prod._id,
        }));

        setOriginalProducts(productsData);
        setHasOriginals(true);
        const categorySet = new Set(productsData.map(product => product.categoria));
        setOpcionesCategorias(categorySet);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      console.log("Products fetched successfully");
      setLoading(false);
    };

    if (!hasOriginals) {
      fetchProducts();
    }
    setFilteredProducts(
      originalProducts.filter((product) => product.categoria === category)
    );
  }, [category, hasOriginals]);

  return (
    <DefaultLayout>
      <h1
        className="text-3xl font-bold text-gray-800 dark:text-gray-200 m-10">
        ¿Buscas alguna categoría en específico?
      </h1>
      <Select
        label="Categorías"
        labelPlacement="outside"
        name="category"
        placeholder="Selecciona una de nuestras categorías disponibles:"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-md p-6 shadow-md transition duration-200 ease-in-out hover:shadow-lg"
      >
        {[...opcionesCategorias].map((item) => (
          <SelectItem key={item}>{item}</SelectItem>
        ))}
      </Select>



      <div className="flex gap-4 flex-wrap">
        {filteredProducts.map((item) => (
          <Skeleton key={item.id} className="rounded-lg" isLoaded={!loading}>
            <Card isPressable className="size-80 p-2 h-auto" shadow="sm" onPress={() => handleDetails(item)}>
              <CardBody className="overflow-visible p-0">
                <Image
                  alt={item.nombre}
                  className="w-full object-fill h-[270px]"
                  radius="lg"
                  shadow="sm"
                  src={item.imagen}
                  width={384}
                />
              </CardBody>
              <CardFooter className="text-base justify-between">
                <b>{item.nombre}</b>
                <p className="text-default-500 text-lg">Bs.{item.precio}</p>
              </CardFooter>
              <CardFooter className="text-xs text-left">
                <p>{item.descripcion.slice(0,90)}...</p>
              </CardFooter>
            </Card>
          </Skeleton>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default CategoryPage;
