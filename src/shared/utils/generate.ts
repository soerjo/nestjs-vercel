import { randomBytes } from 'crypto';

export function generateThirteenDigitString() {
  const buffer = randomBytes(16);
  const hexString = buffer
    .toString('hex')
    .replace(/[a-zA-Z]/g, '')
    .slice(0, 13);
  return hexString;
}
