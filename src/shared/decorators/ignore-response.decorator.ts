import { SetMetadata } from '@nestjs/common';

export const IgnoreResponseInterceptorKey = 'IgnoreResponseInterceptorKey';
export const IgnoreResponseInterceptor = () =>
  SetMetadata(IgnoreResponseInterceptorKey, true);
