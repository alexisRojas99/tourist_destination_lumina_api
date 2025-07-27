export interface AppConfig {
  name: string;
  version: string;
  port: number;
  nodeEnv: string;
  apiPrefix: string;
}

export default (): { app: AppConfig } => ({
  app: {
    name: process.env.APP_NAME || 'Tourist Destination Lumina API',
    version: process.env.APP_VERSION || '1.0.0',
    port: parseInt(process.env.PORT || '8000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    apiPrefix: process.env.API_PREFIX || 'api/v1',
  },
});
