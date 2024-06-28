import { SetMetadata } from '@nestjs/common';

export const ResponseMessageKey = 'ResponseMessageKey';
export const ResponseMessage = (
  { caseCode, message },
  additionalMessage = '',
) => SetMetadata(ResponseMessageKey, { caseCode, message, additionalMessage });
