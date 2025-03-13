/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/payment/payment.module.ts
import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransaccionSchema } from './schemas/transaccion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Transaccion', schema: TransaccionSchema },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
