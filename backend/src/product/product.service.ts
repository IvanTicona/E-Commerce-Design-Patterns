// product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async createProduct(
    createProductDto: any,
    file?: Express.Multer.File,
  ): Promise<Product> {
    let imageUrl = '';
    if (file) {
      imageUrl = await this.cloudinaryService.uploadImage(file);
    }
    const createdProduct = new this.productModel({
      ...createProductDto,
      imagen: imageUrl,
    });
    return createdProduct.save();
  }

  // Otros métodos (findAll, findOne, update, delete, etc.) pueden ser definidos aquí.

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }
}
