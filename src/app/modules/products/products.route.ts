import { Router } from 'express';
import { ProductController } from './products.controller';

const productRouter = Router();

productRouter.post('/', ProductController.createAProduct);
productRouter.get('/', ProductController.getAllProducts);
productRouter.get('/:productId', ProductController.getAProduct);
productRouter.put('/:productId', ProductController.updateAProduct);
productRouter.put('/:productId/review', ProductController.reviewAProduct);
productRouter.delete('/:productId', ProductController.deleteAProduct);

productRouter.get('/getAll/reviews', ProductController.productReviews);
productRouter.get('/getAll/brands', ProductController.findAllBrands);

export default productRouter;
