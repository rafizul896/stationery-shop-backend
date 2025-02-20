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

router.post(
  '/refresh-token',
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.patch('/:id/update', AuthControllers.updateProfile);

export const authRoutes = router;
