/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { Button } from "@heroui/react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MessageList,
  Message,
  MessageInput,
  ChatContainer,
  MainContainer,
  ConversationHeader,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useNavigate } from "react-router";

import { promptTexto } from "@/prompts/prompt";

const ChatBot = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const CHATBOT_PROMPT = promptTexto;
  
  const genAI = new GoogleGenerativeAI("AIzaSyDYrsE7xPZUu3BiPZk4vvLe0OT7SA5KUyw");
  const model = genAI?.getGenerativeModel({ model: 'gemini-2.0-flash' });


  // Función para extraer la categoría del mensaje del usuario usando IA
  const extractCategoryFromMessage = async (message: string): Promise<string | null> => {
    const extractionPrompt = `Extrae solo la palabra que representa la categoría de producto del siguiente mensaje. Si no encuentras ninguna, responde "none". Mensaje: "${message}"`;

    try {
      const extractionResult = await model?.generateContent(extractionPrompt);
      const category = await extractionResult?.response.text();

      return category?.trim() || null;
    } catch (error) {
      console.error("Error extrayendo la categoría", error);

      return null;
    }
  };
  
  const handleSend = async (messageText: string) => {
    setMessages((prev) => [...prev, { role: "user", content: messageText }]);
    setMessages((prev) => [...prev, { role: "model", content: "Escribiendo..." }]);
    setIsLoading(true);

    // Llama a la función para extraer la categoría desde el mensaje del usuario
    const extractedCategory = await extractCategoryFromMessage(messageText);
    if (extractedCategory && extractedCategory.toLowerCase() !== "none") {
      // Navega a la pantalla de categoría pasando el valor extraído
      // Puedes pasar el valor vía state o query params según cómo hayas configurado CategoryPage
      navigate("/category", { state: { category: extractedCategory } });
    }

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
