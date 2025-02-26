import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRoutes } from './app/modules/auth/auth.route';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import productRouter from './app/modules/products/products.route';
import orderRouter from './app/modules/order/order.route';
import { adminRoutes } from './app/modules/admin/admin.routes';
import userRouter from './app/modules/user/user.route';
import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51PL3ZCAjUyxa0ThHa3bKovEGL87Jo6cYiCCnMKDpk1FfFMlaOQ0TIldmR8tZRBQ60KtBbkHCuYWUsKIXP01KVOm300GcWFh2D2',
);

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRouter);
app.use('/api/products', productRouter); // for products
app.use('/api/orders', orderRouter); // for orders

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Blog server is running..!',
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
