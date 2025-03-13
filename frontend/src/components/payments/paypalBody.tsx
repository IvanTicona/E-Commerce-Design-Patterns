import { Input } from "@heroui/react";
import { useState } from "react";

const PaypalBody = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [remember, setRemember] = useState(false);

  const handleInputChange = (evt:any) => {
    const { name, value } = evt.target;
    if (name === "email") setEmail(value);
    if (name === "phone") setPhone(value);
    if (name === "confirmationCode") setConfirmationCode(value);
  };

  const handleCheckboxChange = () => {
    setRemember(!remember);
  };

  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b7/PayPal_Logo_Icon_2014.svg"
          alt="PayPal Logo"
          className="h-64 w-64" 
        />
      </div>
      <div className="flex flex-col gap-4 ml-4 w-full">
        <h2 className="text-xl font-bold">Pago con PayPal</h2>
        <Input
          label="Correo Electrónico:"
          labelPlacement="outside-left"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleInputChange}
        />
        <Input
          label="Número de Teléfono: "
          labelPlacement="outside-left"
          name="phone"
          placeholder="Teléfono"
          value={phone}
          onChange={handleInputChange}
        />
        <Input
          label="Código de Confirmación de 6 caracteres:"
          labelPlacement="outside-left"
          name="confirmationCode"
          placeholder="Código de Confirmación"
          value={confirmationCode}
          onChange={handleInputChange}
          maxLength={6}
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={remember}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label>Recordar información de pago</label>
        </div>
      </div>
    </div>
  );
};

export default PaypalBody;