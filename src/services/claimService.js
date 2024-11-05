import { pool } from '../config/db.js';

class ClaimService {
    static async getUserOffice (userId) {
        const [userOfficeRows] = await pool.query(
            `SELECT uo.idOficina
             FROM usuarios_oficinas uo
             WHERE uo.idUsuario = ? AND uo.activo = 1`,
            [userId]
        );

        if (userOfficeRows.length === 0) {
            return null;
        }

        return userOfficeRows[0].idOficina;
    }

    static async isClaimInUserOffice (claimId, officeId) {
        const [claimOfficeRows] = await pool.query(
            `SELECT uo.idOficina
             FROM reclamos r
             JOIN reclamos_estado re ON r.idReclamoEstado = re.idReclamoEstado
             JOIN usuarios_oficinas uo ON r.idUsuarioCreador = uo.idUsuario
             WHERE idReclamo = ? AND uo.idOficina = ? AND uo.activo = ?`,
            [claimId, officeId, 1]
        );

        if (claimOfficeRows.length === 0 || claimOfficeRows[0].idOficina !== officeId) {
            return false;
        }
        return true;
    }

    static async getClaimStatus (claimId) {
        const [claimRows] = await pool.query(
            `SELECT idReclamoEstado, idUsuarioCreador
             FROM reclamos
             WHERE idReclamo = ?`,
            [claimId]
        );

        if (claimRows.length === 0) {
            return null;
        }

        return {
            claimStatus: claimRows[0].idReclamoEstado,
            clientId: claimRows[0].idUsuarioCreador
        };
    }

    static async getClaimsByOffice (officeId) {
        const [rows] = await pool.query(
            `SELECT r.idReclamo, r.asunto, r.descripcion, r.fechaCreado, re.descripcion AS estado
             FROM reclamos r
             JOIN reclamos_estado re ON r.idReclamoEstado = re.idReclamoEstado
             JOIN usuarios_oficinas uo ON r.idUsuarioCreador = uo.idUsuario
             WHERE uo.idOficina = ? AND uo.activo = 1`,
            [officeId]
        );
        return rows;
    }

    static async attendClaim (claimId, userId, currentStatus) {
        let newStatus;

        if (currentStatus === 1) { // "Creado"
            newStatus = 2; // "En proceso"
        } else if (currentStatus === 2) {
            newStatus = 4; // "Finalizado"
        } else {
            throw new Error('El reclamo no se puede atender porque no está en un estado válido');
        }

        let result = null;
        if (currentStatus === 1) {
            [result] = await pool.query(
                `UPDATE reclamos
                SET idReclamoEstado = ?
                WHERE idReclamo = ?`,
                [newStatus, claimId]
            );
        } else {
            [result] = await pool.query(
                `UPDATE reclamos
                SET idUsuarioFinalizador = ?, fechaFinalizado = NOW(), idReclamoEstado = ?
                WHERE idReclamo = ?`,
                [userId, newStatus, claimId]
            );
        }
        return result.affectedRows > 0;
    }

    static async createClaim (claimData) {
        const { subject, description, claimTypeId, clientId } = claimData;
        const [result] = await pool.query(
            `INSERT INTO reclamos (asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador)
             VALUES (?, ?, NOW(), ?, ?, ?)`,
            [subject, description, 1, claimTypeId, clientId] // 1 = estado "Creado"
        );
        return { claimId: result.insertId, ...claimData };
    }

    static async isClaimOwnedByClient (claimId, clientId) {
        const [rows] = await pool.query(
            `SELECT idReclamo 
             FROM reclamos 
             WHERE idReclamo = ? AND idUsuarioCreador = ?`,
            [claimId, clientId]
        );

        return rows.length > 0;
    }

    static async getClientClaims (clientId) {
        const [rows] = await pool.query(
            `SELECT r.idReclamo, r.asunto, r.descripcion, r.fechaCreado, re.descripcion AS estado
             FROM reclamos r
             JOIN reclamos_estado re ON r.idReclamoEstado = re.idReclamoEstado
             WHERE r.idUsuarioCreador = ?`,
            [clientId]
        );
        return rows;
    }

    static async cancelClaim (claimId, clientId) {
        const [result] = await pool.query(
            `UPDATE reclamos
             SET idUsuarioFinalizador = ?, fechaCancelado = NOW(), idReclamoEstado = ?
             WHERE idReclamo = ? AND idReclamoEstado = ?`,
            [clientId, 3, claimId, 1] // 3 = estado "Cancelado", 1 = estado "Creado"
        );
        return result.affectedRows > 0;
    }

    static getNewStatusClaimString (claimStatus) {
        switch (claimStatus) {
        case 1:
            return 'En Proceso';

        case 2:
            return 'Finalizado';
        }
    }
}

export { ClaimService };
