import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AgataHeaders } from '../interface/agata.interface';

export const Agata = createParamDecorator(
  (data: unknown, context: ExecutionContext): AgataHeaders => {
    const request = context.switchToHttp().getRequest();
    return request['agata'];
  },
);
