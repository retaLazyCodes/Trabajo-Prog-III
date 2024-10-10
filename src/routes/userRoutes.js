import { Router } from 'express';
import {
    getUsers,
    createUser,
    updateUser
} from '../controllers/userController.js';
import { upload } from '../services/imageService.js';

const router = Router();

router.get('/', getUsers);
router.post('/', upload, createUser);
router.patch('/:id', upload, updateUser);

export default router;
