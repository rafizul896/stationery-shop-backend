import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import httpStatus from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
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
  if (user.status === 'block') {
    throw new AppError(httpStatus.UNAUTHORIZED, 'This user is Blocked!');
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

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '7d',
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: '365d',
    },
  );

  return { accessToken, refreshToken };
};

const updateProfile = async (id: string, payload: IUser) => {
  const { shippingAddress, ...remainingData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingData,
  };

  if (shippingAddress && Object.keys(shippingAddress).length) {
    for (const [key, value] of Object.entries(shippingAddress)) {
      modifiedUpdatedData[`shippingAddress.${key}`] = value;
    }
  }

  const result = await User.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const user = await User.findOne({ email: decoded.email });

  // checking if the user is exists
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  // checking if the user is blocked
  if (user.status === 'block') {
    throw new AppError(httpStatus.UNAUTHORIZED, 'This user is Blocked!');
  }

  // create token
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '365d',
  });

  return {
    accessToken,
  };
};

export const AuthServices = {
  register,
  login,
  updateProfile,
  refreshToken,
};
