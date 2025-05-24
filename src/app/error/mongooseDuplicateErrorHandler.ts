import TErrorSource from './errorSource.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mongooseDuplicateErrorHandler = (error: any): TErrorSource[] => {
  // caret an empty array to hold errorSource
  const res: TErrorSource[] = [];

  // check if the error is a mongoose duplicate key error
  if (error?.code === 11000 && error?.keyValue) {
    // get the duplicate key field name
    const fieldName = Object.keys(error.keyValue)[0];
    const message = `${Object.values(error?.keyValue)[0]} is already exits`;

    // push the errorSource into the array
    res.push({ path: fieldName, message: message as string });
  }

  // return the errorSource array
  return res;
};

export default mongooseDuplicateErrorHandler;
