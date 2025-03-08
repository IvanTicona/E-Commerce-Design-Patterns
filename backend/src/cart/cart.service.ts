/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './cart.schema';
import { CreateCartDto } from './create-cart.dto';
import { UpdateCartDto } from './update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>, // Inyección del modelo de carrito
  ) {}

  // Agregar un artículo al carrito
  async addToCart(createCartDto: CreateCartDto): Promise<Cart> {
    const createdCartItem = new this.cartModel(createCartDto); // Crear un nuevo ítem en el carrito
    return createdCartItem.save(); // Guardar el artículo en la base de datos
  }

  // Obtener todos los artículos del carrito
  async findAll(): Promise<Cart[]> {
    const cartItems = await this.cartModel.find().exec(); // Buscar todos los artículos del carrito
    console.log('Artículos del carrito recuperados:', cartItems); // Verifica los datos aquí
    return cartItems;
  }

  // Actualizar la cantidad de un artículo en el carrito
  async updateCart(productId: Types.ObjectId, updateCartDto: UpdateCartDto): Promise<Cart> {
    const updatedCartItem = await this.cartModel
      .findOneAndUpdate({ productId }, updateCartDto, { new: true }) // Buscar por `productId` y actualizar
      .exec();

    if (!updatedCartItem) {
      throw new NotFoundException(`Artículo con productId ${productId.toString()} no encontrado en el carrito`);
    }
    return updatedCartItem; // Devolver el artículo actualizado
  }

  // Eliminar un artículo del carrito
  async removeFromCart(productId: Types.ObjectId): Promise<Cart> {
    const removedCartItem = await this.cartModel
      .findOneAndDelete({ productId }) // Buscar y eliminar por `productId`
      .exec();

    if (!removedCartItem) {
      throw new NotFoundException(`Artículo con productId ${productId.toString()} no encontrado en el carrito`);
    }
    return removedCartItem; // Devolver el artículo eliminado
  }
}
