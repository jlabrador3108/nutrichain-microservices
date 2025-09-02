export class ResponseHandler {
  static ok({ message, data = null, meta = null }) {
    return {
      success: true,
      statusCode: 200,
      message,
      data,
      meta,
    };
  }

  static error({ message, statusCode = 500, errors = null }) {
    throw new HttpError(message, statusCode, errors);
  }
}

export class HttpError extends Error {
  status;
  errors;

  constructor(message, status = 500, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}
