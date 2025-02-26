import QueryBuilder from '../../utils/QueryBuilder';
import { User } from '../user/user.model';

const blockUserIntoDB = async (id: string, payload: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    {
      status: payload,
    },
    { new: true },
  );

  return result;
};

const getAllUsers = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(['name', 'email'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  return {
    meta,
    result,
  };
};

export const AdminServices = {
  blockUserIntoDB,
  getAllUsers,
};
