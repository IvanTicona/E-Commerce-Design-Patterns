/* eslint-disable @typescript-eslint/require-await */
import { PaymentAdapter } from '../interfaces/payment-adapter.interface';
import { Payment } from '../interfaces/payment.interface';

export class PaypalPaymentAdapter implements PaymentAdapter {
  async processPayment(payment: Payment): Promise<any> {
    // Transformación para el API externo de PayPal
    const externalPaymentData = {
      amount: payment.amount,
      currency: payment.currency,
      payment_method: 'paypal',
      // Otros campos necesarios para PayPal
    };
    console.log('Procesando pago con PayPal:', externalPaymentData);
    return { success: true, details: externalPaymentData };
  }
}
