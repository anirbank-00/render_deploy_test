import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import connection from './utils/db-connect';
import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';
import user from './api/controller/auth/user';
import provider from './api/controller/auth/provider';
import path from 'path';
import webRoutes from './routes/web';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

  connection.initialize().then(() => {
    /* eslint-disable no-console */
    console.log('Database connection successful');
    /* eslint-enable no-console */
  });

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);

  // * Web Route
  app.use('/api/web', webRoutes);

  // Controller Routes
  app.use('/api/v2/user', user);
  app.use('/api/v2/provider', provider);

  // * File upload route
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
