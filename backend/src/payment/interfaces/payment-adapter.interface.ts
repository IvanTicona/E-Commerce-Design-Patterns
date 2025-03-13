import { Payment } from './payment.interface';

export interface PaymentAdapter {
  processPayment(payment: Payment): Promise<any>;
}
