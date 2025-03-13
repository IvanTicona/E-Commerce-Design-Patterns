/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import Cards, { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Button, Input } from "@heroui/react";

interface PaymentFormProps {
  onSuccess: (data: any) => void;
}

const PaymentForm = ({ onSuccess }: PaymentFormProps) => {
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    setCardData((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    
    if (!cardData.number || !cardData.expiry || !cardData.cvc || !cardData.name) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    onSuccess(cardData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Cards
        cvc={cardData.cvc}
        expiry={cardData.expiry}
        focused={cardData.focus as Focused}
        name={cardData.name}
        number={cardData.number}
      />

      <Input
        label="Nombre en la Tarjeta"
        placeholder="Nombre Completo"
        name="name"
        value={cardData.name}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        required
      />

      <Input
        label="Número de Tarjeta"
        placeholder="1234 5678 9012 3456"
        name="number"
        value={cardData.number}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        required
      />

      <div className="flex gap-2">
        <Input
          label="Expiración (MM/AA)"
          placeholder="MM/AA"
          name="expiry"
          value={cardData.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          required
        />
        <Input
          label="CVC"
          placeholder="123"
          name="cvc"
          value={cardData.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          required
        />
      </div>

      <Button type="submit" color="primary" fullWidth>
        Confirmar Pago
      </Button>
    </form>
  );
};

export default PaymentForm;
