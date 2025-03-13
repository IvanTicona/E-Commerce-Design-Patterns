import { Input } from "@heroui/react";
import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const CardpayBody = () => {
  const [state, setState] = useState<{
    number: string;
    expiry: string;
    cvc: string;
    name: string;
    focus: "name" | "number" | "expiry" | "cvc" | undefined;
  }>({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: undefined,
  });

  const handleInputChange = (evt: any) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: any) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <div className="flex">
      <Cards
        cvc={state.cvc}
        expiry={state.expiry}
        focused={state.focus}
        name={state.name}
        number={state.number}
      />
      <form className="flex flex-col gap-4 w-1/2">
        <Input
          label="Numero de Tarjeta"
          labelPlacement="outside-left"
          name="number"
          placeholder="Card Number"
          type="number"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <Input
          label="Nombre del Titular"
          labelPlacement="outside-left"
          name="name"
          placeholder="Name"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <Input
          label="Fecha de Expiracion"
          labelPlacement="outside-left"
          name="expiry"
          placeholder="MM/YY Expiry"
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <Input
          label="Codigo de Seguridad"
          labelPlacement="outside-left"
          name="cvc"
          placeholder="CVC"
          value={state.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
      </form>
    </div>
  );
};

export default CardpayBody;
