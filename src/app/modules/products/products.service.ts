import QueryBuilder from '../../utils/QueryBuilder';
import { IProduct } from './products.interface';
import Product from './products.model';

const productSearchableFields = ['name', 'brand', 'category'];

const createAProduct = async (payload: IProduct): Promise<IProduct> => {
  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async (query: Record<string, unknown>) => {
  const productsQuery = new QueryBuilder(
    Product.find(),
    query,
  )
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
  const result = await Product.findById(productId);
  return result;
};

const updateAProduct = async (productId: string, data: IProduct) => {
  const result = await Product.findByIdAndUpdate(productId, data, {
    new: true,
  });
  return result;
};

const deleteAProduct = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId, { new: true });
  return result;
};

export const ProductService = {
  createAProduct,
  getAllProducts,
  getAProduct,
  updateAProduct,
  deleteAProduct,
};
