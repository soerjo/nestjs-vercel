import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { responseMessage, serviceCode } from '../utils/constant';
import { ErrorException } from '../utils/custom.exceptions';

interface ErrorResponse {
  responseCode: string | null;
  responseDesc: string | null;
}

@Catch(QueryFailedError, HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof QueryFailedError) {
      exception = new ErrorException(responseMessage.INTERNAL_SERVER_ERROR);
    }

    if (exception instanceof HttpException) {
      const response = this.getResponse(exception);
      this.sendResponse(host, response, exception);
    }
  }

  private getResponse(exception: HttpException): ErrorResponse {
    const exceptionResponse = exception.getResponse() as {
      statusCode: number;
      error: string;
      message: string;
    };

    const errorExceptionResponse = exception.getResponse() as {
      responseCode: string;
      responseDesc: string;
    };

    if (exception.name === 'NotFoundException') {
      return this.buildErrorResponse(
        responseMessage.NOT_FOUND,
        exceptionResponse.message || responseMessage.UNAUTHORIZED_AUTH.message,
      );
    }

    if (exception.name === 'UnauthorizedException') {
      return this.buildErrorResponse(
        responseMessage.UNAUTHORIZED_AUTH,
        exceptionResponse.message || responseMessage.UNAUTHORIZED_AUTH.message,
      );
    }

    if (exception.name === 'ForbiddenException') {
      return this.buildErrorResponse(
        responseMessage.UNAUTHORIZED_ROLES,
        responseMessage.UNAUTHORIZED_ROLES.message,
      );
    }

    if (exception.name === 'BadRequestException') {
      return this.buildErrorResponse(
        responseMessage.BAD_REQUEST,
        exceptionResponse.message || responseMessage.BAD_REQUEST.message,
      );
    }

    if (exception.name === 'ErrorException') {
      return {
        responseCode: errorExceptionResponse.responseCode,
        responseDesc: errorExceptionResponse.responseDesc,
      };
    }

    if (exception.name === 'ServiceUnavailableException') {
      return {
        responseCode:
          responseMessage.INTERNAL_SERVER_ERROR.httpStatus +
          serviceCode +
          responseMessage.INTERNAL_SERVER_ERROR.caseCode,
        responseDesc: exception.getResponse() as any,
      };
    }

    if (process.env.NODE_ENV === 'development') {
      console.error(exception);
    }

    return {
      responseCode:
        responseMessage.INTERNAL_SERVER_ERROR.httpStatus +
        serviceCode +
        responseMessage.INTERNAL_SERVER_ERROR.caseCode,
      responseDesc: exceptionResponse.message,
    };
  }

  private buildErrorResponse(
    responseMessage: { httpStatus: number; caseCode: string; message: string },
    message: string,
  ): ErrorResponse {
    const { httpStatus, caseCode } = responseMessage;
    const responseCode = `${httpStatus}${serviceCode}${caseCode}`;
    return { responseCode, responseDesc: message };
  }

  private sendResponse(
    host: ArgumentsHost,
    response: ErrorResponse,
    exception: HttpException,
  ): void {
    const ctx = host.switchToHttp();
    const responseStatus =
      +response.responseCode.slice(0, 3) || exception.getStatus();
    const responseCtx = ctx.getResponse<Response>();
    responseCtx.status(responseStatus).send(response);
  }
}
