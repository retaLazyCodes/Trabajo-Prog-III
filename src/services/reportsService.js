import { ReportsDAO } from '../dao/reportsDao.js';

class ReportsService {
    static async getStatistics () {
        try {
            const rows = await ReportsDAO.getStatistics();
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
            const rows = await ReportsDAO.getClaims();
            return rows;
        } catch (err) {
            console.error('Error obtaining claims for report download:', err);
            throw err;
        }
    }

    static async userStaticsByOffice () {
        try {
            const [rows] = await pool.query('CALL user_statics_by_office()');
            return rows;
        } catch (err) {
            console.error('Error finding statistics:', err);
            throw err;
        }
    }
}

export { ReportsService };
