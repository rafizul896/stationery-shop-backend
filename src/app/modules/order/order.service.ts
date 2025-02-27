import QueryBuilder from '../../utils/QueryBuilder';
import Product from '../products/products.model';
import { User } from '../user/user.model';
import { orderSearchableFields } from './order.constant';
import { IOrder } from './order.interface';
import Order from './order.model';

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const { user, products } = payload;

  // Check if the user exists
  const existsUser = await User.findById(user);
  if (!existsUser) {
    throw new Error('User not found');
  }

  for (const item of products) {
    const existsProduct = await Product.findById(item.product);

    if (!existsProduct) throw new Error('Product not found');

    // Check inventory availability
    if (!existsProduct.inStock || existsProduct.quantity < item.quantity) {
      throw new Error('Insufficient stock for the requested quantity');
    }

    // Update inventory
    existsProduct.quantity -= item.quantity;
    if (existsProduct.quantity === 0) {
      existsProduct.inStock = false;
    }

    await existsProduct.save();
  }

  // Create the order
  const result = await Order.create(payload);
  return result;
};

const getAllOrder = async (query: Record<string, unknown>) => {
  const ordersQuery = new QueryBuilder(
    Order.find().populate('user products.product'),
    query,
  )
    .search(orderSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await ordersQuery.countTotal();
  const data = await ordersQuery.modelQuery;

  return {
    meta,
    data,
  };
};

const getAOrder = async (orderId: string) => {
  const result = await Order.findById(orderId).populate('user');
  return result;
};

const updateAOrder = async (orderId: string, payload: Partial<IOrder>) => {
  const result = await Order.findByIdAndUpdate(orderId, payload);
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
};
