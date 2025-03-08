/* eslint-disable prettier/prettier */
import * as cors from 'cors'; // Importa el paquete de CORS
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS de manera global para todas las rutas
  app.use(cors());
  app.enableCors({
    origin: ['http://localhost:5173'], // Permite solicitudes desde este origen
    methods: 'GET, POST, PUT, DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type, Accept', // Encabezados permitidos
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
