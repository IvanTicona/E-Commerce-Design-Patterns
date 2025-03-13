export class CreatePaymentDto {
  readonly method: 'card' | 'paypal' | 'crypto';
  readonly amount: number;
  readonly currency: string;
}
