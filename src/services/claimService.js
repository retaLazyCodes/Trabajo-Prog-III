import { ClaimDAO } from '../dao/claimDao.js';

class ClaimService {
    static async getUserOffice (userId) {
        const userOfficeRows = await ClaimDAO.getUserOffice(userId);
        return userOfficeRows.length > 0 ? userOfficeRows[0].idOficina : null;
    }

    static async isClaimInUserOffice (claimId, officeId) {
        const claimOfficeRows = await ClaimDAO.isClaimInUserOffice(claimId, officeId);
        return claimOfficeRows.length > 0 && claimOfficeRows[0].idOficina === officeId;
    }

    static async getClaimStatus (claimId) {
        const claimRows = await ClaimDAO.getClaimStatus(claimId);
        if (claimRows.length === 0) {
            return null;
        }
        return {
            claimStatus: claimRows[0].idReclamoEstado,
            clientId: claimRows[0].idUsuarioCreador
        };
    }

    static async getClaimsByOffice (officeId) {
        return await ClaimDAO.getClaimsByOffice(officeId);
    }

    static async attendClaim (claimId, userId, currentStatus) {
        let newStatus;

        if (currentStatus === 1) { // "Creado"
            newStatus = 2; // En proceso
        } else if (currentStatus === 2) {
            newStatus = 4; // Finalizado
        } else {
            throw new Error('El reclamo no se puede atender porque no está en un estado válido');
        }

        const isFinalized = currentStatus === 2;
        const result = await ClaimDAO.attendClaim(claimId, userId, newStatus, isFinalized);
        return result.affectedRows > 0;
    }

    static async createClaim (claimData) {
        const result = await ClaimDAO.createClaim(claimData);
        return { claimId: result.insertId, ...claimData };
    }

    static async isClaimOwnedByClient (claimId, clientId) {
        const rows = await ClaimDAO.isClaimOwnedByClient(claimId, clientId);
        return rows.length > 0;
    }

    static async getClientClaims (clientId) {
        return await ClaimDAO.getClientClaims(clientId);
    }

    static async cancelClaim (claimId, clientId) {
        const result = await ClaimDAO.cancelClaim(claimId, clientId);
        return result.affectedRows > 0;
    }

    static getNewStatusClaimString (claimStatus) {
        switch (claimStatus) {
        case 1: return 'En Proceso';
        case 2: return 'Finalizado';
        }
    }
}

export { ClaimService };
