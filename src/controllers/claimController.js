import { ClaimService } from '../services/claimService.js';

const getClaimsByOffice = async (req, res) => {
    try {//cambiar de donde saco el userId
        //const userId = req.user.id;
        const { userId } = req.body;
        const officeId = await ClaimService.getUserOffice(userId);
        if (!officeId) {
            return res.status(400).json({ message: 'El empleado no pertenece a ninguna oficina activa' });
        }
        console.log(officeId)
        const claims = await ClaimService.getClaimsByOffice(officeId);
        res.status(200).json(claims);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los reclamos de la oficina' });
    }
};

const attendClaim = async (req, res) => {
    try {
        const { claimId } = req.params;
        console.log(claimId)
        //const userId = req.user.id;
        const { userId } = req.body;

        const officeId = await ClaimService.getUserOffice(userId);
        if (!officeId) {
            return res.status(400).json({ message: 'El empleado no pertenece a ninguna oficina activa' });
        }
        console.log(officeId)

        const claimStatus = await ClaimService.getClaimStatus(claimId);
        if (!claimStatus) {
            return res.status(400).json({ message: 'El reclamo no existe' });
        }

        const isClaimInUserOffice = await ClaimService.isClaimInUserOffice(claimId, officeId);
        if (!isClaimInUserOffice) {
            return res.status(400).json({ message: 'El reclamo no pertenece a la oficina del empleado' });
        }

        const success = await ClaimService.attendClaim(claimId, userId, claimStatus);
        if (!success) {
            return res.status(404).json({ message: 'No se pudo atender el reclamo' });
        }
        res.status(200).json({ message: 'Reclamo atendido con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createClaim = async (req, res) => {
    try {//cambiar de donde saco el clientId
        // const claimData = { ...req.body, clientId: req.user.id };
        const claimData = { ...req.body };
        const newClaim = await ClaimService.createClaim(claimData);
        res.status(201).json(newClaim);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el reclamo' });
    }
};

const getClientClaims = async (req, res) => {
    try {
        //const clientId = req.user.id;
        const { clientId } = req.body;
        const claims = await ClaimService.getClientClaims(clientId);
        res.status(200).json(claims);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los reclamos del cliente' });
    }
};

const cancelClaim = async (req, res) => {
    try {
        const { claimId } = req.params;
        const { clientId } = req.body;

        const isClaimOwnedByClient = await ClaimService.isClaimOwnedByClient(claimId, clientId);
        if (!isClaimOwnedByClient) {
            return res.status(400).json({ message: 'El cliente no es el creador de este reclamo o el reclamo no existe' });
        }

        const claim = await ClaimService.cancelClaim(claimId, clientId);
        if (!claim) {
            return res.status(500).json({ message: 'No se pudo cancelar el reclamo' });
        }
        res.status(200).json({ message: 'Reclamo cancelado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al cancelar el reclamo' });
    }
};

export { getClaimsByOffice, attendClaim, createClaim, getClientClaims, cancelClaim };
