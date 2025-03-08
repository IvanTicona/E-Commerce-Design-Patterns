/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, IsArray} from 'class-validator';
import { Types } from 'mongoose';

export class CreateCartDto {
  @IsArray()
  @IsNotEmpty()
  readonly items: CartItem[]; 
}

class CartItem {
  @IsNotEmpty()
  @IsString()
  readonly productId: Types.ObjectId; // El ID del producto en el carrito

  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number; // Cantidad de ese producto
}
