import AppError from '../../errors/AppError';
import { Blog } from '../blog/blog.model';
import { User } from '../user/user.mode';
import httpStatus from 'http-status-codes';

const blockUserIntoDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    { new: true },
  );

  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Blog is not Found!');
  }

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const AdminServices = {
  blockUserIntoDB,
  deleteBlogFromDB,
};
