import { pool } from '../config/db.js';

class Statistics {
    static async getStatistics () {
        try {
            const [rows] = await pool.query('CALL get_statistics()');
            const statistics = {
                total_reclamos: rows[0][0].total_reclamos,
                reclamos_por_oficina: rows[1],
                reclamos_por_tipo: rows[2],
                reclamos_resueltos_no_resueltos: rows[3]
            };

            return statistics;
        } catch (err) {
            console.error('Error finding statistics:', err);
            throw err;
        }
    }

    static async getClaimsForCSV () {
        try {
            const [rows] = await pool.query(`
                SELECT 
                reclamos.idReclamo AS id,
                reclamos.descripcion AS descripcion,
                reclamos_tipo.descripcion AS tipo,
                oficinas.nombre AS oficina,
                reclamos_estado.descripcion AS estado,
                DATE_FORMAT(reclamos.fechaCreado, '%d/%m/%Y %H:%i') AS fechaCreacion
            FROM reclamos
            LEFT JOIN reclamos_tipo ON reclamos.idReclamoTipo = reclamos_tipo.idReclamoTipo
            LEFT JOIN reclamos_estado ON reclamos.idReclamoEstado = reclamos_estado.idReclamoEstado
            LEFT JOIN usuarios ON reclamos.idUsuarioCreador = usuarios.idUsuario
            LEFT JOIN usuarios_oficinas ON usuarios.idUsuario = usuarios_oficinas.idUsuario
            LEFT JOIN oficinas ON usuarios_oficinas.idOficina = oficinas.idOficina
            `);
            // En caso de querer traer solo los reclamos activos poner al final de la query: WHERE reclamos_estado.activo = 1
            return rows;
        } catch (err) {
            console.error('Error obtaining claims for CSV:', err);
            throw err;
        }
    }
}

export { Statistics };
