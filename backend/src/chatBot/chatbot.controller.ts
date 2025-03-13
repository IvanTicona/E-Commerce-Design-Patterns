/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { ChatBotService } from './chatbot.service';

@Controller('chatbot')
export class ChatBotController {
  constructor(private readonly chatBotService: ChatBotService) {}

  @Post("ask") 
  async askAI(@Body() body: { messages: string}) {
    const response = await this.chatBotService.getAIResponse(body.messages);
    return { text: response }; 
  }
}
