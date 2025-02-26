import config from '../config';
import AppError from '../errors/AppError';
import { IRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsynce';
import httpStatus from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: IRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authroized!');
    }

    // check token isValid
    let decoded;

    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new AppError(444, 'Unauthorized');
    }

    const { email, role } = decoded;

    const user = await User.findOne({ email, role });

    // check user is exists
    if (!user) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is not Found!');
    }

    // checking if the user is blocked
    if (user.status === 'block') {
      throw new AppError(httpStatus.UNAUTHORIZED, 'This user is Blocked!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authroized!');
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
