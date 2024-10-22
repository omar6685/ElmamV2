import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dbDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: [
    /*...*/
  ],
  ssl: process.env.DATABASE_HOST !== '127.0.0.1',
  synchronize: process.env.NODE_ENV == 'development', // only synchronize in development mode
};

const dbDataSource = new DataSource(dbDataSourceOptions);

export default dbDataSource;
