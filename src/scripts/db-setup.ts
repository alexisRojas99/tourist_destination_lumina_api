import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Sequelize } from 'sequelize-typescript';

async function runMigrations() {
  const app = await NestFactory.create(AppModule);

  const sequelize = app.get(Sequelize);

  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');

    const useCliMigrations = process.env.USE_CLI_MIGRATIONS === 'true';

    if (useCliMigrations) {
      console.log('💡 Please use the CLI commands for migrations:');
      console.log('   npm run migration:run    - Run pending migrations');
      console.log('   npm run seed:run         - Run seeders');
      console.log('   npm run migration:revert - Revert last migration');
    } else {
      console.log('🔄 Syncing models (development mode)...');
      await sequelize.sync({ force: false, alter: true });
      console.log('✅ All models were synchronized successfully.');
    }
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  } finally {
    await app.close();
  }
}

async function resetDatabase() {
  const app = await NestFactory.create(AppModule);

  const sequelize = app.get(Sequelize);

  try {
    console.log('⚠️  WARNING: This will drop all tables and recreate them!');
    await sequelize.sync({ force: true });
    console.log('✅ Database has been reset successfully.');
  } catch (error) {
    console.error('❌ Unable to reset the database:', error);
  } finally {
    await app.close();
  }
}

const command = process.argv[2];

if (command === 'reset') {
  void resetDatabase();
} else {
  void runMigrations();
}
