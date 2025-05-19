import express, { Request, Response } from 'express';

// Controllers
import authController from '../../app/controllers/web/auth.controller';

const router = express.Router();

router.get('/', async (req:Request, res:Response) => {
  res.json({ message: 'We are in the auth routes.' });
});

router.post('/verifyGoogleLogin', authController.verifyGoogleLogin);

export default router;