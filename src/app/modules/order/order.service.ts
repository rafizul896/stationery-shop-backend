import AppError from '../../errors/AppError';
import QueryBuilder from '../../utils/QueryBuilder';
import Product from '../products/products.model';
import { orderSearchableFields } from './order.constant';
import IOrder from './order.interface';
import Order from './order.model';

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const { user, product, quantity, totalPrice } = payload;

  // Check if the product exists
  const existsProduct = await Product.findById(product);
  if (!existsProduct) throw new Error('Product not found');

  // Check inventory availability
  if (!existsProduct.inStock || existsProduct.quantity < quantity) {
    throw new Error('Insufficient stock for the requested quantity');
  }

  // Update inventory
  existsProduct.quantity -= quantity;
  if (existsProduct.quantity === 0) {
    existsProduct.inStock = false;
  }

  await existsProduct.save();

  // Create the order
  const result = await Order.create({ user, product, quantity, totalPrice });
  return result;
};

const getAllOrder = async (query: Record<string, unknown>) => {
  const ordersQuery = new QueryBuilder(
    Order.find().populate('user product'),
    query,
  )
    .search(orderSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await ordersQuery.countTotal();
  const result = await ordersQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getAOrder = async (orderId: string) => {
  const result = await Order.findById(orderId).populate('user product');
  return result;
};

const updateAOrder = async (orderId: string, payload: Partial<IOrder>) => {
  const result = await Order.findByIdAndUpdate(orderId, payload);
  return result;
};

const deleteAOrder = async (orderId: string) => {
  const order = await Order.findById(orderId).populate('user product');

  if (!order) {
    throw new AppError(404, 'Order is not found!');
  }

  if (order?.paymentStatus === 'Paid' && order?.status === 'Shipped') {
    throw new AppError(405, 'Action not permited!');
  }

  const existsProduct = await Product.findById(order.product).select(
    'quantity inStock',
  );

  const result = await Order.findByIdAndDelete(orderId);

  if (!existsProduct) {
    throw new AppError(404, 'Product Not found!');
  }

  if (result) {
    existsProduct.quantity += order.quantity;
    existsProduct.inStock = false;
  }

  await existsProduct.save();

  return result;
};

const calculateRevenue = async () => {
  const result = await Order.aggregate([
    // stage-1
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: '$totalPrice',
        },
      },
    },
    // stage-2
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);

  return result.length > 0 ? result[0] : { totalRevenue: 0 };
};

export const OrderService = {
  createOrder,
  calculateRevenue,
  getAllOrder,
  getAOrder,
  updateAOrder,
  deleteAOrder,
};
