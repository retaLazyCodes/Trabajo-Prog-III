import { Router } from 'express';
import { getStatistics, downloadClaims } from '../controllers/reportsController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';

const router = Router();

router.get(
    '/statistics',
    authMiddleware,
    authorizeRoles('admin'),
    getStatistics
);

router.get(
    '/download/:format',
    authMiddleware,
    authorizeRoles('admin'),
    downloadClaims
);

export default router;
