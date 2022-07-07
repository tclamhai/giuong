import Ajv from "ajv";
import { CustomError } from "./custom-error";
const ajv = new Ajv();

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: any[]) {
    super("Invalid request parameters");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.message, field: err.param };
    });
  }
}
