import catchAsync from '../../utils/catchAsynce';
import sendResponce from '../../utils/sendResponce';
import { AdminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await AdminServices.blockUserIntoDB(userId);

  sendResponce(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: 200,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllUsers(req.query);

  sendResponce(res, {
    success: true,
    message: 'User retrieved successfully',
    statusCode: 200,
    data: result.result,
    meta: result.meta,
  });
});

export const AdminControllers = {
  blockUser,
  getAllUsers,
};
