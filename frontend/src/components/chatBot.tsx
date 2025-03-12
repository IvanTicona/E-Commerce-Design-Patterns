/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { Input, Button, Card, CardBody, Form } from "@heroui/react";
import axios from "axios";

interface Message {
  role: string;
  content: string;
}

const ChatBot = () => {
  const[messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const userMessage: Message = { role: "user", content: userInput };
    const newMessages = [...messages, userMessage];
  
    setMessages(newMessages);
    setUserInput("");
  
    try {
      const response = await axios.post("http://localhost:3000/chatbot/ask", {
        messages: [...newMessages, { role: "system", content: "Ayuda a recomendar productos." }]
      });
  
      const botMessage = response.data as { text: string };

      setMessages((prev) => [...prev, { role: "bot", content: botMessage.text }]);
    } catch (error) {
      
      console.error("Error al obtener la respuesta:", error);
    }
  };
  

  return (
    <div className="fixed bottom-4 right-4">
      <Button color="primary" onPress={() => setIsOpen(!isOpen)}>
        {isOpen ? "Cerrar Chat" : "Abrir Chat"}
      </Button>
      {isOpen && (
        <Form onSubmit={handleSubmit}>
          <Card className="w-80 p-4 absolute bottom-12 right-0 shadow-lg">
            <CardBody>
              <div className="h-64 overflow-y-auto border p-2 mb-2 rounded">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 my-1 rounded ${msg.role === "system" ? "bg-gray-100" : "bg-primary-100"}`}
                  >
                    {msg.content}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Escribe tu comsulta..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
                <Button color="primary" type="submit">
                  Enviar
                </Button>
              </div>
            </CardBody>
          </Card>
        </Form>
      )}
    </div>
  );
};

export default ChatBot;
