import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorResponce } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponce => {
  const errorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue?.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
