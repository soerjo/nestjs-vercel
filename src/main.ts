import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { Logger, LoggerErrorInterceptor, PinoLogger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { envalidate } from './shared/utils/envalidate';

async function bootstrap() {
  // Environment Validation
  envalidate();

  // App
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    rawBody: true,
  });

  // Port
  const PORT = process.env.PORT;

  // App Prefix
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  // App Body Parser
  app.useBodyParser('urlencoded', { extended: true });

  // App Security
  app.disable('x-powered-by');
  app.use(helmet());
  // app.enableCors({
  //   origin: process.env.FRONT_END_URL.split(','),
  // });

  // Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Logger
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  // Documentation
  if (process.env.NODE_ENV === 'development') {
    setupSwagger(app);
  }

  // Disable Cache ETag
  app.disable('etag');

  await app.listen(PORT || 3000);
  // PinoLogger.root.info(`CORS : ${process.env.FRONT_END_URL.split(',')}`);
  PinoLogger.root.info(`Service is running on port ${PORT || 3000}`);
}
bootstrap();
