/**
 * @description This file contain database configuration using typeorm for Postgresql
 * @author {Anirban Karmakar}
 */


import { DataSource } from 'typeorm';
import appConfig from '../config/default';

const connection = new DataSource({
  type: 'postgres',
  host: appConfig.db_host,
  port: appConfig.db_port,
  username: appConfig.db_user,
  password: appConfig.db_password,
  database: appConfig.db_name,
  entities: ['./src/models/*.ts'],
  synchronize: true,
  ssl: { rejectUnauthorized: false },
});

export default connection;
