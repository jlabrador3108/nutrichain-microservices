import { HttpException } from '@nestjs/common';

export class ResponseHandler {
  static ok({message, data = null}: {message: string, data: any}) {
    return {
      statusCode: 200,
      message,
      success: true,
      data,
    };
  }

  static error({message, statusCode = 500, errors}: {message: string, statusCode: number, errors: any}): never {
    throw new HttpException(
      {
        statusCode,
        message,
        success: false,
        errors,
      },
      statusCode,
    );
  }
}
