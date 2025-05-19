import { Request, Response } from 'express';
import fs from 'fs';

const uploadImage = async (req: Request, res: Response) => {
  if (req.file) {
    let filetype: string = '';
    // Check for mimetype
    if (req.file.mimetype == 'image/jpg') {
      filetype = 'jpg';
    } else if (req.file.mimetype == 'image/jpeg') {
      filetype = 'jpeg';
    } else if (req.file.mimetype == 'image/png') {
      filetype = 'png';
    }
    // else if (
    //   req.file.mimetype ==
    //   'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    // ) {
    //   filetype = 'docx';
    // } else if (req.file.mimetype == 'application/pdf') {
    //   filetype = 'pdf';
    // }

    if (
      req.file.mimetype == 'image/jpg' ||
      req.file.mimetype == 'image/jpeg' ||
      req.file.mimetype == 'image/png'
    ) {
      const fileName =
        '/uploads/images/' +
        Math.floor(100000 + Math.random() * 900000) +
        '.' +
        filetype;
      const arrayBufferView = new Uint8Array(req.file.buffer);

      fs.writeFileSync('src' + fileName, arrayBufferView);

      return fileName;
    } else {
      return res.status(400).json({
        status: false,
        message: 'Failed to upload image.',
        error: {
          msg: 'Please check the file type. Only .jpg, .jpeg,.png, allowed',
          param: 'file',
          location: 'images',
        },
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      error: 'No image provided.',
    });
  }
};

export { uploadImage };
