import { pool } from '../config/db.js';

class ClaimTypeDAO {
    static async getAllClaimTypes () {
        const [rows] = await pool.query('SELECT * FROM reclamos_tipo WHERE activo = 1');
        return rows;
    }

    static async findClaimTypeById (claimTypeId) {
        const [rows] = await pool.query('SELECT * FROM reclamos_tipo WHERE idReclamoTipo = ?', [claimTypeId]);
        return rows;
    }

    static async createClaimType (description) {
        const [result] = await pool.query(
            'INSERT INTO reclamos_tipo (descripcion, activo) VALUES (?, ?)',
            [description, 1]
        );
        return result;
    }

    static async updateClaimType (fieldsToUpdate, values) {
        const query = `UPDATE reclamos_tipo SET ${fieldsToUpdate.join(', ')} WHERE idReclamoTipo = ?`;
        const [result] = await pool.query(query, values);
        return result;
    }
}

export { ClaimTypeDAO };
