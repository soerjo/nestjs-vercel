import { HttpStatus } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { Role, TresponseMessage } from './constant.type';

dotenv.config();

export const serviceCode: string = String(process.env.SERVICE_CODE);

export const role: Role = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export const responseMessage: TresponseMessage = {
  SUCCESS: {
    httpStatus: HttpStatus.OK,
    caseCode: '00',
    message: 'Success',
  },
  SUCCESS_UPDATE: {
    httpStatus: HttpStatus.OK,
    caseCode: '01',
    message: 'Successfully Updated',
  },
  SUCCESS_DELETE: {
    httpStatus: HttpStatus.OK,
    caseCode: '02',
    message: 'Successfully Deleted',
  },
  SUCCESSFULLY_CREATED: {
    httpStatus: HttpStatus.CREATED,
    caseCode: '00',
    message: 'Successfully created',
  },
  BAD_REQUEST: {
    httpStatus: HttpStatus.BAD_REQUEST,
    caseCode: '00',
    message: 'Bad Request',
  },
  UNAUTHORIZED_AUTH: {
    httpStatus: HttpStatus.UNAUTHORIZED,
    caseCode: '00',
    message: 'Unauthorized Auth',
  },
  UNAUTHORIZED_ROLES: {
    httpStatus: HttpStatus.UNAUTHORIZED,
    caseCode: '01',
    message: 'Unauthorized Roles',
  },
  NOT_FOUND: {
    httpStatus: HttpStatus.NOT_FOUND,
    caseCode: '00',
    message: 'Not Found',
  },
  DUPLICATE: {
    httpStatus: HttpStatus.CONFLICT,
    caseCode: '00',
    message: 'Duplicate Data',
  },
  INTERNAL_SERVER_ERROR: {
    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
    caseCode: '00',
    message: 'Internal Server Error',
  },
};
