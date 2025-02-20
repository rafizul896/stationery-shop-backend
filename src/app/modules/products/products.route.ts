import { Router } from 'express';
import { ProductController } from './products.controller';
import auth from '../../middlewares/auth';

const productRouter = Router();

productRouter.post('/', ProductController.createAProduct);
productRouter.get('/', auth('user'), ProductController.getAllProducts);
productRouter.get('/:productId', ProductController.getAProduct);
productRouter.put('/:productId', ProductController.updateAProduct);
productRouter.put('/:productId/review', ProductController.reviewAProduct);
productRouter.delete('/:productId', ProductController.deleteAProduct);

export default productRouter;
