
export class CustomError extends Error {
  statusCode: number;
  isOperational: boolean; // helps distinguish expected vs. unexpected errors

  constructor(statusCode: number, message: string, isOperational: boolean = true) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
  }
}