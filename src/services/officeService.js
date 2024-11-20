import { OfficeDAO } from '../dao/officeDao.js';
import { mapOffices } from '../models/utils.js';
import { Office } from '../models/office.js';

class OfficeService {
    static async getAllOffices () {
        try {
            const rows = await OfficeDAO.getAllOffices();
            const offices = {};
            rows.forEach(row => {
                const { idOficina, nombreOficina, idReclamoTipo, idUsuario, nombreUsuario, apellidoUsuario } = row;

                if (!offices[idOficina]) {
                    offices[idOficina] = {
                        officeId: idOficina,
                        officeName: nombreOficina,
                        claimTypeId: idReclamoTipo,
                        employees: []
                    };
                }
                if (idUsuario) {
                    offices[idOficina].employees.push({
                        userId: idUsuario,
                        firstName: nombreUsuario,
                        lastName: apellidoUsuario
                    });
                }
            });
            return Object.values(offices);
        } catch (err) {
            console.error('Error finding offices:', err);
            throw err;
        }
    }

    static async findOfficeById (officeId) {
        try {
            const office = await OfficeDAO.findOfficeById(officeId);
            if (office) {
                return new Office(
                    office.idOficina,
                    office.nombre,
                    office.idReclamoTipo,
                    office.activo
                );
            }
            return null;
        } catch (err) {
            console.error('Error finding office by ID:', err);
            throw err;
        }
    }

    static async createOffice (officeData) {
        try {
            const officeId = await OfficeDAO.createOffice(officeData);
            return new Office(officeId, officeData.name, officeData.claimTypeId, 1);
        } catch (err) {
            console.error('Error creating Office:', err);
            throw err;
        }
    }

    static async updateOffice (fieldsToUpdate, values) {
        try {
            const mappedFields = mapOffices(fieldsToUpdate);
            const query = `UPDATE oficinas SET ${mappedFields.join(', ')} WHERE idOficina = ?`;
            await OfficeDAO.updateOffice(query, values);
        } catch (err) {
            console.error('Error updating Office:', err);
            throw err;
        }
    }

    static async removeOffice (officeId) {
        try {
            await OfficeDAO.removeOffice(officeId);
        } catch (err) {
            console.error('Error removing office:', err);
            throw err;
        }
    }

    static async addEmployee (officeId, employeeId) {
        try {
            await OfficeDAO.addEmployee(officeId, employeeId);
        } catch (err) {
            console.error('Error adding employee to office:', err);
            throw err;
        }
    }

    static async removeEmployee (officeId, employeeId) {
        try {
            await OfficeDAO.removeEmployee(officeId, employeeId);
        } catch (err) {
            console.error('Error removing employee from office:', err);
            throw err;
        }
    }

    static async employeeOfficeById (employeeId, officeId) {
        try {
            return await OfficeDAO.employeeOfficeById(employeeId, officeId);
        } catch (err) {
            console.error('Error finding user in office by ID:', err);
            throw err;
        }
    }
}

export { OfficeService };
