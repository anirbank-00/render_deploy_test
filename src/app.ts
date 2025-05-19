import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import * as middlewares from './middlewares';
import connection from './utils/db-connect';
import webRoutes from './routes/web';
import user from './api/controller/auth/user';
import provider from './api/controller/auth/provider';


  const app: Application = express();

  app.use(cors());

  app.use(morgan('dev'));
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/static', express.static('public'));

  connection.initialize().then(() => {
    /* eslint-disable no-console */
    console.log('Database connection successful');
    /* eslint-enable no-console */
  });

  // * Web Route
  app.use('/api/web', webRoutes);

  // Controller Routes
  app.use('/api/v1/user', user);
  app.use('/api/v1/provider', provider);

  // * File upload route
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  app.use(middlewares.notFound);
  app.use(middlewares.errorHandler);



export default app;
