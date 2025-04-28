/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuid } from 'uuid';
import { CardPaymentAdapter } from './adapters/card-payment.adapter';
import { PaypalPaymentAdapter } from './adapters/paypal-payment.adapter';
import { CryptoPaymentAdapter } from './adapters/crypto-payment.adapter';
import { Payment } from './interfaces/payment.interface';

@Injectable()
export class PaymentService {
  private adapters = {
    card: new CardPaymentAdapter(),
    paypal: new PaypalPaymentAdapter(),
    crypto: new CryptoPaymentAdapter(),
  };

  constructor(
    @Inject('DDB_CLIENT')
    private readonly ddb: DynamoDBDocumentClient,
  ) {}

  async processPayment(method: string, payment: Payment): Promise<any> {
    const adapter = this.adapters[method];
    if (!adapter) throw new BadRequestException('Método no soportado');

    const result = await adapter.processPayment(payment);

    const transactionItem = {
      transactionId: uuid(),
      method,
      amount: payment.amount,
      currency: payment.currency,
      result,
      date: new Date().toISOString(),
    };

    await this.ddb.send(
      new PutCommand({
        TableName: process.env.AWS_DDB_TRANSACTIONS_TABLE,
        Item: transactionItem,
      }),
    );

    return { message: 'Pago procesado', result };
  }
}
