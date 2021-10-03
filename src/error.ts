export class CustomError extends Error {
  status: number;
  constructor(message, statusCode) {
    super(message);
    this.status = statusCode;
  }
}
