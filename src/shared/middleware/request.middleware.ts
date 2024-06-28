import { NestMiddleware } from '@nestjs/common';
import { randomBytes, randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { responseMessage } from '../utils/constant';
import { ErrorException } from '../utils/custom.exceptions';

export class RequestMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const requestId = request.header('x-request-id') || randomUUID();
    const clientId =
      request.header('x-client-id') || randomBytes(4).toString('hex');
    request.headers['x-request-id'] = requestId;
    request.headers['x-client-id'] = clientId;

    if (
      request.header('x-user-id') &&
      request.header('x-user-id').length > 15
    ) {
      throw new ErrorException(
        responseMessage.BAD_REQUEST,
        'x-user-id length must less than or same 15 digits',
      );
    }

    if (
      request.header('x-client-id') &&
      request.header('x-client-id').length > 8
    ) {
      throw new ErrorException(
        responseMessage.BAD_REQUEST,
        'x-client-id length must less than or same 8 digits',
      );
    }

    if (
      request.header('x-branch-id') &&
      request.header('x-branch-id').length > 5
    ) {
      throw new ErrorException(
        responseMessage.BAD_REQUEST,
        'x-branch-id length must less than or same 5 digits',
      );
    }

    request['agata'] = {
      reqId: request.header('x-request-id') || '',
      userId: request.header('x-user-id') || '',
      clientId: request.header('x-client-id') || '',
      roleId: request.header('x-role-id') || '',
      branchId: request.header('x-branch-id') || '',
    };

    next();
  }
}
