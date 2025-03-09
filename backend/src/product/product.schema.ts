// product.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ required: true })
  precio: number;

  @Prop({ required: true })
  categoria: string;

  @Prop({ required: true })
  imagen: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true, default: 0 })
  rating: number;

  @Prop({ type: { discount: Number }, required: false })
  offer?: { discount: number };
}

export const ProductSchema = SchemaFactory.createForClass(Product);
