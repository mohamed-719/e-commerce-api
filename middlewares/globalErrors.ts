import { NextFunction, Request, Response } from "express";
import { CustomErrors } from "../interfaces/customErrors";


//hear used the globalErrors to catch the (Error) from out side of express
const globalErrors = (error: CustomErrors, req: Request, res: Response, next: NextFunction) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'server error';
  if (process.env.NODE_ENV === 'development') {
    res.status(error.statusCode).json({
      error,
      message: error.message,
      stack: error.stack
    })
  } else {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    })
  }
};

export default globalErrors;