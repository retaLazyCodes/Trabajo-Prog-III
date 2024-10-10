import { pool } from '../config/db.js';
import { mapOffices } from './utils.js';

class Office {
    constructor (officeId, name, claimTypeId, active) {
        this.officeId = officeId;
        this.name = name;
        this.claimTypeId = claimTypeId;
        this.active = active;
    }

    static async getAllOffice () {
        try {
            const [rows] = await pool.query('SELECT * FROM oficinas');
            if (rows.length) {
                return rows.map((office) =>
                    new Office(office.idOficina,
                        office.nombre,
                        office.idReclamoTipo,
                        office.activo)
                );
            }
            return [];
        } catch (err) {
            console.error('Error finding office by ID:', err);
            throw err;
        }
    }

    static async findOfficeById (officeId) {
        try {
            const [rows] = await pool.query('SELECT * FROM oficinas WHERE idOficina = ?', [officeId]);
            if (rows.length) {
                const office = rows[0];
                return new Office(office.officeId,
                    office.name,
                    office.claimTypeId,
                    office.active
                );
            }
            return null;
        } catch (err) {
            console.error('Error finding office by ID:', err);
            throw err;
        }
    }

    static async createOffice (officeData) {
        const { name, claimTypeId, active } = officeData;
        try {
            const [result] = await pool.query(
                'INSERT INTO oficinas (nombre, idReclamoTipo, activo) VALUES (?, ?, ?)',
                [name, claimTypeId, active]
            );
            return new Office(result.insertId, name, claimTypeId, active);
        } catch (err) {
            console.error('Error creating office:', err);
            throw err;
        }
    }

    static async updateOffice (fieldsToUpdate, values) {
        try {
            const mappedFields = mapOffices(fieldsToUpdate);
            const query = `UPDATE oficinas SET ${mappedFields.join(', ')} WHERE idOficina = ?`;
            return await pool.query(query, values);
        } catch (err) {
            console.error('Error updating Office:', err);
            throw err;
        }
    }
    
    static async removeOffice (officeId) {
        try {
            await pool.query('DELETE FROM oficinas WHERE idOficina = ?', [officeId]);
        } catch (err) {
            console.error('Error removing office:', err);
            throw err;
        }
    }

    static async addEmployee (officeId, employeeId) {
        try {
            await pool.query('INSERT INTO usuarios_oficinas (idOficina, idUsuario) VALUES (?, ?)', [officeId, employeeId]);
        } catch (err) {
            console.error('Error adding employee to office:', err);
            throw err;
        }
    }

    static async removeEmployee (officeId, employeeId) {
        try {
            await pool.query('DELETE FROM usuarios_oficinas WHERE idOficina = ? AND idUsuario = ?', [officeId, employeeId]);
        } catch (err) {
            console.error('Error removing employee from office:', err);
            throw err;
        }
    }

    static async employeeOfficeById (employeeId, officeId) {
        try {
            const [rows] = await pool.query('SELECT * FROM usuarios_oficinas WHERE idUsuario = ? AND idOficina = ? ', [employeeId, officeId]);
            if (rows.length) {
                return rows[0];
            }
            return null;
        } catch (err) {
            console.error('Error finding user in office by ID:', err);
            throw err;
        }
    }
}

export { Office };

class UserInOffice {
    constructor (userOfficeId, userId, officeId, active) {
        this.userOfficeId = userOfficeId;
        this.userId = userId;
        this.officeId = officeId;
        this.active = active;
    }

}

export { UserInOffice };
