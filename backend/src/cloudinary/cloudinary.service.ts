/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// cloudinary.service.ts
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, ConfigOptions } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    // Configura tus credenciales utilizando variables de entorno para seguridad
    const configOptions: ConfigOptions = {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dh5yi2gmk', // Ej: 'mi-cloud-name'
      api_key: process.env.CLOUDINARY_API_KEY || '926592761833835', // Ej: '1234567890'
      api_secret:
        process.env.CLOUDINARY_API_SECRET || '8GGzlQE08Mzf8K0tyDtC2wTl_d0', // Ej: 'miApiSecret'
    };
    cloudinary.config(configOptions);
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'products' },
        (error: Error | undefined, result?: any) => {
          if (error) {
            return reject(error);
          }
          if (!result || !result.secure_url) {
            return reject(new Error('Image upload failed'));
          }
          resolve(result.secure_url);
        },
      );
      uploadStream.end(file.buffer);
    });
  }
}
