import catchAsync from '../../utils/catchAsynce';
import sendResponse from '../../utils/sendResponce';
import { UserService } from './user.service';

const getAUser = catchAsync(async (req, res) => {
  const email = req.params.email;
  const result = await UserService.getAUser(email);

  sendResponse(res, {
    success: true,
    message: 'User retrieved successfully',
    statusCode: 201,
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const email = req.params.email;
  const data = req.body;

  const result = await UserService.updateUser(email, data);

  sendResponse(res, {
    success: true,
    message: 'User updated successfully',
    statusCode: 201,
    data: result,
  });
});

export const UserController = { getAUser, updateUser };
