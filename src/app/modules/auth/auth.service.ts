import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.mode';
import httpStatus from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

const register = async (payload: IUser) => {
  const result = await User.create(payload);
  return { _id: result._id, name: result.name, email: result.email };
};

const login = async (payload: IUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');

  // checking if the user is exists
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  // checking if the user is blocked
  if (user.isBlocked) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'This user is Deleted!');
  }

  // check password
  if (!(await bcrypt.compare(payload.password, user.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password is not Matched!');
  }

  // create token
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '60d',
  });

  return { token: token };
};

export const AuthServices = {
  register,
  login,
};
