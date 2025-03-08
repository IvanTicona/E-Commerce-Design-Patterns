/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
    @Prop({
        type: [{ 
          productId: { type: Types.ObjectId, required: true }, // Referencia al producto (ID de Mongo)
          quantity: { type: Number, required: true, min: 1 }, // Cantidad del producto
        }],
        required: true,
      })
      items: { productId: Types.ObjectId; quantity: number }[]; // Arreglo de productos en el carrito
}

export const CartSchema = SchemaFactory.createForClass(Cart);
