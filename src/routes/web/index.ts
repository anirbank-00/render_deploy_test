import express, { Request, Response } from 'express';
import multer from 'multer';

// Controllers
import fileUploadController from '../../app/controllers/file-upload.controller';

// Route handlers
import authRoutes from './auth.route';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/image', upload.single('image') as any, fileUploadController.uploadImageController);

router.use('/auth', authRoutes);

export default router;