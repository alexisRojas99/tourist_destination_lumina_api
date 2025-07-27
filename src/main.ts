import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app')!;

  // Enable CORS
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global prefix for all routes
  app.setGlobalPrefix(appConfig.apiPrefix);

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle(appConfig.name)
    .setDescription('A modular NestJS API with comprehensive features')
    .setVersion(appConfig.version)
    .addTag('Destinations', 'Destination management operations')
    .addTag('Health', 'Health check operations')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${appConfig.apiPrefix}/docs`, app, document);

  const port = appConfig.port;
  await app.listen(port);

  console.log(`🚀 ${appConfig.name} v${appConfig.version}`);
  console.log(
    `📡 Server running on: http://localhost:${port}/${appConfig.apiPrefix}`,
  );
  console.log(
    `📖 API Docs: http://localhost:${port}/${appConfig.apiPrefix}/docs`,
  );
  console.log(
    `🏥 Health check: http://localhost:${port}/${appConfig.apiPrefix}/health`,
  );
  console.log(`🌍 Environment: ${appConfig.nodeEnv}`);
}

void bootstrap();
