import { Input } from "@heroui/react";
import { useState } from "react";

const CryptoBody = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [cryptoType, setCryptoType] = useState("Bitcoin"); // Valor por defecto
  const [verificationCode, setVerificationCode] = useState("");
  const [note, setNote] = useState("");

  const handleAccountChange = (evt: any) => {
    setAccountNumber(evt.target.value);
  };

  const handleCryptoTypeChange = (evt:any) => {
    setCryptoType(evt.target.value);
  };

  const handleVerificationCodeChange = (evt:any) => {
    setVerificationCode(evt.target.value);
  };

  const handleNoteChange = (evt: any) => {
    setNote(evt.target.value);
  };

  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" // Logo de Bitcoin como ejemplo
          alt="Crypto Logo"
          className="h-64 w-64" 
        />
      </div>
      <div className="flex flex-col gap-4 ml-4 w-full">
        <h2 className="text-xl font-bold">Pago con Criptomonedas</h2>
        <Input
          label="Número de Cuenta (ID)"
          labelPlacement="outside-left"
          name="accountNumber"
          placeholder="Número de Cuenta"
          value={accountNumber}
          onChange={handleAccountChange}
          maxLength={12}
        />
        <label className="block">Tipo de Criptomoneda</label>
        <select
          value={cryptoType}
          onChange={handleCryptoTypeChange}
          className="border rounded p-2"
        >
          <option value="Bitcoin">Bitcoin</option>
          <option value="Ethereum">Ethereum</option>
          <option value="Litecoin">Litecoin</option>
          <option value="Ripple">Ripple</option>
        </select>
        <Input
          label="Código de Verificación BlockchainSMS"
          labelPlacement="outside-left"
          name="verificationCode"
          placeholder="Código de Verificación"
          value={verificationCode}
          onChange={handleVerificationCodeChange}
          maxLength={8} // Limitar a 8 caracteres
        />
        <Input
          label="Nota (opcional)"
          labelPlacement="outside-left"
          name="note"
          placeholder="Nota"
          value={note}
          onChange={handleNoteChange}
        />
      </div>
    </div>
  );
};

export default CryptoBody;