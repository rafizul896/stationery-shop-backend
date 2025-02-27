import { Schema } from 'mongoose';

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface OrderProduct {
  product: Schema.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder {
  user: Schema.Types.ObjectId;
  products: OrderProduct[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: 'Card' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending';
  deliveryType: 'Today' | 'Three Days';
  transactionId: string;
}
