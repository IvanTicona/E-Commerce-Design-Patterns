// product.controller.ts
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  async createProduct(
    @Body() createProductDto: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const product = await this.productService.createProduct(
      createProductDto,
      file,
    );
    return product;
  }
}
