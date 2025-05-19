/**
 * @description This file contain all functions for control request and response for frontend authentication
 * @author {Anirban Karmakar}
 */

import { Request, Response } from 'express';
import { resSuccess, resFailed } from '../../helpers';
import axios from 'axios';
import userService from '../../services/user.service';
import { User } from '../../../models/user.model';
import { generateAccessToken } from '../../helpers/jwt/access-token.helpers';

/**
 * @description  Verify Google login
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 * @returns {Promise<Response>} - Promise object of Express Response
 */
async function verifyGoogleLogin(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { access_token } = req.body;

    // Verify Google token
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    const userInfo = response.data;

    // Generate JWT token with additional user data
    const authToken = generateAccessToken({
      email: userInfo.email,
      firstName: userInfo.given_name,
      lastName: userInfo.family_name,
      picture: userInfo.picture,
    });

    // Check if user exists
    let user = await userService.findUserByEmail(userInfo.email);

    // If user doesn't exist, create new user
    if (!user) {
      type UserSaveData = {
        firstName: string;
        lastName: string;
        email: string;
        picture: string;
        authTokens?: string;
      };

      let saveData: UserSaveData = {
        firstName: userInfo.given_name,
        lastName: userInfo.family_name,
        email: userInfo.email,
        picture: userInfo.picture,
      };
      // saveData.authTokens += `${authToken},`;

      await userService.createOrSaveUser(saveData as User);
    } else {
      user.firstName = userInfo.given_name;
      user.lastName = userInfo.family_name;
      user.picture = userInfo.picture;
      // user.authTokens += `${authToken},`;

      await userService.createOrSaveUser(user);
    }

    return resSuccess(res, 200, 'Google login verified', { token: authToken });
  } catch (error: any) {
    return resFailed(res, 500, error.message);
  }
}

export default {
  verifyGoogleLogin,
};
