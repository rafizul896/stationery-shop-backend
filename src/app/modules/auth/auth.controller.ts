import config from '../../config';
import catchAsync from '../../utils/catchAsynce';
import sendResponse from '../../utils/sendResponce';
import { AuthServices } from './auth.service';

const register = catchAsync(async (req, res) => {
  const result = await AuthServices.register(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: 201,
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.login(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: 200,
    data: { accessToken: accessToken },
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AuthServices.updateProfile(id, req.body);

  sendResponse(res, {
    success: true,
    message: 'User updated successfully',
    statusCode: 200,
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

export const AuthControllers = {
  register,
  login,
  updateProfile,
  refreshToken,
};
