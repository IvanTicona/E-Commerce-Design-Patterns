/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AwsModule } from '../aws/aws.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  imports: [
    AwsModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    CloudinaryService,
  ],
})
export class ProductModule {}
