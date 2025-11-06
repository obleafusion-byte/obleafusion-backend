export interface EmailContext {
  [key: string]: string | number | boolean | undefined;
}

export interface OrderConfirmationContext extends EmailContext {
  orderId: string;
  productName: string;
  total: number;
}
