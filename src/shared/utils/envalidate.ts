import { cleanEnv } from 'envalid';

export const envalidate = () => {
  return cleanEnv(process.env, {
    // NODE_ENV: str({
    //   choices: ['development', 'test', 'production', 'staging'],
    // }),
    // SERVICE_CODE: str(),
    // PORT: port(),
    // BASIC_AUTH_USERNAME: str(),
    // BASIC_AUTH_PASSWORD: str(),
    // FRONT_END_URL: str(),
    // POSTGRES_HOST: str(),
    // POSTGRES_PORT: port(),
    // POSTGRES_USERNAME: str(),
    // POSTGRES_PASSWORD: str(),
    // POSTGRES_DATABASE: str(),
    // POSTGRES_CONNECTION_LIMIT: num(),
    // REDIS_HOST: str(),
    // REDIS_PORT: port(),
    // REDIS_TTL: num()
  });
};
