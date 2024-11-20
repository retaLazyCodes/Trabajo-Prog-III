import { pool } from '../config/db.js';

class ClaimDAO {
    static async getUserOffice (userId) {
        const [userOfficeRows] = await pool.query(
            `SELECT uo.idOficina
             FROM usuarios_oficinas uo
             WHERE uo.idUsuario = ? AND uo.activo = 1`,
            [userId]
        );
        return userOfficeRows;
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
        return claimOfficeRows;
    }

    static async getClaimStatus (claimId) {
        const [claimRows] = await pool.query(
            `SELECT idReclamoEstado, idUsuarioCreador
             FROM reclamos
             WHERE idReclamo = ?`,
            [claimId]
        );
        return claimRows;
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

    static async attendClaim (claimId, userId, newStatus, isFinalized) {
        const query = isFinalized
            ? `UPDATE reclamos
               SET idUsuarioFinalizador = ?, fechaFinalizado = NOW(), idReclamoEstado = ?
               WHERE idReclamo = ?`
            : `UPDATE reclamos
               SET idReclamoEstado = ?
               WHERE idReclamo = ?`;
        const params = isFinalized ? [userId, newStatus, claimId] : [newStatus, claimId];
        const [result] = await pool.query(query, params);
        return result;
    }

    static async createClaim (claimData) {
        const { subject, description, claimTypeId, clientId } = claimData;
        const [result] = await pool.query(
            `INSERT INTO reclamos (asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador)
             VALUES (?, ?, NOW(), ?, ?, ?)`,
            [subject, description, 1, claimTypeId, clientId] // 1 = estado "Creado"
        );
        return result;
    }

    static async isClaimOwnedByClient (claimId, clientId) {
        const [rows] = await pool.query(
            `SELECT idReclamo
             FROM reclamos
             WHERE idReclamo = ? AND idUsuarioCreador = ?`,
            [claimId, clientId]
        );
        return rows;
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
            [clientId, 3, claimId, 1]
        );
        return result;
    }
}

export { ClaimDAO };
