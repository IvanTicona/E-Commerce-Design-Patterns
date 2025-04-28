/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductService {
  constructor(
    @Inject('DDB_CLIENT')
    private readonly ddb: DynamoDBDocumentClient,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createProduct(dto: any, file?: Express.Multer.File) {
    const imageUrl = file ? await this.cloudinaryService.uploadImage(file) : '';
    const item = {
      id: uuid(),
      ...dto,
      imagen: imageUrl,
      createdAt: new Date().toISOString(),
    };

    await this.ddb.send(
      new PutCommand({
        TableName: process.env.AWS_DDB_PRODUCTS_TABLE,
        Item: item,
      }),
    );
    return item;
  }

  async findAll() {
    const { Items } = await this.ddb.send(
      new ScanCommand({ TableName: process.env.AWS_DDB_PRODUCTS_TABLE }),
    );
    return Items;
  }

  async findOne(id: string) {
    const { Item } = await this.ddb.send(
      new GetCommand({
        TableName: process.env.AWS_DDB_PRODUCTS_TABLE,
        Key: { id },
      }),
    );
    if (!Item) throw new NotFoundException(`Producto ${id} no existe`);
    return Item;
  }

  async search(query: string) {
    const { Items } = await this.ddb.send(
      new ScanCommand({
        TableName: process.env.AWS_DDB_PRODUCTS_TABLE,
        FilterExpression: 'contains(#nombre, :q)',
        ExpressionAttributeNames: { '#nombre': 'nombre' },
        ExpressionAttributeValues: { ':q': query },
      }),
    );
    return Items;
  }
}
