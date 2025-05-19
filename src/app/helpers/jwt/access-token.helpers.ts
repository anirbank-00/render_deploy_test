/**
 * @description This file contain all access token JWT helper functions
 * @description It will handle all access token JWT functions for generate, verify and get user payload from access token
 * @author {Anirban Karmakar}
 */

import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import _default from '../../../config/default';

/**
 * @description Generate access token
 * @param {object | string} payload
 * @returns {string}
 */
export function generateAccessToken(
  payload: object | string = {},
): string {
  return jwt.sign(payload, _default.privateKey, {
    expiresIn: _default.accessTokenTtl,
  } as SignOptions);
}

/**
 * @description Verify the access token with access token secret key to get a decoded token
 * @param {string} token
 * @returns {Promise<object | string | undefined>}
 */
export function verifyAccessToken(
  token: string,
): Promise<object | string | undefined> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, _default.privateKey, (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    });
  });
}

/**
 * @description Get the user payload from access token
 * @param {string} token
 * @returns {JwtPayload | string | null}
 */
export function getUserPayloadFromAccessToken(
  token: string,
): JwtPayload | string | null {
  return jwt.decode(token);
}
