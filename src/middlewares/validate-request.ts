/* eslint-disable operator-linebreak */
import Ajv, { JSONSchemaType } from 'ajv';
import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';

const ajv = new Ajv({ allErrors: true });
require('ajv-errors')(ajv);

export const validateRequest = (schema: object) => (req: Request, res: Response, next: NextFunction) => {
  const validate = ajv.compile(schema);
  // Kiểm tra dữ liệu body trong request
  validate(req.body);
  if (validate.errors) {
    throw new RequestValidationError(
      validate.errors?.map((m) => ({
        message: m.message,
        param: m.instancePath.replace('/', '')
      }))
    );
  }

  next();
};
