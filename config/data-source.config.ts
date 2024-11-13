import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { SeederOptions } from 'typeorm-extension';

config();

export const dbDataSourceOptions: DataSourceOptions & SeederOptions = {
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
  ssl: false,
  synchronize: process.env.NODE_ENV == 'development', // only synchronize in development mode
  seeds: ['dist/db/seeds/seeders/**/*.js'],
  factories: ['dist/db/factories/**/*.js'],
};

const dbDataSource = new DataSource(dbDataSourceOptions);

export default dbDataSource;
