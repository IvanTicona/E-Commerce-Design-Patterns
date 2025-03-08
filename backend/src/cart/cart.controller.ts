/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './create-cart.dto';
import { UpdateCartDto } from './update-cart.dto';
import { Types } from 'mongoose';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Obtener todos los productos del carrito (sin userId)
  @Get()
  async findAll() {
  const cart = await this.cartService.findAll();
  console.log('Respuesta del carrito desde el servidor:', cart);
  return cart;
}


  // Agregar un artículo al carrito
  @Post()
  async addToCart(@Body() createCartDto: CreateCartDto) {
    console.log('🔥 Ejecutando addToCart() en el controlador...');
    return this.cartService.addToCart(createCartDto);
  }

  // Actualizar el carrito
  @Put(':productId')
  async updateCart(@Param('productId') productId: Types.ObjectId, @Body() updateCartDto: UpdateCartDto) {
    console.log('🔥 Ejecutando updateCart() en el controlador...');
    return this.cartService.updateCart(productId, updateCartDto);
  }

  // Eliminar un artículo del carrito
  @Delete(':productId')
  async removeFromCart(@Param('productId') productId: Types.ObjectId) {
    console.log('🔥 Ejecutando removeFromCart() en el controlador...');
    return this.cartService.removeFromCart(productId);
  }
}