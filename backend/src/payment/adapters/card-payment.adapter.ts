/* eslint-disable @typescript-eslint/require-await */
import { PaymentAdapter } from '../interfaces/payment-adapter.interface';
import { Payment } from '../interfaces/payment.interface';

export class CardPaymentAdapter implements PaymentAdapter {
  async processPayment(payment: Payment): Promise<any> {
    // Transformación para el API externo de Tarjeta
    const externalPaymentData = {
      total: payment.amount,
      currencyCode: payment.currency,
      methodType: 'CARD',
      // Otros campos que requiera el API de Tarjeta
    };
    // Simulación de llamada a un API externo
    console.log('Procesando pago con Tarjeta:', externalPaymentData);
    return { success: true, details: externalPaymentData };
  }
}
