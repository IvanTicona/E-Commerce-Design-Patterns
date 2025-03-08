/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, ArrayNotEmpty, isDateString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  readonly category?: string;

  @IsOptional()
  @IsNumber()
  readonly discount?: number;

  @IsOptional()
  @IsArray()
  readonly images?: string[];

  @IsOptional()
  @IsNumber()
  readonly stock?: number;

  @IsOptional()
  @IsNumber()
  readonly rating?: number;

  @IsOptional()
  @IsString()
  readonly arrivalDate?: string;
}
