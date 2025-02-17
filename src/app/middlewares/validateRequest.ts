import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsynce';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    // data validetion using zod
    await schema.parseAsync({ body: req.body, cookies: req.cookies });
    next();
  });
};

export default validateRequest;
