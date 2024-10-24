import { Router } from 'express';
import {
    getOffice,
    createOffice,
    updateOffice,
    employeeAdd,
    employeeRemove
} from '../controllers/officeControllers.js';
import { validateOffice, validateUpdateOffice } from '../middlewares/validateOffice.js';

const router = Router();

router.get('/', getOffice);
router.post('/', validateOffice, createOffice);
router.patch('/:officeId', validateUpdateOffice, updateOffice);
router.post('/:officeId/employees/add', employeeAdd);
router.delete('/:officeId/employees/remove', employeeRemove);

export default router;
