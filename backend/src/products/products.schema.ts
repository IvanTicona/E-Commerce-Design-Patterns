/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [String] }) // Aquí se almacenarán URLs de las imágenes
  images: string[];

  @Prop({ default: 0 })
  stock: number;

  @Prop({ required: false, default: 0 })
  rating: number;

  @Prop({ required: false })
  arrivalDate: string;

  @Prop({ required: false, default: 0 })
  discount: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
