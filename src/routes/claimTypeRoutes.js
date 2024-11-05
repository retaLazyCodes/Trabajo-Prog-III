import { Router } from 'express';
import {
    getAllClaimTypes,
    createClaimType,
    updateClaimType
} from '../controllers/claimTypeController.js';
import { validateClaimType, validateUpdateClaimType } from '../middlewares/validateClaim.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';

const router = Router();

router.get(
    '/',
    authMiddleware,
    authorizeRoles('admin'),
    getAllClaimTypes
);

router.post(
    '/',
    authMiddleware,
    authorizeRoles('admin'),
    validateClaimType,
    createClaimType
);

router.patch(
    '/:claimTypeId',
    authMiddleware,
    authorizeRoles('admin'),
    validateUpdateClaimType,
    updateClaimType
);

export default router;
