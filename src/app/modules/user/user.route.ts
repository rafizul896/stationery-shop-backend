import { Router } from 'express';
import { UserController } from './user.controller';

const userRouter = Router();

userRouter.get('/:email', UserController.getAUser);
userRouter.put('/:email', UserController.updateUser);

export default userRouter;
