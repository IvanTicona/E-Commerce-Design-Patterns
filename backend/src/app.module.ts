import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { ChatBotModule } from './chatBot/chatbot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@ecommerce.atu6c.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce`,
    ),
    ProductModule,
    ChatBotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
