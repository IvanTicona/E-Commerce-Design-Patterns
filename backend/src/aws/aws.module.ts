/* eslint-disable prettier/prettier */
import { Module, Global } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const REGION = process.env.AWS_REGION;

const ddbClient = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

@Global()
@Module({
  providers: [
    { provide: 'DDB_CLIENT', useValue: ddbDocClient },
  ],
  exports: ['DDB_CLIENT'],
})
export class AwsModule {}
