import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://usuariodev:tigresdelahorro@ecommerce.atu6c.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce',
    ),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
