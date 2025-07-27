require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'develop',
    password: process.env.DB_PASSWORD || 'dev$123',
    database: process.env.DB_NAME || 'el_salvador_dev',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: console.log,
  },
  test: {
    username: process.env.DB_USERNAME || 'develop',
    password: process.env.DB_PASSWORD || 'dev$123',
    database: (process.env.DB_NAME || 'el_salvador') + '_test',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  },
};
