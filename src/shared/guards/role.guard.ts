import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { responseMessage } from '../utils/constant';
import { ErrorException } from '../utils/custom.exceptions';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const role = request.headers['x-role-id'];

    if (!role) {
      return false;
    }

    if (role === 'ADMIN') {
      return true;
    }

    if (roles.includes(role)) {
      return true;
    } else {
      throw new ErrorException(responseMessage.UNAUTHORIZED_ROLES);
    }
  }
}
