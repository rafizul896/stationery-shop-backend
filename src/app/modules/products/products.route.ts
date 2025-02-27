import { Router } from 'express';
import { ProductController } from './products.controller';
import auth from '../../middlewares/auth';

const productRouter = Router();

productRouter.post('/',auth('admin'), ProductController.createAProduct);
productRouter.get('/', ProductController.getAllProducts);
productRouter.get('/:productId', ProductController.getAProduct);
productRouter.put('/:productId',auth('admin'), ProductController.updateAProduct);
productRouter.put('/:productId/review', ProductController.reviewAProduct);
productRouter.delete('/:productId',auth('admin'), ProductController.deleteAProduct);

productRouter.get('/getAll/reviews', ProductController.productReviews);
productRouter.get('/getAll/brands', ProductController.findAllBrands);

export default productRouter;
