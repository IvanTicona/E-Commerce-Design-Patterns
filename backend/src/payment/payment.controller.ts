/* eslint-disable @typescript-eslint/no-unsafe-return */
// src/payment/payment.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './interfaces/payment.interface';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    const { method, amount, currency } = createPaymentDto;
    const payment: Payment = { amount, currency };
    return this.paymentService.processPayment(method, payment);
  }
}
