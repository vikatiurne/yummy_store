import { Sequelize } from 'sequelize';
import pg from 'pg';

export default new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    dialectModule: pg,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);
