import { IUser } from './user.interface';
import { User } from './user.model';

const getAUser = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

const updateUser = async (email: string, data: IUser) => {
  const result = await User.findOneAndUpdate({ email }, data, {
    new: true,
  });
  return result;
};

export const UserService = {
  getAUser,
  updateUser,
};
