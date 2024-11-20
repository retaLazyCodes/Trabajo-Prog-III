import { pool } from '../config/db.js';

class ReportsDAO {
    static async getStatistics () {
        const [rows] = await pool.query('CALL get_statistics()');
        return rows;
    }

    static async getClaims () {
        const [rows] = await pool.query('CALL get_claims()');
        return rows;
    }

    static async userStaticsByOffice () {
        const [rows] = await pool.query('CALL user_statics_by_office()');
        return rows;
    }
}

export { ReportsDAO };
