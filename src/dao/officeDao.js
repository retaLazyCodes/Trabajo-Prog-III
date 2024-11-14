import { pool } from '../config/db.js';

class OfficeDAO {
    static async getAllOffices () {
        const [rows] = await pool.query(`
            SELECT oficinas.idOficina, oficinas.nombre AS nombreOficina, oficinas.idReclamoTipo, 
                   usuarios.idUsuario, usuarios.nombre AS nombreUsuario, usuarios.apellido AS apellidoUsuario
            FROM oficinas
            LEFT JOIN usuarios_oficinas ON oficinas.idOficina = usuarios_oficinas.idOficina AND usuarios_oficinas.activo = 1
            LEFT JOIN usuarios ON usuarios_oficinas.idUsuario = usuarios.idUsuario
            WHERE oficinas.activo = 1;
        `);
        return rows;
    }

    static async findOfficeById (officeId) {
        const [rows] = await pool.query('SELECT * FROM oficinas WHERE idOficina = ?', [officeId]);
        return rows.length ? rows[0] : null;
    }

    static async createOffice (officeData) {
        const { name, claimTypeId } = officeData;
        const [result] = await pool.query(
            'INSERT INTO oficinas (nombre, idReclamoTipo, activo) VALUES (?, ?, ?)',
            [name, claimTypeId, 1]
        );
        return result.insertId;
    }

    static async updateOffice (query, values) {
        return await pool.query(query, values);
    }

    static async removeOffice (officeId) {
        await pool.query('DELETE FROM oficinas WHERE idOficina = ?', [officeId]);
    }

    static async addEmployee (officeId, employeeId) {
        await pool.query('INSERT INTO usuarios_oficinas (idOficina, idUsuario) VALUES (?, ?)', [officeId, employeeId]);
    }

    static async removeEmployee (officeId, employeeId) {
        await pool.query('DELETE FROM usuarios_oficinas WHERE idOficina = ? AND idUsuario = ?', [officeId, employeeId]);
    }

    static async employeeOfficeById (employeeId, officeId) {
        const [rows] = await pool.query('SELECT * FROM usuarios_oficinas WHERE idUsuario = ? AND idOficina = ?', [employeeId, officeId]);
        return rows.length ? rows[0] : null;
    }
}

export { OfficeDAO };
