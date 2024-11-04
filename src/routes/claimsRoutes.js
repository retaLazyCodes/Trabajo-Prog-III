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

const router = Router();

// Rutas para empleados
router.get(
    '/assigned',
    authMiddleware,
    authorizeRoles('employee'),
    getClaimsByOffice // Lista reclamos asignados a la oficina del empleado
);

router.put(
    '/:claimId/attend',
    authMiddleware,
    authorizeRoles('employee'),
    attendClaim // Cambia el estado del reclamo
);

// Rutas para clientes
router.post(
    '/',
    authMiddleware,
    authorizeRoles('client'),
    createClaim // Crea un nuevo reclamo
);

router.get(
    '/my-claims',
    authMiddleware,
    authorizeRoles('client'),
    getClientClaims // Consulta el estado y los detalles de los reclamos del cliente
);

router.put(
    '/:claimId/cancel',
    authMiddleware,
    authorizeRoles('client'),
    cancelClaim // Cancela un reclamo iniciado por el cliente
);

export default router;
