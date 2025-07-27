export interface AppConfig {
  name: string;
  version: string;
  port: number;
  nodeEnv: string;
  apiPrefix: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  motor: string;
  name: string;
  username: string;
  password: string;
}

export default (): { app: AppConfig; database: DatabaseConfig } => ({
  app: {
    name: process.env.APP_NAME || 'Tourist Destination Lumina API',
    version: process.env.APP_VERSION || '1.0.0',
    port: parseInt(process.env.PORT || '8000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    apiPrefix: process.env.API_PREFIX || 'api/v1',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    motor: process.env.DB_MOTOR || 'postgres',
    name: process.env.DB_NAME || 'el_salvador_dev',
    username: process.env.DB_USERNAME || 'develop',
    password: process.env.DB_PASSWORD || 'dev$123',
  },
});
