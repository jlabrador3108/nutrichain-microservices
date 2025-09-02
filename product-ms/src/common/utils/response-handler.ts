export class ResponseHandler {
  static ok({message, data = null, meta= null}: {message: string, data: any, meta?: any}) {
    return {
      success: true,
      statusCode: 200,
      message,
      data,
      meta,
    };
  }

  static error({message, statusCode = 500, errors = null}: {message: string, statusCode: number, errors?: any}) {
    throw new HttpError(message, statusCode, errors);
  }
}

export class HttpError extends Error {
  public status: number;
  public errors?: any;

  constructor(message: string, status = 500, errors?: any) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

