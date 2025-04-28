/* eslint-disable prettier/prettier */
import { useState } from "react";
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
import { MessageCircle } from "lucide-react"; // Importa el icono

import { promptTexto } from "@/prompts/prompt";

const ChatBot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const CHATBOT_PROMPT = promptTexto;
  
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_API_KEY!);
  const model = genAI?.getGenerativeModel({ model: 'gemini-2.0-flash' });

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

    const extractedCategory = await extractCategoryFromMessage(messageText);

    if (extractedCategory && extractedCategory.toLowerCase() !== "none") {
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

  // Nueva función para manejar la apertura del chat y enviar mensaje de bienvenida
  const handleOpenChat = () => {
    setIsOpen((prev) => {
      if (!prev && messages.length === 0) {
        // Si el chat se abre por primera vez, agregar mensaje de bienvenida
        setMessages([
          { role: "model", content: "¡Hola! Soy tu asistente de compras. ¿En qué puedo ayudarte hoy?" }
        ]);
      }

      return !prev;
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Botón flotante con icono de mensaje */}
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition duration-300 ease-in-out"
        onClick={handleOpenChat}
      >
        <MessageCircle size={24} />
      </button>

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
