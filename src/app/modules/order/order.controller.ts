import { OrderService } from './order.service';
import catchAsync from '../../utils/catchAsynce';
import sendResponse from '../../utils/sendResponce';

// Order a Stationery Product
const createOrder = catchAsync(async (req, res) => {
  const order = req.body;
  const result = await OrderService.createOrder(order);

  sendResponse(res, {
    success: true,
    message: 'Order created successfully',
    statusCode: 201,
    data: result,
  });
});

// Calculate Revenue from Orders (Aggregation)
const calculateRevenue = catchAsync(async (req, res) => {
  const result = await OrderService.calculateRevenue();

  sendResponse(res, {
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
