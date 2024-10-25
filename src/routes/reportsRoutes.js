import { Router } from 'express';
import { getStatistics, downloadClaimsCSV } from '../controllers/reportsController.js';

const router = Router();

router.get('/statistics', getStatistics);
router.get('/download', downloadClaimsCSV);

export default router;
