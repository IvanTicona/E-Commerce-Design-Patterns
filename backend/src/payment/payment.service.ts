/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/payment/payment.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './interfaces/payment.interface';
import { CardPaymentAdapter } from './adapters/card-payment.adapter';
import { PaypalPaymentAdapter } from './adapters/paypal-payment.adapter';
import { CryptoPaymentAdapter } from './adapters/crypto-payment.adapter';

@Injectable()
export class PaymentService {
  // Mapa de adaptadores disponibles
  private adapters = {
    card: new CardPaymentAdapter(),
    paypal: new PaypalPaymentAdapter(),
    crypto: new CryptoPaymentAdapter(),
  };

  constructor(
    @InjectModel('Transaccion') private transaccionModel: Model<any>,
  ) {}

  async processPayment(method: string, payment: Payment): Promise<any> {
    const adapter = this.adapters[method];
    if (!adapter) {
      throw new BadRequestException('Método de pago no soportado');
    }
    // Procesa el pago a través del adapter
    const result = await adapter.processPayment(payment);

    // Guarda la transacción en la base de datos
    const nuevaTransaccion = new this.transaccionModel({
      method,
      amount: payment.amount,
      currency: payment.currency,
      result,
      date: new Date(),
    });
    await nuevaTransaccion.save();

    return { message: 'Pago procesado y transacción guardada', result };
  }
}
