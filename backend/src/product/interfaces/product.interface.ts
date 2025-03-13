import { Document } from 'mongoose';

export interface Product extends Document {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
  stock: number;
  rating: number;
  offer?: {
    discount: number;
  };
}
