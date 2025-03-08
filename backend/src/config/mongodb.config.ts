/* eslint-disable prettier/prettier */
import { MongooseModuleOptions } from '@nestjs/mongoose'; // Importa las opciones de Mongoose

// Esta es la configuración para conectar a MongoDB utilizando las variables de entorno
export const mongodbConfig = (): MongooseModuleOptions => ({
  uri: process.env.MONGO_URI,
});