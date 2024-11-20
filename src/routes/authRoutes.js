import { Router } from 'express';
import {
    authMe,
    authLogin
} from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/login', authLogin);
router.get('/me', authMiddleware, authMe);

export default router;
