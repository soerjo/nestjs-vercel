import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const postgreSQLConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: String(process.env.POSTGRES_USERNAME),
  password: String(process.env.POSTGRES_PASSWORD),
  database: String(process.env.POSTGRES_DATABASE),
  autoLoadEntities: true,
  entities: ['./dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  extra: {
    connectionLimit: process.env.POSTGRES_CONNECTION_LIMIT,
  },
};

export { postgreSQLConfig };
