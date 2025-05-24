import mongoose from 'mongoose';
import TErrorSource from './errorSource.interface';

const handleMongooseCastError = (
  err: mongoose.Error.CastError,
): TErrorSource[] => {
  // create an empty array to store the error sources
  const res: TErrorSource[] = [];

  res.push({
    path: err.path,
    message: err.message,
  });

  // return the error source array
  return res;
};

export default handleMongooseCastError;
