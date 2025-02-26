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

const getAllOrder = catchAsync(async (req, res) => {
  const result = await OrderService.getAllOrder(req.query);

  sendResponse(res, {
    success: true,
    message: 'Order retrieved successfully',
    statusCode: 200,
    data: result.data,
    meta: result.meta
  });
});

const getAOrder = catchAsync(async (req, res) => {
  const orderId = req.params.orderId;
  const result = await OrderService.getAOrder(orderId);

  sendResponse(res, {
    success: true,
    message: 'Order retrieved successfully',
    statusCode: 200,
    data: result,
  });
});

const updateAOrder = catchAsync(async (req, res) => {
  const orderId = req.params.orderId;
  const result = await OrderService.updateAOrder(orderId, req.body);

  sendResponse(res, {
    success: true,
    message: 'Order updated successfully',
    statusCode: 200,
    data: result,
  });
});
const deleteAOrder = catchAsync(async (req, res) => {
  const orderId = req.params.orderId;
  const result = await OrderService.deleteAOrder(orderId);

  sendResponse(res, {
    success: true,
    message: 'Order deleted successfully',
    statusCode: 200,
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
  getAllOrder,
  getAOrder,
  updateAOrder,
  deleteAOrder,
};
