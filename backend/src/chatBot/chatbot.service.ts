/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class ChatBotService {
  private genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
  private model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  async getAIResponse(message: string): Promise<string> {
    try {
      const result = await this.model.generateContent({
        contents: [{ role: "user", parts: [{ text: message }] }],
      });
  
      return result.response.text();
    } catch (error) {
      console.error("Error con Gemini API:", error);
      throw new Error("Fallo la respuesta de AI");
    }
  }
}
