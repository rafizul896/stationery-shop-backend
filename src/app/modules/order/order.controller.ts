import { orderService } from './order.service';
import catchAsync from '../../utils/catchAsynce';
import sendResponce from '../../utils/sendResponce';

// Order a Stationery Product
const createOrder = catchAsync(async (req, res) => {
  const order = req.body;
  const result = await orderService.createOrder(order);

  sendResponce(res, {
    success: true,
    message: 'Order created successfully',
    statusCode: 201,
    data: result,
  });
});

// Calculate Revenue from Orders (Aggregation)
const calculateRevenue = catchAsync(async (req, res) => {
  const result = await orderService.calculateRevenue();

  sendResponce(res, {
    success: true,
    message: 'Revenue calculated successfully',
    statusCode: 200,
    data: result,
  });
});

export const orderController = {
  createOrder,
  calculateRevenue,
};
