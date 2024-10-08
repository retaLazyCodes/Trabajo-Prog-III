import { Router } from 'express';
import {
    getOffice,
    createOffice,
    updateOffice,
    employeeAdd,
    employeeRemove
} from '../controllers/officeControllers.js';

const router = Router();

router.get('/', getOffice);
router.post('/', createOffice);
router.patch('/:officeId', updateOffice);
router.post('/:officeId/employees/add', employeeAdd);
router.patch('/:officeId/employees/remove', employeeRemove);

export default router;
