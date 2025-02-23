import { ProductService } from './products.service';
import catchAsync from '../../utils/catchAsynce';
import sendResponse from '../../utils/sendResponce';

// Create a Stationery Product
const createAProduct = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await ProductService.createAProduct(data);

  sendResponse(res, {
    success: true,
    message: 'Product created successfully',
    statusCode: 201,
    data: result,
  });
});

// Get All Stationery Products
const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProducts(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Products retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

// Get a Specific Stationery Product
const getAProduct = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const result = await ProductService.getAProduct(productId);

  sendResponse(res, {
    success: true,
    message: 'Product retrieved successfully',
    statusCode: 201,
    data: result,
  });
});

// Get a Specific Stationery Product
const updateAProduct = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const data = req.body;

  const result = await ProductService.updateAProduct(productId, data);

  sendResponse(res, {
    success: true,
    message: 'Product updated successfully',
    statusCode: 201,
    data: result,
  });
});

// add or update a review
const reviewAProduct = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const data = req.body;

  const result = await ProductService.reviewAProduct(productId, data);

  sendResponse(res, {
    success: true,
    message: 'Review updated successfully',
    statusCode: 200,
    data: result,
  });
});

// Delete a Stationery Product
const deleteAProduct = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  await ProductService.deleteAProduct(productId);

  sendResponse(res, {
    success: true,
    message: 'Product deleted successfully',
    statusCode: 201,
    data: {},
  });
});

// Stationery Product reviews
const productReviews = catchAsync(async (req, res) => {
  const result = await ProductService.productReviews();

  sendResponse(res, {
    success: true,
    message: 'Product reviews retrieved successfully',
    statusCode: 201,
    data: result,
  });
});

// Stationery Product reviews
const findAllBrands = catchAsync(async (req, res) => {
  const {category} = req.query;
  const result = await ProductService.findAllBrands(category as string);

  sendResponse(res, {
    success: true,
    message: 'Brands are retrieved successfully',
    statusCode: 201,
    data: result,
  });
});

export const ProductController = {
  createAProduct,
  getAllProducts,
  getAProduct,
  updateAProduct,
  deleteAProduct,
  reviewAProduct,
  productReviews,
  findAllBrands,
};
