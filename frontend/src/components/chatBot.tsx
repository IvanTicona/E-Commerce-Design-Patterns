/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { Button, Avatar } from "@heroui/react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MessageList,
  Message,
  MessageInput,
  ChatContainer,
  MainContainer,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import { GoogleGenerativeAI } from '@google/generative-ai';

import { promptTexto } from "@/prompts/prompt";

const ChatBot = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const CHATBOT_PROMPT = promptTexto;
  
  const genAI = new GoogleGenerativeAI("AIzaSyDYrsE7xPZUu3BiPZk4vvLe0OT7SA5KUyw");
  const model = genAI?.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const handleSend = async (messageText: string) => {
    setMessages((prev) => [...prev, { role: "user", content: messageText }]);
    setMessages((prev) => [...prev, { role: "model", content: "Escribiendo..." }]);
    setIsLoading(true);

    let inputMessage = messages.length === 0
      ? `${CHATBOT_PROMPT}\nUsuario: ${messageText}`
      : `Usuario: ${messageText}`;

    try {
      const result = await model?.generateContent(inputMessage);
      const response = await result.response;

      setMessages((prev) => {
        const newMessages = [...prev];

        if (newMessages[newMessages.length - 1].content === "Escribiendo...") {
          newMessages.pop();
        }

        return [...newMessages, { role: "model", content: response.text() }];
      });
    } catch (error) {
      console.error("Error con Gemini API", error);
      setMessages((prev) => {
        const newMessages = [...prev];

        if (newMessages[newMessages.length - 1].content === "Escribiendo...") {
          newMessages.pop();
        }
        
        return [...newMessages, { role: "model", content: "Error al obtener respuesta del bot." }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button color="primary" variant="solid" onPress={() => setIsOpen(!isOpen)}>
        {isOpen ? "Cerrar Chat" : "Abrir Chat"}
      </Button>
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-80 bg-white rounded-lg shadow-lg overflow-hidden">
          <MainContainer style={{ height: "500px" }}>
            <ChatContainer>
              {/* Encabezado del chat con componente adecuado */}
              <ConversationHeader>
                <ConversationHeader.Content>
                  Asistente E-commerce
                </ConversationHeader.Content>
              </ConversationHeader>
              <MessageList>
                {messages.map((msg, index) => (
                  <Message
                    key={index}
                    model={{
                      message: msg.content,
                      sender: msg.role === "user" ? "Usuario" : "Asistente E-commerce",
                      direction: msg.role === "user" ? "outgoing" : "incoming",
                      position: "single",
                    }}
                  >
                    <Avatar
                      src={
                        msg.role === "user"
                          ? "https://th.bing.com/th/id/OIP.rIsI3TvodysyTi_2VOGK3gHaHa?rs=1&pid=ImgDetMain"
                          : "https://static.vecteezy.com/system/resources/previews/004/996/790/non_2x/robot-chatbot-icon-sign-free-vector.jpg"
                      }
                    />
                  </Message>
                ))}
              </MessageList>
              <MessageInput
                disabled={isLoading}
                placeholder="Escribe tu consulta..."
                onSend={handleSend}
              />
            </ChatContainer>
          </MainContainer>
          <div className="p-2">
            <Button fullWidth color="secondary" variant="solid" onPress={handleReset}>
              Limpiar Chat
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
