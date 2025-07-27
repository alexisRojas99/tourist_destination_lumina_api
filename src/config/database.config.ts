import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { DatabaseConfig } from './app.config';

export const getDatabaseConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => {
  const dbConfig = configService.get<DatabaseConfig>('database');

  if (!dbConfig) {
    throw new Error('Database configuration not found');
  }

  return {
    dialect: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.name,
    autoLoadModels: true,
    synchronize: false, // Disabled - use migrations instead
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  };
};
