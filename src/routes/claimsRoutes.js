import { Router } from 'express';
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
    getClaimsByOffice // Lista reclamos asignados a la oficina del empleado
);

router.put(
    '/:id/attend',
    attendClaim // Cambia el estado del reclamo
);

// Rutas para clientes
router.post(
    '/',
    createClaim // Crea un nuevo reclamo
);

router.get(
    '/my-claims',
    getClientClaims // Consulta el estado y los detalles de los reclamos del cliente
);

router.delete(
    '/:id/cancel',
    cancelClaim // Cancela un reclamo iniciado por el cliente
);

export default router;
