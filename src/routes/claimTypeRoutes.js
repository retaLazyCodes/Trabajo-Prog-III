import { Router } from 'express';
import {
    getAllClaimTypes,
    createClaimType,
    updateClaimType
} from '../controllers/claimTypeController.js';

const router = Router();

router.get('/', getAllClaimTypes);
router.post('/', createClaimType);
router.patch('/:claimTypeId', updateClaimType);

export default router;
