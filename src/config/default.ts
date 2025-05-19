import dotenv from 'dotenv';

dotenv.config();

export default {
  node_env: process.env.NODE_ENV,
  host: process.env.HOST,
  port: process.env.PORT || 5000,
  trusted_domains: process.env.TRUSTED_DOMAINS?.split(',') ?? [],
  db_host: process.env.DB_HOST,
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_port: Number(process.env.DB_PORT),
  saltWorkFactor: 10,
  accessTokenTtl: '7d',
  refreshTokenTtl: 60,
  privateKey: `${process.env.ACCESS_TOKEN_SECRET}`,
};
