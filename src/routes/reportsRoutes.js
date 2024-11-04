import { Router } from 'express';
import { getStatistics, downloadClaims } from '../controllers/reportsController.js';

const router = Router();

router.get('/statistics', getStatistics);
router.get('/download/:format', downloadClaims);

export default router;
