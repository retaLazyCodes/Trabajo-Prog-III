import { pool } from '../config/db.js';
import { mapClaimType } from '../models/utils.js';

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

    static async updateClaimType (fieldsToUpdate, values) {
        try {
            // Mapear cada campo a la sintaxis 'campo = ?' para el query
            const mappedFields = mapClaimType(fieldsToUpdate);
            const query = `UPDATE reclamos_tipo SET ${mappedFields.join(', ')} WHERE idReclamoTipo = ?`;
            return await pool.query(query, values);
        } catch (err) {
            console.error('Error updating Claim Type:', err);
            throw err;
        }
    }

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
