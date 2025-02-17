import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRoutes } from './app/modules/auth/auth.route';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import productRouter from './app/modules/products/products.route';
import orderRouter from './app/modules/order/order.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes
app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);
app.use('/api/products', productRouter); // for products
app.use('/api/orders', orderRouter); // for orders

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Blog server is running..!',
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
