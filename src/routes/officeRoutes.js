import { Router } from 'express';
import {
    getOffice,
    createOffice,
    updateOffice,
    employeeAdd,
    employeeRemove
} from '../controllers/officeController.js';
import { validateOffice, validateUpdateOffice } from '../middlewares/validateOffice.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';

const router = Router();

router.get(
    '/',
    authMiddleware,
    authorizeRoles('admin'),
    getOffice
);

router.post(
    '/',
    authMiddleware,
    authorizeRoles('admin'),
    validateOffice,
    createOffice
);

router.patch(
    '/:officeId',
    authMiddleware,
    authorizeRoles('admin'),
    validateUpdateOffice,
    updateOffice
);

router.post(
    '/:officeId/employees/add',
    authMiddleware,
    authorizeRoles('admin'),
    employeeAdd
);

router.delete(
    '/:officeId/employees/remove',
    authMiddleware,
    authorizeRoles('admin'),
    employeeRemove
);

export default router;
