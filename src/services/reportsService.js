import { pool } from '../config/db.js';

class ReportsService {
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

    static async getClaims () {
        try {
            const [rows] = await pool.query('CALL get_claims()');
            return rows;
        } catch (err) {
            console.error('Error obtaining claims for report download:', err);
            throw err;
        }
    }
}

export { ReportsService };
