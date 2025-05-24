import mongoose from 'mongoose';
import TErrorSource from './errorSource.interface';

const handleMongooseValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorSource[] => {
  // grab the errors from err
  const errors = Object.values(err.errors);

  // create an empty array to store the error sources
  const res: TErrorSource[] = [];

  // loop over the errors and push them into the errorSource array
  errors.forEach((error) => {
    res.push({
      path: error.path,
      message: error.message,
    });
  });

  // return the error source array
  return res;
};

export default handleMongooseValidationError;
