import Ajv from 'ajv';
import { CustomError } from './custom-error';

const ajv = new Ajv();

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: any[]) {
    super('Tham số yêu cầu không hợp lệ');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => ({ message: err.message, field: err.param }));
  }
}
