/* eslint-disable @typescript-eslint/no-unused-vars */
import { PinoLogger } from 'nestjs-pino';
import { Logger, QueryRunner } from 'typeorm';

export class PinoTypeOrmLogger implements Logger {
  constructor(private readonly logger: PinoLogger) {}

  logQuery(query: string, parameters?: Array<any>, _queryRunner?: QueryRunner) {
    this.logger.debug(
      { query: normalizeQuery(query), parameters },
      'sql query',
    );
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: Array<any>,
    _queryRunner?: QueryRunner,
  ) {
    this.logger.error(
      { query: normalizeQuery(query), parameters, error },
      'failed sql query',
    );
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: Array<any>,
    _queryRunner?: QueryRunner,
  ) {
    this.logger.warn(
      { query: normalizeQuery(query), parameters, time },
      'slow sql query',
    );
  }

  logSchemaBuild(message: string, _queryRunner?: QueryRunner) {
    this.logger.debug(message);
  }

  logMigration(message: string, _queryRunner?: QueryRunner) {
    this.logger.debug(message);
  }

  log(
    level: 'log' | 'info' | 'warn',
    message: any,
    _queryRunner?: QueryRunner,
  ) {
    switch (level) {
      case 'log':
      case 'info':
        this.logger.info(message);
        break;
      case 'warn':
        this.logger.warn(message);
        break;
    }
  }
}

function normalizeQuery(query: string) {
  return query.replace(/\s\s+/g, ' ').trim();
}
