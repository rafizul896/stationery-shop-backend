import { model, Schema, Types } from 'mongoose';
import { IOrder } from './order.interface';

const shippingAddressSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const orderProductSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    products: [orderProductSchema],
    totalAmount: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price must be a positive number'],
    },
    shippingAddress: shippingAddressSchema,
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipping', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    paymentMethod: {
      type: String,
      enum: ['Card', 'Cash on Delivery'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Pending'],
      required: true,
    },
    deliveryType: {
      type: String,
      enum: ['Today', 'Three Days'],
      required: true,
    },
    transactionId: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Create the Order model
const Order = model<IOrder>('Order', orderSchema);

export default Order;
