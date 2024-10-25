import { Router } from 'express';
import {
    getUsers,
    createUser,
    updateUser
} from '../controllers/userController.js';
import { validateUser, validateUpdateUser } from '../middlewares/validateUser.js';
import { upload } from '../services/imageService.js';

const router = Router();

router.get('/', getUsers);
router.post('/', upload, validateUser, createUser);
router.patch('/:id', upload, validateUpdateUser, updateUser);

export default router;
