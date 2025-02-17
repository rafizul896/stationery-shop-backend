import { Error } from 'mongoose';
import { TErrorSources, TGenericErrorResponce } from '../interface/error';

const handleValidationError = (
  err: Error.ValidationError,
): TGenericErrorResponce => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: Error.ValidatorError | Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
