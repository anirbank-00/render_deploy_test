/**
 * @description This file contain all application configurations
 * @author {Anirban Karmakar}
 */

import { CorsOptions } from 'cors';
import { Options } from 'express-rate-limit';
import { ServerOptions } from 'socket.io';
import defaultConfig from './default';

export const socketConfig = (): Partial<ServerOptions> => ({
  cors: {
    origin: (origin, callback) => {
      if (!origin || defaultConfig.trusted_domains.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }, // defaultConfig.trusted_domains,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

export const corsConfig = (): CorsOptions => {
  return {
    origin: defaultConfig.trusted_domains,
    credentials: true,
  };
};

export const limitterConfig = (): Partial<Options> => ({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  standardHeaders: 'draft-7',
  legacyHeaders: true,
  statusCode: 429,
  message: 'Too many requests, please try again later.',
});
