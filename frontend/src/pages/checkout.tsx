/* eslint-disable prettier/prettier */
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Card,
  Radio,
  RadioGroup,
  Table,
  Alert,
  Button,
  useDisclosure,
  Input,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableColumn,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { useNavigate } from "react-router";
 
import { Product } from "@/data/products";

const Checkout = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]); // Estado para productos
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const MONGO_URI = import.meta.env.VITE_REACT_APP_SERVER_URL; // Revisa si esta URL es correcta
        const response = await fetch(`${MONGO_URI}/products`);

        if (!response.ok) {
          console.error(
            "Error al obtener los productos:",
            response.status,
            response.statusText,
          );
          throw new Error("Error al obtener los productos");
        }

        const data = await response.json();

        if (data && Array.isArray(data)) {

        // Aquí puedes mapear los productos si es necesario antes de guardarlos
          const validProducts = data.map(item => ({
            _id: item._id,
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            discount: item.discount,
            arrivalDate: item.arrivalDate,
            rating: item.rating,
            images: item.images || [],
            stock: item.stock,
          }));

          setProducts(validProducts);
        } else {
          throw new Error("Los datos no son válidos o están vacíos");
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false); // Termina la carga
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("Productos guardados en estado:", products);
  }, [products]);


  const [addresses, setAddresses] = useState<string[]>(
    JSON.parse(localStorage.getItem("addressDetails") || "[]").map((address: any) =>
      `${address.fullName}, ${address.phone}, ${address.email}, ${address.country}, ${address.address1}, ${address.address2}, ${address.city}, ${address.state}, ${address.postalCode}`
    )
  );

  const [coupon, setCoupon] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderTotalWithDiscount, setOrderTotalWithDiscount] = useState(0);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);

  const [showAddressSelection, setShowAddressSelection] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [confirmedAddress, setConfirmedAddress] = useState('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [countries, setCountries] = useState<{ cca3: string; name: { common: string } }[]>([]); 
  const [cart, setCart] = useState<any[]>([]);
  const [confirmedPayment, setConfirmedPayment] = useState<{ cardNumber: string; cardHolder: string; expiryDate: string } | null>(null);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null); 

  const orderTotalWithoutDiscount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ) + 46.06 + 25.72;
  
  useEffect(() => {
    setOrderTotal(orderTotalWithoutDiscount);
    setOrderTotalWithDiscount(orderTotalWithoutDiscount);
  }, [cart]); 

  // Aplicar cupón de descuento
  const handleApplyCoupon = () => {
    if (coupon.trim() !== "" && !couponApplied) {
      const newTotalWithDiscount = Math.max(0, orderTotal - 10); // Aplica el descuento

      setOrderTotalWithDiscount(newTotalWithDiscount);
      setCouponApplied(true);
    }
  };

  // Cargar países desde la API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        
        const sortedCountries = data.sort((a: { name: { common: string } }, b: { name: { common: string } }) => {
          const nameA = a.name.common.toLowerCase(); // Asegúrate de comparar sin distinción de mayúsculas/minúsculas
          const nameB = b.name.common.toLowerCase();

          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;

          return 0;
        });
  
        setCountries(sortedCountries);
      } catch (error) {
        alert("Error al obtener países: " + (error as any).message);
      }
    };
  
    fetchCountries();
  }, []);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    country: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
  });


  const handleAddAddress = () => {
    const newAddress = {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      country: formData.country,
      address1: formData.address1,
      address2: formData.address2,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
    };
  
    // Obtener las direcciones existentes del localStorage
    const existingAddresses = JSON.parse(localStorage.getItem('addressDetails') || '[]');

    console.log(existingAddresses);
  
    // Agregar la nueva dirección al arreglo de direcciones
    const updatedAddresses = [...existingAddresses, newAddress];
  
    // Guardar las direcciones actualizadas en localStorage
    localStorage.setItem('addressDetails', JSON.stringify(updatedAddresses));
  

    const transformedAddresses = updatedAddresses.map((address: any) => {
      return `${address.fullName}, ${address.phone}, ${address.email}, ${address.country}, ${address.address1}, ${address.address2}, ${address.city}, ${address.state}, ${address.postalCode}`;
    });


    // Actualizar el estado con las nuevas direcciones
    setAddresses(transformedAddresses);
  
    // Limpiar el formulario
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      country: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
    });
  };

  const handleConfirmAddress = () => {
    if (selectedAddressIndex !== null) {
      const selectedAddress = addresses[selectedAddressIndex];
 
      console.log(selectedAddress);

      // Guardamos la dirección seleccionada en sessionStorage
      sessionStorage.setItem('addressDetails', JSON.stringify({
        fullName: selectedAddress.split(",")[0],
        phone: selectedAddress.split(",")[1],
        email: selectedAddress.split(",")[2],
        country: selectedAddress.split(",")[3],
        address1: selectedAddress.split(",")[4],
        address2: selectedAddress.split(",")[5],
        city: selectedAddress.split(",")[6],
        state: selectedAddress.split(",")[7],
        postalCode: selectedAddress.split(",")[8],
      }));
    }
    setConfirmedAddress(selectedAddress);
    setShowAddressSelection(false);
  };

  const handleChangeAddress = () => {
    setShowAddressSelection(true);
    setConfirmedAddress('');
  };
  
  const handleDeleteAddress = (index: number) => {
    const updateAddresses = JSON.parse(localStorage.getItem('addressDetails') || '[]');

    updateAddresses.splice(index, 1);
    localStorage.setItem('addressDetails', JSON.stringify(updateAddresses));
    const transformedAddresses = updateAddresses.map((address: any) => {
      return `${address.fullName}, ${address.phone}, ${address.email}, ${address.country}, ${address.address1}, ${address.address2}, ${address.city}, ${address.state}, ${address.postalCode}`;
    });

    setAddresses(transformedAddresses);
  };
  
  

  const handleConfirmPayment = () => {
    sessionStorage.setItem('paymentDetails', JSON.stringify({
      //ocultar los primeros 12 dígitos de la tarjeta
      cardNumber: `**** **** **** ${cardNumber.slice(-4)}`,
      cardHolder: cardHolder,
      expiryDate: expiryDate,
    }));

    setConfirmedPayment({
      cardNumber,
      cardHolder,
      expiryDate,
    });
  };

  const handleCancelPayment = () => {
    setConfirmedPayment(null);
  };

  const handleConfirmProducts = () => {
    // Guardar el carrito en sessionStorage\
    localStorage.setItem('cart', JSON.stringify(cart));
    sessionStorage.setItem("orderTotal", JSON.stringify(orderTotal)); 
    sessionStorage.setItem("orderTotalWithDiscount", JSON.stringify(orderTotalWithDiscount)); 

    if (localStorage.getItem("isQuickBuy") === "true") {
      localStorage.removeItem("cart");
    }
  }
  
  useEffect(() => {
    if ((!localStorage.getItem("cart") || localStorage.getItem("cart")?.length == 2) && !localStorage.getItem("isQuickBuy")) {
      navigate("/");
    }

    if (localStorage.getItem("isQuickBuy")) {
      localStorage.removeItem("isQuickBuy");
      const buyNowItem = JSON.parse(sessionStorage.getItem("buyNow") || "[]");

      setCart(buyNowItem);
    } else {
      setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    }

  }), [];

  console.log("Antes del return"+products);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mx-auto max-w-6xl">
      <div className="col-span-2">
        <h1 className="text-2xl font-bold mb-4">Finalizar Compra</h1>
        {/* SELECCIÓN DE DIRECCIÓN */}

        <Card className="p-4 mb-4">
        {showAddressSelection ? (
          <>
            <h2 className="text-lg font-semibold mb-2">Selecciona una dirección de envío</h2>
            <RadioGroup
              value={selectedAddress}
              onChange={(e) => {
                const value = e.target.value;
                const index = addresses.indexOf(value);

                setSelectedAddressIndex(index);
                setSelectedAddress(value);
              }}
            >
              {addresses.map((address, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                  <Radio value={address} className="flex-1">
                    <span>{address}</span>
                  </Radio>
                  <button
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteAddress(index)}
                  >
                    <Trash size={20} />
                  </button>
                </div>
              ))}
            </RadioGroup>

            <Button className="max-w-fit mt-2" onPress={onOpen}>
                Añadir nueva dirección
            </Button>

            <Button
              className="mt-4"
              isDisabled={!selectedAddress}
              onClick={handleConfirmAddress}
            >
              Entregar a esta dirección
            </Button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-2">Entrega para:</h2>
            <div className="text-lg">
              <strong>{confirmedAddress.split(",")[0]}</strong>
            </div>
            <p className="text-gray-700">{confirmedAddress}</p>
            <Button className="mt-4" onClick={handleChangeAddress}>
              Cambiar dirección
            </Button>
          </>
        )}
      </Card>

      {/* Modal para añadir nueva dirección */}
      <Modal isOpen={isOpen} scrollBehavior="inside" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Añadir nueva dirección</ModalHeader>
              <ModalBody>
                <form onSubmit={(e) => { e.preventDefault(); handleAddAddress(); }}>
                  <div className="mb-2">
                    <label htmlFor="fullName">Nombre completo</label>
                    <Input
                      required
                      id="fullName"
                      placeholder="Nombre y Apellido"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => {
                        const regex = /^[a-zA-Z\s]*$/;

                        if (regex.test(e.target.value)) {
                          setFormData({ ...formData, fullName: e.target.value });
                        }
                      }}
                    />
                  </div>

                  <div className="mb-2">
                    <label htmlFor="phone">Número de teléfono</label>
                    <Input
                      required
                      id="phone"
                      placeholder="Número de teléfono"
                      type="text"
                      value={formData.phone}
                      onChange={(e) => {
                        // Solo permitir números y el símbolo "+" al inicio para el código de país
                        const regex = /^[\d\+\s]*$/;
                        
                        if (regex.test(e.target.value)) {
                          setFormData({ ...formData, phone: e.target.value });
                        }
                      }}
                    />
                  </div>

                  <div className="mb-2">
                    <label htmlFor="email">Correo electrónico</label>
                    <Input
                      required
                      id="email"
                      placeholder="Correo electrónico"
                      type="email"
                      value={formData.email}
                      onBlur={(e) => {
                        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                        if (!regex.test(e.target.value)) {
                          <Alert className="mt-2">
                            Por favor, introduce un correo electrónico válido
                          </Alert>
                        }
                      }}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value }); 
                      }}
                    />
                  </div>

                  <div className="mb-2">
                    <label htmlFor="country">País/Región</label>
                    <Select
                        required
                        id="country"
                        placeholder="Selecciona un país"
                        value={formData.country}
                        onChange={(e) => {
                            const selectedCountryCode = e.target.value; 
                            const selectedCountry = countries.find(country => country.cca3 === selectedCountryCode);
                            const countryName = selectedCountry ? selectedCountry.name.common : ''; 
                        
                            setFormData({ ...formData, country: countryName }); 
                          }}
                    >
                        {countries.map((country) => (
                        <SelectItem key={country.cca3} data-value={country.name.common}>
                            {country.name.common}
                        </SelectItem>
                        ))}
                    </Select>
                  </div>

                  <div className="mb-2">
                    <label htmlFor="address1">Línea de dirección 1</label>
                    <Input
                      required
                      id="address1"
                      placeholder="Nombre de la calle"
                      type="text"
                      value={formData.address1}
                      onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                    />
                  </div>

                  <div className="mb-2">
                    <label htmlFor="address2">Línea de dirección 2</label>
                    <Input
                      id="address2"
                      placeholder="Depto, unidad, edificio, piso, etc."
                      type="text"
                      value={formData.address2}
                      onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                    />
                  </div>

                  <div className="mb-2">
                    <label htmlFor="city">Ciudad</label>
                    <Input
                      required
                      id="city"
                      placeholder="Ciudad"
                      type="text"
                      value={formData.city}
                      onChange={(e) => {
                        // Solo permitir letras (y espacios)
                        const regex = /^[a-zA-Z\s]*$/;

                        if (regex.test(e.target.value)) {
                          setFormData({ ...formData, city: e.target.value });
                        }
                      }}
                    />
                  </div>

                  <div className="mb-2">
                    <label htmlFor="state">Estado</label>
                    <Input
                      required
                      id="state"
                      placeholder="Estado"
                      type="text"
                      value={formData.state}
                      onChange={(e) => {
                        // Solo permitir letras (y espacios)
                        const regex = /^[a-zA-Z\s]*$/;

                        if (regex.test(e.target.value)) {
                          setFormData({ ...formData, state: e.target.value });
                        }
                    ``}}
                    />
                  </div>

                  <div className="mb-2">
                    <label htmlFor="postalCode">Código Postal</label>
                    <Input
                      required
                      id="postalCode"
                      placeholder="Código Postal"
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => {
                        // Solo permitir hasta 7 números
                        const regex = /^[0-9]{0,7}$/;

                        if (regex.test(e.target.value)) {
                          setFormData({ ...formData, postalCode: e.target.value });
                        }
                      }}
                    />
                  </div>

                  <Button
                    className="mt-4"
                    isDisabled={!formData.fullName || !formData.phone || !formData.address1 || !formData.city || !formData.state || !formData.postalCode}
                    type="submit"
                    onPress={onClose}
                  >
                    Usar esta dirección
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

        {/* MÉTODO DE PAGO */}
        <Card className="p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Método de pago</h2>
          <Select
            label="Método de pago"
            placeholder="Selecciona un método de pago"
            value={paymentMethod}
            onChange={(e) => {
              setPaymentMethod(e.target.value);
              setConfirmedPayment(null); // Restablece el estado cuando cambia el método
            }}
          >
            <SelectItem key="credit" data-value="credit">
              Tarjeta de crédito
            </SelectItem>
            <SelectItem key="paypal" data-value="paypal">
              PayPal
            </SelectItem>
          </Select>

          {paymentMethod === "credit" && !confirmedPayment && (
            <>
              <Input
                className="mt-2"
                placeholder="Número de tarjeta"
                value={cardNumber}
                onChange={(e) => {
                  let val = e.target.value.replace(/\D/g, "").slice(0, 16);

                  val = val.replace(/(.{4})/g, "$1 ").trim();
                  setCardNumber(val);
                }}
              />
              <Input
                className="mt-2"
                placeholder="Nombre en la tarjeta"
                value={cardHolder}
                onChange={(e) =>
                  setCardHolder(e.target.value.replace(/[^a-zA-Z ]/g, ""))
                }
              />
              <div className="flex space-x-2 mt-2">
                <Input
                  placeholder="MM/AA"
                  value={expiryDate}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, "").slice(0, 4);

                    if (val.length > 2) val = val.slice(0, 2) + "/" + val.slice(2);
                    setExpiryDate(val);
                  }}
                />
                <Input
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                />
              </div>

              {/* Validaciones y alertas */}
              {cardNumber.length < 19 && cardNumber.length > 0 && (
                <Alert className="mt-2">
                  Por favor, introduce un número de tarjeta válido
                </Alert>
              )}
              {cardHolder.trim() === "" && (
                <Alert className="mt-2">
                  Por favor, introduce un nombre válido
                </Alert>
              )}
              {expiryDate.length < 5 && expiryDate.length > 0 && (
                <Alert className="mt-2">
                  Por favor, introduce una fecha válida
                </Alert>
              )}
              {cvv.length < 3 && cvv.length > 0 && (
                <Alert className="mt-2">
                  Por favor, introduce un CVV válido
                </Alert>
              )}

              {/* Botón de Aceptar (se habilita solo si los datos son válidos) */}
              <Button
                className="mt-4"
                isDisabled={
                  cardNumber.length < 19 ||
                  cardHolder.trim() === "" ||
                  expiryDate.length < 5 ||
                  cvv.length < 3
                }
                onClick={handleConfirmPayment}
              >
                Aceptar
              </Button>
            </>
          )}

          {/* Mostrar tarjeta confirmada */}
          {confirmedPayment && (
            <div className="p-4 bg-gray-100 rounded-md mt-4 flex flex-col gap-2">
              <h3 className="text-md font-semibold">Tarjeta Confirmada</h3>
              <p className="text-gray-700">
                <strong>Número:</strong> **** **** **** {cardNumber.slice(-4)}
              </p>
              <p className="text-gray-700">
                <strong>Nombre:</strong> {cardHolder}
              </p>
              <p className="text-gray-700">
                <strong>Expira:</strong> {expiryDate}
              </p>
              <Button className="mt-2" color="danger" onClick={handleCancelPayment}>
                Cancelar
              </Button>
            </div>
          )}

          {/* Paypal seleccionado*/}
            {paymentMethod === "paypal" && (
                <>
                <Alert className="mt-2">PayPal no está disponible en tu región</Alert>
                </>
            )}
        </Card>

        <Card className="p-4 mb-4">
        {!showCouponInput && (
            <Button className="mt-4" onClick={() => setShowCouponInput(true)}>Usar código promocional</Button>
          )}

          {showCouponInput && (
            <div className="mt-4">
              <Input
                placeholder="Introduce un código promocional"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <Button className="mt-2" onClick={handleApplyCoupon}>Aplicar</Button>
              {couponApplied && <Alert className="mt-2">Cupón aplicado con éxito</Alert>}
            </div>
          )}

        </Card>
        

        <Alert className="mt-8">
          Puedes rastrear tu envío y ver cualquier tarifa de importación aplicable antes de realizar tu pedido.
        </Alert>
      </div>

      {/* CONFIRMACIÓN DEL PEDIDO */}
        <div className="col-span-1">
          <Card className="p-4 sticky top-4">
            <h2 className="text-lg font-semibold mb-2">Resumen del Pedido</h2>
            <Table>
              <TableHeader>
                <TableColumn>Descripción</TableColumn>
                <TableColumn>Monto</TableColumn>
              </TableHeader>
              <TableBody>
                {/* Mostrar productos */}
                <TableRow>
                  <TableCell>
                    {cart
                      .map((item) => item.name)
                      .join(", ")} {/* Mostrar títulos separados por comas */}
                  </TableCell>
                  <TableCell>
                    {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)} US$
                    {/* Sumar precios de productos multiplicados por cantidad */}
                  </TableCell>
                </TableRow>

                {/* Envío y manejo */}
                <TableRow>
                  <TableCell>Envío y manejo:</TableCell>
                  <TableCell>46.06US$</TableCell>
                </TableRow>

                {/* Tasas de importación */}
                <TableRow>
                  <TableCell>Depósito de tasas de importación:</TableCell>
                  <TableCell>25.72US$</TableCell>
                </TableRow>

                {/* Total */}
                <TableRow className="font-bold">
                  <TableCell>Total:</TableCell>
                  <TableCell>
                    {(
                      orderTotal 
                    ).toFixed(2)} US$
                  </TableCell>
                </TableRow>

                {/* Total con descuento (si hay algún descuento aplicado) */}
                <TableRow className="font-bold">
                  <TableCell>Total con descuento:</TableCell>
                  <TableCell>
                    {(
                      orderTotalWithDiscount
                    ).toFixed(2)} US$ {/* Total con descuento */}
                  </TableCell>
              </TableRow>
              </TableBody>
            </Table>

            {/* BOTÓN DE CONFIRMACIÓN */}
            <Button className="mt-4 w-full" onPress={() => {
              navigate(`/successful-purchase`)
              handleConfirmProducts();
            }}>Realizar pedido</Button>
          </Card>
        </div>



      {/* PRODUCTOS EN EL CARRITO */}
      <div className="col-span-2 lg:col-span-2 flex flex-wrap justify-center gap-8">
        {cart.map((item) => {
          return (
            <Card
              key={item.id}
              className="p-6 w-full sm:w-1/2 lg:w-1/3 min-w-[760px] flex flex-col justify-between"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Llega el {item.arrivalDate}</h2>
                <Button size="sm" onPress={() => navigate(`/product/${item.id}`)}>Revisar pedido</Button>
              </div>
              <div className="mt-4 flex items-center">
                <img
                  alt={item.name}  
                  className="w-24 h-24 object-cover"
                  src={item.images[0] || "https://th.bing.com/th/id/R.3a25567391b3ce970b66fde6c547bb71?rik=7G%2f8WUru8YkJSw&pid=ImgRaw&r=0"}  
                />
                <div className="ml-4">
                  <h3 className="text-md font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-gray-600">Cantidad: {item.quantity}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Checkout;