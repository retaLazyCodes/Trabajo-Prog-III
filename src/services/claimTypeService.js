import { pool } from '../config/db.js';

class ClaimTypeService {
    static async getAllClaimTypes () {
        try {
            const [rows] = await pool.query('SELECT * FROM reclamos_tipo WHERE activo = 1');
            return rows.length ? rows : [];
        } catch (err) {
            console.error('Error finding claim type', err);
            throw err;
        }
    }

    static async findClaimTypesById (claimTypeId) {
        try {
            const [rows] = await pool.query('SELECT * FROM reclamos_tipo WHERE idReclamoTipo = ?', [claimTypeId]);
            if (rows.length) {
                return rows[0];
            }
            return null;
        } catch (err) {
            console.error('Error finding claim type by ID:', err);
            throw err;
        }
    }

    static async createClaimType (claimTypeData) {
        const { descripcion } = claimTypeData;
        try {
            const [result] = await pool.query(
                'INSERT INTO reclamos_tipo (descripcion, activo) VALUES (?, ?)',
                [descripcion, 1]
            );
            return { id: result.insertId, descripcion, activo: 1 };
        } catch (err) {
            console.error('Error creating claim type:', err);
            throw err;
        }
    }
    // ___________________________________________________________________________________

    static async updateClaimType (fieldsToUpdate, idReclamoTipo) {
        try {
            // Mapear cada campo a la sintaxis 'campo = ?' para el query
            const mappedFields = Object.keys(fieldsToUpdate).map(field => `${field} = ?`);
            const query = `UPDATE reclamos_tipo SET ${mappedFields.join(', ')} WHERE idReclamoTipo = ?`;
            console.log(query, "___________________________________________________________________________");
            console.log(idReclamoTipo, "___________________________________________________________________________");
            //arma mal la queri por el mapped fields!   endpoint http://localhost:8080/api/claim-types/6
            return await pool.query(query, idReclamoTipo);
        } catch (err) {
            console.error('Error updating Claim Type:', err);
            throw err;
        }
    }
    // ____________________________________________________________________________________

    static async removeClaimType (claimTypeId) {
        try {
            await pool.query('DELETE FROM reclamos_tipo WHERE idReclamoTipo = ?', [claimTypeId]);
        } catch (err) {
            console.error('Error removing Claim Type:', err);
            throw err;
        }
    }
}

export { ClaimTypeService };
