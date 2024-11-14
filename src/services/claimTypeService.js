import { ClaimType } from '../models/claimType.js';
import { mapClaimType } from '../models/utils.js';
import { ClaimTypeDAO } from '../dao/claimTypeDao.js';

class ClaimTypeService {
    static async getAllClaimTypes () {
        try {
            const rows = await ClaimTypeDAO.getAllClaimTypes();
            return rows.map((record) =>
                new ClaimType(
                    record.idReclamoTipo,
                    record.descripcion,
                    record.activo
                )
            );
        } catch (err) {
            console.error('Error finding claim type:', err);
            throw err;
        }
    }

    static async findClaimTypesById (claimTypeId) {
        try {
            const rows = await ClaimTypeDAO.findClaimTypeById(claimTypeId);
            return rows.length ? rows[0] : null;
        } catch (err) {
            console.error('Error finding claim type by ID:', err);
            throw err;
        }
    }

    static async createClaimType (claimTypeData) {
        const { description } = claimTypeData;
        try {
            const result = await ClaimTypeDAO.createClaimType(description);
            return { id: result.insertId, description, active: 1 };
        } catch (err) {
            console.error('Error creating claim type:', err);
            throw err;
        }
    }

    static async updateClaimType (fieldsToUpdate, values) {
        try {
            const mappedFields = mapClaimType(fieldsToUpdate);
            return await ClaimTypeDAO.updateClaimType(mappedFields, values);
        } catch (err) {
            console.error('Error updating claim type:', err);
            throw err;
        }
    }
}

export { ClaimTypeService };
