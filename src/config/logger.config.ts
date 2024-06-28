import { Params } from 'nestjs-pino';

const isProduction = process.env.NODE_ENV === 'production';

const pinoConfig: Params = {
  pinoHttp: {
    autoLogging: false,
    base: null,
    timestamp: !isProduction,
    quietReqLogger: true,
    genReqId: () => undefined,
    transport: isProduction
      ? undefined
      : {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
          },
        },
  },
};

export { pinoConfig };
