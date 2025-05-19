/**
 * @description This file contain all functions for control request and response for file uploads
 * @description It will handle all request and response for file uploads
 * @author {Anirban Karmakar}
 */

import { Request, Response } from 'express';
// import { resSuccess, resFailed } from '../helpers';
// import { logger } from '../../logger';

// Utils
import { uploadImage } from '../../utils/file-upload.utils';

const uploadImageController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    if (req.file == null || typeof req.file == 'undefined') {
      return res.status(400).send({
        status: false,
        error: {
          msg: 'FILE_IS_EMPTY',
          param: 'file',
          location: 'image',
        },
      });
    }

    const result = await uploadImage(req, res);

    return res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: 'Failed to upload image.',
      error: {
        msg: error.message,
        param: 'file',
        location: 'video_file',
      },
    });
  }
};

export default {
  uploadImageController,
};
