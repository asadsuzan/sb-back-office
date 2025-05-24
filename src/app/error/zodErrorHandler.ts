import { ZodError, ZodIssue } from 'zod';
import TErrorSource from './errorSource.interface';

//  handle zod error
const handleZodError = (error: ZodError): TErrorSource[] => {
  // grab the issues array from  the zod error
  const { issues } = error;

  // initialize an empty array to hold the error source
  const res: TErrorSource[] = [];

  // loop through each issue in the issues array
  issues.forEach((issue: ZodIssue) => {
    // for each issue, create an object with the path and message
    res.push({
      path: issue.path.join('.'),
      message: issue.message,
    });
  });
  // return the array of error sources
  return res;
};

export default handleZodError;
