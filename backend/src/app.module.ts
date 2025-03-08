/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv'; // Asegúrate de tener este import
dotenv.config(); // Carga las variables de entorno desde el archivo .env

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { mongodbConfig } from './config/mongodb.config'; // Importa la configuración de MongoDB

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: mongodbConfig, // Usamos la función de configuración
    }),    
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
