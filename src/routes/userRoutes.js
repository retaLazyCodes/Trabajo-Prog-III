import { Router } from 'express';
import {
    getUsers,
    createUser,
    updateUser,
    createClient
} from '../controllers/userController.js';
import { validateUser, validateUpdateUser } from '../middlewares/validateUser.js';
import { upload } from '../services/imageService.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';

const router = Router();

router.get(
    '/',
    authMiddleware,
    authorizeRoles('admin'),
    getUsers
);

router.post(
    '/',
    authMiddleware,
    authorizeRoles('admin'),
    upload,
    validateUser,
    createUser
);

router.post(
    '/register',
    validateUser,
    createClient
);

router.patch(
    '/:id',
    authMiddleware,
    authorizeRoles('admin'),
    upload,
    validateUpdateUser,
    updateUser
);

export default router;
