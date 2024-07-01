import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { LoggerModule } from 'nestjs-pino';
import { pinoConfig } from './config/logger.config';
import { GlobalModule } from './modules/global.module';
import { HttpExceptionFilter } from './shared/filter/http-exception.filter';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import { RequestMiddleware } from './shared/middleware/request.middleware';

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   useFactory: (logger: PinoLogger): TypeOrmModuleOptions => {
    //     return {
    //       ...postgreSQLConfig,
    //       logger: new PinoTypeOrmLogger(logger),
    //     };
    //   },
    //   inject: [PinoLogger],
    // }),
    // CacheModule.register(redisConfig),
    MulterModule.register({
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
    LoggerModule.forRoot(pinoConfig),
    GlobalModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: BasicAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).forRoutes('*');
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
