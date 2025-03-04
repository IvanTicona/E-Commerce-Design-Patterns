/* eslint-disable prettier/prettier */
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

const Checkout = () => {
  const [addresses, setAddresses] = useState([
    "Daniel Alejandro López Quinteros, Av. Saavedra Edificio Ibita No 1760, La Paz, Bolivia",
    "Sebastian Nunez, Av. Saavedra Edificio Ibita No 1760, La Paz, Bolivia",
  ]);
  const [coupon, setCoupon] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [orderTotal, setOrderTotal] = useState(79.77);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);

  const [showAddressSelection, setShowAddressSelection] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [confirmedAddress, setConfirmedAddress] = useState('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [countries, setCountries] = useState<{ cca3: string; name: { common: string } }[]>([]); 
  

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
  
        setCountries(sortedCountries); // Guardamos los países ordenados en el estado
      } catch (error) {
        alert("Error al obtener países: " + (error as any).message);
      }
    };
  
    fetchCountries();
  }, []);
  

  

  const [formData, setFormData] = useState({
    country: '',
    fullName: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
  });


  const handleApplyCoupon = () => {
    if (coupon.trim() !== "" && !couponApplied) {
      setOrderTotal((prevTotal) => Math.max(0, prevTotal - 10));
      setCouponApplied(true);
    }
  };

  const handleAddAddress = () => {
    const newAddress = `${formData.fullName}, ${formData.address1}, ${formData.address2}, ${formData.city}, ${formData.state}, ${formData.country}, ${formData.postalCode}`;

    setAddresses([...addresses, newAddress]);
    setFormData({
      fullName: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    });
  };

  const handleConfirmAddress = () => {
    setConfirmedAddress(selectedAddress);
    setShowAddressSelection(false);
  };

  const handleChangeAddress = () => {
    setShowAddressSelection(true);
    setConfirmedAddress('');
  };

  
  return (
    <div className="p-6 max-w-4xl mx-auto grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <h1 className="text-2xl font-bold mb-4">Finalizar Compra</h1>
        {/* SELECCIÓN DE DIRECCIÓN */}

        <Card className="p-4 mb-4">
        {showAddressSelection ? (
          <>
            <h2 className="text-lg font-semibold mb-2">Selecciona una dirección de envío</h2>
            <RadioGroup
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
            >
              {addresses.map((address, index) => (
                <div key={index}>
                  <Radio value={address}>
                    <span>{address}</span>
                  </Radio>
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside">
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
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
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
          <Select label="Método de pago" placeholder="Selecciona un método de pago"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}>
            <SelectItem key="credit" data-value="credit">Tarjeta de crédito</SelectItem>
            <SelectItem key="paypal" data-value="paypal">PayPal</SelectItem>
          </Select>

          {paymentMethod === "credit" && (
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
                onChange={(e) => setCardHolder(e.target.value.replace(/[^a-zA-Z ]/g, ""))}
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

                {/* Tarjeta invalida alerta */}
                {cardNumber.length < 19 && cardNumber.length > 0 && (
                  <Alert className="mt-2">Por favor, introduce un número de tarjeta válido</Alert>
                )}
                {/* Nombre invalido alerta */}
                {cardHolder.trim() === "" && (
                  <Alert className="mt-2">Por favor, introduce un nombre válido</Alert>
                )}
                {/* Fecha de expiración invalida alerta */}
                {expiryDate.length < 5 && expiryDate.length > 0 && (
                  <Alert className="mt-2">Por favor, introduce una fecha válida</Alert>
                )}
                {/* CVV invalido alerta */}
                {cvv.length < 3 && cvv.length > 0 && (
                  <Alert className="mt-2">Por favor, introduce un CVV válido</Alert>
                )}

                </div>
            </>
          )}

          {/* Paypal seleccionado*/}
            {paymentMethod === "paypal" && (
                <>
                <Alert className="mt-2">PayPal no está disponible en tu región</Alert>
                </>
            )}

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
        

        <Alert className="mt-4">
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
              <TableRow>
                <TableCell>Productos:</TableCell>
                <TableCell>US$7.99</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Envío y manejo:</TableCell>
                <TableCell>US$46.06</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Depósito de tasas de importación:</TableCell>
                <TableCell>US$25.72</TableCell>
              </TableRow>
              <TableRow className="font-bold">
                <TableCell>Total:</TableCell>
                <TableCell>US$79.77</TableCell>
              </TableRow>
              <TableRow className="font-bold">
                <TableCell>Total con descuento:</TableCell>
                <TableCell>US${orderTotal.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
            {/* BOTÓN DE CONFIRMACIÓN */}
            <Button className="mt-4 w-full">Realizar pedido</Button>
        </Card>

        

      </div>

    {/* PRODUCTO EN CAMINO */}
    <div className="col-span-1">
        <Card className="p-4 mt-4 w-full">
            <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Llega el 20 de marzo</h2>
            <Button size="sm">Revisar pedido</Button>
            </div>
            <div className="mt-4 flex items-center">
            <img alt="Leche" className="w-24 h-24 object-cover" src="https://th.bing.com/th/id/R.a0f5a3c7f8800f9be94f4f1bd770b0a9?rik=zNwoe3oZwNsqfQ&pid=ImgRaw&r=0" />
            <div className="ml-4">
                <h3 className="text-md font-semibold">Leche Pil</h3>
                <p className="text-gray-600">Leche en caja pil para toda la familia.</p>
            </div>
            </div>
        </Card>
    </div>


    </div>
  );
};

export default Checkout;
