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

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  await AdminServices.deleteBlogFromDB(id);

  sendResponce(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: 200,
  });
});

export const AdminControllers = {
  blockUser,
  deleteBlog,
};
