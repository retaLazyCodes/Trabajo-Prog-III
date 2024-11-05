import { pool } from '../config/db.js';
import { ClaimType } from '../models/claimType.js';
import { mapClaimType } from '../models/utils.js';

class ClaimTypeService {
    static async getAllClaimTypes () {
        try {
            const [rows] = await pool.query('SELECT * FROM reclamos_tipo WHERE activo = 1');
            if (rows.length) {
                return rows.map((record) =>
                    new ClaimType(
                        record.idReclamoTipo,
                        record.descripcion,
                        record.activo
                    )
                );
            }
            return [];
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
        const { description } = claimTypeData;
        try {
            const [result] = await pool.query(
                'INSERT INTO reclamos_tipo (descripcion, activo) VALUES (?, ?)',
                [description, 1]
            );
            return { id: result.insertId, description, active: 1 };
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
}

export { ClaimTypeService };
