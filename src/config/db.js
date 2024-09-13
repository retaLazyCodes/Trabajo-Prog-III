import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

const {
    DB_HOST,
    DB_USER,
    DB_NAME,
    DB_PASS
} = process.env;

const pool = mysql.createPool({
    host: DB_HOST || 'localhost',
    user: DB_USER || 'root',
    database: DB_NAME || 'facturacion',
    password: DB_PASS || '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function validateConnection () {
    try {
        await pool.getConnection();
        console.log('Conexión a la base de datos exitosa');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
        process.exit(1);
    }
}

validateConnection();

export { pool };
