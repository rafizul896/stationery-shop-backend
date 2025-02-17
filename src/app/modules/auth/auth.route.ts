import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from '../user/user.validation';
import { AuthValidations } from './auth.validation';

const router = Router();

router.post(
  '/register',
  validateRequest(userValidations.userValidationSchema),
  AuthControllers.register,
);
router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.login,
);

export const authRoutes = router;
