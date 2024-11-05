import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';
import {
    getClaimsByOffice,
    attendClaim,
    createClaim,
    getClientClaims,
    cancelClaim
} from '../controllers/claimController.js';
import { validateClaim } from '../middlewares/validateClaim.js';

const router = Router();

// Rutas para empleados
router.get(
    '/assigned',
    authMiddleware,
    authorizeRoles('employee'),
    getClaimsByOffice
);

router.put(
    '/:claimId/attend',
    authMiddleware,
    authorizeRoles('employee'),
    attendClaim
);

// Rutas para clientes
router.post(
    '/',
    authMiddleware,
    authorizeRoles('client'),
    validateClaim,
    createClaim
);

router.get(
    '/my-claims',
    authMiddleware,
    authorizeRoles('client'),
    getClientClaims
);

router.put(
    '/:claimId/cancel',
    authMiddleware,
    authorizeRoles('client'),
    cancelClaim
);

export default router;
