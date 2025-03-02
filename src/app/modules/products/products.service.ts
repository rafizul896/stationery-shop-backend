import AppError from '../../errors/AppError';
import QueryBuilder from '../../utils/QueryBuilder';
import { IProduct, IReview } from './products.interface';
import Product from './products.model';

const productSearchableFields = ['name', 'brand', 'category'];

const createAProduct = async (payload: IProduct): Promise<IProduct> => {
  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async (query: Record<string, unknown>) => {
  const productsQuery = new QueryBuilder(Product.find(), query)
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productsQuery.modelQuery;
  const meta = await productsQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getAProduct = async (productId: string) => {
  const result = await Product.findById(productId).populate('reviews.user');
  return result;
};

const updateAProduct = async (productId: string, data: IProduct) => {
  const result = await Product.findByIdAndUpdate(productId, data, {
    new: true,
  });
  return result;
};

const reviewAProduct = async (productId: string, payload: IReview) => {
  const { user, rating, comment } = payload;

  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError(404, 'Product not found');
  }

  const existingReviewIndex = product.reviews.findIndex(
    (review) => String(review?.user) === String(user),
  );

  if (existingReviewIndex !== -1) {
    product.reviews[existingReviewIndex].rating = rating;
    product.reviews[existingReviewIndex].comment = comment;
  } else {
    product.reviews.push({ ...payload });
  }

  const result = await product.save();

  return result;
};

const deleteAProduct = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId, { new: true });
  return result;
};

const productReviews = async () => {
  const result = await Product.aggregate([
    {
      $unwind: '$reviews',
    },
    {
      $lookup: {
        from: 'users', // Assuming your users collection is named 'users'
        localField: 'reviews.user',
        foreignField: '_id',
        as: 'reviewer',
      },
    },
    {
      $project: {
        _id: 0,
        productId: '$_id',
        productName: '$name',
        category: '$category',
        brand: '$brand',
        reviewer: { $arrayElemAt: ['$reviewer.name', 0] }, // Extract user name
        rating: '$reviews.rating',
        comment: '$reviews.comment',
      },
    },
  ]).limit(10);

  return result;
};

const findAllBrands = async (categories:string) => {
  const result = await Product.distinct('brand', {
    category: { $in: categories.split(',') },
  });

  return result;
};

export const ProductService = {
  createAProduct,
  getAllProducts,
  getAProduct,
  updateAProduct,
  deleteAProduct,
  reviewAProduct,
  productReviews,
  findAllBrands,
};
