import { Schema } from 'mongoose';

interface IOrder {
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Paid' | 'Unpaid';
}

export default IOrder;
