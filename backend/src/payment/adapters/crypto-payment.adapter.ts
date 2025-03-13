/* eslint-disable @typescript-eslint/require-await */
import { PaymentAdapter } from '../interfaces/payment-adapter.interface';
import { Payment } from '../interfaces/payment.interface';

export class CryptoPaymentAdapter implements PaymentAdapter {
  async processPayment(payment: Payment): Promise<any> {
    // Transformación para el API externo de Cripto
    const externalPaymentData = {
      crypto_amount: payment.amount,
      crypto_currency: payment.currency,
      network: 'bitcoin', // o ethereum, etc.
      // Otros campos requeridos para transacción cripto
    };
    console.log('Procesando pago con Cripto:', externalPaymentData);
    return { success: true, details: externalPaymentData };
  }
}
