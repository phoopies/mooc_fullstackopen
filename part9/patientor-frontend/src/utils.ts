import { isString } from 'formik';

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isDate = (date: any): boolean =>
  isString(date) && Boolean(Date.parse(date));

export class ValidationError extends Error {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export const isValidationError = (e: unknown): e is ValidationError =>
  e instanceof ValidationError;
