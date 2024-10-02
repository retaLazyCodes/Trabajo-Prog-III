import { Router } from 'express';
import { sendEmail } from '../services/emailService.js';

const router = Router();

router.post('/send', sendEmail);

export default router;
