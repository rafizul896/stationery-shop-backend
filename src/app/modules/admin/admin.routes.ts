import { Router } from 'express';
import { AdminControllers } from './admin.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.patch('/users/:userId/block', auth('admin'), AdminControllers.blockUser);
router.get('/users', AdminControllers.getAllUsers);

export const adminRoutes = router;
