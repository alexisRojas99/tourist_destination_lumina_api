import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Sequelize } from 'sequelize-typescript';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const sequelize = app.get(Sequelize);

  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');

    await sequelize.sync({ force: false, alter: true });
    console.log('✅ All models were synchronized successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  } finally {
    await app.close();
  }
}

void bootstrap();
