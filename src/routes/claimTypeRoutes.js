import { Router } from 'express';
import {
    getAllClaimTypes,
    createClaimType,
    updateClaimType
} from '../controllers/claimTypeController.js';
import { validateClaimType, validateUpdateClaimType } from '../middlewares/validateClaim.js';

const router = Router();

router.get('/', getAllClaimTypes);
router.post('/', validateClaimType, createClaimType);
router.patch('/:claimTypeId', validateUpdateClaimType, updateClaimType);

export default router;
