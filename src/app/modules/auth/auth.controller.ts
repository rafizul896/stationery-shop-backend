import catchAsync from '../../utils/catchAsynce';
import sendResponce from '../../utils/sendResponce';
import { AuthServices } from './auth.service';

const register = catchAsync(async (req, res) => {
  const result = await AuthServices.register(req.body);

  sendResponce(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: 201,
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.login(req.body);

  sendResponce(res, {
    success: true,
    message: 'Login successful',
    statusCode: 200,
    data: result,
  });
});

export const AuthControllers = {
  register,
  login,
};
